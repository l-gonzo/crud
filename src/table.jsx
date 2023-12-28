import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './styles.css';

export function Board(param) {
    const [people, setPeople] = useState([]);
    const [idPeople, setIdPeople] = useState(0);
    const navigate = useNavigate();

    
    useEffect(() => {
        let url = 'http://localhost/crud/crud_backend/services.php';
        if (param.param !== null || param.param !== '') {
            url += '?word=' + param.param;
        }
        console.log('param', param.param);
        console.log('url', url);

        fetch(url) 
            .then(response => response.json())
            .then(data => setPeople(data))
            .catch(error => console.error('Error:', error));
    }, [param]);
    
    console.log('people', people);

    function deletePeople(ID) {

        const data = {id:ID};

        fetch('http://localhost/crud/crud_backend/services.php', 
        {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response =>response.json())
        .then(() => {
            let url2 = 'http://localhost/crud/crud_backend/services.php';
            if (param.param !== null || param.param !== '') {
                url2 += '?word=' + param.param;
            }
            console.log('param', param.param);
            console.log('url2', url2);

            fetch(url2) 
            .then(response => response.json())
            .then(data => setPeople(data))
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error', error))
        }

    return (
        <div className='center-anything'>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Birthdate</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                {people.map(person => (
                    <tr key={person.id_people}>
                        <td>{person.id_people}</td>
                        <td>{person.first_name}</td>
                        <td>{person.last_name}</td>
                        <td>{person.birthdate}</td>
                        <td>
                            <button onClick={() => deletePeople(person.id_people)}>
                                <MdDelete />
                            </button>
                        </td>
                        <td>
                            <button onClick={() => navigate('/update-people/'+person.id_people)}>
                                <GrUpdate />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
