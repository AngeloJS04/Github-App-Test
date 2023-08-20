import { RepositoryProps } from "@/redux/rtk/users/user.interface";

export interface RepositoryPropsI {
    repo: RepositoryProps,
    favorite?: boolean,
    col?: string,
    handleFavorite?: Function,
    alReadyFav?: boolean

}
