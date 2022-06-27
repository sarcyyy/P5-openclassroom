
fetch("http://localhost:3000/api/products")
.then(reponse => reponse.json())
.then(data => 
    {   if(console.log(data.length)>0){
        let test=2;
        console.log(data[test].imageUrl)
    }
    else{
        test=5;
    }
        

    }
)
