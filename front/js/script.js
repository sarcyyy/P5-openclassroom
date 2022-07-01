function Nouvellecard(id,image, nom, description, altTxt){
        
        const Nouvellecard = document.createElement("a");
        Nouvellecard.href=`./product.html?id=${id}`;
        Nouvellecard.classList.add("items");
        Nouvellecard.innerHTML = `<article><img src="${image}" alt="${altTxt}"><h3>${nom}</h3><p>${description}</p></article>`;
        document.getElementById("items").appendChild(Nouvellecard);
}

function Clickcard(){
x = getElementById()

}
fetch("http://localhost:3000/api/products")
.then(reponse => reponse.json())
.then( data => {
   

    data.forEach(function(product) {
        console.log(product);
        Nouvellecard(product._id, product.imageUrl, product.name, product.description, product.altTxt);
    
   }
)  }
)
.catch(error => console.log(error))








