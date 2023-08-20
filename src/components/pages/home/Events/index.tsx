import { EventsResponse } from '@/redux/rtk/users/user.interface'
import Link from 'next/link'
import React from 'react'

const UserEventsList = ({ event }: { event: EventsResponse }) => {
    return (
        <div className="col-span-12 md:col-span-6 mx-0 md:mx-3 my-3 md:my-5">
            <div className="flex items-center m-2">
                <img src={event.actor.avatar_url} className="w-8 rounded-full " alt="" />
                <span className="text-sm font-bold">
                    <Link href={`/${event.actor.login}`}
                        className="pl-2 cursor-pointer">{event.actor.login}</Link>
                </span>
            </div>

            <div className="card card-side h-28 bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="flex items-center flex-col md:flex-row">
                        <span
                            className="badge badge-primary mr-0 md:mr-2">
                            {event.type === "WatchEvent" ? "Watched" : event.type === "ForkEvent" ? "Forked" : event.type === "CreateEvent" ? "Created" : event.type === "PushEvent" ? "Pushed" : event.type === "PublicEvent" ? "Public" : ""}
                        </span>
                        <span className="text-xs md:text-sm mr-0 md:mr-2">a repository</span>
                        <span className="text-blue-500 text-xs md:text-sm text-center" >{event.repo.name}</span>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default UserEventsList