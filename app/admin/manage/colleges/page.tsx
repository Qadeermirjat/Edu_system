"use client";

import { useState } from "react";
// 👇 Path Check: 4 folders peeche
import { Button } from "../../../../components/ui/button";
import { 
  Search, Power, Eye, MoreHorizontal, 
  Building2, Download, GraduationCap, Users, BookOpen 
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data
const initialColleges = [
  { id: 1, name: "City Science College", email: "info@city.edu", principal: "Prof. Ahmed", affiliation: "Federal Board", students: 450, status: "Active" },
  { id: 2, name: "Govt. Degree College", email: "admin@govtdc.edu", principal: "Dr. Sarah Khan", affiliation: "Punjab Univ", students: 1200, status: "Active" },
  { id: 3, name: "Apex Commerce Group", email: "contact@apex.com", principal: "Mr. Raza Ali", affiliation: "Karachi Board", students: 300, status: "Inactive" },
];

export default function ManageColleges() {
  const [colleges, setColleges] = useState(initialColleges);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredColleges = colleges.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id: number) => {
    setColleges(colleges.map(c => 
      c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
    ));
  };

  const handleExportCSV = () => {
    const headers = ["College, Email, Principal, Affiliation, Students, Status"];
    const rows = filteredColleges.map(c => `${c.name}, ${c.email}, ${c.principal}, ${c.affiliation}, ${c.students}, ${c.status}`);
    const csvContent = [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv;charset=utf-8;" }));
    link.setAttribute("download", "colleges_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">College Network</h2>
           <p className="text-slate-500 font-medium mt-1">Manage intermediate and degree colleges.</p>
        </div>
        <Button 
            variant="outline" 
            onClick={handleExportCSV}
            className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold"
        >
            <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* --- STATS RIBBON (Purple Theme) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <Building2 size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Colleges</p>
                  <h3 className="text-2xl font-bold text-slate-900">{colleges.length}</h3>
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Affiliations</p>
                  <h3 className="text-2xl font-bold text-slate-900">08 Boards</h3>
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center">
                  <Users size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enrolled Students</p>
                  <h3 className="text-2xl font-bold text-slate-900">12.4k</h3>
              </div>
          </div>
      </div>

      {/* --- FILTERS --- */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 m-2">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search college name..." 
              className="w-full pl-10 h-11 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl m-2">
             {["All", "Active", "Inactive"].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        filter === tab ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                 >
                     {tab}
                 </button>
             ))}
          </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">College Profile</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Principal</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Affiliation</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredColleges.map((college) => (
              <tr key={college.id} className="group hover:bg-slate-50/50 transition-colors">
                
                {/* Profile */}
                <td className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-100">
                            {college.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-base">{college.name}</p>
                            <span className="text-xs text-slate-500 font-medium">{college.email}</span>
                        </div>
                    </div>
                </td>

                {/* Principal */}
                <td className="p-6">
                    <p className="text-sm font-bold text-slate-700">{college.principal}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Users size={12} /> {college.students} Students
                    </p>
                </td>

                {/* Affiliation (Unique to Colleges) */}
                <td className="p-6">
                    <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-purple-500" />
                        <span className="text-sm font-medium text-slate-700">{college.affiliation}</span>
                    </div>
                </td>

                {/* Status */}
                <td className="p-6">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                       college.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'
                   }`}>
                       <div className={`h-2 w-2 rounded-full ${college.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                       <span className="text-xs font-bold">{college.status}</span>
                   </div>
                </td>

                {/* Actions */}
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl" onClick={() => alert("Details")}>
                        <Eye size={18} />
                      </Button>
                      <Button size="icon" variant="ghost" 
                        className={`h-9 w-9 rounded-xl ${college.status === 'Active' ? 'text-rose-500 hover:bg-rose-50' : 'text-emerald-500 hover:bg-emerald-50'}`} 
                        onClick={() => toggleStatus(college.id)}
                      >
                        <Power size={18} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-slate-700 rounded-xl">
                        <MoreHorizontal size={18} />
                      </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}