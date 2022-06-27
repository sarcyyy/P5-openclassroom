
fetch("http://localhost:3000/api/products")
.then(reponse => reponse.json())
.then(data => 
    {   
        while(console.log(data.length)>0){
        let valuelenght=console.log(data.lenght)-1;
        console.log(data[valuelenght].imageUrl) }
    }
)
