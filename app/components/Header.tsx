import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-6" />
      <h1 className="text-2xl font-bold text-gray-900">Ynym Portal</h1>
    </header>
  )
}
