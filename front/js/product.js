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
    const array = idrecup.colors;   
    itemprix(idrecup.price);
    itemdescri(idrecup.description);
    itemnom(idrecup.name);
    itemimage(idrecup.imageUrl, idrecup.altTxt);
    array.forEach(element=> itemcouleur(element));
     // ------------------------------------------------Mise en localstorage
    addToCart.onclick= () =>{ 
    const tableaucanape = localStorage.getItem('canape');
    var canapevalue = {
        couleur : colors.value,
      quantite : quantity.value,
                  id : idrecup._id,
}
 if ( (parseFloat(canapevalue.quantite)) == 0 || (canapevalue.couleur == '' )){
    alert("Veuillez mettre une quantité ou une couleur");
 
    }
    else{
    if (tableaucanape == null) {
        keycanape =[canapevalue];
       localStorage.setItem('canape',JSON.stringify(keycanape));
       alert("Article commandé!");
     }
      else {

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
        alert("Article commandé!")
       }

      else {
       keycanape = JSON.parse(tableaucanape);
       canapeamodifier = keycanape[x];
       console.log(canapeamodifier);
       canapeamodifier.quantite = parseFloat(canapeamodifier.quantite)+parseFloat(canapevalue.quantite);
       console.log(canapeamodifier);
       localStorage.setItem('canape',JSON.stringify(keycanape));
       alert("Article commandé!");

     }

    }   
}
}})
