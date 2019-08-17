<?php
    //importando variables de info_conexion.php
    require 'info_conexion.php';

    //Tabla para consulta
    $tbNAme = 'eventos';

    //Variables del cliente
    $idEvent = $_POST['id'];

    //Sentencia para consulta
    $sql = 'DELETE FROM '.$tbNAme.' WHERE id='.$idEvent;

    //Variable global para responder al cliente
    $res = "";

    //Estableciendo conexion con variable simportadas
    $conexion = new mysqli($host,$user,$password,$dbName);
    if($conexion->connect_error){
        echo "Error: ".$conexion->connect_error;
    }else{
        if ($result = $conexion->query($sql)) {
            global $res;
            $res = 'OK';
        } else {
            global $res;
            $res= 'FALSE';
        }
    };
    print_r($res);   
    $conexion->close();  



 ?>
