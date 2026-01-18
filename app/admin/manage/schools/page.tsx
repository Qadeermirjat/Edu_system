"use client";

import { useState } from "react";
// 👇 Path Check: 4 folders peeche
import { Button } from "../../../../components/ui/button";
import { 
  Search, Power, Eye, MoreHorizontal, 
  School, Download, Users, TrendingUp, Activity 
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data
const initialSchools = [
  { id: 1, name: "Oxford High School", email: "admin@oxford.edu", director: "Mr. John Doe", students: 1200, plan: "Pro Plan", status: "Active" },
  { id: 2, name: "St. Mary's Academy", email: "info@stmarys.com", director: "Ms. Sarah Lee", students: 850, plan: "Basic", status: "Active" },
  { id: 3, name: "City Public School", email: "contact@cityps.edu", director: "Mr. Ali Raza", students: 200, plan: "Trial", status: "Inactive" },
  { id: 4, name: "Beaconhouse System", email: "admin@bss.edu", director: "Mrs. Ayesha", students: 3500, plan: "Enterprise", status: "Active" },
];

export default function ManageSchools() {
  const [schools, setSchools] = useState(initialSchools);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredSchools = schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id: number) => {
    setSchools(schools.map(s => 
      s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
    ));
  };

  const handleExportCSV = () => {
    const headers = ["School, Email, Director, Students, Plan, Status"];
    const rows = filteredSchools.map(s => `${s.name}, ${s.email}, ${s.director}, ${s.students}, ${s.plan}, ${s.status}`);
    const csvContent = [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv;charset=utf-8;" }));
    link.setAttribute("download", "schools_data.csv");
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
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">School Directory</h2>
           <p className="text-slate-500 font-medium mt-1">Monitor school performance and subscriptions.</p>
        </div>
        <Button 
            variant="outline" 
            onClick={handleExportCSV}
            className="border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold"
        >
            <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* --- STATS RIBBON (Indigo Theme) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                  <School size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Schools</p>
                  <h3 className="text-2xl font-bold text-slate-900">{schools.length}</h3>
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Users size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Students</p>
                  <h3 className="text-2xl font-bold text-slate-900">5,750</h3>
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <Activity size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Upgrades</p>
                  <h3 className="text-2xl font-bold text-slate-900">12 Pending</h3>
              </div>
          </div>
      </div>

      {/* --- FILTERS --- */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 m-2">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search school name..." 
              className="w-full pl-10 h-11 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl m-2">
             {["All", "Active", "Inactive"].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        filter === tab ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
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
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Institute Profile</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Director</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Subscription</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSchools.map((school) => (
              <tr key={school.id} className="group hover:bg-slate-50/50 transition-colors">
                
                {/* Profile */}
                <td className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-100">
                            {school.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-base">{school.name}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-xs text-slate-500 font-medium">{school.email}</span>
                            </div>
                        </div>
                    </div>
                </td>

                {/* Director */}
                <td className="p-6">
                    <p className="text-sm font-bold text-slate-700">{school.director}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Users size={12} /> {school.students} Students
                    </p>
                </td>

                {/* Subscription Badge */}
                <td className="p-6">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        school.plan === 'Enterprise' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        school.plan === 'Pro Plan' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                        {school.plan}
                    </span>
                </td>

                {/* Status */}
                <td className="p-6">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                       school.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'
                   }`}>
                       <div className={`h-2 w-2 rounded-full ${school.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                       <span className="text-xs font-bold">{school.status}</span>
                   </div>
                </td>

                {/* Actions */}
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl" onClick={() => alert("Details")}>
                        <Eye size={18} />
                      </Button>
                      <Button size="icon" variant="ghost" 
                        className={`h-9 w-9 rounded-xl ${school.status === 'Active' ? 'text-rose-500 hover:bg-rose-50' : 'text-emerald-500 hover:bg-emerald-50'}`} 
                        onClick={() => toggleStatus(school.id)}
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