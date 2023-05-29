<?php

$datas = json_decode(file_get_contents('php://input'), true);
$id = $datas["payload"];
//  echo "recherche de ".$rqname."<br>" ; 
//echo "recherche l'eleve N° ".$id." est <br>" ; 
$db = new SQLite3('qrcantina.db');
$statement = $db->prepare('SELECT  name,firstname,classeid FROM eleves WHERE  id = :id;');
$statement->bindValue(':id', $id);

$result = $statement->execute();
$resultlist = array();
$o = array();


while ($row = $result->fetchArray()) {
        $o["name"] =  $row["name"];
        $o["firstname"] = $row["firstname"] ;
        $o["classeid"] = $row["classeid"] ;   
} 
echo json_encode($o);

?>