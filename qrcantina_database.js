
//************************************************************************************************* /
//****       ****************             BDD_Server_files                        **************** /
//*********************************************************************************************** /

async function postData(url = "", data ) {
    // Default options are marked with *
    let datas = [];
  
    datas.push({"payload":data});
    console.log("send");
    console.log(datas);
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({"payload":data}), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  

  
//************************************************************************************************* /
//****       ****************             DATABASE METHODS                        **************** /
//*********************************************************************************************** /


var output = document.getElementById("out"); 

var dataBase = (function() {  
return {    
 
       initData: function() {
          //ClasseMatchTable = GetTableCollection("classe");
          
          console.log("get data");
          
          return this.getTableCollection("eleves");

      },


      //  Send table get list of student 

      getTableCollection: async function(tableName) {
        var payload = tableName;
        console.log("TableCollection :: Load tablename " + tableName + ".......");
       //output.innerHTML = "";
        console.log("TableCollection :: waiting response ...");
        
        var ajxrq = postData("./db/getlist.php",tableName).then((data) => {
            console.log("TableCollection :: response is OK");
            livelist = data.map((element)=> {return {...element,"passed":false }});
            console.log("TAble mapped");
            //var message = (data.length != 0) ? data.name : "pas de resultats !";
                    
            console.log("TableCollection :: Datababase collection is loaded.");
            console.log("return");
            document.getElementById("remain").innerHTML = livelist.length;
            return livelist;          
          });
          // wait ..  
      },

      getRef: function(nom, prenom ,classe, stud_coll, classe_coll) {
           var cid = classe_coll.find((item) => { item.classe == classe });
           var eid =stud_coll.find((item) => { item.nom == nom });
         console.log( "l'id eleve est "+ eid.id); 
         console.log( "l'id classe est "+ cid.id); 
           return [eid.id , cid.id]
      },


      //  Send ID get name , fristname and classe 
      getID: async function(userid) {
        
        //output.innerHTML = "";
        var objectid = {};
        postData("./db/getname.php",userid).then((data) => {
            console.log("GETID ");
            
            console.log("data_request_response");
            console.log(data);
            /* data.forEach((element)=>{  output.innerHTML += element.name + "   " + element.firstname + "<br>";objectid = element; })
            }); */
            var message = (data.length != 0) ? data.name : "pas de resultats !";
            document.getElementById("stateAlert").innerHTML = message;
            objectid = element;
          })
          return objectid;
          
      /* console.log( "l'id eleve est "+ eid.id); 
      console.log( "l'id classe est "+ cid.id);
       */
        //return [eid.id , cid.id]
   },

   getClassID: function(CLid) {
    console.log("Classe ID" + CLid);
    //output.innerHTML = "";
    postData("./db/getclasslist.php",CLid).then((data) => {
    console.log("response");data.forEach((element)=>{  output.innerHTML += element.name + "   " + element.firstname + "<br>"; })
    });
  /* console.log( "l'id eleve est "+ eid.id); 
  console.log( "l'id classe est "+ cid.id);
   */
    //return [eid.id , cid.id]
},

      insert: function(OBJ)  {
          getRef (OBJ.nom, OBJ.classe)
          /*ajax PHP 
              >> insert into table passage */
      }
      
    }

      
}).apply();