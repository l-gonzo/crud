import React, { useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function NewPeople() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");

    function handleInputChange(e) {
        const { name, value } = e.target;
        if (name === "firstName") setFirstName(value);
        else if (name === "lastName") setLastName(value);
        else if (name === "birthdate") setBirthdate(value);
    }

    function createPeople(e) {
        e.preventDefault(); // Previene la recarga de la página
        fetch('http://localhost/crud/crud_backend/services.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, birthdate: birthdate }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate("/");
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="text-center">
            <h1>New person <IoPersonAddSharp /></h1>
        <form onSubmit={createPeople} >
            <label htmlFor="firstName">First Name</label>
            <input 
                type="text" 
                name="firstName" 
                placeholder="first name" 
                value={firstName} 
                onChange={handleInputChange}
            />
            <br />
            <label htmlFor="lastName">Last Name</label>
            <input 
                type="text" 
                name="lastName" 
                placeholder="last name" 
                value={lastName} 
                onChange={handleInputChange}
            />
            <br />
            <label htmlFor="birthdate">Birthdate</label>
            <input 
                type="date" 
                name="birthdate" 
                placeholder="birthdate" 
                value={birthdate} 
                onChange={handleInputChange}
            />
            <br />
            <button type="button" onClick={() => navigate("/")}>CANCEL <MdCancel /></button>
            <button type="submit">SAVE <IoCheckmarkCircleSharp /></button>
        </form>
        </div>
    );
}
