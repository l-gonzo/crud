<?php

include_once 'Connect.php';

$conn = new Connect();

class People_Services
{
    function get_all_people() {
        global $conn;
        $query = "SELECT * FROM people_info;";
        try {
            $stmt = $conn->connect()->prepare($query);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
            return json_encode($result);
        } catch (PDOException $e) {
            echo "Error en la consulta: " . $e->getMessage();
        }
    }

    function get_people_by_id($id){
        global $conn;
        $query = "SELECT * FROM people_info WHERE id_people = ?;";
        try{
            $stmt = $conn->connect()->prepare($query);
            $stmt->execute(array($id));
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($result);
        } catch (PDOException $e){
            echo "Error " . $e->getMessage();
        }
    }

    function get_peoples_by_any_word($word)
    {
        global $conn;
        $likeWord = '%' . $word . '%';
        $query = "SELECT * FROM people_info WHERE id_people LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR birthdate LIKE ?;";
        try
        {
            $stmt = $conn->connect()->prepare($query);
            $stmt->execute(array($likeWord, $likeWord, $likeWord, $likeWord));
            $result = $stmt->fetchAll();
            return json_encode($result);
        }
        catch (PDOException $e)
        {
            echo 'Error: ' . $e->getMessage(); 
        }
    }

    function add_people($first_name, $last_name, $birthdate)
    {
        global $conn;
        $query = "INSERT INTO people_info (first_name, last_name, birthdate) VALUES (?, ?, ?);";
        try
        {
            $stmt = $conn->connect()->prepare($query);
            $stmt->execute(array($first_name, $last_name, $birthdate));
            $result = $stmt->fetchAll();
            return json_encode($result);
        }
        catch(PDOException $e)
        {
            echo "Error en la consulta: " . $e->getMessage();
        }
    }

    function delete_people_by_id($id)
    {
        global $conn;
        $query = "DELETE FROM people_info WHERE id_people=?;";
        try
        {
            $stmt = $conn->connect()->prepare($query);
            $stmt->execute(array($id));
            $result = $stmt->fetchAll();
            return json_encode($result);
        }
        catch(PDOException $e)
        {
            echo "Error at update: " . $e->getMessage();
        }
    }

    function update_people($id, $first_name, $last_name, $birthdate){
        global $conn;
        $query = "UPDATE people_info SET first_name=?, last_name=?, birthdate=? WHERE id_people=?;";
        try{
            $stmt = $conn->connect()->prepare($query);
            $stmt->execute(array($first_name, $last_name, $birthdate, $id));
            $result = $stmt->fetchAll();
            return json_encode($result);
        }
        catch (PDOException $e)
        {
            echo 'Error: ' . $e->getMessage();
        }
    }
}
