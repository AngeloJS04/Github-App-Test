
const UserEventsListSkeleton = () => {
    return (
        <div className="col-span-12 md:col-span-6 mx-0 md:mx-3 my-3 md:my-5">
            <div className="flex items-center m-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <span className="text-sm font-bold bg-gray-700 w-20 h-4 ml-2"></span>
            </div>

            <div className="card card-side h-28 bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="flex items-center flex-col md:flex-row">
                        <span className="badge badge-primary mr-0 md:mr-2 bg-gray-700 w-16 h-4"></span>
                        <span className="text-xs md:text-sm mr-0 md:mr-2 bg-gray-700 w-12 h-4"></span>
                        <span className="text-blue-500 text-xs md:text-sm text-center bg-gray-700 w-24 h-4"></span>
                    </h2>
                </div>
            </div>
        </div>
    )
}


export default UserEventsListSkeleton;
