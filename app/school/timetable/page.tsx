"use client";

import { useState } from "react";
import { 
  Calendar, Plus, RefreshCw, AlertTriangle, 
  Trash2, Zap, Download, Printer, Settings, X, Check, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch"; // Ensure you have Switch component or use checkbox

// --- TYPES ---
type TimeSlot = {
  id: string;
  label: string; // e.g., "09:00 - 09:50"
  type: "Class" | "Break";
};

type ClassSlot = {
  id: number;
  className: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  slotId: string; // Links to TimeSlot ID
  type: "Lecture" | "Lab";
};

export default function TimetablePage() {
  
  // --- CONFIGURATION STATE (The Flexibility) ---
  const [activeDays, setActiveDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "t1", label: "09:00 - 09:50", type: "Class" },
    { id: "t2", label: "09:50 - 10:40", type: "Class" },
    { id: "b1", label: "10:40 - 11:10", type: "Break" },
    { id: "t3", label: "11:10 - 12:00", type: "Class" },
    { id: "b2", label: "12:00 - 12:10", type: "Break" },
    { id: "t4", label: "12:10 - 01:00", type: "Class" },
    { id: "b3", label: "01:00 - 02:15", type: "Break" }, // Lunch/Prayer
    { id: "t5", label: "02:15 - 03:05", type: "Class" },
    { id: "t6", label: "03:05 - 03:55", type: "Class" },
    { id: "b4", label: "03:55 - 04:10", type: "Break" },
    { id: "t7", label: "04:10 - 05:00", type: "Class" },
  ]);

  // --- APP STATE ---
  const [activeClass, setActiveClass] = useState("BSCS-VIII");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Form State
  const [selectedCell, setSelectedCell] = useState<{day: string, slotId: string} | null>(null);
  const [newSlotData, setNewSlotData] = useState({ subject: "", teacher: "", room: "", type: "Lecture" });

  // Schedule Data
  const [schedule, setSchedule] = useState<ClassSlot[]>([
    // [cite: 1]// [cite: 1] - Based on PDF Data for BSCS-VIII
    { id: 1, className: "BSCS-VIII", subject: "App Dev", teacher: "Fahad Shah", room: "Room 6", day: "Monday", slotId: "t1", type: "Lecture" },
    { id: 2, className: "BSCS-VIII", subject: "App Dev", teacher: "Fahad Shah", room: "Room 6", day: "Monday", slotId: "t2", type: "Lecture" },
    // [cite_start]// [cite: 1] - Cloud Computing
    { id: 3, className: "BSCS-VIII", subject: "Cloud Comp", teacher: "Rehmatullah", room: "Room 1", day: "Wednesday", slotId: "t1", type: "Lecture" },
  ]);

  // --- HELPER FUNCTIONS ---
  const handleAddSlot = () => {
      if(!selectedCell) return;
      
      const newItem: ClassSlot = {
          id: Date.now(),
          className: activeClass,
          subject: newSlotData.subject,
          teacher: newSlotData.teacher,
          room: newSlotData.room,
          day: selectedCell.day,
          slotId: selectedCell.slotId,
          type: newSlotData.type as any
      };
      setSchedule([...schedule, newItem]);
      setIsSlotModalOpen(false);
      setNewSlotData({ subject: "", teacher: "", room: "", type: "Lecture" });
  };

  const handleAutoGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
          const newSlots: ClassSlot[] = [];
          // Simple logic to fill empty lecture slots
          activeDays.forEach(day => {
              timeSlots.forEach(slot => {
                  if(slot.type === "Class" && !schedule.find(s => s.day === day && s.slotId === slot.id && s.className === activeClass)) {
                      if(Math.random() > 0.7) { // Randomly fill some slots
                           newSlots.push({
                               id: Math.random(),
                               className: activeClass,
                               subject: "Auto Subject",
                               teacher: "Auto Teacher",
                               room: "Room X",
                               day: day,
                               slotId: slot.id,
                               type: "Lecture"
                           });
                      }
                  }
              })
          });
          setSchedule([...schedule, ...newSlots]);
          setIsGenerating(false);
      }, 1000);
  };

  // Config Handlers
  const toggleDay = (day: string) => {
      if(activeDays.includes(day)) setActiveDays(activeDays.filter(d => d !== day));
      else setActiveDays([...activeDays, day]);
  };

  const addTimeSlot = () => {
      const id = `t${timeSlots.length + 1}`;
      setTimeSlots([...timeSlots, { id, label: "00:00 - 00:00", type: "Class" }]);
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: string) => {
      const newSlots = [...timeSlots];
      newSlots[index] = { ...newSlots[index], [field]: value };
      setTimeSlots(newSlots);
  };

  const deleteTimeSlot = (index: number) => {
      const newSlots = timeSlots.filter((_, i) => i !== index);
      setTimeSlots(newSlots);
  }

  // Render Cell Content
  const renderCell = (day: string, slot: TimeSlot) => {
      // Check if Break
      if(slot.type === "Break") {
          return (
             <div className="h-full w-full bg-slate-100/50 flex items-center justify-center">
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -rotate-90 whitespace-nowrap">
                     {slot.label.includes("Prayer") ? "Prayer Break" : "Break"}
                 </span>
             </div>
          );
      }

      // Find Class
      const classData = schedule.find(s => s.className === activeClass && s.day === day && s.slotId === slot.id);

      if(!classData) return (
          <div className="h-full w-full group relative">
              <button 
                onClick={() => { setSelectedCell({day, slotId: slot.id}); setIsSlotModalOpen(true); }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-50/50 text-indigo-400"
              >
                  <Plus size={20} />
              </button>
          </div>
      );

      return (
        <motion.div 
            initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            className={`h-full p-2 rounded-lg border text-xs flex flex-col justify-between relative group shadow-sm ${
                classData.type === 'Lab' ? 'bg-purple-50 border-purple-200 text-purple-800' : 'bg-white border-slate-200 text-slate-700'
            }`}
        >
            <div>
                <div className="font-bold line-clamp-2 leading-tight">{classData.subject}</div>
                <div className="text-[10px] opacity-80 mt-1">{classData.teacher}</div>
            </div>
            <div className="flex justify-between items-end mt-2">
                <Badge variant="outline" className="bg-white/50 h-5 px-1 text-[9px] border-current opacity-70">{classData.room}</Badge>
                <button 
                    onClick={() => setSchedule(schedule.filter(s => s.id !== classData.id))}
                    className="opacity-0 group-hover:opacity-100 text-rose-500 hover:bg-rose-100 p-1 rounded"
                >
                    <Trash2 size={12}/>
                </button>
            </div>
        </motion.div>
      );
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Flexible Timetable</h2>
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Beta</Badge>
           </div>
           <p className="text-slate-500 font-medium mt-1">Customize slots, breaks, and schedule.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => setIsConfigOpen(true)}>
             <Settings className="mr-2 h-4 w-4"/> Configure Grid
           </Button>
           <Button onClick={handleAutoGenerate} disabled={isGenerating} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200">
             {isGenerating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin"/> : <Zap className="mr-2 h-4 w-4"/>}
             Auto Fill
           </Button>
        </div>
      </div>

      {/* --- CLASS SELECTOR --- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
          {["BSCS-VIII", "BSCS-VI", "BSCS-IV", "BSSE-VI", "BSSE-IV", "BSSE-II"].map((cls) => (
              <button
                key={cls}
                onClick={() => setActiveClass(cls)}
                className={`px-5 py-2.5 rounded-t-xl text-sm font-bold transition-all relative top-[1px] ${
                    activeClass === cls 
                    ? "bg-white text-indigo-600 border-x border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-transparent"
                }`}
              >
                  {cls}
              </button>
          ))}
      </div>

      {/* --- DYNAMIC GRID --- */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
             <table className="w-full min-w-[1200px] border-collapse">
                 <thead>
                     <tr>
                         <th className="w-24 p-4 bg-slate-50 border-b border-r border-slate-200 text-xs font-bold text-slate-400 uppercase sticky left-0 z-10">Day</th>
                         {timeSlots.map((slot) => (
                             <th key={slot.id} className={`p-2 border-b border-r border-slate-200 text-[10px] font-bold uppercase text-center min-w-[100px] ${slot.type === 'Break' ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
                                 {slot.label}
                                 {slot.type === 'Break' && <div className="text-[9px] font-normal opacity-70">Break</div>}
                             </th>
                         ))}
                     </tr>
                 </thead>
                 <tbody>
                     {activeDays.map(day => (
                         <tr key={day} className="group hover:bg-slate-50/30 transition-colors">
                             <td className="p-4 bg-slate-50 border-r border-b border-slate-200 text-xs font-bold text-slate-700 uppercase sticky left-0 z-10">
                                 {day.substring(0, 3)}
                             </td>
                             {timeSlots.map(slot => (
                                 <td key={`${day}-${slot.id}`} className={`p-1 border-r border-b border-slate-100 align-top h-32 relative ${slot.type === 'Break' ? 'bg-slate-50/50' : ''}`}>
                                     {renderCell(day, slot)}
                                 </td>
                             ))}
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>

      {/* --- CONFIGURATION DRAWER (Settings) --- */}
      <AnimatePresence>
        {isConfigOpen && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end">
                <motion.div 
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Configure Grid</h3>
                        <button onClick={() => setIsConfigOpen(false)}><X className="text-slate-400 hover:text-slate-600" /></button>
                    </div>

                    {/* Active Days Config */}
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">Active Days</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                        activeDays.includes(day) 
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
                                        : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300"
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Slots Config */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                             <h4 className="text-sm font-bold text-slate-500 uppercase">Time Slots (Columns)</h4>
                             <Button size="sm" variant="outline" onClick={addTimeSlot}><Plus size={14} className="mr-1"/> Add</Button>
                        </div>
                        <div className="space-y-3">
                            {timeSlots.map((slot, idx) => (
                                <div key={slot.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                    <span className="text-xs font-mono text-slate-400 w-6">#{idx+1}</span>
                                    <Input 
                                        value={slot.label} 
                                        onChange={(e) => updateTimeSlot(idx, 'label', e.target.value)}
                                        className="h-8 text-xs bg-white"
                                    />
                                    <select 
                                        value={slot.type}
                                        onChange={(e) => updateTimeSlot(idx, 'type', e.target.value)}
                                        className="h-8 text-xs bg-white border border-slate-200 rounded px-2"
                                    >
                                        <option value="Class">Class</option>
                                        <option value="Break">Break</option>
                                    </select>
                                    <button onClick={() => deleteTimeSlot(idx)} className="text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <Button onClick={() => setIsConfigOpen(false)} className="w-full bg-slate-900 text-white font-bold">Done</Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- ADD CLASS MODAL --- */}
      <AnimatePresence>
        {isSlotModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden"
                >
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Add Class</h3>
                        <button onClick={() => setIsSlotModalOpen(false)}><X size={18} className="text-slate-400"/></button>
                    </div>
                    <div className="p-5 space-y-3">
                         <div className="space-y-1">
                            <Label>Subject</Label>
                            <Input value={newSlotData.subject} onChange={e => setNewSlotData({...newSlotData, subject: e.target.value})} placeholder="Ex: Mathematics" />
                         </div>
                         <div className="space-y-1">
                            <Label>Teacher</Label>
                            <Input value={newSlotData.teacher} onChange={e => setNewSlotData({...newSlotData, teacher: e.target.value})} placeholder="Ex: Sir Ali" />
                         </div>
                         <div className="space-y-1">
                            <Label>Room</Label>
                            <Input value={newSlotData.room} onChange={e => setNewSlotData({...newSlotData, room: e.target.value})} placeholder="Ex: Room 10" />
                         </div>
                         <div className="space-y-1">
                            <Label>Type</Label>
                            <div className="flex gap-2">
                                {["Lecture", "Lab"].map(t => (
                                    <button 
                                        key={t}
                                        onClick={() => setNewSlotData({...newSlotData, type: t as any})}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded border ${newSlotData.type === t ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                         </div>
                         <Button onClick={handleAddSlot} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2">Save</Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}