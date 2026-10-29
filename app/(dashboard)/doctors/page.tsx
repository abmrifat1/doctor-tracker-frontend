// app/(dashboard)/doctors/page.tsx
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDoctors, addDoctor, deleteDoctor } from '@/store/slices/doctorSlice';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Doctor } from '@/types';

import DoctorFilters from '@/components/doctors/DoctorFilters';
import DoctorTable from '@/components/doctors/DoctorTable';
import AddDoctorModal from '@/components/doctors/AddDoctorModal';
import DoctorPatientsModal from '@/components/doctors/DoctorPatientsModal';

export default function DoctorsPage() {
  const dispatch = useAppDispatch();
  const { doctors, loading, total, page, pages } = useAppSelector((state) => state.doctors);

  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [formData, setFormData] = useState({ name: '', specialization: '', hospital: '', phone: '', email: '' });

  const fetchData = useCallback(() => {
    const query = new URLSearchParams({
      page: currentPage.toString(),
      limit: '10',
      ...(search && { search }),
      ...(specialization && { specialization }),
      ...(dateFrom && { from: dateFrom }),
      ...(dateTo && { to: dateTo }),
    }).toString();
    dispatch(fetchDoctors(query));
  }, [dispatch, currentPage, search, specialization, dateFrom, dateTo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uniqueSpecializations = useMemo(() => {
    if (!doctors || doctors?.length === 0) return [];
    const specs = doctors.map((doc) => doc.specialization).filter(Boolean);
    return Array.from(new Set(specs)).sort();
  }, [doctors]);

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(addDoctor(formData));
    if (addDoctor.fulfilled.match(res)) {
      toast.success('Doctor added successfully');
      setIsAddModalOpen(false);
      setFormData({ name: '', specialization: '', hospital: '', phone: '', email: '' });
      fetchData();
    } else {
      toast.error(res.payload as string);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor? All associated patients will be deleted.')) {
      const res = await dispatch(deleteDoctor(id));
      if (deleteDoctor.fulfilled.match(res)) {
        toast.success('Doctor deleted');
      } else {
        toast.error(res.payload as string);
      }
    }
  };

  const handleManagePatients = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsPatientModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctors Management</h1>
          <p className="text-slate-500">Manage all doctors and their schedules.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={20} /> Add Doctor
        </button>
      </div>

      {/* Filters Component */}
      <DoctorFilters
        search={search}
        setSearch={setSearch}
        specialization={specialization}
        setSpecialization={setSpecialization}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        setCurrentPage={setCurrentPage}
        specializations={uniqueSpecializations}
      />

      {/* Table Component */}
      <DoctorTable
        doctors={doctors}
        loading={loading}
        page={page}
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onDelete={handleDelete}
        onManagePatients={handleManagePatients}
      />

      {/* Add Doctor Modal Component */}
      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddDoctor}
      />

      {/* Patient Modal Component */}
      <DoctorPatientsModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        selectedDoctor={selectedDoctor}
      />
    </div>
  );
}