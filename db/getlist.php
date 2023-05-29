<?php

$datas = json_decode(file_get_contents('php://input'), true);
$tablename = $datas["payload"];
//  echo "recherche de ".$rqname."<br>" ; 
//echo "recherche de la classe  ".$id."<br>" ; 
$db = new SQLite3('qrcantina.db');
$statement = $db->prepare('SELECT '.$tablename.'.id as id, '.$tablename.'.name, '.$tablename.'.firstname, classes.name as classename FROM '.$tablename.' INNER JOIN classes ON eleves.classeid = classes.id');
//$statement->bindValue(':tablename', $tablename);

$result = $statement->execute();
$entry=array();
$allrowResult = array();

while ($row = $result->fetchArray()) {
    $entry["id"] =  $row["id"];
    $entry["name"] =  $row["name"];
    $entry["firstname"] = $row["firstname"] ;
    $entry["classeid"] = $row["classename"] ;   
    array_push($allrowResult, $entry);
} 


//echo "<br>La classe comporte <b>".count($resultlist)."</b> eleves(s)<br>"; 

echo json_encode($allrowResult, true);
//echo "recherche de ".json_decode($rqfname)."<br>"
?>