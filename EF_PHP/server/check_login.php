<?php
    //importando variables de info_conexion.php
    require 'info_conexion.php';

    //Tabla para consulta
    $tbNAme = 'usuarios';

    //Variables de formulario ingresadas por el usuario
    $userForm = $_POST['user'];
    $passForm = $_POST['pass'];

    //Sentencia para consulta
    $sql = 'SELECT * FROM '.$tbNAme." WHERE email='".$userForm."';";

    //Variable global de respuesta del servidor al cliente
    $res = '';

    //Estableciendo conexion con variable simportadas
    $conexion = new mysqli($host,$user,$password,$dbName);
    if($conexion->connect_error){
        echo "Error: ".$conexion->connect_error;
    }else{
        if ($result = $conexion->query($sql)) {
            $date = $result->fetch_assoc();
            $pass = $date['password'];
            $idUser = $date['id_user'];
            if (password_verify($passForm,$pass)) {
                session_start();
                global $idUser;
                $_SESSION['user']  = $idUser;
                global $res;
                $res = "OK";
            }
        } else {
            global $res;
            $res = "FALSE";
        }
    };
    print_r($res);   
    $conexion->close();     
 ?>
