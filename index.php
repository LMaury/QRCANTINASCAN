<html>
    
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>QRCodeCantina :: Bienvenue V25  </title>
    <script src="html5-qrcode.min.js"></script>
    <script src="qrcantina_scan.js"></script>
    <script src="qrcantinamenu.js"></script>
	<link rel='stylesheet' href="qrindex.css" type='text/css' media='all' /> 
    
    
    
 
</head>
    <body>

<?php  include('menu.php'); ?>
<div class="container">
<br><br>

<h1 style="font-family:arial"> QRCodeCantina V3:: Bienvenue </h1>
<br><br>
<div class="presentation"  style="width:80%;margin:auto">
<p> QRcantina V3  Qrcode et scan pour indexer et gerer le passage des éleves sur les creneaux de cantine. Cette webapp permet de scanner les heures passages des éléves, consulter la liste des éléves acredités, et completer la liste des passages par classe. La v3 embarque l'historique des passages des listes. <br> Bonne utilisation      </p>

<!-- <h2> SQLite 3 </h2>
<p>  La BDD stocke les informations pour historisation </p> -->

<h2> Anonymisé </h2>
<p>  SCAN !   coche l'élève dans la liste du jour via son patronyme.</p>
<p>
    <ul>
        <li>  Id / Trigramme par carte </li>
        <li>  Liste dans SQL.lite3 </li>
    </ul>
</p>

<h2> Metadonnées </h2>
<p>La liste à jour est consultable en temps reel sous la fenêtre de scan. On peut ainsi identifier qui n'est pas encore passé .</p>

<h2> Persistent </h2>
<p>Les sessions de passages sont memorisé dans la base SQL.lite3 .</p>

</div>
</body>