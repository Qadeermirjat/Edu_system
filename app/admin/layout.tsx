"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Building2, School, GraduationCap, 
  PlusCircle, MessageSquare, LogOut, Settings 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { title: "Register School", icon: PlusCircle, href: "/admin/register/school" },
    { title: "Register College", icon: PlusCircle, href: "/admin/register/college" },
    { title: "Register Uni", icon: PlusCircle, href: "/admin/register/university" },
    { title: "Manage Schools", icon: School, href: "/admin/manage/schools" },
    { title: "Manage Colleges", icon: Building2, href: "/admin/manage/colleges" },
    { title: "Manage Unis", icon: GraduationCap, href: "/admin/manage/universities" },
    { title: "Feedbacks", icon: MessageSquare, href: "/admin/feedbacks" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white fixed h-full flex flex-col shadow-2xl z-50">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-indigo-400">EduSmart Admin</h1>
          <p className="text-xs text-slate-500">Super Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
           <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
             <LogOut size={18} /> <span className="text-sm font-medium">Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}