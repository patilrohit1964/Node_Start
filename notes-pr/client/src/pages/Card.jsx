import Button from 'react-bootstrap/Button';
import CardBs from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
function Card({ note }) {

    const getNoteImages = (noteImage) => {
        if (noteImage.charAt(0) === "h") {
            return noteImage
        }
        return `http://localhost:8000/${noteImage}`;
    }
    return (
        <>
            < CardBs style={{ width: '18rem' }} className='mb-3'>
                <CardBs.Img variant="top" src={getNoteImages(note?.noteImage)} />
                <CardBs.Body>
                    <span className='text-center text-sm'>{moment(note?.createdAt).format("DD-MM-YYYY")}</span>
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

export default Card;