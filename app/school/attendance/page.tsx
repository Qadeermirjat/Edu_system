"use client";
import { Button } from "../../../components/ui/button";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Daily Attendance</h2>
          <Button className="bg-indigo-600">Mark Today's Attendance</Button>
       </div>

       <div className="bg-white p-8 rounded-xl border border-slate-200 text-center py-20">
           <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
               📅
           </div>
           <h3 className="text-lg font-bold text-slate-900">Select Class to View</h3>
           <p className="text-slate-500 mb-6">Choose a grade/class to view or mark attendance.</p>
           <div className="flex justify-center gap-2 flex-wrap">
               {["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"].map((cls) => (
                   <Button key={cls} variant="outline">{cls}</Button>
               ))}
           </div>
       </div>
    </div>
  );
}