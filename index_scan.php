<html>
    
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title> Collegi :  pour totScan Cantine QR Scan    </title>
    <script src=".\scan\html5-qrcode.min.js"></script>

    <script src="qrcantinamenu.js"></script>
    <script src="qrcantina_database.js"></script>
    <script type="text/javascript" > var ddb =  dataBase.getTableCollection("eleves"); </script>

    <link rel='stylesheet' href="./scan/index.css" type='text/css' media='all' /> 
    
    <link rel='stylesheet' href="qrindex.css" type='text/css' media='all' />
    
 
</head>
    <body>

<?php  include('menu.php'); ?>

<div class="container">
    
    <h1 style="font-family:arial">QRCantina : Scan </h1>
               <div id="counter" ><span id="dateojour"></span>  <span id ="count" class="nb">0 </span> passages  /  manque <span id="remain"></span> éléves </div> 
               <div id="remainDetail"></div>       

        <div class="output message" id="out"></div> 
        <table class="layout logwindow">
           
            <tr>
                    <td><!-- TERMINAL  , LIST OF PASSED CARD LOG -->
                        <div class="empty"> </div></td>
                </tr>
                <tr>
                    <td>     
                        <h3 id ="message"></h3>        
                    </td>
                </tr>
        </table>
        <!-- QR CODE READER   =====   -->
            <div class="scanwrapper" id="reader"></div>
        <!-- QR CODE READER   WINDOWS =====   -->
        <table class="layout logwindow">
                <tr>
                    <td><!-- TERMINAL  , LIST OF PASSED CARD LOG -->
                        <div class="inscroll"> <div id="log">.</div></div></td>
                </tr>
        </table>

        <!-- OVERLAY ON TOP , BIG MESSAGE -->
        <div id="stateAlert"> .. </div>
        <div id="container">
        <table class="twocol">
        <tr>
            <td class="two"></td>
            </tr>
            <tr>
            <td ><h2>Validation liste </h2><div id="list"></div></td>
        </tr>
        
        </table>
        </div>
            
            
        <script src="qrcantina_scan.js"></script>    
        
        <script type="text/javascript">
        var counter = 0; 
         var tday = new Date();
        var cardListed = [];
        var Jours = [ "lundi","mardi","mercredi","jeudi","vendredi","samedi", "dimanche" ];
        var Mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre" ]
        document.getElementById("dateojour").innerHTML =  " " +Jours[tday.getDay()-1] + " "+ tday.getDate() + " " + Mois[tday.getUTCMonth()];
        const Logwindow = document.getElementById("log");
        Logwindow.innerHTML= "Liste des passages  ...<br><br>";


            function isObject(objValue) {
                return objValue && typeof objValue === 'object' && objValue.constructor === Object;
            }
        
            function onScanSuccess(decodedText, decodedResult) {
                // Handle on success condition with the decoded text or result.
                console.log("Scan cardcontent: "+(decodedResult.decodedText));
                var cardScanned = (JSON.parse(decodedResult.decodedText));
                //var r_prop = (((eval("(" + decodedResult.decodedText + ")"))));
                //console.log(decodedResult);
                 
                document.getElementById("stateAlert").classList.add("visible");
                console.log(" caract detection  :" + decodedResult.decodedText[0]);
                var re = decodedResult.decodedText;
                
                
                //var r_prop = ((eval("(" + r + ")")));


                if ((decodedResult.decodedText[0]) == "{"){
                    var r =JSON.parse(decodedResult.decodedText);
                    //var card_getinfo = dataBase.getID(cardScanned.id);
                    //usercheck(cardScanned.nom,cardScanned.prenom);
                    //var Status = r.interne == 1 ? "interne" : "externe";
                    
                    // AJOUT QR CODE A LA LISTE 
                    console.log("scanning   qr :");
                    console.log(r);
                    cardListed = scanning.addScan(tday.getTime(),r,cardListed);
                    // In Addscan ---> scanning.addNameInLog(cardScanned);
                    /*Logwindow.scrollIntoView(false);*/
                

                }else {
                    console.log("no");
                    Logwindow .innerHTML += "<br> " +tday.getHours() + "h"+tday.getMinutes()+"min </i> : xxQR Non-valide-xxx <br>";
                      document.getElementById("stateAlert").classList.remove("visible");
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
