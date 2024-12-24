import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card as CardBs, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const Card = ({ note }) => {

    const getNoteImages = (noteImage) => {
        if (noteImage.charAt(0) === 'h') {
            return noteImage
        } else {
            return `http://localhost:8000/${noteImage}`
        }
    }

    return (
        <>
            < CardBs style={{ width: '18rem' }} className='mb-3 dark:text-gray-200 shadow-md dark:shadow-gray-700'>
                <div className='w-[286px] h-[170px]'>
                    <CardBs.Img variant="top" src={getNoteImages(note?.noteImage)} className='w-full h-full object-cover' />
                </div>
                <CardBs.Body>
                    <span className='text-center text-sm mb-3'>created at {moment(note?.createdAt).format("DD-MM-YYYY")}</span>
                    <CardBs.Title>{note?.title}</CardBs.Title>
                    <CardBs.Text>
                        {note?.description}
                    </CardBs.Text>
                    <NavLink to={`/note-details/${note?._id}`} className='block m-auto'>
                        <Button variant="primary">See Note Details</Button>
                    </NavLink>
                </CardBs.Body>
            </CardBs >
        </>

    );
}

export default Card