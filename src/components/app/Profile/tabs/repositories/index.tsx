import Repository from '@/components/app/repository'
import { useGetMeQuery, useGetRepostoriesQuery } from '@/redux/rtk/me'
import { useGetReposQuery } from '@/redux/rtk/users'
import { RepositoryProps } from '@/redux/rtk/users/user.interface'
import React from 'react'

const Repositories = ({ username }: { username: string }) => {

    const { data: General_Repos } = useGetReposQuery(username)
    const { data: Owner_Repos } = useGetRepostoriesQuery({})
    const { data: UserLogged } = useGetMeQuery({});

    return (
        <div>
            <div className="grid grid-cols-12 ">
                {/* THIS CHECK IF THE USER IS LOGGED AND IF THE USERNAME IS THE SAME AS THE LOGGED USER IF TRUE SHOW THE OWNER REPOS ELSE SHOW THE GENERAL REPOS OF THE USER*/}
                {(UserLogged && UserLogged?.login === username ? Owner_Repos : General_Repos)?.map((repo: RepositoryProps, index: number) => {
                    return (<Repository repo={repo} key={`${repo.id}-${index}`} />)
                })}
            </div>
        </div>
    )
}

export default Repositories