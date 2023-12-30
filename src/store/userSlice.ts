import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { ILoginResponse } from '../components/interfaces/auth.interface';
import { PREFIX } from '../helpers/API';
import { IProfile } from '../components/interfaces/user.interface';
import { RootState } from './store';

export interface UserState {
  token: string | null;
  loginErrorMessage?: string;
  profile?: IProfile;
}

export interface UserPersistentState {
  token: string | null;
}

export const JWT_TOKEN = 'userData';

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data.access_token;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/register`, {
        email: params.email,
        password: params.password,
        name: params.name,
      });
      return data.access_token;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<IProfile, void, { state: RootState }>(
  'user/getProfile',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token;
    const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

const initialState: UserState = {
  token: loadState<UserPersistentState>(JWT_TOKEN)?.token ?? null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.token = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.token = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
