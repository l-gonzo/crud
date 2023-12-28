import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { useParams } from "react-router-dom";
import './styles.css'


export function UpdatePeople()
{

    const params = useParams();
    const navigate = useNavigate();
    const id = params.id; // or const { id } = useParams();
    
    const [idPeople, setIdPeople] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');

    useEffect(() => {
        fetch('http://localhost/crud/crud_backend/services.php?id=' + id)
            .then(response => response.json())
            .then(data => {
                // Asumiendo que 'data' es un array con un solo objeto
                if (data.length > 0) {
                    setIdPeople(data[0].id_people);
                    setFirstName(data[0].first_name);
                    setLastName(data[0].last_name);
                    setBirthdate(data[0].birthdate);
                }
            })
            .catch(error => console.error('Error', error));
    }, [id]);

     // Funciones para manejar los cambios en los campos de entrada
     const handleFirstNameChange = (e) => setFirstName(e.target.value, console.log(firstName));
     const handleLastNameChange = (e) => setLastName(e.target.value, console.log(lastName));
     const handleBirthdateChange = (e) => setBirthdate(e.target.value, console.log(birthdate));

     function UpdatePeople(id_people, first_name, last_name, birthdate)
     {
        fetch('http://localhost/crud/crud_backend/services.php',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id_people, first_name:first_name, last_name:last_name, birthsate:birthdate}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/');
        })
        .catch(error => console.error('Error', error));
     }


    return(
        < >
        <div className='text-center'>
            <h1>Update <GrUpdate /></h1>
            <label htmlFor="">id</label>
            <input 
                type="text" 
                disabled 
                value={idPeople}
                name="id_people"
            /> 
            <br/>
            <label htmlFor="">First Name</label>
            <input 
                type="text" 
                value={firstName}
                name="firs_name"
                onChange={handleFirstNameChange}
            /> 
            <br/>
            <label htmlFor="">Last Name</label>
            <input 
                type="text" 
                value={lastName}
                name="last_name"
                onChange={handleLastNameChange}
            /> 
            <br/>
            <label htmlFor="">Birthdate</label>
            <input 
                type="date" 
                value={birthdate}
                name="birthdate"
                onChange={handleBirthdateChange}
            />
            <br />
                <button onClick={() => navigate('/')}>Cancel <MdCancel /></button>
                <button onClick={() => UpdatePeople(id, firstName, lastName, birthdate)}>Save <IoCheckmarkCircleSharp /></button>
            </div>
        </>
    );
}