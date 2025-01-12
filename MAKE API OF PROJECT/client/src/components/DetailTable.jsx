import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

const DetailTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Store the selected user for editing

    // Fetch all users
    const fetchUsers = async () => {
        const { data } = await axios.get('http://localhost:9090/user/');
        setUsers(data.users);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete user
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:9090/user/${id}`);
        alert('User deleted successfully');
        fetchUsers();
    };

    // Update user
    const updateUser = async (id, updatedData) => {
        await axios.put(`http://localhost:9090/user/${id}`, updatedData);
        alert('User updated successfully');
        fetchUsers();
        setModalShow(false);
    };

    return (
        <div className="mt-5">
            <Table responsive hover className='mt-5'>
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>Role</th>
                        <th>Location</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((el, index) => (
                        <tr key={el._id}>
                            <td>{index + 1}</td>
                            <td>{el.username}</td>
                            <td>{el.email}</td>
                            <td>{new Date(el.dob).toLocaleDateString()}</td>
                            <td>{el.role}</td>
                            <td>{el.location}</td>
                            <td>
                                <div className="d-flex align-items-center justify-content-around">
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedUser(el); // Set the selected user
                                            setModalShow(true); // Show the modal
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteUser(el._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {selectedUser && (
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    user={selectedUser}
                    onSave={(updatedData) =>
                        updateUser(selectedUser._id, updatedData)
                    }
                />
            )}
        </div>
    );
};

export default DetailTable;

function MyVerticallyCenteredModal({ user, onSave, ...props }) {
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        role: user?.role || '',
        dob: user?.dob || '',
        location: user?.location || '',
    });

    useEffect(() => {
        setFormData({
            username: user.username,
            email: user.email,
            role: user.role,
            dob: user.dob,
            location: user.location,
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData); // Pass the updated data back to the parent
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDOB">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Explorer">Explorer</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
