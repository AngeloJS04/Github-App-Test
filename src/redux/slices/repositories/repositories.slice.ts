import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RepositoryProps } from "../../rtk/users/user.interface";


export interface repositorySliceProps {
    total_count: number
    incomplete_results: boolean
    items: Array<RepositoryProps>
}

const initialState: repositorySliceProps = {
    total_count: 0,
    incomplete_results: false,
    items: [],
};

const repositoriesSlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {
        setRepositories(state, action: PayloadAction<repositorySliceProps>) {
            state.total_count = action.payload.total_count;
            state.incomplete_results = action.payload.incomplete_results;
            state.items = action.payload.items;
        }
    }
});
export const { setRepositories } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;


