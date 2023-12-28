import {Board} from './table';
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";
import { NewPeople } from './new_people';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaReact } from "react-icons/fa";
import "./styles.css";
import { useState } from 'react';


function App() {
  
const people = [];
const navigate = useNavigate();
const [word, setWord] = useState('');

function goCreatePeople() {
  navigate('/new-people');
  console.log("goCreatePeople");

  
}

  return (
    <>
    <div className='text-center'>
      <h1 >The CRUD <FaReact /></h1>
      <br />
      <input type="text" placeholder="Search" name='' onChange={(e) => setWord(e.target.value, console.log(word))}/>
      <button onClick={goCreatePeople}><IoPersonAddSharp /></button>
      <br />
      <Board param={word}/>
    </div>
    </>
  );
}

export default App;
