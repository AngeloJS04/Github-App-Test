import { GithubUserProps } from "@/redux/rtk/users/user.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export interface UsersSliceProps {
    total_count: number
    incomplete_results: boolean
    items: Array<GithubUserProps>
}

const initialState: UsersSliceProps = {
    total_count: 0,
    incomplete_results: false,
    items: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<UsersSliceProps>) {
            state.total_count = action.payload.total_count;
            state.incomplete_results = action.payload.incomplete_results;
            state.items = action.payload.items;
        }
    }
});
export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;


