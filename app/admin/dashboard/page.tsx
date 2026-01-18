"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { 
  School, Building2, GraduationCap, Users, 
  TrendingUp, Activity, ArrowUpRight, Download, MoreHorizontal 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  
  // 🌊 Smooth Wave Data
  const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* --- HEADER (Clean & Minimal) --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h2>
          <p className="text-slate-500 font-medium">Real-time overview of your ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm text-slate-700 font-medium hover:bg-slate-50">
                <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 font-bold">
                + Add Institute
            </Button>
        </div>
      </div>

      {/* --- STATS ROW (Glass Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "$120,400", change: "+12.5%", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
          { title: "Active Schools", value: "85", change: "+3 New", icon: School, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Total Students", value: "12,543", change: "+24%", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "Universities", value: "06", change: "Stable", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="border border-slate-200/60 bg-white/50 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {stat.change}
                </span>
              </div>
              <div className="mt-4">
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 🌊 REVENUE CHART (Smooth Area Chart) */}
        <Card className="col-span-2 border border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-bold text-slate-900">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pl-0">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val)=>`$${val}`} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#6366f1" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorRevenue)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* 📋 RECENT ACTIVITY (Clean List) */}
        <Card className="col-span-1 border border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold text-slate-900">Recent Activity</CardTitle>
                <MoreHorizontal className="text-slate-400 cursor-pointer hover:text-slate-600" />
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {[
                        { name: "St. Patrick's School", action: "Registered new account", time: "2 min ago", color: "bg-orange-100 text-orange-600", char: "S" },
                        { name: "City College", action: "Upgraded to Pro Plan", time: "1 hour ago", color: "bg-blue-100 text-blue-600", char: "C" },
                        { name: "Admin", action: "Approved 3 institutes", time: "4 hours ago", color: "bg-slate-100 text-slate-600", char: "A" },
                        { name: "NUST University", action: "Submitted feedback", time: "1 day ago", color: "bg-emerald-100 text-emerald-600", char: "N" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${item.color}`}>
                                {item.char}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{item.action}</p>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{item.time}</span>
                        </div>
                    ))}
                </div>
                <Button variant="ghost" className="w-full mt-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold text-sm">
                    View All Activity <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}