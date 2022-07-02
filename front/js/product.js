// fonction
function itemnom(nom){ 
    const itemnom = document.createElement("h1");
    itemnom.innerHTML = `<h1>${nom}</h1>`;
    document.getElementById("title").appendChild(itemnom);
}
function itemimage(image, alt){ 
    const itemimage = document.createElement("div");
    itemimage.innerHTML = `<img src="${image}" alt="${alt}">`;
    itemimage.classList= "item__img";
    document.getElementsByClassName("item__img")[0].appendChild(itemimage);
}
function itemid(prix){ 
    const itemid = document.createElement("a");
    itemid.innerHTML = `<a>${prix}</a>`;
    document.getElementById("price").appendChild(itemid);
}

function itemdescri(description){   
    const itemdescri = document.createElement("p");
    itemdescri.innerHTML = `<p>${description}</p>`;
    document.getElementById("description").appendChild(itemdescri);
}
function itemcouleur(couleur){   
    const itemcouleur= document.createElement("option");
    itemcouleur.innerHTML= `<value=>${couleur}</value>`;
    document.getElementById("colors").appendChild(itemcouleur);
}

// récupération de l'id + création html
const queryString_url_id = window.location.search;
const id = queryString_url_id.slice(4);

fetch(`http://localhost:3000/api/products/${id}`)
.then(reponse => reponse.json())
.then( idrecup => {
    // on crée une constante pour le tableau contenant les couleurs
    const array = idrecup.colors;
    console.log(idrecup);
    itemid(idrecup.price);
    itemdescri(idrecup.description);
    itemnom(idrecup.name);
    itemimage(idrecup.imageUrl, idrecup.altTxt);
    // On appel un forEach des élement de ce tableau qui appel la fonction itemcouleur de chaque élément
    array.forEach(element=> itemcouleur(element));
    }
    )


  