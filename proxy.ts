import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証が必要なルートのパス
const protectedPaths = ['/tasks', '/vehicles', '/fuel-records']

// 公開ルート（認証不要）
const publicPaths = ['/auth']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 静的ファイルとAPIルートは除外
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 保護されたルートへのアクセス
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  )

  // 保護されたルートの場合、バックエンドAPIで認証状態を確認
  if (isProtectedPath) {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiBaseUrl}/api/users/me`, {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        // 認証失敗 - ログインページへリダイレクト
        const url = request.nextUrl.clone()
        url.pathname = '/auth'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
      }
    } catch (error) {
      // API呼び出し失敗 - ログインページへリダイレクト
      console.error('Auth check failed:', error)
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  // ログイン済みユーザーが認証ページにアクセスした場合の確認
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))
  if (isPublicPath) {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiBaseUrl}/api/users/me`, {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
        credentials: 'include',
      })

      if (response.ok) {
        // 既にログイン済み - リダイレクト先またはホームへ
        const redirect = request.nextUrl.searchParams.get('redirect')
        const url = request.nextUrl.clone()
        url.pathname = redirect || '/'
        url.search = ''
        return NextResponse.redirect(url)
      }
    } catch (error) {
      // API呼び出し失敗は無視（ログインページを表示）
      console.error('Auth check failed:', error)
    }
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
