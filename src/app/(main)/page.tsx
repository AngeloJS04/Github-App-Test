'use client'

import Repository from "@/components/app/repository";
import UserEventsList from "@/components/pages/home/Events";
import UsersList from "@/components/pages/home/usersCard";
import { useGetMeQuery } from "@/redux/rtk/me";
import { useGetEventsQuery } from "@/redux/rtk/users";
import { EventsResponse, GithubUserProps, RepositoryProps } from "@/redux/rtk/users/user.interface";
import { SearchByEnum } from "@/redux/slices/searchBy/searchBy.slice";
import { RootState } from "@/redux/store";
import { abbreviateNumber } from "@/utils/abbreviateNumber";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {

    const repositories = useSelector((state: RootState) => state.repositories)
    const SearchBy = useSelector((state: RootState) => state.searchBy.searchBy)
    const users = useSelector((state: RootState) => state.users)
    const { data: UserLogged } = useGetMeQuery({})
    const { data: UserEvents } = useGetEventsQuery(UserLogged?.login)

    // this state contains the favorite repositories
    const [repoFav, setRepoFav] = React.useState<RepositoryProps[]>(() => {
        const LocalStorageReposFav = localStorage.getItem('favorites');
        return LocalStorageReposFav ? JSON.parse(LocalStorageReposFav) : [];
    });

    // this effect save the favorite repositories in the localStorage
    React.useEffect(() => {
        if (!repoFav) return
        localStorage.setItem('favorites', JSON.stringify(repoFav))
    }, [repoFav])

    return (
        <div>
            {repositories?.total_count ? (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-center">
                        {SearchBy === SearchByEnum.repositories ? "Repositories" : "Users"}
                    </h1>
                    <span className="text-md font-bold text-center">
                        {abbreviateNumber(SearchBy === SearchByEnum.repositories ? repositories?.total_count : users?.total_count)} results
                    </span>
                </div>
            ) : (
                <div className="col-span-12">
                    <h1 className="text-2xl font-bold text-center">Events</h1>
                </div>
            )}
            <div className="grid grid-cols-12">
                {
                    repositories?.total_count || users.total_count ?
                        SearchBy === SearchByEnum.repositories ? (
                            repositories?.items.map((repo: RepositoryProps, index: number) => {
                                const handleFavorite = () => { setRepoFav([...repoFav, repo]) }
                                return (<Repository repo={repo} key={index} favorite={true} col={"md:col-span-4"} handleFavorite={handleFavorite} />)
                            })
                        ) : (users?.items.map((user: GithubUserProps, index: number) => (<UsersList user={user} key={index} />))
                        ) : (UserEvents?.map((event: EventsResponse, index: number) => (<UserEventsList event={event} key={index} />)))
                }
            </div>
        </div>
    )
}
