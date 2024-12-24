import React, { useEffect } from 'react'
import { useGetNotesQuery } from '../features/api/noteApi'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Card from './Card';
import { CardSkeleton, CardsSkeleton } from '../components/CardSkeleton';

const ShowNote = () => {
    const { user } = useSelector((state) => state.authReducer);
    const { data, isLoading, isSuccess, isError } = useGetNotesQuery(user?._id);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Notes fetched successfully");
        }
        if (isError) {
            toast.error("failed to fetch notes");
        }
    }, [data, isLoading, isSuccess]);

    return (
        <div className='min-h-screen theme-bg'>
            <div className='flex justify-around items-center flex-wrap gap-4 mt-5 p-4'>
                {isLoading && [1, 2, 3, 4, 5, 6].map((_, index) => (
                    <CardsSkeleton key={index} />
                ))}

                {data?.notes?.length > 0 ? (
                    data?.notes.map(el => (
                        <Card note={el} key={el._id} />
                    ))
                ) : (
                    !isLoading && <div className='text-center theme-text mt-10 text-2xl'>
                        No notes found
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowNote