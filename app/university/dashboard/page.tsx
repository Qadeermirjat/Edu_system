"use client";

// 👇 Path Check: 3 folders peeche
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { 
  Network, Microscope, GraduationCap, Globe, 
  TrendingUp, ArrowUpRight, MoreVertical 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function UniversityDashboard() {
  
  // Research Publication Data
  const researchData = [
    { year: '2020', papers: 120 },
    { year: '2021', papers: 150 },
    { year: '2022', papers: 200 },
    { year: '2023', papers: 280 },
    { year: '2024', papers: 350 },
    { year: '2025', papers: 450 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- WELCOME HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">University HQ</h2>
           <p className="text-slate-500 font-medium">Overview of all campuses and research activities.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-200">
            Generate Annual Report
        </Button>
      </div>

      {/* --- ENTERPRISE STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Campuses */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Campuses</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-slate-900">12</h3>
               </div>
               <div className="p-2 bg-teal-50 rounded-lg">
                  <Network className="text-teal-600 h-6 w-6" />
               </div>
             </div>
             <p className="mt-4 text-xs text-slate-400 font-medium"> <span className="text-teal-600 font-bold">+2</span> New this year</p>
          </CardContent>
        </Card>

        {/* Card 2: Research Grants */}
        <Card className="bg-teal-700 text-white border-none shadow-xl shadow-teal-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-teal-200 text-xs font-bold uppercase tracking-wider">Research Grants</p>
                <h3 className="text-3xl font-extrabold mt-2">$4.5M</h3>
              </div>
              <div className="p-2 bg-teal-600/50 rounded-lg">
                <Microscope className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-teal-100">
              <TrendingUp size={16} /> 
              <span className="font-bold">Approved by HEC</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: PhD Scholars */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">PhD Scholars</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-slate-900">850</h3>
               </div>
               <div className="p-2 bg-blue-50 rounded-lg">
                  <GraduationCap className="text-blue-600 h-6 w-6" />
               </div>
             </div>
             <p className="mt-4 text-xs text-slate-400 font-medium">Across all departments</p>
          </CardContent>
        </Card>

        {/* Card 4: Global Ranking */}
        <Card className="border-slate-100 shadow-sm bg-white">
          <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Global Ranking</p>
                  <h3 className="text-3xl font-extrabold mt-2 text-slate-900">#142</h3>
               </div>
               <div className="p-2 bg-purple-50 rounded-lg">
                  <Globe className="text-purple-600 h-6 w-6" />
               </div>
             </div>
             <p className="mt-4 text-xs text-slate-400 font-medium"> <span className="text-emerald-600 font-bold">Up by 5</span> spots</p>
          </CardContent>
        </Card>

      </div>

      {/* --- MAIN CHART SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RESEARCH GRAPH (2 Cols) */}
        <Card className="lg:col-span-2 border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Research Output (Papers Published)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={researchData}>
                  <defs>
                    <linearGradient id="colorPapers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="papers" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorPapers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* TOP FACULTIES (1 Col) */}
        <Card className="border-slate-100 shadow-sm">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-slate-800">Top Faculties</CardTitle>
              <Button variant="ghost" size="icon"><MoreVertical size={16} className="text-slate-400" /></Button>
           </CardHeader>
           <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Computer Science", funding: "$1.2M", scholars: 120 },
                  { name: "Business School", funding: "$800k", scholars: 95 },
                  { name: "Medical Sciences", funding: "$1.5M", scholars: 150 },
                  { name: "Engineering", funding: "$900k", scholars: 110 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                          {i + 1}
                        </div>
                        <div>
                           <p className="font-bold text-sm text-slate-900">{item.name}</p>
                           <p className="text-xs text-slate-500">{item.scholars} Scholars</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="font-bold text-sm text-teal-700">{item.funding}</p>
                     </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6 text-teal-700 font-bold hover:bg-teal-50 border-teal-100">
                 View All Departments <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
           </CardContent>
        </Card>

      </div>
    </div>
  );
}