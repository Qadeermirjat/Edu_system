"use client";

import { 
  Users, Banknote, TrendingUp, TrendingDown, 
  ArrowUpRight, Wallet, UserPlus, Mail, AlertCircle, FileText,
  GraduationCap, AlertTriangle, Calendar
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export default function SchoolDashboard() {
  
  // 📊 Chart Data: Monthly Revenue (Target vs Actual)
  const revenueData = [
    { month: 'Jan', collected: 45000, expected: 50000 },
    { month: 'Feb', collected: 48000, expected: 52000 },
    { month: 'Mar', collected: 40000, expected: 48000 },
    { month: 'Apr', collected: 55000, expected: 55000 },
    { month: 'May', collected: 51000, expected: 53000 },
    { month: 'Jun', collected: 60000, expected: 62000 },
  ];

  // 📈 Chart Data: Academic Performance (This Year vs Last Year)
  const academicPerformanceData = [
    { subject: 'Math', thisYear: 85, lastYear: 78 },
    { subject: 'Science', thisYear: 82, lastYear: 80 },
    { subject: 'English', thisYear: 88, lastYear: 85 },
    { subject: 'History', thisYear: 75, lastYear: 72 },
    { subject: 'Geography', thisYear: 80, lastYear: 78 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-10"
    >
      
      {/* --- TOP ROW: Control Panel --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                 O
             </div>
             <div>
                 <h2 className="text-lg font-bold text-slate-900 leading-none">Oxford High Overview</h2>
                 <p className="text-xs text-slate-500 font-medium mt-1">Academic Year 2025-2026</p>
             </div>
         </div>
         
         {/* Quick Action Buttons */}
         <div className="flex gap-2">
             <Button variant="outline" size="sm" className="h-9 text-xs font-bold border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
                 <UserPlus className="mr-2 h-3.5 w-3.5" /> New Admission
             </Button>
             <Button variant="outline" size="sm" className="h-9 text-xs font-bold border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200">
                 <FileText className="mr-2 h-3.5 w-3.5" /> Fee Challan
             </Button>
             <Button variant="outline" size="sm" className="h-9 text-xs font-bold border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                 <Mail className="mr-2 h-3.5 w-3.5" /> SMS Alert
             </Button>
         </div>
      </div>

      {/* --- KEY METRICS GRID (Smart Tiles) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Revenue Health */}
          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
              <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Revenue</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$60,000</h3>
                      </div>
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                          <Wallet size={20} />
                      </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-1.5 py-0">
                          <TrendingUp size={12} className="mr-1" /> +12.5%
                      </Badge>
                      <span className="text-xs text-slate-400">vs last month</span>
                  </div>
              </CardContent>
          </Card>

          {/* Card 2: Student Strength */}
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
              <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Strength</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">1,245</h3>
                      </div>
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Users size={20} />
                      </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                          <strong className="text-slate-900">96%</strong> Attendance Today
                      </span>
                  </div>
              </CardContent>
          </Card>

          {/* Card 3: Pending Dues (Warning) */}
          <Card className="border-l-4 border-l-amber-500 shadow-sm">
              <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Dues</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$8,250</h3>
                      </div>
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                          <AlertCircle size={20} />
                      </div>
                  </div>
                  <div className="mt-3 text-xs text-amber-600 font-bold cursor-pointer hover:underline flex items-center gap-1">
                      View Defaulter List <ArrowUpRight size={12} />
                  </div>
              </CardContent>
          </Card>

          {/* Card 4: Expense */}
          <Card className="border-l-4 border-l-rose-500 shadow-sm">
              <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Expense</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$12,400</h3>
                      </div>
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                          <Banknote size={20} />
                      </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none px-1.5 py-0">
                          <TrendingDown size={12} className="mr-1" /> -2.4%
                      </Badge>
                      <span className="text-xs text-slate-400">Salary & Utility</span>
                  </div>
              </CardContent>
          </Card>
      </div>

      {/* --- MAIN ANALYTICS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue vs Expected Graph */}
          <Card className="lg:col-span-2 shadow-sm border-slate-200">
              <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-slate-800">Financial Performance (2026)</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData} barSize={32}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(v) => `$${v/1000}k`} />
                              <Tooltip 
                                  cursor={{fill: '#f8fafc'}}
                                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                              />
                              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                              <Bar dataKey="expected" name="Expected Revenue" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="collected" name="Actual Collection" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </CardContent>
          </Card>

          {/* Notice Board Timeline */}
          <Card className="shadow-sm border-slate-200 flex flex-col">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-bold text-slate-800">Notice Board</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-indigo-600">View All</Button>
              </CardHeader>
              <CardContent className="flex-1">
                  <div className="space-y-4 relative">
                      {/* Vertical Line */}
                      <div className="absolute left-3.5 top-2 bottom-2 w-[2px] bg-slate-100"></div>

                      {[
                          { title: "Staff Meeting", time: "10:30 AM Today", type: "Meeting", color: "bg-blue-500" },
                          { title: "Fee Submission Deadline", time: "25 Jan 2026", type: "Finance", color: "bg-emerald-500" },
                          { title: "Winter Vacation Plan", time: "Pending Approval", type: "Admin", color: "bg-amber-500" },
                          { title: "Sports Day Prep", time: "Tomorrow", type: "Event", color: "bg-purple-500" },
                      ].map((item, i) => (
                          <div key={i} className="relative pl-10">
                              <div className={`absolute left-2 top-1.5 h-3 w-3 rounded-full border-2 border-white shadow-sm z-10 ${item.color}`}></div>
                              <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                              <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                          </div>
                      ))}
                  </div>

                  <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">System Status</h4>
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          Database & SMS Service Operational
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>

       {/* --- SECONDARY ANALYTICS GRID --- */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Academic Performance Chart (Line Chart) */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-slate-800">Academic Performance (Avg %)</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="h-[250px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={academicPerformanceData}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                             <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                             <Tooltip 
                                 cursor={{stroke: '#f1f5f9', strokeWidth: 2}}
                                 contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                             />
                             <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                             <Line type="monotone" dataKey="thisYear" name="This Year" stroke="#4f46e5" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                             <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{r: 4}} />
                        </LineChart>
                     </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

         {/* Top Performing Faculty */}
        <Card className="shadow-sm border-slate-200">
             <CardHeader className="pb-2">
                 <CardTitle className="text-base font-bold text-slate-800">Top Performing Faculty</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="space-y-4">
                     {[
                         { name: "Ms. Ayesha", subject: "Math", rating: 4.9, students: "98% Pass" },
                         { name: "Sir Kamran", subject: "Physics", rating: 4.8, students: "95% Pass" },
                         { name: "Ms. Sara", subject: "English", rating: 4.7, students: "92% Pass" },
                     ].map((teacher, i) => (
                         <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                             <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                 {teacher.name.charAt(0)}
                             </div>
                             <div className="flex-1">
                                 <h4 className="text-sm font-bold text-slate-900">{teacher.name}</h4>
                                 <p className="text-xs text-slate-500">{teacher.subject}</p>
                             </div>
                             <div className="text-right">
                                 <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                                     <span>⭐</span> {teacher.rating}
                                 </div>
                                 <p className="text-[10px] text-emerald-600 font-medium">{teacher.students}</p>
                             </div>
                         </div>
                     ))}
                 </div>
                 <Button variant="outline" className="w-full mt-4 text-xs font-bold border-slate-200 hover:bg-slate-50">View All Staff</Button>
             </CardContent>
        </Card>

       </div>

       {/* --- BOTTOM ROW: Critical Alerts --- */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
           {/* Recent Absenteeism Alert */}
           <Card className="shadow-sm border-slate-200 bg-rose-50/50">
               <CardHeader className="pb-2 flex flex-row items-center gap-2">
                   <AlertTriangle className="text-rose-500 h-5 w-5" />
                   <CardTitle className="text-base font-bold text-slate-800">High Absenteeism Alert</CardTitle>
               </CardHeader>
               <CardContent>
                   <p className="text-sm text-slate-600 mb-4">The following classes have reported attendance below 85% today.</p>
                   <div className="space-y-2">
                       {[
                           { class: "Grade 8 - B", absent: 12, total: 30, teacher: "Mr. Ahmed" },
                           { class: "Grade 5 - A", absent: 8, total: 28, teacher: "Ms. Hina" },
                       ].map((cls, i) => (
                           <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                               <div>
                                   <h4 className="text-sm font-bold text-slate-900">{cls.class}</h4>
                                   <p className="text-xs text-slate-500">Class Teacher: {cls.teacher}</p>
                               </div>
                               <Badge className="bg-rose-100 text-rose-700 border-none">
                                   {cls.absent} Absent
                               </Badge>
                           </div>
                       ))}
                   </div>
               </CardContent>
           </Card>

            {/* Upcoming Fee Deadlines */}
            <Card className="shadow-sm border-slate-200 bg-amber-50/50">
               <CardHeader className="pb-2 flex flex-row items-center gap-2">
                   <Calendar className="text-amber-500 h-5 w-5" />
                   <CardTitle className="text-base font-bold text-slate-800">Upcoming Fee Deadlines</CardTitle>
               </CardHeader>
               <CardContent>
                    <p className="text-sm text-slate-600 mb-4">Reminder for upcoming fee submission dates.</p>
                   <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-amber-100 shadow-sm">
                             <div>
                                 <h4 className="text-sm font-bold text-slate-900">Grade 10 - Final Term Fee</h4>
                                 <p className="text-xs text-slate-500">Due Date: 25th Jan 2026</p>
                             </div>
                             <Badge className="bg-amber-100 text-amber-700 border-none">
                                 5 Days Left
                             </Badge>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-amber-100 shadow-sm">
                             <div>
                                 <h4 className="text-sm font-bold text-slate-900">Transport Fee - Feb</h4>
                                 <p className="text-xs text-slate-500">Due Date: 5th Feb 2026</p>
                             </div>
                             <Badge className="bg-amber-100 text-amber-700 border-none">
                                 15 Days Left
                             </Badge>
                        </div>
                   </div>
               </CardContent>
           </Card>

       </div>

    </motion.div>
  );
}