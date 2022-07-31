const queryString_url_id = window.location.search;
const urlParams = new URLSearchParams(queryString_url_id);
const id = urlParams.get('id');
console.log(id);

function affichernumerocommande(id){
    const affichernumerocommande = document.createElement("a");
    affichernumerocommande.innerText = `${id}`;
    document.getElementById("orderId").appendChild(affichernumerocommande); 
}

affichernumerocommande(id);