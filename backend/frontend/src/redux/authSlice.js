import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        experience: [], // Add experience array to the state
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserExperience: (state, action) => {
            const { id, updatedExperience } = action.payload;
            const index = state.experience.findIndex(exp => exp._id === id);
            if (index !== -1) {
                state.experience[index] = updatedExperience; // Update the experience at the specified index
            } else {
                // If experience not found, you can choose to push it or handle it as needed
                state.experience.push(updatedExperience); // Add if experience doesn't exist
            }
        },
        addUserExperience: (state, action) => {
            state.experience.push(action.payload); // Add a new experience
        },
        removeUserExperience: (state, action) => {
            const index = state.experience.findIndex(exp => exp._id === action.payload);
            if (index !== -1) {
                state.experience.splice(index, 1); // Remove experience at the specified index
            }
        },
    },
});

// Export actions
export const { setLoading, setUser, setUserExperience, addUserExperience, removeUserExperience } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
