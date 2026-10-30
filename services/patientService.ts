// services/patientService.ts
import api from '@/lib/axios';
import { PatientResponse } from '../types';

export const getDoctorPatientsApi = async (doctorId: string) => {
  const response = await api.get(`/doctors/${doctorId}/patients`);
  return response.data;
};

export const addPatientToDoctorApi = async (doctorId: string, patientData: any) => {
  const response = await api.post(`/doctors/${doctorId}/patients`, patientData);
  return response.data;
};

export const getAllPatientsApi = async (queryString: string) => {
  const response = await api.get(`/patients?${queryString}`);
  return response.data as PatientResponse;
};

export const updatePatientApi = async (id: string, patientData: any) => {
  const response = await api.put(`/patients/${id}`, patientData);
  return response.data;
};

export const deletePatientApi = async (id: string) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};