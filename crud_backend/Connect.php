<?php
// Permite solicitudes de cualquier origen. 
// Para mayor seguridad, reemplaza '*' con el dominio de tu frontend
header('Access-Control-Allow-Origin: *');

// Permite los siguientes métodos HTTP
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');

// Permite encabezados específicos
header('Access-Control-Allow-Headers: Content-Type');

class Connect {
    private $host = 'localhost';
    private $db   = 'people';
    private $user = 'root';
    private $pass = 'root123';
    private $charset = 'utf8mb4';
    private $conn;

    public function connect() {
        $this-> conn = null;
        try 
        {
            $this->conn = new PDO("mysql:host".$this->host.";dbname=".$this->db, $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("USE people;");
        }
        catch (PDOException $e)
        {
            echo 'Connection failed: ' . $e->getMessage();
        }

        return $this->conn;
    }

    public function close() {
        $this->conn = null;
    }
}
