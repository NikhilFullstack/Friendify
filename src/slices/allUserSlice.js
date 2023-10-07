import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUser: null,
  allUserLoading: false,
};

const allUserSlice = createSlice({
  name: "allUser",
  initialState: initialState,
  reducers: {
    setAllUser(state, value) {
      state.data = value.payload??null;
    },
    setAllUserLoading(state, value) {
      state.loading = value.payload??false;
    },
    
  },
});

export const { setAllUser, setAllUserLoading } = allUserSlice.actions;

export default allUserSlice.reducer;