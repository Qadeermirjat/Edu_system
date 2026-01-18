"use client";

// 👇 Path: 3 folders peeche
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Users, BookOpen, GraduationCap, Microscope } from "lucide-react";

export default function CollegeDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">College Overview</h2>
        <p className="text-slate-500 font-medium">Manage departments and faculty performance.</p>
      </div>

      {/* Stats Cards (Purple Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", val: "2,400", icon: Users },
          { title: "Departments", val: "08", icon: BookOpen },
          { title: "Faculty Members", val: "120", icon: GraduationCap },
          { title: "Active Labs", val: "14", icon: Microscope },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-100 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
               <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <stat.icon size={24} />
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for Graph */}
      <div className="h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-medium">
          Pass Percentage Graph will go here...
      </div>
    </div>
  );
}