import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { data, useNavigate } from 'react-router-dom';
import { useCreateNoteMutation } from '../features/api/noteApi';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [noteImage, setNoteImage] = useState(null);
    const navigate = useNavigate();
    const [createNote, { isLoading, isError, error, isSuccess }] = useCreateNoteMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            if (noteImage) {
                formData.append("file", noteImage);
            }
            await createNote(formData);
        } catch (err) {
            console.error("Error creating note:", err);
            toast.error("Error creating note");
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Note created successfully");
            navigate("/show-notes");    
            setTitle("");
            setDescription("");
            setNoteImage(null);
        }
        if (isError) {
            toast.error(error?.data?.message || "Something went wrong")
        }
    }, [isSuccess, isError, error, navigate])

    return (
        <div className='flex justify-center items-center h-screen overflow-hidden'>
            <Form onSubmit={handleSubmit} className='border border-gray-300 rounded-lg p-5'>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" className='mb-4' >
                        <Form.Label>Note Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="12" className='mb-4' >
                        <Form.Label>Note Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Note Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="12" className='mb-4' >
                        <Form.Label>Note Image</Form.Label>
                        <InputGroup>
                            <Form.Control
                                required
                                type="file"
                                accept='image/*'
                                onChange={(e) => setNoteImage(e.target.files[0])}
                                name="file"
                            />
                        </InputGroup>
                        {noteImage && (
                            <div className='mt-2 h-40 w-40 m-auto'>
                                <img
                                    src={URL.createObjectURL(noteImage)}
                                    alt="Note Preview"
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        )}
                    </Form.Group>
                </Row>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner animation='border' size='sm' /> : "Submit form"}
                </Button>
            </Form>
        </div>
    )
}

export default CreateNote