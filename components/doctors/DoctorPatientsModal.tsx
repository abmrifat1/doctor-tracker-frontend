// components/doctors/DoctorPatientsModal.tsx
import { X, UserPlus, FileText } from 'lucide-react';
import { Doctor } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctor: Doctor | null;
}

export default function DoctorPatientsModal({ isOpen, onClose, selectedDoctor }: Props) {
  if (!isOpen || !selectedDoctor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Patients of {selectedDoctor.name}</h3>
            <p className="text-sm text-slate-500">{selectedDoctor.specialization} • {selectedDoctor.hospital}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition"><X size={24} /></button>
        </div>

        {/* Add Patient Form Placeholder */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <UserPlus size={16} /> Add New Patient
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Patient Name" className="flex-1 text-gray-600 p-2 border rounded-lg text-sm outline-none" />
            <input type="number" placeholder="Age" className="w-24 p-2 border text-gray-600 rounded-lg text-sm outline-none" />
            <input type="text" placeholder="Condition" className="flex-1 text-gray-600 p-2 border rounded-lg text-sm outline-none" />
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">Add</button>
          </div>
        </div>

        {/* Patient List Placeholder */}
        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0">
              <tr className="border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Age</th>
                <th className="p-3 font-semibold">Condition</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No patients found. Add one above.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}