
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
                          <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantite}">
              
                          </div>
                          <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                        </div>
            </div>`;

    document.getElementById("cart__items").appendChild(additem);
} 
// Retourne pas d'article 
function pasdarticle (){
  const additem = document.createElement("article");
  additem.classList = "cart__item";
  additem.innerHTML= `<div class="cart__item__content">
                        <div class="cart__item__content__description">
                         <h1>Aucun article dans le panier</h1>                     
                        </div>`;
                        document.getElementById("cart__items").appendChild(additem);

}
// calcule le prix total les variables
function addprixtotal(prixfinal){
      const addprixtotal = document.createElement("a");
      addprixtotal.innerText = `${prixfinal}`;
      document.getElementById("totalPrice").appendChild(addprixtotal);
}
function addprixtotalup(prixfinal){
  document.getElementById("totalPrice").textContent=`${prixfinal}`
}
// Affiche le nombre total d'article
function addquantitetotal(quantite){
    const addquantitetotal = document.createElement("a");
    addquantitetotal.innerText = `${quantite}`;
    document.getElementById("totalQuantity").appendChild(addquantitetotal); 
}
function addquantitetotalup(quantite){
  document.getElementById("totalQuantity").textContent=`${quantite}`
}

// Crée les articles en le récupérant du Localstorage 
let local = JSON.parse(localStorage.getItem(`canape`));
if (local == null ){
  pasdarticle();
}
else{
if (local.length ==0){
  localStorage.removeItem("canape");
  document.location.reload();
}
else {
  
    for(let i = 0; i < local.length; i++){ 
      let id = local[i].id;
      fetch(`http://localhost:3000/api/products/${id}`)
.then(reponse => reponse.json())
.then(  idrecup =>  { 
  console.log(local.length);
  var y=i; // Limite les bug en stockant dans une autre variable         // VERIFIER ASYNC/AWAIT .THEN
      
        let prixcanap = parseFloat(idrecup.price); 
        let quantitecanap = parseFloat(local[i].quantite)
        quantitetotal= quantitetotal + quantitecanap;
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
     getqte[y].onchange=('keypress',function change(){
        const tableaucanape = localStorage.getItem('canape');
        keycanape = JSON.parse(tableaucanape);
        canapeamodifier = keycanape[i];
      canapeamodifier.quantite =getqte[i].value;
       if ( canapeamodifier.quantite <=0 ){
        var new_array = [];
          delete keycanape[y];
          for (var b=0; b<keycanape.length; b++){
            if( keycanape[b] != null ){ // crée un tableau qui filtre "null" quand on supprime l'élément définitivement
             new_array.push(keycanape[b]);
            }
         }
           localStorage.setItem('canape',JSON.stringify(new_array));
           document.location.reload();  
  
       }
       else {
       localStorage.setItem('canape',JSON.stringify(keycanape));
       let prixaup = document.getElementsByClassName("cart__item__content__description")[y];
       let prixaup2 = prixaup.getElementsByTagName("p")[1].textContent;
       let prixaup3 = prixaup2.slice(0, -1);
       let canapequantapres= keycanape[y].quantite;
   
       let quantitemodif = 0;
       prixfinal = 0;
       console.log("prixtotal");
       console.log(prixtotal);
       console.log(prixaup3);
       for( var b=0; b<keycanape.length;b++){   
        console.log("canapquant+prix");
        console.log(quantitecanap);
        console.log(canapequantapres);
         console.log(prixaup3);    
              quantitemodif = parseFloat(quantitemodif)+parseFloat(keycanape[b].quantite);
              console.log("quantite");
              console.log(keycanape[b].quantite);
       }
       addquantitetotalup(quantitemodif);
       let diffquant =parseFloat(canapequantapres)-parseFloat(quantitecanap);
       console.log("diffquant");
       console.log(diffquant);
       if (parseFloat(canapequantapres)>parseFloat(quantitecanap)){
        prixfinal= parseFloat(prixtotal)+(parseFloat(prixaup3)*parseFloat(diffquant));
        addprixtotalup(prixfinal);
        console.log(prixfinal);
       }
       else{
        prixfinal= parseFloat(prixtotal)+(parseFloat(prixaup3)*parseFloat(diffquant));
        addprixtotalup(prixfinal);
        console.log(prixfinal);
       }

      //  document.location.reload();  
 
       }

       }
     
    )
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

          localStorage.removeItem("canape");
          document.location.reload(); 
        }
        else{
        delete keycanape[y];
        for (var i=0; i<keycanape.length; i++){
          if( keycanape[i] != null ){ // crée un tableau qui filtre "null" quand on supprime l'élément définitivement
           new_array.push(keycanape[i]);
          }
       }
         localStorage.setItem('canape',JSON.stringify(new_array));

         document.location.reload();  
}}); 
    })}}
}
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
// ------------------------------------------------------- verification d'erreur 
if ( keycanape == null){
  alert ("Veuillez selectionner au moins un article avant de valider le formulaire");
}
else {
for (let i = 0; i< inputs.length; i++){ 
if ( (!inputs[i].value)){
  erreur = " veuillez renseigner un champ";
  alert(erreur);
}

}
// ----------------------------------------------------------------------- Utilisation regex pour le formulaire
let regexname = new RegExp('^[a-zA-Z -]{3,}$') // Utiliser trim pour les espace debut/fin de chaine et replace ( si jamais double espace)
if ( (regexname.test(inputs[0].value)) == false || ((regexname.test(inputs[1].value)) == false|| ((regexname.test(inputs[2].value)))  == false) || (regexname.test(inputs[3].value)) == false){
  console.log(inputs[0].value);
  alert("Veuillez verifier que tout les champs contiennent au moins 3 caractères.");
}
// ------------------------------------------------------- Ajout des valeurs des input formulaire + tableau ID 
else{
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

  products : arrayid,
  
}
// ------------------------------------------------------- crée la request product
console.log(formulaire);
const envoiform = fetch("http://localhost:3000/api/products/order",{
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify(formulaire),

})
// --------------------- récupère l'orderID et redirige vers la page confirmation.
.then(data => data.json())
.then( idrecup => { 
 console.log(idrecup);
 var idconfirmation = idrecup.orderId;
 console.log(idconfirmation);
 localStorage.removeItem("canape");
 window.location=`confirmation.html?id=${idconfirmation}`;


})





 
}}})


