import Dashboard from '@/components/dashboard/Dashboard';
import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <SidebarInset>
        <Dashboard />
      </SidebarInset>
    </div>
  );
}