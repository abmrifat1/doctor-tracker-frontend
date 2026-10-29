// components/doctors/AddDoctorModal.tsx
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddDoctorModal({ isOpen, onClose, formData, setFormData, onSubmit }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Add New Doctor</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition"><X size={24} /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border rounded-xl text-gray-600 outline-none focus:border-blue-500" />
          <input type="text" placeholder="Specialization (e.g. Cardiology)" required value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <input type="text" placeholder="Hospital Name" required value={formData.hospital} onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <input type="text" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition mt-2">Save Doctor</button>
        </form>
      </div>
    </div>
  );
}