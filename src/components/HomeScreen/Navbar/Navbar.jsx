import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {

    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = ( ) => {
        window.scrollY > 100
        ? handleShow(true)
        : handleShow(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => 
            window.removeEventListener("scroll", transitionNavBar);
    }, [])

    return (
        <div className={`navbar ${show && "navbar__black" }`}>
            <div className="navbar__contents">
                <img
                onClick={() => history.push("/")}
                className='navbar__logo'
                src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                alt="netflix logo"
                />

                <img
                onClick={() => history.push("/profile")}
                className='navbar__avatar'
                src="https://occ-0-4609-778.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" 
                alt="" 
                />
            </div>
        </div>
    );
};
