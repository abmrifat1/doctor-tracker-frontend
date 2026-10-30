// app/(dashboard)/patients/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllPatients, updatePatient, deletePatient } from '@/store/slices/patientSlice';
import toast from 'react-hot-toast';
import { Patient } from '@/types';

import PatientFilters from '@/components/patients/table/PatientFilters';
import PatientTable from '@/components/patients/table/PatientTable';
import EditPatientModal from '@/components/patients/modal/EditPatientModal';
import ConfirmDeleteModal from '@/components/patients/modal/ConfirmDeleteModal'; // রিইউজ করা হলো

export default function PatientsPage() {
  const dispatch = useAppDispatch();
  const { allPatients, allLoading, total, page, pages } = useAppSelector((state) => state.patients);

  // Filter States
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = useCallback(() => {
    const query = new URLSearchParams({
      page: currentPage.toString(),
      limit: '10',
      ...(search && { search }),
      ...(condition && { condition }),
      ...(dateFrom && { from: dateFrom }),
      ...(dateTo && { to: dateTo }),
    }).toString();

    dispatch(fetchAllPatients(query));
  }, [dispatch, currentPage, search, condition, dateFrom, dateTo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Edit Submit
  const handleUpdatePatient = async (id: string, data: any) => {
    const res = await dispatch(updatePatient({ id, data }));
    if (updatePatient.fulfilled.match(res)) {
      toast.success('Patient updated successfully');
      setIsEditModalOpen(false);
    } else {
      toast.error(res.payload as string);
    }
  };

  // Delete Confirm
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const res = await dispatch(deletePatient(deleteId));
    setIsDeleting(false);

    if (deletePatient.fulfilled.match(res)) {
      toast.success('Patient deleted');
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    } else {
      toast.error(res.payload as string);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Patients Management</h1>
        <p className="text-slate-500">View, edit and manage all registered patients.</p>
      </div>

      <PatientFilters
        search={search} setSearch={setSearch}
        condition={condition} setCondition={setCondition}
        dateFrom={dateFrom} setDateFrom={setDateFrom}
        dateTo={dateTo} setDateTo={setDateTo}
        setCurrentPage={setCurrentPage}
      />

      <PatientTable
        patients={allPatients}
        loading={allLoading}
        page={page} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}
        onEdit={(p) => { setSelectedPatient(p); setIsEditModalOpen(true); }}
        onDelete={(id) => { setDeleteId(id); setIsDeleteModalOpen(true); }}
      />

      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={selectedPatient}
        onSave={handleUpdatePatient}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}