'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Home, Diamond } from 'lucide-react';
import Image from 'next/image';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarHeader className="items-center justify-center p-4">
          <Diamond size={28} />
          <span className="text-lg font-semibold">Other Level's</span>
        </SidebarHeader>
        <SidebarMenu>
          {months.map((month, index) => (
            <SidebarMenuItem key={month}>
              <SidebarMenuButton
                isActive={index === 5}
                className="justify-start"
              >
                {month}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Image
          src="https://picsum.photos/seed/house/100/100"
          alt="Winter house"
          width={50}
          height={50}
          className="mx-auto"
          data-ai-hint="winter house"
        />
      </SidebarFooter>
    </Sidebar>
  );
}
