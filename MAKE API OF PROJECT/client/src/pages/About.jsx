import React from 'react';

const About = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center text-center"
            style={{ height: '100vh' }}
            data-aos="fade-right"
        >
            <div>
                <h1 className="display-5">About This Project</h1>
                <p>
                    This project is designed to help you understand the basics of full-stack development, featuring a MongoDB backend and a React frontend.
                </p>
                <ul className="list-unstyled">
                    <li>Backend: Express.js with MongoDB</li>
                    <li>Frontend: React with Vite</li>
                    <li>Styling: Bootstrap and AOS animations</li>
                </ul>
            </div>
        </div>
    );
};

export default About;
