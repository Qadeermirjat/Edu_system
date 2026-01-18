"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { 
  Search, Plus, FileDown, MoreHorizontal, 
  Filter, User, CheckCircle2, XCircle, SlidersHorizontal, 
  Trash2, Edit, Ban, X, ChevronLeft, ChevronRight, Camera 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";

export default function StudentsPage() {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock Data (Kuch students ki pics hain)
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: "Ali Khan", 
      roll: "OX-2024-001", 
      class: "Grade 10", 
      section: "A", 
      parent: "Mr. Akram", 
      phone: "0300-1234567", 
      status: "Active", 
      fee: "Paid",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60" // Pic wala student
    },
    { 
      id: 2, 
      name: "Sara Ahmed", 
      roll: "OX-2024-002", 
      class: "Grade 8", 
      section: "B", 
      parent: "Mr. Ahmed", 
      phone: "0321-7654321", 
      status: "Active", 
      fee: "Pending",
      image: null // Bina Pic wala (Initials dikhenge)
    },
    { 
      id: 3, 
      name: "Bilal Raza", 
      roll: "OX-2024-003", 
      class: "Grade 5", 
      section: "A", 
      parent: "Mr. Raza", 
      phone: "0345-1122334", 
      status: "Inactive", 
      fee: "Unpaid",
      image: null 
    },
    { 
      id: 4, 
      name: "Zainab Bibi", 
      roll: "OX-2024-004", 
      class: "Grade 9", 
      section: "C", 
      parent: "Mr. Kasim", 
      phone: "0333-9988776", 
      status: "Active", 
      fee: "Paid",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
    },
    { 
      id: 5, 
      name: "Ahmed Ali", 
      roll: "OX-2024-005", 
      class: "Grade 10", 
      section: "A", 
      parent: "Mr. Taimoor", 
      phone: "0300-5544332", 
      status: "Active", 
      fee: "Paid",
      image: null
    },
  ]);

  // Filters & Pagination
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add Student Modal & Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // 👇 Image state bhi add kiya
  const [newStudent, setNewStudent] = useState<any>({ name: "", class: "", parent: "", phone: "", image: null });

  // Action Menu State
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  // --- LOGIC: FILTERING ---
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.roll.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // --- LOGIC: PAGINATION ---
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewStudent({ ...newStudent, image: imageUrl });
    }
  };

  // --- FUNCTION: ADD STUDENT ---
  const handleAddStudent = () => {
      const id = students.length + 1;
      const roll = `OX-2026-00${id}`;
      setStudents([...students, { 
          id, roll, section: "A", status: "Active", fee: "Pending", 
          ...newStudent 
      }]);
      setIsAddModalOpen(false);
      setNewStudent({ name: "", class: "", parent: "", phone: "", image: null });
      alert("New Student Added Successfully!");
  };

  // --- FUNCTION: EXPORT CSV ---
  const handleExport = () => {
    const headers = ["Roll No, Name, Class, Parent, Phone, Status, Fee"];
    const rows = filteredStudents.map(s => `${s.roll}, ${s.name}, ${s.class}, ${s.parent}, ${s.phone}, ${s.status}, ${s.fee}`);
    const csvContent = [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv;charset=utf-8;" }));
    link.setAttribute("download", "students_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: number) => {
      if(confirm("Are you sure you want to delete this student?")) {
          setStudents(students.filter(s => s.id !== id));
      }
      setActiveMenuId(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-10"
    >
      
      {/* --- HEADER & ACTIONS --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Records</h2>
          <p className="text-slate-500 font-medium mt-1">Manage profiles, academic records and status.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={handleExport} className="h-10 border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
             <FileDown className="mr-2 h-4 w-4"/> Export List
           </Button>
           <Button onClick={() => setIsAddModalOpen(true)} className="h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200">
             <Plus className="mr-2 h-4 w-4"/> Add Student
           </Button>
        </div>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 shadow-sm">
              <CardContent className="p-5 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Total Enrolled</p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{students.length}</h3>
                  </div>
                  <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                      <User size={24} />
                  </div>
              </CardContent>
          </Card>
           {/* ... Other stats cards ... */}
      </div>

      {/* --- SEARCH & FILTERS BAR --- */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center z-10 relative">
        <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by name, roll no..." 
              className="pl-10 h-10 border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-lg transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto px-2 relative">
            <Button variant="ghost" className="h-9 text-xs font-bold text-slate-600 hover:bg-slate-100">
                <Filter className="mr-2 h-3.5 w-3.5" /> Class
            </Button>
            <div className="relative">
                <Button 
                    variant="ghost" 
                    onClick={() => setShowStatusMenu(!showStatusMenu)}
                    className={`h-9 text-xs font-bold ${statusFilter !== 'All' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <SlidersHorizontal className="mr-2 h-3.5 w-3.5" /> Status: {statusFilter}
                </Button>
                {showStatusMenu && (
                    <div className="absolute right-0 top-10 w-40 bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-20">
                        {["All", "Active", "Inactive"].map(status => (
                            <button 
                                key={status}
                                onClick={() => { setStatusFilter(status); setShowStatusMenu(false); }}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg"
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* --- MODERN TABLE --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider pl-6">Student Profile</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Class Info</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guardian</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dues</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student, i) => (
                <tr key={student.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  
                  {/* Name & Avatar */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      {/* Logic: Image vs Initials */}
                      {student.image ? (
                           <img src={student.image} alt={student.name} className="h-10 w-10 rounded-full object-cover shadow-sm border border-slate-100" />
                      ) : (
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                            i % 2 === 0 ? "bg-indigo-500" : "bg-violet-500"
                          }`}>
                            {student.name.charAt(0)}
                          </div>
                      )}
                      
                      <div>
                        <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{student.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono bg-slate-100 px-1.5 rounded inline-block mt-0.5">{student.roll}</p>
                      </div>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="p-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{student.class}</span>
                        <span className="text-xs text-slate-500">Section {student.section}</span>
                    </div>
                  </td>

                  {/* Parent */}
                  <td className="p-4">
                    <p className="text-sm font-medium text-slate-700">{student.parent}</p>
                    <p className="text-xs text-slate-400">{student.phone}</p>
                  </td>

                   {/* Fee Status */}
                   <td className="p-4">
                    <Badge variant="outline" className={`border-0 font-bold ${
                        student.fee === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                        student.fee === 'Pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                    }`}>
                        {student.fee}
                    </Badge>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ring-2 ring-white shadow-sm ${student.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <span className={`text-sm font-medium ${student.status === 'Active' ? 'text-slate-700' : 'text-slate-400'}`}>
                            {student.status}
                        </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 pr-6 text-right relative">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}
                        className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>

                    {activeMenuId === student.id && (
                        <div className="absolute right-10 top-2 w-32 bg-white border border-slate-100 shadow-xl rounded-xl z-20 overflow-hidden">
                            <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Edit size={12}/> Edit</button>
                            <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Ban size={12}/> Block</button>
                            <button onClick={() => handleDelete(student.id)} className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"><Trash2 size={12}/> Delete</button>
                        </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                        No students found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex justify-between items-center">
            <p className="text-xs text-slate-500 font-medium">Showing page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="h-8 w-8 p-0 border-slate-200"><ChevronLeft size={16} /></Button>
                <Button size="sm" variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="h-8 w-8 p-0 border-slate-200"><ChevronRight size={16} /></Button>
            </div>
        </div>
      </div>

      {/* --- ADD STUDENT MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-lg text-slate-900">Add New Student</h3>
                        <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <div className="p-6 space-y-4">
                        
                        {/* 📸 IMAGE UPLOAD SECTION */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative h-20 w-20 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden hover:border-indigo-500 transition-colors cursor-pointer group">
                                {newStudent.image ? (
                                    <img src={newStudent.image} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <Camera className="text-slate-400 group-hover:text-indigo-500" />
                                )}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Student Photo <span className="text-xs text-slate-400 font-normal">(Optional)</span></h4>
                                <p className="text-xs text-slate-500 mt-1">Upload for ID Card. JPG/PNG.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label>Student Name</Label>
                                <Input placeholder="Full Name" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} />
                             </div>
                             <div className="space-y-2">
                                <Label>Grade / Class</Label>
                                <Input placeholder="Ex: Grade 5" value={newStudent.class} onChange={(e) => setNewStudent({...newStudent, class: e.target.value})} />
                             </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Parent Name</Label>
                            <Input placeholder="Father/Guardian Name" value={newStudent.parent} onChange={(e) => setNewStudent({...newStudent, parent: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Contact</Label>
                            <Input placeholder="0300-1234567" value={newStudent.phone} onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} />
                        </div>
                        <Button onClick={handleAddStudent} className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg font-bold h-12 mt-2">
                            Save Student Record
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}