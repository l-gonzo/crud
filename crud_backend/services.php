<?php

include_once 'people_services.php';

$people_services = new People_Services();
switch($_SERVER['REQUEST_METHOD']) 
{
    case 'GET':
        if (isset($_GET['id'])){
            $response = $people_services->get_people_by_id($_GET['id']);
            echo $response;
            break;
        }
        else if (isset($_GET['word']))
        {
            $response = $people_services->get_peoples_by_any_word($_GET['word']);
            echo $response;
            break;
        }        
        else
        {
            $response = $people_services->get_all_people();
            echo $response;
            break;
        }
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true); // json_decode: decodifica un string de JSON y lo convierte en una variable de PHP y file_get_contents: lee un archivo completo a una cadena y "php://input": es un flujo de sólo lectura que permite leer datos del cuerpo solicitado POST
        $response = $people_services->add_people($data['first_name'], $data['last_name'], $data['birthdate']);
        echo $response;
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $response = $people_services->delete_people_by_id($data['id']);
        echo $response;
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $response = $people_services->update_people($data['id'], $data['first_name'], $data['last_name'], $data['birthsate']);
        echo $response;
        break;    
}

// para ejecutar el servicio DELETE en javascript con fetch, se usará el siguiente código:	
// fetch('http://localhost:8080/people_services.php', {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         id: 1
//     })
// }).then(res => res.json())

/* switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $response = $people_services->get_people_by_id($_GET['id']);
            echo $response;
        } else {
            $response = $people_services->get_all_people();
            echo $response;
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $response = $people_services->add_people($data['first_name'], $data['last_name'], $data['birthdate']);
        echo $response;
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $response = $people_services->update_people($data['id'], $data['first_name'], $data['last_name'], $data['birthdate']);
        echo $response;
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $response = $people_services->delete_people($data['id']);
        echo $response;
        break;
    default:
        echo "Error: Method not allowed";
        break;
} */