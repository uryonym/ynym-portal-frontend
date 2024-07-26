import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { supabase } from '../libs/supabase'
import { Navbar } from 'flowbite-react'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getSession()
    if (location.pathname === '/signin') {
      if (data.session) {
        throw redirect({ to: '/' })
      }
    } else {
      if (!data.session) {
        throw redirect({ to: '/signin' })
      }
    }
  },
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Navbar fluid rounded>
        <Navbar.Brand>
          <span className='font-semibold'>ynym-portal</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link as={Link} to='/'>
            ホーム
          </Navbar.Link>
          <Navbar.Link as={Link} to='/task'>
            タスク
          </Navbar.Link>
          <Navbar.Link as={Link} onClick={() => supabase.auth.signOut()}>
            サインアウト
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
})
