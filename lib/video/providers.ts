/**
 * WEZO SHOWCASE - Multi-Provider Video Engine
 * Supports: YouTube, Google Drive, External Video URLs
 * Prepared for: Bunny Stream, Vimeo
 * With Strict SSRF Protection and Security Hardening
 */

export type VideoProviderType = 'YOUTUBE' | 'GOOGLE_DRIVE' | 'EXTERNAL' | 'BUNNY' | 'VIMEO';
export type VideoAspectType = 'VERTICAL_9_16' | 'HORIZONTAL_16_9';

export interface ParsedVideoResult {
  success: boolean;
  provider?: VideoProviderType;
  videoId?: string;
  cleanUrl?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  suggestedAspect?: VideoAspectType;
  error?: string;
}

/**
 * SSRF and Protocol Security Validation
 * Rejects private, internal, or loopback IPs/hostnames
 */
export function isSafePublicUrl(urlString: string): { safe: boolean; reason?: string } {
  try {
    const url = new URL(urlString.trim());

    // Must be https (or http only in non-production for local mock tests)
    if (url.protocol !== 'https:' && (process.env.NODE_ENV === 'production' || url.protocol !== 'http:')) {
      return { safe: false, reason: 'Only secure HTTPS protocols are permitted' };
    }

    const hostname = url.hostname.toLowerCase();

    // Check loopback / localhost
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local')
    ) {
      return { safe: false, reason: 'Loopback and localhost addresses are forbidden' };
    }

    // Check Cloud metadata endpoints (AWS, GCP, Azure, DigitalOcean)
    if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal' || hostname.startsWith('169.254.')) {
      return { safe: false, reason: 'Cloud metadata access is forbidden' };
    }

    // Check private RFC 1918 IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipMatch = hostname.match(ipv4Regex);
    if (ipMatch) {
      const first = parseInt(ipMatch[1], 10);
      const second = parseInt(ipMatch[2], 10);
      if (first === 10) return { safe: false, reason: 'Private IP addresses are forbidden' };
      if (first === 172 && second >= 16 && second <= 31) return { safe: false, reason: 'Private IP addresses are forbidden' };
      if (first === 192 && second === 168) return { safe: false, reason: 'Private IP addresses are forbidden' };
      if (first === 0 || first === 127) return { safe: false, reason: 'Reserved IP addresses are forbidden' };
    }

    return { safe: true };
  } catch {
    return { safe: false, reason: 'Invalid URL format' };
  }
}

/**
 * YouTube Video Extractor
 */
export function parseYouTubeUrl(rawUrl: string): ParsedVideoResult {
  const urlCheck = isSafePublicUrl(rawUrl);
  if (!urlCheck.safe) {
    return { success: false, error: urlCheck.reason };
  }

  const url = new URL(rawUrl.trim());
  const hostname = url.hostname.toLowerCase().replace('www.', '').replace('m.', '');
  const isYouTubeHost = hostname === 'youtube.com' || hostname === 'youtu.be' || hostname === 'youtube-nocookie.com';

  if (!isYouTubeHost) {
    return { success: false, error: 'URL does not belong to YouTube domain' };
  }

  let videoId = '';
  let isShorts = false;

  if (hostname === 'youtu.be') {
    // youtu.be/VIDEO_ID
    videoId = url.pathname.slice(1).split(/[?&#/]/)[0];
  } else if (url.pathname.includes('/shorts/')) {
    // youtube.com/shorts/VIDEO_ID
    isShorts = true;
    const parts = url.pathname.split('/shorts/');
    videoId = parts[1] ? parts[1].split(/[?&#/]/)[0] : '';
  } else if (url.pathname.includes('/embed/')) {
    // youtube.com/embed/VIDEO_ID
    const parts = url.pathname.split('/embed/');
    videoId = parts[1] ? parts[1].split(/[?&#/]/)[0] : '';
  } else if (url.pathname.includes('/watch')) {
    // youtube.com/watch?v=VIDEO_ID
    videoId = url.searchParams.get('v') || '';
  }

  // YouTube IDs are strictly 11 characters alphanumeric, hyphen, underscore
  const idRegex = /^[a-zA-Z0-9_-]{11}$/;
  if (!videoId || !idRegex.test(videoId)) {
    return { success: false, error: 'Invalid or missing YouTube Video ID' };
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const cleanUrl = isShorts ? `https://www.youtube.com/shorts/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`;

  return {
    success: true,
    provider: 'YOUTUBE',
    videoId,
    cleanUrl,
    embedUrl,
    thumbnailUrl,
    suggestedAspect: isShorts ? 'VERTICAL_9_16' : 'HORIZONTAL_16_9'
  };
}

/**
 * Google Drive Video Extractor
 * Uses Official Preview Embed
 */
export function parseGoogleDriveUrl(rawUrl: string): ParsedVideoResult {
  const urlCheck = isSafePublicUrl(rawUrl);
  if (!urlCheck.safe) {
    return { success: false, error: urlCheck.reason };
  }

  const url = new URL(rawUrl.trim());
  const hostname = url.hostname.toLowerCase();
  const isDriveHost = hostname === 'drive.google.com' || hostname === 'docs.google.com';

  if (!isDriveHost) {
    return { success: false, error: 'URL does not belong to Google Drive domain' };
  }

  let fileId = '';
  // drive.google.com/file/d/FILE_ID/view... or /preview
  if (url.pathname.includes('/file/d/')) {
    const parts = url.pathname.split('/file/d/');
    fileId = parts[1] ? parts[1].split('/')[0] : '';
  } else if (url.searchParams.has('id')) {
    // drive.google.com/open?id=FILE_ID
    fileId = url.searchParams.get('id') || '';
  }

  // Google Drive file IDs are alphanumeric with hyphens/underscores (length 25-50)
  const driveIdRegex = /^[a-zA-Z0-9_-]{20,60}$/;
  if (!fileId || !driveIdRegex.test(fileId)) {
    return { success: false, error: 'Invalid or missing Google Drive file ID' };
  }

  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const cleanUrl = `https://drive.google.com/file/d/${fileId}/view`;

  return {
    success: true,
    provider: 'GOOGLE_DRIVE',
    videoId: fileId,
    cleanUrl,
    embedUrl,
    // Google Drive videos require a custom thumbnail or default fallback placeholder
    thumbnailUrl: '/assets/showcase/drive-placeholder.webp',
    suggestedAspect: 'VERTICAL_9_16'
  };
}

/**
 * External Direct Video URL Extractor
 */
export function parseExternalVideoUrl(rawUrl: string): ParsedVideoResult {
  const urlCheck = isSafePublicUrl(rawUrl);
  if (!urlCheck.safe) {
    return { success: false, error: urlCheck.reason };
  }

  const url = new URL(rawUrl.trim());
  const pathname = url.pathname.toLowerCase();
  const validExtensions = ['.mp4', '.webm', '.ogg', '.m4v'];
  const hasValidExt = validExtensions.some(ext => pathname.endsWith(ext));

  if (!hasValidExt) {
    return { success: false, error: 'External URL must point directly to a video file (.mp4, .webm, .ogg)' };
  }

  // Generate deterministic ID from url hash
  const videoId = Buffer.from(url.toString()).toString('base64url').slice(0, 32);

  return {
    success: true,
    provider: 'EXTERNAL',
    videoId,
    cleanUrl: url.toString(),
    embedUrl: url.toString(),
    thumbnailUrl: '/assets/showcase/video-placeholder.webp',
    suggestedAspect: 'VERTICAL_9_16'
  };
}

/**
 * Unified Video Parser
 * Automatically identifies provider or validates specified provider
 */
export function parseAndValidateVideo(rawUrl: string, providerHint?: VideoProviderType): ParsedVideoResult {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { success: false, error: 'Video URL is required' };
  }

  const trimmed = rawUrl.trim();
  const urlCheck = isSafePublicUrl(trimmed);
  if (!urlCheck.safe) {
    return { success: false, error: urlCheck.reason };
  }

  const lower = trimmed.toLowerCase();

  // 1. YouTube detection
  if (providerHint === 'YOUTUBE' || (!providerHint && (lower.includes('youtube.com') || lower.includes('youtu.be')))) {
    return parseYouTubeUrl(trimmed);
  }

  // 2. Google Drive detection
  if (providerHint === 'GOOGLE_DRIVE' || (!providerHint && (lower.includes('drive.google.com') || lower.includes('docs.google.com')))) {
    return parseGoogleDriveUrl(trimmed);
  }

  // 3. External Direct Video
  if (providerHint === 'EXTERNAL' || (!providerHint && (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg')))) {
    return parseExternalVideoUrl(trimmed);
  }

  // 4. Bunny Stream placeholder (Future expansion)
  if (providerHint === 'BUNNY' || lower.includes('b-cdn.net') || lower.includes('bunnycdn.com')) {
    return {
      success: true,
      provider: 'BUNNY',
      videoId: trimmed,
      cleanUrl: trimmed,
      embedUrl: trimmed,
      thumbnailUrl: '/assets/showcase/video-placeholder.webp',
      suggestedAspect: 'VERTICAL_9_16'
    };
  }

  // 5. Vimeo placeholder (Future expansion)
  if (providerHint === 'VIMEO' || lower.includes('vimeo.com')) {
    const vimeoMatch = trimmed.match(/vimeo\.com\/(\d+)/);
    const id = vimeoMatch ? vimeoMatch[1] : '';
    if (!id) return { success: false, error: 'Invalid Vimeo URL format' };
    return {
      success: true,
      provider: 'VIMEO',
      videoId: id,
      cleanUrl: `https://vimeo.com/${id}`,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
      thumbnailUrl: `https://vumbnail.com/${id}.jpg`,
      suggestedAspect: 'VERTICAL_9_16'
    };
  }

  return {
    success: false,
    error: 'Unsupported video provider. Please enter a valid YouTube, Google Drive, or MP4 video URL.'
  };
}
