let i = 0;
let prixtotal = 0;
function additem(nom, couleur,prix){
    const additem = document.createElement("article");
    additem.innerHTML = ` <h2>${nom}</h2><p>${couleur}</p><p>${prix}€</p>`
    additem.classList = "cart__item";
    document.getElementById("cart__items").appendChild(additem);


} 





if(localStorage.length>0){
    while (i<localStorage.length){
        let local = JSON.parse(localStorage.getItem(`canaper${i}`));
        let prixcanap = parseFloat(`${local.prix}`);
        prixtotal = prixtotal + prixcanap;
        console.log(prixcanap);
        additem(`${local.titre}`,`${local.couleur}`, `${local.prix}`);
        i= i+1;
        console.log(local);
      

    }
console.log(i);
}