import { auth } from "@/lib/auth"
import createMiddleware from "next-intl/middleware"

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeDetection: true,
})

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log('Middleware:', nextUrl.pathname, 'isLoggedIn:', isLoggedIn, 'Role:', req.auth?.user?.role)
  
  const locales = ["ar", "en"];
  const segments = nextUrl.pathname.split('/');
  const firstSegment = segments[1];
  const hasLocalePrefix = locales.includes(firstSegment);
  
  // If it's a root path or missing locale, let next-intl handle the initial redirect
  if (!hasLocalePrefix && nextUrl.pathname !== '/') {
    return intlMiddleware(req);
  }

  const currentLocale = hasLocalePrefix ? firstSegment : "ar";
  
  const isDashboardPage = nextUrl.pathname.includes('/dashboard');
  const isAdminPage = nextUrl.pathname.includes('/admin');
  const isAuthPage = nextUrl.pathname.includes('/login') || nextUrl.pathname.includes('/register');

  if ((isDashboardPage || isAdminPage) && !isLoggedIn) {
    return Response.redirect(new URL(`/${currentLocale}/login`, nextUrl));
  }

  if (isAdminPage && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
    return Response.redirect(new URL(`/${currentLocale}/dashboard`, nextUrl));
  }

  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL(`/${currentLocale}/dashboard`, nextUrl));
  }

  return intlMiddleware(req);
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
