let prixtotal = 0;
let quantitetotal = 0; 
//Ajoute toute les info de l'item
function additem(nom, couleur,prix, image, alt, quantite,id){
    const additem = document.createElement("article");
    additem.classList = "cart__item";
    additem.dataset.id= `${id}`;
    additem.dataset.color= `${couleur}`;
    additem.innerHTML= `<div class="cart__item__img">
                          <img src="${image}" alt="${alt}">
                        </div>
            <div class="cart__item__content">
                        <div class="cart__item__content__description">
                         <h2>${nom}</h2>
                         <p> ${couleur}</p>
                         <p>${prix}€</p>
                        </div>
                        <div class="cart__item__content__settings">
                          <div class="cart__item__content__settings__quantity">
                          <p>Qté : ${quantite}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
              
                          </div>
                          <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                        </div>
            </div>`;

    document.getElementById("cart__items").appendChild(additem);
} 

// calcule le prix total
function addprixtotal(prixfinal){
      const addprixtotal = document.createElement("a");
      addprixtotal.innerText = `${prixfinal}`;
      document.getElementById("totalPrice").appendChild(addprixtotal);
}
// Affiche le nombre total d'article
function addquantitetotal(quantite){
    const addquantitetotal = document.createElement("a");
    addquantitetotal.innerText = `${quantite}`;
    document.getElementById("totalQuantity").appendChild(addquantitetotal); 
}

// Crée les articles en le récupérant du Localstorage 
let local = JSON.parse(localStorage.getItem(`canape`));
    for(let i = 0; i < local.length; i++){ 
      // let y = i; // y ici est égal au nb d'element de classe pour supprimer et ajouter une quantité
      let id = local[i].id;
      fetch(`http://localhost:3000/api/products/${id}`)
.then(reponse => reponse.json())
.then( idrecup => { 
  console.log(local.length);
  var y=i;
      
        let prixcanap = parseFloat(idrecup.price); // récupere en float le prix
        let quantitecanap = parseFloat(local[i].quantite)// récupere en float le prix
        quantitetotal= quantitetotal + quantitecanap;// ajoute la quantité totale du produit
        prixtotal = prixtotal + ( prixcanap * quantitecanap);
        console.log(prixtotal);
        additem(idrecup.name,local[i].couleur, idrecup.price, idrecup.imageUrl, idrecup.altTxt,local[i].quantite,local[i].id);
 console.log(i);

        if ( (i+1) == local.length){ // Calcule prix total une fois que la boucle est finis
            addprixtotal(prixtotal);
            addquantitetotal(quantitetotal);}

    //  ------------------------------ Ajouter quantité --------------------
     let getqte = document.getElementsByClassName("itemQuantity");
     if (getqte[y] == null)
     { document.location.reload();

     }
     console.log(getqte[y]);
     getqte[y].addEventListener('keypress',function enter(entrer){
      if (entrer.key === 'Enter'){
        const tableaucanape = localStorage.getItem('canape');
        keycanape = JSON.parse(tableaucanape);
        canapeamodifier = keycanape[i];
       canapeamodifier.quantite = parseFloat(canapeamodifier.quantite)+parseFloat(getqte[i].value);
       localStorage.setItem('canape',JSON.stringify(keycanape));
       document.location.reload();
         
      }
     
    })
  // ----------------------------Supprimer un élement -----------------------
   let supprbtn = document.getElementsByClassName("deleteItem");
   if (supprbtn[y] == null)
     { document.location.reload();

     }
   supprbtn[y].addEventListener('click',function click(){
    var new_array = [];
      console.log("clicked");
      document.getElementsByClassName("cart__item");
      const tableaucanape = localStorage.getItem('canape');
        keycanape = JSON.parse(tableaucanape);
        if( keycanape.length == 1){

          localStorage.clear();
          document.location.reload(); 
        }
        else{
        canapeasupprimer = keycanape[i];
        delete keycanape[y];
        for (var i=0; i<keycanape.length; i++){
          if( keycanape[i] != null ){
           new_array.push(keycanape[i]);
          }
       }
         localStorage.setItem('canape',JSON.stringify(new_array));
         document.location.reload();  
}}); 
    })}
// ---------------FORMULAIRE ----------------------

var commander = document.getElementsByClassName("cart__order__form")[0];
commander.addEventListener("submit",function(e){
  e.preventDefault();
  console.log(e.target);
var erreur;
var classinput = document.getElementsByClassName("cart__order__form")[0];
var inputs = classinput.getElementsByTagName("input");
var keycanape = localStorage.getItem("canape");
var newkeycanape = JSON.parse(keycanape);
var arrayid=[];

for (let i = 0; i< inputs.length; i++){ // verification d'erreur ??
if ( (!inputs[i].value)){
  erreur = " veuillez renseigner un champ";
  alert(erreur);
}
}

 for (var z=0; z<newkeycanape.length; z++){
  
  arrayid.push( newkeycanape[z].id);
 
 }

var formulaire = {
   contact : {  

  firstName : inputs[0].value,
  lastName : inputs[1].value,
  address : inputs[2].value,
  city : inputs[3].value,
  email : inputs[4].value,
  },

  "product-ID" : arrayid.toString(),
  // "product-ID" : arrayid,
  
}
console.log(formulaire);
const envoiform = fetch("http://localhost:3000/api/products/order",{
  method: "POST",
  body: JSON.stringify(formulaire),

})
{
 
}
console.log(envoiform);
 
})

