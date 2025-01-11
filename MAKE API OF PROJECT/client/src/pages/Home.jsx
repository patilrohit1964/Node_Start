import React from 'react';

const Home = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center text-center"
            style={{ height: '100vh' }}
            data-aos="fade-up"
        >
            <div>
                <h1 className="display-4">Welcome to the Fullstack Project</h1>
                <p className="lead">Learn full-stack development with ease!</p>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnMaynl-S6sKAaY4PuRiG88aG3Y39MyxNPA&s"
                    className="img-fluid rounded"
                    alt="Welcome"
                    data-aos="zoom-in"
                />
            </div>
        </div>
    );
};

export default Home;
