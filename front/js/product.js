// fonction
function itemnom(nom){ 
    const itemnom = document.createElement("a");
     itemnom.innerText = `${nom}`
    document.getElementById("title").appendChild(itemnom);
}
function itemimage(image, alt){ 
    const itemimage = document.createElement("div");
    itemimage.innerHTML = `<img src="${image}" alt="${alt}">`;
    itemimage.classList= "item__img";
    document.getElementsByClassName("item__img")[0].appendChild(itemimage);
}
function itemprix(prix){ 
    const itemprix = document.createElement("a");
    itemprix.innerText = `${prix}`;
    document.getElementById("price").appendChild(itemprix);
}

function itemdescri(description){   
    const itemdescri = document.createElement("p");
    itemdescri.innerText = `${description}`;
    document.getElementById("description").appendChild(itemdescri);
}
function itemcouleur(couleur){   
    const itemcouleur= document.createElement("option");
    // itemcouleur.innerHTML= `<value=>${couleur}</value>`;
    itemcouleur.value= couleur;
    itemcouleur.text=couleur;
    document.getElementById("colors").appendChild(itemcouleur);
}

// récupération de l'id + création html
const queryString_url_id = window.location.search;
const urlParams = new URLSearchParams(queryString_url_id);
const id = urlParams.get('id');
let i = 0;
if ( localStorage.length>0){
    i = localStorage.length;
}





fetch(`http://localhost:3000/api/products/${id}`)
.then(reponse => reponse.json())
.then( idrecup => {
    // on crée une constante pour le tableau contenant les couleurs
    const array = idrecup.colors;   
    itemprix(idrecup.price);
    itemdescri(idrecup.description);
    itemnom(idrecup.name);
    itemimage(idrecup.imageUrl, idrecup.altTxt);
    // On appel un forEach des élement de ce tableau qui appel la fonction itemcouleur de chaque élément
    array.forEach(element=> itemcouleur(element));
     // Mise en localstorage
    
    addToCart.onclick= () =>{
         
    const tableaucanape = localStorage.getItem('canape');
    var canapevalue = {
        couleur : colors.value,
      quantite : quantity.value,
                  id : idrecup._id,
}
 if ( (parseFloat(canapevalue.quantite)) == 0 ){
    alert("Veuillez mettre une quantité");
 
    }
    else{
    if (tableaucanape == null) {
        keycanape =[canapevalue];
       localStorage.setItem('canape',JSON.stringify(keycanape));
     }
      else {

        // for ( var x=0; x < tableaucanape.length; x++){
          var tabcanap = JSON.parse(localStorage.getItem("canape"));
          for ( var x=0; x< tabcanap.length; x++){
            var istrue=true;
            console.log(tabcanap[x]);
            if ((tabcanap[x].id == canapevalue.id) && (tabcanap[x].couleur == canapevalue.couleur))
            {
                istrue=true;
                console.log("meme item");
                break;
            }
            else {
                                    console.log("pas les memes");
                                      istrue=false;                        
                                    }
       }
       console.log(istrue);
       if ( istrue == false){
              keycanape = JSON.parse(tableaucanape);
       keycanape.push(canapevalue);
        localStorage.setItem('canape',JSON.stringify(keycanape));
       }

      
    //   else {
    //     var keycanape = JSON.parse(localStorage.getItem("canape"))
    //     console.log(keycanape[x]);
    //     tabcanap[x].quantite = parseFloat(tabcanap[x].quantite)+parseFloat(canapevalue.quantite);
    //       console.log(keycanape[x].quantite);
    //       newcanap = {
    //         couleur : colors.value,
    //       quantite : tabcanap[x].quantite,
    //                   id : idrecup._id,
                      
    // }
    // console.log(tabcanap[x]);
    //       keycanape.push(tabcanap[x]);
      

    // // keycanape = JSON.parse(tableaucanape)
  
    // //       keycanape.push(canapevalue);
    //     localStorage.setItem('canape',JSON.stringify(keycanape));
    //     }

    
     
    }   
}

           
//            for ( var x = 0; x < localStorage.length; x++){
//         //- récupérer une valeur I dans le tableau
//         var itemlocalstorage = JSON.parse(localStorage.getItem("canape"));
//         var testcanapspecvalue = itemlocalstorage;
//         console.log(testcanapspecvalue)
//                  var istrue= true;
               
//     //                 var itemlocalstorage = JSON.parse(localStorage.getItem(`canaper${x}`));
                    
//     //                 console.log(itemlocalstorage); // tout le local storage
                    
//     //                 console.log(canape); // canape actuel
//      if ((testcanapspecvalue[x].id == canapevalue.id) && (testcanapspecvalue[x].couleur == canapevalue.couleur)){
//     //                 //     nomkey = `canaper${x}`;
//    console.log("les memes");
     
//    testcanapspecvalue[x].quantite = parseFloat(testcanapspecvalue[x].quantite)+parseFloat(canapevalue.quantite);
//     //                 //     console.log("memecouleur");

//     //                 //      console.log(canape);
//     //                 //      console.log(nomkey);
//          canapevalue = {
//           couleur : colors.value,
//            quantite : testcanapspecvalue[x].quantite,
//           id : idrecup._id,    
//         }
//      console.log(canapevalue);
//     //                 //      // Utiliser .push
//     //                 //      localStorage.setItem(`${nomkey}`,JSON.stringify(canape));
//         break;
//     }
//     //                 // // tableau.filter(condition)
//                         else {
//                          console.log("pas les memes");
//                      istrue=false;                        
//                     }

//     //          }
            

//     //         }
//     //         if ( istrue == false){
//     //             localStorage.push(`${canapei}`,JSON.stringify(canape));
//     //                  i=i+1;
//     //         }
            
//         } 
        
 
}})
