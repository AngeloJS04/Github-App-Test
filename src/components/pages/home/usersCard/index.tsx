import Icon from '@/components/app/icons/icons'
import { GithubUserProps } from '@/redux/rtk/users/user.interface'
import Link from 'next/link'
import React from 'react'

const UsersList = ({ user }: { user: GithubUserProps }) => {
    return (
        <div className="col-span-12 md:col-span-6 lg:col-span-4  m-2">
            <div className="flex flex-col items-center bg-base-200 justify-center w-full h-full p-4 rounded-md shadow-md">
                <div className="flex items-center justify-center w-20 h-20">
                    <img src={user.avatar_url} alt={user.login} className="w-full h-full rounded-full" />
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-4">
                    <Icon icon="user" className="w-6 h-6 text-blue-500" />
                    <Link className="text-lg font-bold text-blue-500 text-center" href={`/${user.login}`}>{user.login}</Link>
                </div>
            </div>
        </div>
    )
}

export default UsersList