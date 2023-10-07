import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: null,
  feedLoading: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    setFeed(state, value) {
      state.data = value.payload??null;
    },
    setFeedLoading(state, value) {
      state.loading = value.payload??false;
    },
    
  },
});

export const { setFeed, setFeedLoading } = feedSlice.actions;

export default feedSlice.reducer;