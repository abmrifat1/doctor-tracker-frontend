// store/slices/patientSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Patient } from '@/types';
import { getDoctorPatientsApi, addPatientToDoctorApi, getAllPatientsApi, updatePatientApi, deletePatientApi } from '@/services/patientService';
import { fetchDashboardStats } from './dashboardSlice';

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
  async ({ doctorId, data }: { doctorId: string; data: any }, { rejectWithValue, dispatch }) => {
    try {
      const res = await addPatientToDoctorApi(doctorId, data);
      dispatch(fetchDashboardStats());
      return res;
    } catch (error: any) {
      const combinedError = [
        error.response.data.message,
        ...error.response.data.errors.map((err: { field: string, message: string }) => err?.message)
      ].join(', ');

      return rejectWithValue(combinedError || 'Failed to add patient');
    }
  }
);

export const fetchAllPatients = createAsyncThunk(
  'patients/fetchAll',
  async (queryString: string, { rejectWithValue }) => {
    try {
      return await getAllPatientsApi(queryString);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patients');
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue, dispatch }) => {
    try {
      const res = await updatePatientApi(id, data);
      dispatch(fetchDashboardStats());
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update patient');
    }
  }
);

export const deletePatient = createAsyncThunk(
  'patients/delete',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deletePatientApi(id);
      dispatch(fetchDashboardStats());
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete patient');
    }
  }
);

interface PatientState {
  patients: Patient[];
  allPatients: Patient[];
  loading: boolean;
  allLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  pages: number;
}

const initialState: PatientState = {
  patients: [],
  allPatients: [],
  loading: false,
  allLoading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
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
      })
      //  Fetch All Patients
      .addCase(fetchAllPatients.pending, (state) => { state.allLoading = true; state.error = null; })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allPatients = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
      })
      // Update Patient
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.allPatients.findIndex(p => p._id === action.payload.data._id);
        if (index !== -1) {
          state.allPatients[index] = action.payload.data;
        }
      })
      // Delete Patient
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.allPatients = state.allPatients.filter(p => p._id !== action.payload);
        state.total -= 1;

        state.patients = state.patients.filter(p => p._id !== action.payload);
      });
  },
});

export default patientSlice.reducer;