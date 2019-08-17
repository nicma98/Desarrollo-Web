<?php
    //importando variables de info_conexion.php
    require 'info_conexion.php';

    //Tabla para consulta
    $tbNAme = 'eventos';

    //Variables de formulario ingresadas por el usuario
    $id = $_POST['id'];
    $f_inicio = $_POST['start_date'];
    $h_inicio = $_POST['start_hour'];
    $f_fin = $_POST['end_date'];
    $h_fin = $_POST['end_hour'];
    $allday = $_POST['allDay'];

    //Sentencia para consulta
    $sql = '';
    if ($allday) {
        $sql = 'UPDATE '.$tbNAme.' SET fecha_inicio="'.$f_inicio.'" WHERE id='.$id.';';
    } else {
        $sql = 'UPDATE '.$tbNAme.' SET fecha_inicio="'.$f_inicio.'", hora_inicio="'.$h_inicio.'", fecha_fin="'.$f_fin.'", hora_fin="'.$h_fin.'" WHERE id='.$id.';';
    }
    

    //Variable global para responder al cliente
    $jsonRes = array();

    //Estableciendo conexion con variable simportadas
    $conexion = new mysqli($host,$user,$password,$dbName);
    if($conexion->connect_error){
        echo "Error: ".$conexion->connect_error;
    }else{
        if ($result = $conexion->query($sql)) {
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
