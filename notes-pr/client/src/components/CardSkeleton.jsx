import React from 'react'

export const CardSkeleton = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="flex flex-col gap-4 h-96 w-96">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    )
}

export const CardsSkeleton = () => {
    return (
        <div className="theme-card w-80 p-4 animate-pulse dark:text-gray-200 shadow-md dark:shadow-gray-700">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
        </div>
    )
}


export const ProfileSkeleton = () => {
    return (
        <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
        </div>
    )
}
