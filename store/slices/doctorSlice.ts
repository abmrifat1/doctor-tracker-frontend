// store/slices/doctorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Doctor, DoctorResponse } from '@/types';
import { getDoctorsApi, createDoctorApi, deleteDoctorApi } from '@/services/doctorService';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchAll',
  async (queryString: string, { rejectWithValue }) => {
    try {
      return await getDoctorsApi(queryString);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
    }
  }
);

export const addDoctor = createAsyncThunk(
  'doctors/add',
  async (doctorData: any, { rejectWithValue }) => {
    try {
      return await createDoctorApi(doctorData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create doctor');
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  'doctors/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoctorApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete doctor');
    }
  }
);

interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pages: number;
}

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Doctors
      .addCase(fetchDoctors.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Doctor
      .addCase(addDoctor.fulfilled, (state) => {
        state.loading = false;
      })
      // Delete Doctor
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter((doc) => doc._id !== action.payload);
        state.total -= 1;
      });
  },
});

export default doctorSlice.reducer;