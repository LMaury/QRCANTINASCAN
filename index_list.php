    <html>
    
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title> QRCantina v3 : Scan    </title>
    <!-- <script src="html5-qrcode.min.js"></script> -->
    <script src="qrcantina_scan.js"></script>
    <script src="qrcantina_database.js"></script>   
    <script src="qrcantinamenu.js"></script>
    <link rel='stylesheet' href="qrindex.css" type='text/css' media='all' /> 
    
    
    
	<link rel='stylesheet' href="index.css" type='text/css' media='all' /> 
    
    
 
 
</head>
    <body>
<?php  include('menu.php'); ?>
<div class="container">

    <h1 style="font-family:arial"> QRCodeCantina ::  _ Liste Page ttt  </h1><br>
       <div id="dateojour"></div>


       <button onclick="javascript:scan()"> Nouveaux scan </button>
       <div id="messag"> Page de liste A et B </div>
       <div id="list"></div>
        <div class="scanwrapper" id="reader"></div>
        <div id="container">
        
        
        <table class="layout">
            <tr>
                <td> 
                    
                  
                </td>

            </tr>
            <tr>
                <td></td>
            </tr>
        </table>


        <br>
        <br>
        
        <br>
        <br>
        
        <br>
        <br>
        
        <br>
        <br>
        
        <br>
        <br>
        
        <br>
        <br>

        
        <br>
        <br>
        

        
        

        </div>
        <script type="text/javascript">
        var counter = 0; 
        var tday = new Date();
        var Jours = [ "lundi","mardi","mercredi","jeudi","vendredi","samedi", "dimanche" ];
        var Mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre" ]
        document.getElementById("dateojour").innerHTML =  "Le " +Jours[tday.getDay()-1] + " "+ tday.getDate() + " " + Mois[tday.getUTCMonth()];
        const Logwindow = document.getElementById("log");
        Logwindow.innerHTML= "Liste scan ...<br>";


            function isObject(objValue) {
                return objValue && typeof objValue === 'object' && objValue.constructor === Object;
            }
        
            function onScanSuccess(decodedText, decodedResult) {
                // Handle on success condition with the decoded text or result.
                console.log("Scan result: "+(decodedResult.decodedText));
                //console.log(decodedResult);
                
                
                console.log(" caract detection  :" + decodedResult.decodedText[0]);
                var r =JSON.parse(decodedResult.decodedText);

                if ((decodedResult.decodedText[0]) == "{"){
                    var r =JSON.parse(decodedResult.decodedText);
                    var Status = r.interne == 1 ? "interne" : "externe";
                    document.getElementById("message").innerHTML = "<ul><li>Nom: <span class='identity'>" + r.name +  "  " +r.firstname + "</span><br><br><span class='stat'>"+Status + "</span></li></ul>";
                    Logwindow .innerHTML += " "+tday.getHours() + "h"+tday.getMinutes()+"min </i> : " + r.name +  "  " +r.firstname + "  <br>";
                    counter++;
                    document.getElementById("count").innerHTML = counter + " ";
                    Logwindow.scrollIntoView(false);

                }else {
                    console.log("no");
                    Logwindow .innerHTML += "<br> " +tday.getHours() + "h"+tday.getMinutes()+"min </i> : xxQR Non-valide-xxx <br>";
                }
                
            }
    
            
    
        function onScanError(errorMessage) {
            // handle on error condition, with error message
            
        }
    
    
    
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess, onScanError);
 
  
   
    </script>
</div>
    </body>
    <!---<script src="index.js"></script>-->
    

    
    </html>
