let products = [];

fetch("./products.json")
    .then(res=>res.json())
    .then(data=>{
        products = data
    })

export{
    products
}