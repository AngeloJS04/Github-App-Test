import React from 'react'

const Icon = ({ icon, className }: { icon: string, className?: string }) => {
    return (
        <i className={`material-icons icons-size ${className}`}>{icon}</i>
    )
}
export default Icon