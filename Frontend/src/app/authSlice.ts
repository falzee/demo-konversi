import axios from 'axios'
import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit'
import { error } from 'console'

const initialState: InitialState = {
  loading: false,
  error: false,
  isLogin: false,
}
type InitialState = {
  loading: boolean
  error: boolean
  isLogin: boolean
  // isReg: boolean
}
type User = {
  id?: number
  email?: string
  nomerInduk?: string
  password: string
}

  
export const postLogIn = createAsyncThunk(
  "auth/postLogIn",
  async (users: User, {rejectWithValue}) => {
            try{
                const response = await axios.post("/auth/login", {
                    email: users.email,
                    nomerInduk: users.nomerInduk,
                    password: users.password
                })
                const token = response.data.token
                localStorage.setItem('jwtToken', token);
                return 
            }catch (err:any) {
              if (err.response) {
                return rejectWithValue(err.response.data);
              } else {
                throw err;
              }
        }
      }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {   
      reset: () => initialState,
      removeToken: () => localStorage.removeItem('jwtToken'),
    }, 
    extraReducers: (builder) => {
      builder.addCase(postLogIn.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
      builder.addCase(postLogIn.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.isLogin = true;
      });
      builder.addCase(postLogIn.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isLogin = false;
      });
    }
  }
)
export const {reset,removeToken} = authSlice.actions
export default authSlice.reducer