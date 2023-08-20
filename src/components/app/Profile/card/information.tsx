import React from 'react'
import Icon from '../../icons/icons'

const InformationCard = ({ icon, info, onClick }: {
    icon: string,
    info: string,
    onClick?: () => void
}) => {
    return (
        <div
            onClick={onClick ?? onClick}
            className="flex items-center mt-1">
            <Icon icon={icon} className="mr-1" />
            <span className="text-center text-xs md:text-sm text-blue-500 cursor-pointer">{info}</span>
        </div>
    )
}

export default InformationCard