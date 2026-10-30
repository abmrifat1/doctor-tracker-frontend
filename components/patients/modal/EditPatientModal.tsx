// components/patients/modal/EditPatientModal.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Patient } from '@/types';
import { CONDITIONS } from '@/constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onSave: (id: string, data: any) => Promise<void>;
}

export default function EditPatientModal({ isOpen, onClose, patient, onSave }: Props) {
  const [formData, setFormData] = useState({ name: '', age: '', condition: '', phone: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        condition: patient.condition,
        phone: patient.phone || '',
        email: patient.email || '',
      });
    }
  }, [patient]);

  if (!isOpen || !patient) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(patient._id, formData);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Edit Patient</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <input type="number" placeholder="Age" required value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <select
            required
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="w-full p-3 border rounded-xl outline-none focus:border-blue-500 text-slate-700">
            <option value="" disabled>Select Condition</option>
            {CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>{cond}</option>
            ))}
          </select>
          <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full text-gray-600 p-3 border rounded-xl outline-none focus:border-blue-500" />
          <button type="submit" disabled={isSaving} className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}