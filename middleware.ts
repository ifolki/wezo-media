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
  
  const isDashboardPage = nextUrl.pathname.includes('/dashboard');
  const isAdminPage = nextUrl.pathname.includes('/admin');
  const isAuthPage = nextUrl.pathname.includes('/login') || nextUrl.pathname.includes('/register');

  if (isDashboardPage && !isLoggedIn) {
    const locale = nextUrl.pathname.split('/')[1] || 'ar';
    return Response.redirect(new URL(`/${locale}/login`, nextUrl));
  }

  if (isAdminPage && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
    const locale = nextUrl.pathname.split('/')[1] || 'ar';
    return Response.redirect(new URL(`/${locale}/dashboard`, nextUrl));
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  if (isAuthPage && isLoggedIn) {
    const locale = nextUrl.pathname.split('/')[1] || 'ar';
    return Response.redirect(new URL(`/${locale}/dashboard`, nextUrl));
  }

  return intlMiddleware(req);
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
