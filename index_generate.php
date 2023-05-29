<!--
  - QR Code generator demo (HTML+JavaScript)
  - 
  - Copyright (c) Project Nayuki. (MIT License)
  - https://www.nayuki.io/page/qr-code-generator-library
  - 
  - Permission is hereby granted, free of charge, to any person obtaining a copy of
  - this software and associated documentation files (the "Software"), to deal in
  - the Software without restriction, including without limitation the rights to
  - use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  - the Software, and to permit persons to whom the Software is furnished to do so,
  - subject to the following conditions:
  - * The above copyright notice and this permission notice shall be included in
  -   all copies or substantial portions of the Software.
  - * The Software is provided "as is", without warranty of any kind, express or
  -   implied, including but not limited to the warranties of merchantability,
  -   fitness for a particular purpose and noninfringement. In no event shall the
  -   authors or copyright holders be liable for any claim, damages or other
  -   liability, whether in an action of contract, tort or otherwise, arising from,
  -   out of or in connection with the Software or the use or other dealings in the
  -   Software.
  -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>QRCantina v3 : Liste </title>
	<style type="text/css">
	html {
		font-family: sans-serif;
	}
	td {
		vertical-align: top;
		padding-top: 0.2em;
		padding-bottom: 0.2em;
	}
	td:first-child {
		white-space: pre;
		padding-right: 0.5em;
	}
	input[type=radio], input[type=checkbox] {
		margin: 0em;
		padding: 0em;
	}
	input[type=radio] + label, input[type=checkbox] + label {
		margin-right: 0.8em;
		padding-left: 0.2em;
	}
	
	label {
		font:0.7em;
	}

	canvas {
	width: 100%;
    height: auto;
	}

	</style>

    
    <script src="qrcantinamenu.js"></script>
	<script src="qrcantina_scan.js"></script>

	<link rel='stylesheet' href="qrindex.css" type='text/css' media='all' /> 
    
</head>



<body>

<script src="qrcantina_database.js"></script> 

<script type="text/javascript" > var ddb =  dataBase.getTableCollection("eleves"); </script>


	<?php  include('menu.php'); ?>
<div class="container">

<h1>QRCantina : Page de gestion des cartes </h1>
<p> Message :<div id="messag"></div></p>

<div class="Actionbar"> 
	<h2> Catalogue Cartes </h2>
	<p><button class="action" onclick='createcnv(livelist)'> Liste des cartes  </button></p>
	<br><br><br>
	<p id="options"><label>Recherche de QR Code par nom </label> <input id="searchbyname" type="text"> <button class="sbutton" onclick="javascript:searchqr(document.getElementById('searchbyname').value)"> Recherche </button>
	</p> 
</div>
<div id="out"></div>
<div class="cardshowpanel"> 
<div id="qrcollection"> </div>
</div>
				<div id="list"></div>
				<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

				<div style='color:lightgray!important'>
 	<table class="noborder" style="width:100%">
		<tbody>
			<tr>
				<td><strong>Text string:</strong></td>
				<td style="width:100%">#############</td>
			</tr>
			<tr>
				<td><strong>QR Code:</strong></td>
				<td>
				
					<!-- <canvas id="qrcode-canvas" style="padding:1em; background-color:#E8E8E8"></canvas> -->
                    <div style="display:none">
                    <div id="canvas1_label"></div>
                    <canvas id="canvas1" style="padding:1em; background-color:#E8E8E8"></canvas>
                    <div id="canvas2_label"></div>
                    <canvas id="canvas2" style="padding:1em; background-color:#E8E8E8"></canvas>
					<svg id="qrcode-svg" style="width:30em; height:30em; padding:1em; background-color:#E8E8E8">
						<rect width="100%" height="100%" fill="#FFFFFF" stroke-width="0"></rect>
						<path d="" fill="#000000" stroke-width="0"></path>
					</svg>
				</div>
				</td>
			</tr>
			<tr style="opacity:0">
				<td><strong>Error correction:</strong></td>
				<td>
					<input type="radio" name="errcorlvl" id="errcorlvl-low" checked="checked"><label for="errcorlvl-low">Low</label>
					<input type="radio" name="errcorlvl" id="errcorlvl-medium"><label for="errcorlvl-medium">Medium</label>
					<input type="radio" name="errcorlvl" id="errcorlvl-quartile"><label for="errcorlvl-quartile">Quartile</label>
					<input type="radio" name="errcorlvl" id="errcorlvl-high"><label for="errcorlvl-high">High</label>
				</td>
			</tr>
			<tr style="opacity:0">
				<td>Output format:</td>
				<td>
					<input type="radio" name="output-format" id="output-format-bitmap" checked="checked"><label for="output-format-bitmap">Bitmap</label>
					<input type="radio" name="output-format" id="output-format-vector"><label for="output-format-vector">Vector</label>
				</td>
			</tr>
			<tr style="opacity:0">
				<td>Border:</td>
				<td><input type="number" value="4" min="0" max="100" step="1" id="border-input" style="width:4em"> modules</td>
			</tr>
			<tr id="scale-row" style="opacity:0">
				<td>Scale:</td>
				<td><input type="number" value="8" min="1" max="30" step="1" id="scale-input" style="width:4em"> pixels per module</td>
			</tr>
			<tr style="opacity:0">
				<td>Version range:</td>
				<td>
					Minimum = <input type="number" value="1"  min="1" max="40" step="1" id="version-min-input" style="width:4em" oninput="app.handleVersionMinMax('min');">,
					maximum = <input type="number" value="40" min="1" max="40" step="1" id="version-max-input" style="width:4em" oninput="app.handleVersionMinMax('max');">
				</td>
			</tr>
			<tr style="opacity:0">
				<td>Mask pattern:</td>
				<td><input type="number" value="-1" min="-1" max="7" step="1" id="mask-input" style="width:4em"> (−1 for automatic, 0 to 7 for manual)</td>
			</tr>
			<tr style="opacity:0">
				<td>Boost ECC:</td>
				<td><input type="checkbox" checked="checked" id="boost-ecc-input"><label for="boost-ecc-input">Increase <abbr title="error-correcting code">ECC</abbr> level within same version</label></td>
			</tr>
			<tr style="opacity:0">
				<td>Statistics:</td>
				<td id="statistics-output" style="white-space:pre"></td>
			</tr>
			<tr id="svg-xml-row" style="opacity:0">
				<td>SVG XML code:</td>
				<td>
					<textarea id="svg-xml-output" readonly="readonly" style="width:100%; max-width:50em; height:15em; font-family:monospace"></textarea>
				</td>
			</tr>
		</tbody>
	</table> </div>


 ?>

 <script  src="codegenQRCore.js"></script>
<script  src="codegenQRitem.js"></script>

<!-- <script type="text/javascript" >  ddb.then((data)=> {console.log("dataok");console.log(data);})</script> -->
</body>
</html>
