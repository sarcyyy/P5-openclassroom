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
console.log(id);
let i = 0;
if ( localStorage.length>0){
    i = localStorage.length;
}





fetch(`http://localhost:3000/api/products/${id}`)
.then(reponse => reponse.json())
.then( idrecup => {
    // on crée une constante pour le tableau contenant les couleurs
    const array = idrecup.colors;
    console.log(idrecup);
    itemprix(idrecup.price);
    itemdescri(idrecup.description);
    itemnom(idrecup.name);
    itemimage(idrecup.imageUrl, idrecup.altTxt);
    // On appel un forEach des élement de ce tableau qui appel la fonction itemcouleur de chaque élément
    array.forEach(element=> itemcouleur(element));
     // Mise en localstorage
    addToCart.onclick= () =>{
         
         let canapei = `canaper${i}`;
     
        const canape = {
            couleur : colors.value,
            quantite : quantity.value,
            id : idrecup._id,
        }
      
        if ( localStorage.length<=0){

            localStorage.setItem(`${canapei}`,JSON.stringify(canape));
        }
        else{
        for  (let i = 0; i < localStorage.length; i++){
            item = JSON.parse(localStorage.getItem(`canaper${i}`));
           if ( canape.id == item.id )   {
            console.log("pareil");
            break;
           
           }
           else {
            localStorage.setItem(`${canapei}`,JSON.stringify(canape));
            console.log('pas pareil');
                   }

        
        }

    }
   
    }
}
    )


   


