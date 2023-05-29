/* 
 * QR Code generator demo (JavaScript)
 * 
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

//************************************************************************************************* /
//****       ****************       			QR GENERATION METHODS  	          **************** /
//*********************************************************************************************** /

//************************************************************************************************* /
//****       ****************       			JS SCAN METHODS 	  	          **************** /
//*********************************************************************************************** /


"use strict";



	// interactive change by textarea 
	function initialize() {
		var elems = document.querySelectorAll("input[type=number], textarea");
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].id.indexOf("version-") != 0)
				elems[i].oninput = redrawQrCode2; // obsolete 
		}
		elems = document.querySelectorAll("input[type=radio], input[type=checkbox]");
		for (var i = 0; i < elems.length; i++)
			elems[i].onchange = redrawQrCode2;  //obsolete
		//redrawQrCode2(text,canvasid);
	};
	

	function holdtime() {
		console.log("temporize");

	}
	
function redrawQrCode2(QRmetadata,Qrtext, canvasid,canvasid_label) {
		// Show/hide rows based on bitmap/vector image output
		//var bitmapOutput = document.getElementById("output-format-bitmap").checked;


		// # ID    >  label 
		// border-input > modules  4
		// scale-input > scale pixels by module  8
		// version-min-input > min 1 
		// version-max -input > max 40 
		// mask patern > mask  -1 

		// ****** // STATIC PARAMS 
		var bitmapOutput = true;
		var ecl = qrcodegen.QrCode.Ecc.HIGH;
		var staticparams_minimum = 1 ;
		var staticparams_maximum = 40 ;
		var border=4;
		var scale = 8;
		
		//* -- sp --- */


		var scaleRow = document.getElementById("scale-row");
		var svgXmlRow = document.getElementById("svg-xml-row");
		if (bitmapOutput) {
			scaleRow.style.removeProperty("display");
			svgXmlRow.style.display = "none";
		} else {
			scaleRow.style.display = "none";
			svgXmlRow.style.removeProperty("display");
		}
		var svgXml = document.getElementById("svg-xml-output");
		svgXml.value = "";
		var userinfo = JSON.stringify(Qrtext);

		// Reset output images in case of early termination
		var canvas = document.getElementById(canvasid); 
        var c_label = document.getElementById(canvasid_label); 
		console.log("Qrtext-id "+Qrtext.id);
		//var metadata =  dataBase.getID(Qrtext.id);
		//metadata.then((data)=> {console.log("r > "+data.name); console.log(data)});
		
        c_label.innerHTML = "<p><small class='label ' classeid="+QRmetadata.classeid+" idcard="+QRmetadata.id+">   </small><b> </b>&nbsp;  &nbsp;"+ QRmetadata.firstname + "&nbsp;<b>" +QRmetadata.name[0] + "</b> </small></p>";
		var svg = document.getElementById("qrcode-svg");
		/* canvas.style.display = "none"; */
		svg.style.display = "none";
		
		
		

		
		// Get form inputs and compute QR Code
		//var ecl = getInputErrorCorrectionLevel();


		var segs = qrcodegen.QrSegment.makeSegments(userinfo);
		var minVer = parseInt(staticparams_minimum, 10);
		var maxVer = parseInt(staticparams_maximum, 10);
		var staticparams_mask = -1 ;
		var mask = parseInt(staticparams_mask, 10);
		var boostEcc = document.getElementById("boost-ecc-input").checked;
		var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
		
		// Draw image output


		//var border = parseInt(document.getElementById("border-input").value, 10);  /DYNPARAMS


		if (border < 0 || border > 100)
			return;
		if (bitmapOutput) {
			//var scale = parseInt(document.getElementById("scale-input").value, 10);  /DYNPARAMS
			
			
			if (scale <= 0 || scale > 30)
				return;
			qr.drawCanvas(scale, border, canvas);
			canvas.style.removeProperty("display");
		} else {
			var code = qr.toSvgString(border);
			svg.setAttribute("viewBox", / viewBox="([^"]*)"/.exec(code)[1]);
			svg.querySelector("path").setAttribute("d", / d="([^"]*)"/.exec(code)[1]);
			svg.style.removeProperty("display");
			svgXml.value = qr.toSvgString(border);
		}
		
		// Returns a string to describe the given list of segments.
		function describeSegments(segs) {
			if (segs.length == 0)
				return "none";
			else if (segs.length == 1) {
				var mode = segs[0].mode;
				var Mode = qrcodegen.QrSegment.Mode;
				if (mode == Mode.NUMERIC     )  return "numeric";
				if (mode == Mode.ALPHANUMERIC)  return "alphanumeric";
				if (mode == Mode.BYTE        )  return "byte";
				if (mode == Mode.KANJI       )  return "kanji";
				return "unknown";
			} else
				return "multiple";
		}
		
		// Returns the number of Unicode code points in the given UTF-16 string.
		function countUnicodeChars(str) {
			var result = 0;
			for (var i = 0; i < str.length; i++, result++) {
				var c = str.charCodeAt(i);
				if (c < 0xD800 || c >= 0xE000)
					continue;
				else if (0xD800 <= c && c < 0xDC00 && i + 1 < str.length) {  // High surrogate
					i++;
					var d = str.charCodeAt(i);
					if (0xDC00 <= d && d < 0xE000)  // Low surrogate
						continue;
				}
				throw "Invalid UTF-16 string";
			}
			return result;
		}
		
		// Show the QR Code symbol's statistics as a string
		var stats = "QR Code version = " + qr.version + ", ";
		stats += "mask pattern = " + qr.mask + ", ";
		stats += "character count = " + countUnicodeChars(Qrtext) + ",\n";
		stats += "encoding mode = " + describeSegments(segs) + ", ";
		stats += "error correction = level " + "LMQH".charAt(qr.errorCorrectionLevel.ordinal) + ", ";
		stats += "data bits = " + qrcodegen.QrSegment.getTotalBits(segs, qr.version) + ".";
		document.getElementById("statistics-output").textContent = stats;
	}
	
	
	this.handleVersionMinMax = function(which) {
		//var minElem = document.getElementById("version-min-input");  /DYNPARAMS
		//var maxElem = document.getElementById("version-max-input");   /DYNPARAMS
		//* STATIC PARAMS */
		var minElem = staticparams_minimum;
		var maxElem = staticparams_maximum;
		//* --- sp  -----*/
		var minVal = parseInt(minElem.value, 10);
		var maxVal = parseInt(maxElem.value, 10);
		minVal = Math.max(Math.min(minVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
		maxVal = Math.max(Math.min(maxVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
		if (which == "min" && minVal > maxVal)
			maxVal = minVal;
		else if (which == "max" && maxVal < minVal)
			minVal = maxVal;
		minElem.value = minVal.toString();
		maxElem.value = maxVal.toString();
		console.log("RDcode2");
		//obsolete redrawQrCode2(text,canvasid);
	}
	




	
	initialize();
   



//************************************************************************************************* /
//****       ****************       			SEARCH QR   		  	          **************** /
//*********************************************************************************************** /

	function searchqr(name) {
		console.log( 'recherche pour '+ name );
		var qrlist =  document.getElementsByClassName("uuidlabel");
		for(var index=0;index < qrlist.length;index++){
      			var element = qrlist[index];
            	console.log("watch °"+element.id+"   : search_"+name+"...");
            	element.closest("div").classList.remove("active");
            	element.closest("div").classList.add("scanned");

            	if (element.id == name)  { element.closest("div").classList.add("active");}
            	else {

            	}
		};
		document.getElementById("messag").innerHTML = "<span style='color:green'>"+list.length+"</span> QR CODE generated";
		}


//************************************************************************************************* /
//****       ****************       			CANVAS DRAW 		  	          **************** /
//*********************************************************************************************** /

	// creer la liste des QRCODES 
	function createcnv(list) {
		var matchlevelList = {"6A":"c6a", "6B":"c6b", "5B": "c5b", "4A":"c4a", "4B":"c4b", "3A":"c3a", "3B":"c3b"}; 
		console.log("la liste");
			console.log(list);
		if (list.length == 0 ) {
			 document.getElementById("messag").innerHTML = "<span style='color:red' > Liste NON TELECHARGEE correctement ! Veuillez recharger la page </span> ";
			 console.log( "Liste NON TELECHARGEE ! ");
		}else {
			list.forEach((cardDatas,index)=> {
				//console.log("Create QRCODE N°"+index+"   : qrstudent_"+index+"...");
				//document.getcardDatasById("messag").innerHTML = "Create QRCODE N°"+index;
				createCardDOM("qrstudent",index,matchlevelList[cardDatas.classeid]);
				var simplecardcontent = { id:cardDatas.id, trig:(cardDatas.firstname[0]+cardDatas.name[0]+cardDatas.name[1]).toLocaleUpperCase()}
				console.log("encode:");
				console.log(simplecardcontent);
				redrawQrCode2(cardDatas,simplecardcontent,"qrstudent_"+index,"qrstudent_label_"+index)
				console.log('...');
				//setTimeout(holdtime,2000); // run donothing after 0.5 seconds
			});
			document.getElementById("options").classList.add("visible");
			document.getElementById("messag").innerHTML = "<span style='color:green'>"+list.length+"</span> Cartes QR générées ";

		}
		
		}



	function createCardDOM(name,index, cardClassStyle) {
		//  DOMs element 
		var item = document.createElement('div');
		var rl1 = document.createElement('br');
		var rl2 = document.createElement('br');
		var rl0 = document.createElement('br');
		var logo = document.createElement('img');
		var canvas = document.createElement('canvas');
		var lbl = document.createElement('label');
		var target = document.getElementById("qrcollection");
		// Attributes of DOMs
		item.classList.add("qritem");
		item.classList.add(cardClassStyle);
		canvas.id=name+"_"+index;
		lbl.id=name+"_label_"+index;
		logo.src="logocaland.jpg";
		logo.height="45";
		logo.src="logocaland.jpg";
		// adsd child in   itemblock container
		item.append(logo);
		item.append(rl0);
		item.append(canvas);
		canvas.classList.add("qrstyle");
		item.append(lbl);
		// attach itemblock to DOMstack
		target.append(item);

	}


//************************************************************************************************* /
//****       ****************       			MAIN 		  	          **************** /
//*********************************************************************************************** /


var stud_list = [];

document.getElementById("messag").innerHTML = " Start download liste d'eleves ... ";
/* var opts = {
  headers: {
    'mode':'cors'
  }
}
fetch('./generate/userqr_list.json', { 
    method: 'GET',
    headers: {
        'mode':'no-cors'
      }
  })
  .then(function(response) { return response.json(); })
  .then(function(jsonlist) {
        stud_list = jsonlist;
        document.getElementById("messag").innerHTML = "<span style='color:green'> V </span> List d'eleves OK.("+jsonlist.length+" éleves)";
        });
 */    



// INIT 
var livelist = [];

