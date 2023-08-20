
import { MeI } from '@/redux/rtk/me/me.interface'
import { GithubUserProps } from '@/redux/rtk/users/user.interface'
import React from 'react'
import Icon from '../../icons/icons'
import InformationCard from './information'

const CardProfile = ({ user }: { user: GithubUserProps }) => {
    return (
        <div className='border border-gray-600 bg-black/10 rounded-lg p-0 md:p-10'>
            <div>
                <div className='flex justify-center p-5'>
                    <img src={user.avatar_url || "https://avatars.githubusercontent.com/u/22059313?v=4"} alt="profile" className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
                </div>
                <div className="flex flex-col items-center mt-2">
                    <span className="text-2xl font-bold text-center">{user.name}</span>
                    <p className="text-gray-500 text-sm">{user.login}</p>
                    <p className='text-sm text-center'>{user.bio}</p>
                </div>
                <div className="flex flex-col items-center mt-2">
                    <div className="flex">
                        <div className="flex flex-col items-center mr-5">
                            <span className="text-sm font-bold">{user.followers}</span>
                            <p className="text-gray-500 text-sm">Followers</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold">{user.following}</span>
                            <p className="text-gray-500 text-sm">Following</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <button
                        onClick={() => window.open(user.html_url, "_blank")} className="flex  items-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-0.5 px-2 rounded mt-5">
                        <Icon icon="link" className="mr-1 text-xs" />
                        <span className='text-xs'>See  on Github</span>
                    </button>
                </div>
                <div className='flex flex-col p-5'>
                    {user.blog && (<InformationCard onClick={() => window.open(user.blog, "_blank")} icon="link" info={user.blog} />)}
                    {
                        user.location && (
                            <InformationCard
                                onClick={() => window.open(`https://www.google.com/maps/place/${user.location}`, "_blank")}
                                icon="location_on" info={user.location} />
                        )
                    }
                    {user.company && (<InformationCard icon="apartment" info={user.company} />)}
                </div>
            </div>
        </div>
    )
}
export default CardProfile