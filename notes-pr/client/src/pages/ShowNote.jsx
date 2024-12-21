import React, { useEffect } from 'react'
import { useGetNotesQuery } from '../features/api/noteApi'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Card from './Card';

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
    }, [data, isLoading, isSuccess])
    return (
        <div className='h-screen'>
            <div className='flex justify-around items-center flex-wrap gap-4 mt-5'>
                {data?.notes.map(el => (
                    <Card note={el} key={el._id} />
                ))}
            </div>
        </div>
    )
}

export default ShowNote