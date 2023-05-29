<?php

$datas = json_decode(file_get_contents('php://input'), true);
$id = $datas["payload"];
//  echo "recherche de ".$rqname."<br>" ; 
//echo "recherche de la classe  ".$id."<br>" ; 
$db = new SQLite3('qrcantina.db');
$statement = $db->prepare('SELECT  name,firstname,classeid FROM eleves WHERE  classeid = :id;');
$statement->bindValue(':id', $id);

$result = $statement->execute();
$resultlist=array();

while ($row = $result->fetchArray()) {
    array_push($resultlist,$row);
    //echo $row["name"]."    ".$row["firstname"]."      ".$row["classeid"]."<br>";
} 

//echo "<br>La classe comporte <b>".count($resultlist)."</b> eleves(s)<br>"; 

echo json_encode($resultlist);
//echo "recherche de ".json_decode($rqfname)."<br>"
?>