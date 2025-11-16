import Header from './components/Header'
import { AppSidebar } from './components/AppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'

export default function Home() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6">
          <p>ynym portal site.</p>
        </main>
      </SidebarInset>
    </>
  )
}
