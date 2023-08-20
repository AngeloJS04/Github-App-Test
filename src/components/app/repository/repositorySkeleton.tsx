import React from 'react';

const RepositorySkeleton = ({ col }: { col: string }) => {
    return (
        <div className={`relative repo-card col-span-12 ${col || 'md:col-span-6'} mx-2 my-2 shadow-xl border bg-black/20 p-3  border-gray-600 rounded-lg h-36`}>
            <div className="rounded p-2">
                <div className="justify-between items-center">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center w-32 h-4 bg-gray-700 rounded'></div>
                        <div className="flex items-center w-20 h-4 bg-gray-700 rounded cursor-pointer"></div>
                    </div>
                    <div>
                        <div className="w-36 h-4 bg-gray-700 rounded mt-1"></div>
                    </div>
                    <div className='flex justify-around items-center contentBottom'>
                        <div className="w-16 h-4 bg-gray-700 rounded mt-1"></div>
                        <div className='flex'>
                            <div className="w-16 h-4 bg-gray-700 rounded mr-2"></div>
                            <div className="w-16 h-4 bg-gray-700 rounded cursor-pointer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepositorySkeleton;
