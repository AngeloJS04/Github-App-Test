'use client'
import CardProfile from "@/components/app/Profile/card";
import Repositories from "@/components/app/Profile/tabs/repositories";
import RepositoriesFav from "@/components/app/Profile/tabs/repositories/favRepos";
import Skeleton from "@/components/app/skeleton/skeleton";
import Tabs from "@/components/app/tabs/tabs";
import { useGetMeQuery } from "@/redux/rtk/me";
import { useGetUserQuery } from "@/redux/rtk/users";

export default function Profile({ params }: { params: { username: string } }) {
    const { data, isLoading } = useGetUserQuery(params.username);
    const { data: UserLogged } = useGetMeQuery({});

    const tabs = [
        {
            name: 'Repositories',
            icon: 'collections_bookmark',
            component: <Repositories username={params.username} />
        },
        // this show the favorites tab only if the user is logged and the username is the same as the logged user
        ...(UserLogged && UserLogged?.login === params.username ? [{
            name: 'Favorites',
            icon: 'favorite',
            component: <RepositoriesFav />
        }] : [])

    ]

    return (
        <div>
            <div className=" grid grid-cols-7">
                <div className="profile col-span-12 md:col-span-2 ">
                    {isLoading ? <Skeleton /> : <CardProfile user={data} />}
                </div>
                <div className="col-span-12 md:col-span-5 flex flex-col  mt-5 ml-3 md:mt-0 items-center">
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </div>
    );
}
