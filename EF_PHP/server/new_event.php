<?php
    //importando variables de info_conexion.php
    require 'info_conexion.php';

    //Tabla para consulta
    $tbNAme = 'eventos';

    session_start();
    $userSession = $_SESSION['user'];
    $titulo = $_POST['titulo'];
    $fecha_inicio = $_POST['start_date'];
    $hora_inicio = $_POST['start_hour'];
    $fecha_fin = $_POST['end_date'];
    $hora_fin = $_POST['end_hour'];
    $Allday = $_POST['allDay'];

    //Sentencia para consulta
    $sql = "INSERT INTO ".$tbNAme." (id_user,titulo,fecha_inicio,hora_inicio,fecha_fin,hora_fin,dia_completo) VALUES ('".$userSession."','".$titulo."','".$fecha_inicio."','".$hora_inicio."','".$fecha_fin."','".$hora_fin."','".$Allday."');";

    //Variable global de respuesta del servidor al cliente
    $jsonRes = array();

    //Estableciendo conexion con variable simportadas
    $conexion = new mysqli($host,$user,$password,$dbName);
    if($conexion->connect_error){
        echo "Error: ".$conexion->connect_error;
    }else{
        if ($conexion->query($sql)) {
            global $jsonRes;
            $jsonRes['msg'] = 'OK';
        } else {
            global $jsonRes;
            $jsonRes['msg'] = 'FALSE';
        }
    };
    $resJSON = json_encode($jsonRes);
    print_r($resJSON);   
    $conexion->close();     

 ?>
