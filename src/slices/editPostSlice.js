import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: null,
  postDataLoading: false,
  step:0,
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState: initialState,
  reducers: {
    setPostData(state, value) {
      state.signupData = value.payload??null;
    },
    setPostDataLoading(state, value) {
      state.loading = value.payload??false;
    },
    setStep(state, value) {
      state.step = value.payload ?? 0;
    }
    
  },
});

export const { setPostData, setPostDataLoading, setStep } = editPostSlice.actions;

export default editPostSlice.reducer;