<?php
    //importando variables de info_conexion.php
    require 'info_conexion.php';

    //Variables para insertar usuarios
    $tbNAme = 'usuarios'; //Nombre de la tabla en la que se insertan los usuarios
    $emailUser = 'nicom'; //Email del usuarios que se va a crear
    $nameUser = 'Nicolas Muñoz'; //Nombres del usuarios que se va a crear
    $passUser = '08'; //Password del usuarios que se va a crear
    $nacimientoUser = '1998-08-27'; //Fecha de nacimiento del usuarios que se va a crear en formato AAAA-MM-DD    

    //Estableciendo conexion con variable simportadas
    $conexion = new mysqli($host,$user,$password,$dbName);
    if($conexion->connect_error){
        echo "Error: ".$conexion->connect_error;
    }else {
        //sentencia para insertar usuarios
        $sql = "INSERT INTO ".$tbNAme." (email,nombre,password,fecha_nacimiento) VALUES ('".$emailUser."','".$nameUser."','".password_hash($passUser, PASSWORD_DEFAULT)."','".$nacimientoUser."');";

        //Condicional para crear usuario
        if ($conexion->query($sql) == TRUE) {
            echo "El usuario ".$nameUser." se ha creado exitosamente.";
        } else {
            echo "Se presento un error: ".$conexion->error;
        }
        
        //Cierre de conexion con la BD
        $conexion->close();
    }




 ?>
