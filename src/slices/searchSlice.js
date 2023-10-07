import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: null,
  searchLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearchData(state, value) {
      state.searchData = value.payload??null;
    },
    setSearchLoading(state, value) {
      state.searchLoading = value.payload??false;
    },
  },
});

export const { setSearchData, setSearchLoading } = searchSlice.actions;

export default searchSlice.reducer;