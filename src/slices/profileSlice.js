import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    firstName: localStorage.getItem("firstName") ? 
                                JSON.parse(localStorage.getItem("firstName")) : [],
    lastName: localStorage.getItem("lastName") ? 
                                JSON.parse(localStorage.getItem("lastName")) : [],
    user:null,
    profileLoading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setFirstName(state, value) {
            console.log("firstName",value);
            state.user = value.payload??[];
        },
        setLastName(state, value) {
            console.log("lastName",value);
            state.user = value.payload??[];
        },
        setProfileLoading(state, value) {
            state.loading = value.payload??false;
          },
        setUser(state, value) {
            state.user = value.payload??[];
          },
    },
});

export const {setFirstName, setLastName, setProfileLoading, setUser} = profileSlice.actions;
export default profileSlice.reducer;