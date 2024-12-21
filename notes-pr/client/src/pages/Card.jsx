import Button from 'react-bootstrap/Button';
import CardBs from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

function Card({ note }) {


    return (
        <>
            < CardBs style={{ width: '18rem' }} className='mb-3'>
                <CardBs.Img variant="top" src={note?.noteImage} />
                <CardBs.Body>
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