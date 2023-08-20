import React from 'react'

const Skeleton = () => {
    return (
        <div className="profile-skeleton">
            <div className="skeleton avatar-skeleton"></div>
            <div className="skeleton title-skeleton"></div>
            <div className="skeleton text-skeleton text-1"></div>
            <div className="skeleton text-skeleton text-2"></div>
            <div className="skeleton text-skeleton text-3"></div>
        </div>
    )
}

export default Skeleton