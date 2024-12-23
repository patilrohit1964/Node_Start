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
        <div>
            <div className="flex flex-col gap-4 w-52 justify-around mb-2">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
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