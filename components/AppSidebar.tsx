'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Home, CalendarCheck, Car, Droplet } from 'lucide-react'

const menuItems = [
  {
    title: 'ホーム',
    url: '/',
    icon: Home,
  },
  {
    title: 'タスク',
    url: '/tasks',
    icon: CalendarCheck,
  },
  {
    title: '車両管理',
    url: '/vehicles',
    icon: Car,
  },
  {
    title: '燃費管理',
    url: '/fuel-records',
    icon: Droplet,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    className="h-12 text-base"
                  >
                    <a href={item.url}>
                      <item.icon className="h-6 w-6" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
