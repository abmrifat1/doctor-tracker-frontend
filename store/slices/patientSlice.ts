// store/slices/patientSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Patient } from '@/types';
import { getDoctorPatientsApi, addPatientToDoctorApi } from '@/services/patientService';

export const fetchDoctorPatients = createAsyncThunk(
  'patients/fetchByDoctor',
  async (doctorId: string, { rejectWithValue }) => {
    try {
      return await getDoctorPatientsApi(doctorId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patients');
    }
  }
);

export const addPatientToDoctor = createAsyncThunk(
  'patients/addToDoctor',
  async ({ doctorId, data }: { doctorId: string; data: any }, { rejectWithValue }) => {
    try {
      return await addPatientToDoctorApi(doctorId, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add patient');
    }
  }
);

interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Patients
      .addCase(fetchDoctorPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data;
      })
      .addCase(fetchDoctorPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Patient
      .addCase(addPatientToDoctor.fulfilled, (state, action) => {
        state.patients.unshift(action.payload.data);
      });
  },
});

export default patientSlice.reducer;