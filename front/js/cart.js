
let prixtotal = 0;
let quantitetotal = 0;
// Clear le localstorage lorsqu'on clique passer la commande
order.onclick =() =>{
localStorage.clear();
document.location.reload(); }



// Ajoute la quantité souhaité



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

// Crée les articles en le récupérant du Localstorage + supprElement
if(localStorage.length>0){

   
    for (let i = 0; i < localStorage.length; i++){ 
      let local = JSON.parse(localStorage.getItem(`canaper${i}`));
      let id = `${local.id}`;
      fetch(`http://localhost:3000/api/products/${id}`)
.then(reponse => reponse.json())
.then( idrecup => { 
  console.log(idrecup);
        let prixcanap = parseFloat(`${idrecup.price}`);
        let quantitecanap = parseFloat(`${local.quantite}`)
        quantitetotal= quantitetotal + quantitecanap;
        console.log(quantitetotal);
        console.log(prixcanap);
        prixtotal = prixtotal + ( prixcanap * quantitecanap);
        console.log(prixtotal);
        additem(`${idrecup.name}`,`${local.couleur}`, `${idrecup.price}`, `${idrecup.imageUrl}`, `${idrecup.altTxt}`,`${quantitecanap}`,`${local.id}`);

        // -----------------VERIFIE DOUBLON ------------------------
          //isSame(`${local.id}`);
        //  console.log(isSame);
        // --------------------- FIN VERIFIE DOUBLON-----------------------
        console.log(i);
        // ----------------------------Supprimer un élement ?? à faire :addeventlistener-----------------------
          // var btnsuppr = document.getElementsByClassName("deleteItem");
        //  btnsuppr[i].onclick=supprimer(local.id);
        // console.log(btnsuppr);
        // btnsuppr[i].addEventListener('click', function handleClick() {
        //   console.log(i);
        //    const index = i.toString();
        //   supprimer(index);
        // });
        i= i+1;
          if ( i == localStorage.length){
    addprixtotal(`${prixtotal}`);
    addquantitetotal(`${quantitetotal}`);
  }
    })}
//  console.log(btnsuppr);
    // Affiche le prix et la quantité finale
  
}


