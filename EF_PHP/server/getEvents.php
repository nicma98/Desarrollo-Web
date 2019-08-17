<?php
  //importando variables de info_conexion.php
  require 'info_conexion.php';

  //Tabla para consulta
  $tbNAme = 'eventos';

  session_start();
  $userSession = $_SESSION['user'];

  //Sentencia para consulta
  $sql = 'SELECT * FROM '.$tbNAme." WHERE id_user='".$userSession."';";

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
          $i = 0;
          while ($fila = $result->fetch_assoc()) {
            global $jsonRes;
            $jsonRes['eventos'][$i]['id']=$fila['id'];
            $jsonRes['eventos'][$i]['title']=$fila['titulo'];
            $jsonRes['eventos'][$i]['start']=$fila['fecha_inicio']." ".$fila['hora_inicio'];
            $jsonRes['eventos'][$i]['allDay']=$fila['dia_completo'];
            $jsonRes['eventos'][$i]['end']=$fila['fecha_fin']." ".$fila['hora_fin'];
            $i++;
          };
      } else {
          global $jsonRes;
          $jsonRes['msg'] = 'FALSE';
      }
  };
  $resJSON = json_encode($jsonRes);
  print_r($resJSON);   
  $conexion->close();   


 ?>
