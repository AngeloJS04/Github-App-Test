import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchBySliceProps {
    searchBy: string
}
export enum SearchByEnum {
    repositories = "repositories",
    users = "users"
}

const initialState: SearchBySliceProps = {
    searchBy: "repositories",
};

const searchBySlice = createSlice({
    name: "searchBy",
    initialState,
    reducers: {
        setSearchBy(state, action: PayloadAction<SearchBySliceProps>) {
            state.searchBy = action.payload.searchBy;
        }
    }
});
export const { setSearchBy } = searchBySlice.actions;
export default searchBySlice.reducer;


