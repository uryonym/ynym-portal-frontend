import Header from '@/components/Header'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarInset } from '@/components/ui/sidebar'

export default function Home() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p>ynym portal site.</p>
        </main>
      </SidebarInset>
    </>
  )
}
