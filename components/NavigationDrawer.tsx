'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

export default function NavigationDrawer() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ダッシュボード', href: '/dashboard' },
    { label: 'ドキュメント', href: '/docs' },
    { label: '設定', href: '/settings' },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-8 w-8"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">メニューを開く</span>
      </Button>

      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle>ナビゲーション</DrawerTitle>
        </DrawerHeader>

        <nav className="flex flex-col space-y-2 p-4">
          {menuItems.map((item) => (
            <DrawerClose key={item.href} asChild>
              <a
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.label}
              </a>
            </DrawerClose>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
