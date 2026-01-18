"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Network, GraduationCap, Microscope, 
  Globe, FileText, LogOut, Bell, Building 
} from "lucide-react";

export default function UniversityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // University Specific Menu
  const menuItems = [
    { title: "HQ Overview", icon: LayoutDashboard, href: "/university/dashboard" },
    { title: "Campus Network", icon: Network, href: "/university/campuses" },
    { title: "Faculties & Deans", icon: Building, href: "/university/faculties" },
    { title: "Research Portal", icon: Microscope, href: "/university/research" },
    { title: "Senate & Admin", icon: FileText, href: "/university/senate" },
    { title: "Global Relations", icon: Globe, href: "/university/global" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- SIDEBAR (Teal Theme) --- */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full flex flex-col z-50">
        
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="h-10 w-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-200">
            U
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Stanford Uni</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Main Campus</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                  ? "bg-teal-50 text-teal-700 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-teal-600" : "text-slate-400"} />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100">
           <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
              <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                  VC
              </div>
              <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-slate-900 truncate">Dr. Richard</p>
                  <p className="text-xs text-slate-500 truncate">Vice Chancellor</p>
              </div>
              <LogOut size={16} className="text-slate-400" />
           </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-64">
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-end">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-teal-500 rounded-full border border-white"></span>
            </button>
        </header>

        {/* Page Content */}
        <div className="p-8">
            {children}
        </div>
      </main>
    </div>
  );
}