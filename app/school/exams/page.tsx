"use client";
import { Button } from "../../../components/ui/button";
import { FileText, Calendar } from "lucide-react";

export default function ExamsPage() {
  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Exams & Results</h2>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Upcoming Exams</h3>
            <div className="space-y-4">
                {[
                    { title: "Mid-Term Mathematics", date: "Feb 10, 2026", class: "Grade 10" },
                    { title: "English Final", date: "Feb 12, 2026", class: "Grade 9" },
                ].map((exam, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{exam.title}</h4>
                                <p className="text-xs text-slate-500">{exam.class}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
                            <Calendar size={14} /> {exam.date}
                        </div>
                    </div>
                ))}
            </div>
            <Button className="w-full mt-6" variant="outline">Create New Exam Sheet</Button>
        </div>
    </div>
  );
}