function Nouvellecard(image, nom, description){
    fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then( data => {
        const Nouvellecard = document.createElement("a");
        Nouvellecard.classList.add("items");
        Nouvellecard.innerHTML = `<img src="${image}"><h3>${nom}</h3><p>${description}</p>`;
        document.getElementById("items").appendChild(Nouvellecard);
    })

}


fetch("http://localhost:3000/api/products")
.then(reponse => reponse.json())
.then( data => {

    data.forEach(function(data) {
        console.log(data.description);
        console.log(data.name);
        console.log(data.imageUrl);
        // let description = data.description;
        // const element = document.getElementById("zonetexte");
        // element.innerHTML = description;
        // const img = document.getElementById("zoneimg");
        // img.src= data.imageUrl;
        // const nom = document.getElementById("nom");
        // nom.innerHTML = data.name;
        Nouvellecard(`${data.imageUrl}`,`${data.name}`,`${data.description}`);
    
   }
   )
});

/* lier le while et utiliser fonction recherche dans ID pour créer nb case */


/*.then(data => 
    {   
        while(console.log(data.length)>0){
        let valuelenght =console.log(data.lenght)-1;
        let urlfinale = console.log(data[valuelenght].imageUrl) }
    }
  
)*/

/*.then(data => {
    let dataLength = data.length;
    let urlid = data.imageUrl;
    while (dataLength>0){
        dataLength = dataLength - 1;
        urlid= data.imageUrl;
        console.log(urlid);
    }


    console.log(dataLength);
}
)
.catch(error => console.log(error));
*/


