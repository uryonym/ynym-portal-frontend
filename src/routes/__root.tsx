import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { supabase } from '../libs/supabase'
import Header from '../components/Header'

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
      <div className='flex flex-col h-screen'>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  ),
})
