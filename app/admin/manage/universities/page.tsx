"use client";

import { useState } from "react";
// 👇 Path Check: 4 folders peeche
import { Button } from "../../../../components/ui/button";
import { 
  Search, Power, Eye, MoreHorizontal, 
  Globe, Download, Network, Building, 
  TrendingUp, Users 
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data
const initialUnis = [
  { id: 1, name: "Stanford University", domain: "stanford.edu", vc: "Dr. Richard S.", sector: "Private", campuses: 4, students: 15000, status: "Active" },
  { id: 2, name: "NUST Islamabad", domain: "nust.edu.pk", vc: "Gen. Asim (Retd)", sector: "Public", campuses: 7, students: 22000, status: "Active" },
  { id: 3, name: "LUMS Lahore", domain: "lums.edu.pk", vc: "Dr. Arshad", sector: "Private", campuses: 1, students: 5000, status: "Active" },
  { id: 4, name: "University of Karachi", domain: "uok.edu.pk", vc: "Dr. Khalid", sector: "Public", campuses: 1, students: 45000, status: "Inactive" },
];

export default function ManageUniversities() {
  const [unis, setUnis] = useState(initialUnis);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredUnis = unis.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.domain.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || u.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id: number) => {
    setUnis(unis.map(u => 
      u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
    ));
  };

  const handleExportCSV = () => {
    const headers = ["University, Domain, VC, Sector, Campuses, Students, Status"];
    const rows = filteredUnis.map(u => 
        `${u.name}, ${u.domain}, ${u.vc}, ${u.sector}, ${u.campuses}, ${u.students}, ${u.status}`
    );
    const csvContent = [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv;charset=utf-8;" }));
    link.setAttribute("download", "universities_data.csv");
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
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">University Network</h2>
           <p className="text-slate-500 font-medium mt-1">Manage global campuses and enterprise accounts.</p>
        </div>
        <Button 
            variant="outline" 
            onClick={handleExportCSV}
            className="border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold"
        >
            <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* --- STATS RIBBON (New Feature) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
                  <Building size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Universities</p>
                  <h3 className="text-2xl font-bold text-slate-900">{unis.length}</h3>
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Network size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Campuses</p>
                  <h3 className="text-2xl font-bold text-slate-900">14</h3>
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <Users size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
                  <h3 className="text-2xl font-bold text-slate-900">87.5k</h3>
              </div>
          </div>
      </div>

      {/* --- FILTERS & SEARCH --- */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 m-2">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search university or domain..." 
              className="w-full pl-10 h-11 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl m-2">
             {["All", "Active", "Inactive"].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        filter === tab ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
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
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">University Profile</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Leadership</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Scale</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUnis.map((uni) => (
              <tr key={uni.id} className="group hover:bg-slate-50/50 transition-colors">
                
                {/* University Profile (Teal Theme) */}
                <td className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-teal-100">
                            {uni.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-base">{uni.name}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Globe size={12} className="text-slate-400" />
                                <span className="text-xs text-slate-500 font-medium">{uni.domain}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ml-2 ${
                                    uni.sector === 'Public' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-orange-50 border-orange-100 text-orange-600'
                                }`}>
                                    {uni.sector}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>

                {/* VC / Leadership */}
                <td className="p-6">
                    <p className="text-sm font-bold text-slate-700">{uni.vc}</p>
                    <p className="text-xs text-slate-400 mt-1">Vice Chancellor</p>
                </td>

                {/* Scale (Campuses & Students) */}
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Network size={14} className="text-teal-500" /> {uni.campuses} Campuses
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Users size={14} /> {uni.students.toLocaleString()} Students
                        </div>
                    </div>
                </td>

                {/* Status */}
                <td className="p-6">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                       uni.status === 'Active' 
                       ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                       : 'bg-slate-50 border-slate-100 text-slate-500'
                   }`}>
                       <div className={`h-2 w-2 rounded-full ${uni.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                       <span className="text-xs font-bold">{uni.status}</span>
                   </div>
                </td>

                {/* Actions */}
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl">
                        <Eye size={18} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className={`h-9 w-9 hover:bg-slate-100 rounded-xl ${uni.status === 'Active' ? 'text-rose-500 hover:text-rose-700' : 'text-emerald-500 hover:text-emerald-700'}`}
                        onClick={() => toggleStatus(uni.id)}
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