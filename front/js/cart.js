let i = 0;
let prixtotal = 0;
let quantitetotal = 0;
// Clear le localstorage lorsqu'on clique passer la commande
order.onclick =() =>{
localStorage.clear();
document.location.reload();

}

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
                            <p>quantité : ${quantite}</p>
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
if(localStorage.length>0){
    while (i<localStorage.length){
        let local = JSON.parse(localStorage.getItem(`canaper${i}`));
        let prixcanap = parseFloat(`${local.prix}`);
        let quantitecanap = parseFloat(`${local.quantite}`)
        quantitetotal= quantitetotal + quantitecanap;
        prixtotal = prixtotal + ( prixcanap * quantitecanap);
        additem(`${local.titre}`,`${local.couleur}`, `${local.prix}`, `${local.image}`, `${local.alt}`,`${quantitecanap}`,`${local.id}`);
        i= i+1;
        // const element = document.getElementsByClassName("deleteItem");
        // const datatest = element.dataset.id;
        // console.log(datatest);
    }
   
    // Affiche le prix et la quantité finale
    addprixtotal(`${prixtotal}`);
    addquantitetotal(`${quantitetotal}`);
}