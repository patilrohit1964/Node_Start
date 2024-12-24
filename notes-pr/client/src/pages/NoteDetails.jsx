import React, { useEffect, useState } from 'react'
import { useDeleteNoteMutation, useGetNoteDetailsQuery } from '../features/api/noteApi'
import { useNavigate, useParams } from 'react-router-dom';
import NoteEdit from './NoteEdit';
import { CardSkeleton } from '../components/CardSkeleton';
import { toast } from 'react-toastify';

const NoteDetails = () => {

    const { noteId } = useParams();

    const { data, isLoading, isSuccess, isError } = useGetNoteDetailsQuery(noteId);

    const [showNoteEdit, setShowNoteEdit] = useState(false);
    const getNoteImages = (noteImage) => {
        if (noteImage.charAt(0) === "h") {
            return noteImage
        }
        return `http://localhost:8000/${noteImage}`;
    }
    return isLoading ? <CardSkeleton /> : (
        <div className='flex justify-center items-center h-screen'>
            <div className="card lg:card-side bg-base-100 shadow-xl h-96 w-96">
                <figure>
                    <img
                        src={getNoteImages(data?.note?.noteImage)}
                        alt="Album" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{data?.note?.title}</h2>
                    <p>{data?.note?.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => setShowNoteEdit(true)}>Edit</button>
                        <NoteDelete id={data?.note?._id} />
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

const NoteDelete = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteNote, { isLoading, isSuccess, isError }] = useDeleteNoteMutation()
    const navigate = useNavigate();
    const handleDelete = async () => {
        await deleteNote(id)
        setIsOpen(false);
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Note deleted successfully");
            navigate("/show-notes");
        }
        if (isError) {
            toast.error("Something went wrong")
        }
    }, [isSuccess, isError])
    return (
        <div>
            <button
                className="btn btn-danger"
                onClick={() => setIsOpen(true)}
            >
                Delete Note
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[400px] max-w-[95%]">
                        <h3 className="font-bold text-lg">Delete Note</h3>
                        <p className="py-4">Are you sure you want to delete this note?</p>
                        <div className="modal-action flex justify-end gap-3">
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                    // TODO: Add delete logic here
                                    handleDelete()
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
