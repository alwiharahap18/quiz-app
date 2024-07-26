import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    exp: '',
    token: '',
    email: '',
    name: '',
    id: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;