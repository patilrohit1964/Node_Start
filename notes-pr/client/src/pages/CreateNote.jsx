import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [noteImage, setNoteImage] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', title, description, noteImage);
    }

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
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" className='mb-4' >
                        <Form.Label>Note Image</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="file"
                                placeholder="Note Image"
                                aria-describedby="inputGroupPrepend"
                                accept='image/*'
                                onChange={(e) => setNoteImage(e.target.files[0])}
                            />
                        </InputGroup>
                        {noteImage && (
                            <div className='mt-2 h-40 w-40 m-auto'>
                                <img src={URL.createObjectURL(noteImage)} alt="Note Image" className='w-full h-full object-cover' />
                            </div>
                        )}
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
            </Form>
        </div>
    )
}

export default CreateNote