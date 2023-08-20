// ... (importaciones y código anterior)
'use client'
import Repository from "@/components/app/repository";
import UserEventsList from "@/components/pages/home/Events";
import UserEventsListSkeleton from "@/components/pages/home/Events/eventSkeleton";
import UsersList from "@/components/pages/home/usersCard";
import { useGetMeQuery } from "@/redux/rtk/me";
import { useGetEventsQuery } from "@/redux/rtk/users";
import { EventsResponse, GithubUserProps, RepositoryProps } from "@/redux/rtk/users/user.interface";
import { SearchByEnum } from "@/redux/slices/searchBy/searchBy.slice";
import { RootState } from "@/redux/store";
import { abbreviateNumber } from "@/utils/abbreviateNumber";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    // Redux state and queries
    const repositories = useSelector((state: RootState) => state.repositories);
    const SearchBy = useSelector((state: RootState) => state.searchBy.searchBy);
    const users = useSelector((state: RootState) => state.users);
    const { data: UserLogged } = useGetMeQuery({});
    const { data: UserEvents } = useGetEventsQuery(UserLogged?.login);

    // State for favorite repositories
    const [repoFav, setRepoFav] = useState<RepositoryProps[]>(() => {
        const LocalStorageReposFav = localStorage.getItem('favorites');
        return LocalStorageReposFav ? JSON.parse(LocalStorageReposFav) : [];
    });

    // Save favorite repositories to localStorage
    useEffect(() => {
        if (repoFav) {
            localStorage.setItem('favorites', JSON.stringify(repoFav));
        }
    }, [repoFav]);

    // Handle adding a repository to favorites
    const handleFavorite = (repo: RepositoryProps) => {
        setRepoFav([...repoFav, repo]);
    };

    // Render the titles based on search results
    const renderTitles = () => {
        if (repositories?.total_count || users.total_count) {
            return (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-center">
                        {SearchBy === SearchByEnum.repositories ? "Repositories" : "Users"}
                    </h1>
                    <span className="text-md font-bold text-center">
                        {abbreviateNumber(SearchBy === SearchByEnum.repositories ? repositories?.total_count : users?.total_count)} results
                    </span>
                </div>
            );
        } else {
            return (
                <div className="col-span-12">
                    <h1 className="text-2xl font-bold text-center">Events</h1>
                </div>
            );
        }
    };

    return (
        <div>
            {renderTitles()}
            <div className="grid grid-cols-12">
                {repositories?.total_count || users.total_count ? SearchBy === SearchByEnum.repositories ? repositories?.items.map((repo: RepositoryProps, index: number) => (
                    <Repository repo={repo} key={index} favorite={true} col={"md:col-span-4"} handleFavorite={() => handleFavorite(repo)}
                    />
                ))
                    : users?.items.map((user: GithubUserProps, index: number) => (<UsersList user={user} key={index} />))
                    : UserEvents ? UserEvents.map((event: EventsResponse, index: number) => (<UserEventsList event={event} key={index} />))
                        : Array.from(Array(10).keys()).map((index: number) => (
                            <UserEventsListSkeleton key={index} />
                        ))}
            </div>
        </div>
    );
}

export default Home;
