import { userRTKProvider } from "../rtk/me";
import { searchRTKProvider } from "../rtk/search";
import { usersRTKProvider } from "../rtk/users";

// This is the middleware that will be used by the store
export default [
    userRTKProvider.middleware,
    usersRTKProvider.middleware,
    searchRTKProvider.middleware
]