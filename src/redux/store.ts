import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import middlewares from "./middlewares";
import { userRTKProvider } from "./rtk/me";
import { searchRTKProvider } from "./rtk/search";
import { usersRTKProvider } from "./rtk/users";
import repositoriesSlice from "./slices/repositories/repositories.slice";
import searchBySlice from "./slices/searchBy/searchBy.slice";
import usersSlice from "./slices/users/users.slice";

export const store = configureStore({
    reducer: {
        [userRTKProvider.reducerPath]: userRTKProvider.reducer,
        [usersRTKProvider.reducerPath]: usersRTKProvider.reducer,
        [searchRTKProvider.reducerPath]: searchRTKProvider.reducer,
        repositories: repositoriesSlice,
        users: usersSlice,
        searchBy:searchBySlice
    },
    middleware: (gDM) => {
        return gDM().concat(middlewares);
    },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;