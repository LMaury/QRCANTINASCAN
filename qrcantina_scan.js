//************************************************************************************************* /
//****       ****************             MAIN                  **************** /
//*********************************************************************************************** /


var stud_list = [];
var prevId = -1;
var ClasseMatchTable = "null";
var StudMatchTable = "null";
var jspass = [];
var livelist = [];
var MessageDisplay = document.getElementById("stateAlert");

updatecounter = function() {
    return livelist.filter((elmnt)=> {return elmnt.passed == false});
}

updatecounterbyLevel = function(levelcode) {
  return livelist.filter((elmnt)=> {return (elmnt.passed == false) && (elmnt.classeid == levelcode)});
}

//************************************************************************************************* /
//****       ****************             FUNCTIONS                   **************** /
//*********************************************************************************************** /


Playbeep = function () {
    var audio = new Audio('./scan/beep.mp3');
    audio.loop = false;
    audio.play(); 
}
  // function 

  function scan() {

 
        CreateList(livelist)
  }


  // Change user state to passed TRUE 
    function usercheck(nom, prenom) {
       var rank = SearchIDX(nom ,prenom,livelist ) ;
       livelist[rank].passed=true;
       var remainingcount = updatecounter().length;
       var levelstat = "Manque <div class='RemainCounter c6a'> <span class='levelmarker '></span>"+updatecounterbyLevel("6A").length+" 6A  </div> ";
       levelstat += "<div class='RemainCounter c6b'> <span class='levelmarker '></span> "+updatecounterbyLevel("6B").length+" 6B </div>";
       levelstat += "<div class='RemainCounter c5b'> <span class='levelmarker '></span> "+updatecounterbyLevel("5B").length+" 5B </div>";
       levelstat += "<div class='RemainCounter c4a'> <span class='levelmarker '></span> "+updatecounterbyLevel("4A").length+" 4A </div>";
       levelstat += "<div class='RemainCounter c4b'> <span class='levelmarker '></span> "+updatecounterbyLevel("4B").length+" 4B </div>";
       levelstat += "<div class='RemainCounter c3a'> <span class='levelmarker '></span> "+updatecounterbyLevel("3A").length+" 3A </div>";
      levelstat += "<div class='RemainCounter c3b'> <span class='levelmarker '></span> "+updatecounterbyLevel("3B").length+" 3B </div>";
       document.getElementById("remain").innerHTML = remainingcount;
       document.getElementById("remainDetail").innerHTML = levelstat ;
       CreateList(livelist);
    }

// Refresh list of student
  function CreateList(datalist) {
    var html ="<ul class='userlist'>";    
    datalist.forEach(element => {
            state = element.passed == true ? "<span style='padding-left:125px;color:green'> OK </span> ":" <span style='padding-left:125px;color:red'> en attente  </span> ";
            cline  = element.passed == true ? "style='background-color:lightgreen'":"style='color:gray'";
            html += "<li "+cline+" /><label>" + element.name + " " + element.firstname + "</label>    "+state+"</li>";
        });
        html += "</ul>";
        document.getElementById("list").innerHTML = html;
    }

  function Search(name,firstname, datalist) {
        return datalist.find((element => ((element.name === name ) && (element.firstname === firstname))));
  }


  function SearchIDX(name,firstname, datalist) {
    return datalist.findIndex((element => ((element.name == name)  && (element.firstname == firstname))));
}

function  ending_scan () {
    jspass.each((element)=> {

    });
  }

/*** MODULE ARCHITECTURE 
var scanning = (function() { 
  return {

   ....expose function to global scope   

   need to add .apply()  to use scanning.addScan() function ***/ 


var scanning = (function() { 
  return {
      // Ajoute un scan , verifie si doublons 
      addScan:function(timestamp, cardItem,cardCollection) {
          //document.getElementById("reader__scan_region").classList.remove("sameCode");
          //MessageDisplay.classList.remove("warning");
          var scanMetadata = null;
          console.log("cardscan id");
          console.log( cardItem.id);
          console.log(prevId);
          if (cardItem.id === prevId ) {
              console.log("rescan identique");
              MessageDisplay.innerHTML ="--";
              //document.getElementById("reader__scan_region").classList.add("sameCode");
              MessageDisplay.classList.add("warning");
          }else {
              scanMetadata = this.getinfo(cardItem.id);
              usercheck(scanMetadata.name, scanMetadata.firstname);
              console.log("trouve");
              console.log(scanMetadata);
              console.log(cardItem);
              document.getElementById("reader__scan_region").classList.add("success");
              Playbeep();
              console.log("affiche" + scanMetadata.name);
              MessageDisplay.innerHTML = scanMetadata.name;
              cardItem = {...cardItem,"times":timestamp};
              console.log("New cardItem objet  :" );
              console.log(cardItem);
              cardCollection.push(cardItem);
              console.log("scan OK :" + cardItem.id);
              prevId = cardItem.id;
              this.addNameInLog(scanMetadata);
          }
          return cardCollection;
      },


      ending_scan:function() {
         console.log("endingscan");
      },

      // ecrit une nouvelle ligne dans les logs 
      addNameInLog: function(cardobj) {
        var timesnapshot = new Date();
        Logwindow .innerHTML += "<span class='entry_id'><img src='./scan/card_icon.png' height='15'>&nbsp;: <span class='highlight'>" + cardobj.name +  "</span>  " +cardobj.firstname;
        Logwindow .innerHTML +=" </span><span class='entry_time'>&nbsp;&nbsp;.."+timesnapshot.getHours() + "h"+timesnapshot.getMinutes()+"::"+timesnapshot.getSeconds()+"s </i>"  + "  <br><br>";
        counter++; 
        document.getElementById("message").innerHTML = "<ul><li>Elève : <span class='numval  identity'>" + cardobj.name +  "  " +cardobj.firstname + "</span> &nbsp; Classe : <span class='numval stat'>"+cardobj.classeid  + "</span></li></ul>";
        document.getElementById("count").innerHTML = counter + " ";
      },

      getinfo: function(id) {
        var Iteminfo = livelist.find((element)=>{ return element.id === id });
        return Iteminfo;
      }
  }
}).apply();

// console.log("scanning.addScan();")
// scanning.addScan();


/* dataBase.getID(3);
dataBase.getClassID(3);
dataBase.getClassID(4); */






