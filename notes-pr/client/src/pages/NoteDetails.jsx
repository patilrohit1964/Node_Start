import React, { useState } from 'react'
import { useGetNoteDetailsQuery } from '../features/api/noteApi'
import { useParams } from 'react-router-dom';
import NoteEdit from './NoteEdit';
import {CardSkeleton} from '../components/CardSkeleton';

const NoteDetails = () => {

    const { noteId } = useParams();

    const { data, isLoading, isSuccess, isError } = useGetNoteDetailsQuery(noteId);

    const [showNoteEdit, setShowNoteEdit] = useState(false);

    return isLoading ? <CardSkeleton /> : (
        <div className='flex justify-center items-center h-screen'>
            <div className="card lg:card-side bg-base-100 shadow-xl h-96 w-96">
                <figure>
                    <img
                        src={data?.note?.noteImage}
                        alt="Album" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{data?.note?.title}</h2>
                    <p>{data?.note?.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => setShowNoteEdit(true)}>Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
            {showNoteEdit && (
                <NoteEdit onClose={() => setShowNoteEdit(false)} noteData={data?.note} />
            )}
        </div>
    )
}

export default NoteDetails