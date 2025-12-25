import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証が必要なルートのパス
const protectedPaths = ['/tasks', '/vehicles', '/fuel-records']

// 公開ルート（認証不要）
const publicPaths = ['/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 静的ファイルとAPIルートは除外
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Cookieからセッション情報を確認
  // バックエンドが発行するセッションCookieの存在を確認
  const sessionCookie = request.cookies.get('access_token')

  const isAuthenticated = !!sessionCookie

  // 保護されたルートへのアクセス
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  )
  if (isProtectedPath && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirect', pathname) // リダイレクト先を保持
    return NextResponse.redirect(url)
  }

  // ログイン済みユーザーが認証ページにアクセスした場合
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))
  if (isPublicPath && isAuthenticated) {
    const redirect = request.nextUrl.searchParams.get('redirect')
    const url = request.nextUrl.clone()
    url.pathname = redirect || '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
