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
         
         let canapei = `canaper${i}`;
     
        var canape = {
            couleur : colors.value,
            quantite : quantity.value,
            id : idrecup._id,
        }
       
        if ( localStorage.length==0){
                     localStorage.setItem(`${canapei}`,JSON.stringify(canape));
                     i=i+1;
                }
            else {
             for ( var x = 0; x < localStorage.length; x++){
                var istrue= true;
               
                    var itemlocalstorage = JSON.parse(localStorage.getItem(`canaper${x}`));
                    
                    console.log(itemlocalstorage); // tout le local storage
                    
                    console.log(canape); // canape actuel
                    if ((itemlocalstorage.id == canape.id) && (itemlocalstorage.couleur == canape.couleur)){
                        nomkey = `canaper${x}`;
                    console.log("les memes");
                        istrue = true;
                        itemlocalstorage.quantite = parseFloat(itemlocalstorage.quantite)+parseFloat(canape.quantite);
                        console.log("memecouleur");
                     console.log(itemlocalstorage);
                         console.log(canape);
                         console.log(nomkey);
                         canape = {
                          couleur : colors.value,
                          quantite : itemlocalstorage.quantite,
                          id : idrecup._id,
                         }
                         localStorage.setItem(`${nomkey}`,JSON.stringify(canape));
                        break;
                    }
                    else {
                        console.log("pas les memes");
                        istrue=false;                        
                    }
                    
                    

             }
            

            }
            if ( istrue == false){
                localStorage.setItem(`${canapei}`,JSON.stringify(canape));
                     i=i+1;
            }
            
            

          
    //     if ( localStorage.length<=0){

    //         localStorage.setItem(`${canapei}`,JSON.stringify(canape));
    //     }
    //     else{
    //     for  (let x = 0; x < localStorage.length; x++){
    //         var item = JSON.parse(localStorage.getItem(`canaper${x}`));

    //        if  (canape.id == item.id) {
    //         console.log("pareil");
    //         break;
           
    //        }
    //        else {
    //         localStorage.setItem(`${canapei}`,JSON.stringify(canape));
    //         i=i+1;
    //         console.log('pas pareil');
           
    //                }

        
    //     }

    // }
   
    }
} 
    )


   


