/*const BookingSucess =()=>{
    return(
        <div>
            <h2>Booking  Sucessful!</h2>
            <p>Thank you for booking.Your travel package will be confirm by Agency.Stay tune!!</p>
        </div>
    )
};
export default BookingSucess;*/


import React from 'react';
import './agency.css';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported

const BookingSucess = () => {
    const navigate = useNavigate(); // <--- YOU WERE MISSING THIS LINE

    return (
        <div className='sucess-container'>
            <h2>Booking Successful!</h2>
            <p>“Thank you for booking with us! Your travel package will be confirmed by the agency soon. Stay tuned 😊”</p>
            <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );
};

export default BookingSucess;
