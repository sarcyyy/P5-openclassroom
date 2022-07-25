// Crée toute les cards de la page d'acceuil
function Nouvellecard(id,image, nom, description, altTxt){
        
        const Nouvellecard = document.createElement("a");
        Nouvellecard.href=`./product.html?id=${id}`;
        Nouvellecard.innerHTML = `<article><img src="${image}" alt="${altTxt}"><h3>${nom}</h3><p>${description}</p></article>`;
        document.getElementById("items").appendChild(Nouvellecard);
}


fetch("http://localhost:3000/api/products")
.then(reponse => reponse.json())
 .then( data => {
   data.forEach(product => 

         Nouvellecard(product._id, product.imageUrl, product.name, product.description, product.altTxt)
   
          
)  }
)








