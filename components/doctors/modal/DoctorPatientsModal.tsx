// components/doctors/modal/DoctorPatientsModal.tsx
import { useEffect, useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Doctor } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDoctorPatients, addPatientToDoctor } from '@/store/slices/patientSlice';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctor: Doctor | null;
}

export default function DoctorPatientsModal({ isOpen, onClose, selectedDoctor }: Props) {
  const dispatch = useAppDispatch();
  const { patients, loading } = useAppSelector((state) => state.patients);

  const [formData, setFormData] = useState({ name: '', age: '', condition: '', phone: '', email: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isOpen && selectedDoctor) {
      dispatch(fetchDoctorPatients(selectedDoctor._id));
    }
  }, [isOpen, selectedDoctor, dispatch]);

  if (!isOpen || !selectedDoctor) return null;

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    const res = await dispatch(addPatientToDoctor({ doctorId: selectedDoctor._id, data: formData }));
    setIsAdding(false);

    if (addPatientToDoctor.fulfilled.match(res)) {
      toast.success('Patient added successfully');
      setFormData({ name: '', age: '', condition: '', phone: '', email: '' });
    } else {
      toast.error(res.payload as string);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Patients of {selectedDoctor.name}</h3>
            <p className="text-sm text-slate-500">{selectedDoctor.specialization} • {selectedDoctor.hospital}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition"><X size={24} /></button>
        </div>

        {/* Add Patient Form */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <UserPlus size={16} /> Add New Patient
          </h4>
          <form onSubmit={handleAddPatient} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 border text-gray-900 rounded-lg text-sm outline-none focus:border-blue-500" />
            <input type="number" placeholder="Age" required value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="p-2 border text-gray-900 rounded-lg text-sm outline-none focus:border-blue-500" />
            <input type="text" placeholder="Condition" required value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} className="p-2 border text-gray-900 rounded-lg text-sm outline-none focus:border-blue-500" />
            <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="p-2 border text-gray-900 rounded-lg text-sm outline-none focus:border-blue-500" />
            <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="p-2 border text-gray-900 rounded-lg text-sm outline-none focus:border-blue-500" />
            <button type="submit" disabled={isAdding} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
              {isAdding ? 'Adding...' : 'Add Patient'}
            </button>
          </form>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 shadow-sm z-10">
              <tr className="border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Age</th>
                <th className="p-3 font-semibold">Condition</th>
                <th className="p-3 font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading patients...</td></tr>
              ) : patients.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No patients found. Add one above.</td></tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3 font-medium text-slate-800">{patient.name}</td>
                    <td className="p-3 text-slate-600">{patient.age}</td>
                    <td className="p-3 text-blue-600 font-medium">{patient.condition}</td>
                    <td className="p-3 text-slate-500 text-sm">
                      {patient.phone && <p>{patient.phone}</p>}
                      {patient.email && <p>{patient.email}</p>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}