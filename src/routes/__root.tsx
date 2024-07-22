import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div>
        <Link to='/'>ホーム</Link>
        <Link to='/task'>タスク</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
})
