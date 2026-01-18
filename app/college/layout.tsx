"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, Users, GraduationCap, 
  FileText, LogOut, Bell, Building2 
} from "lucide-react";

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Overview", icon: LayoutDashboard, href: "/college/dashboard" },
    { title: "Departments", icon: Building2, href: "/college/departments" },
    { title: "Students", icon: Users, href: "/college/students" },
    { title: "Courses", icon: BookOpen, href: "/college/courses" },
    { title: "Exams", icon: FileText, href: "/college/exams" },
    { title: "Faculty", icon: GraduationCap, href: "/college/faculty" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Sidebar (Purple Theme) */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full flex flex-col z-50">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="h-10 w-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-200">
            C
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">City College</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Science Dept</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                  ? "bg-purple-50 text-purple-700 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-purple-600" : "text-slate-400"} />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">PR</div>
              <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-slate-900">Prof. Raza</p>
                  <p className="text-xs text-slate-500">Principal</p>
              </div>
              <LogOut size={16} className="text-slate-400" />
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-end">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-purple-500 rounded-full border border-white"></span>
            </button>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}