import { products } from "./data.js";

window.onload = ()=>{
    ShowData("cardsCont" , products , "productsNumber")
    console.log("MOHAMED");
    
    }

function ShowData(containerId, data , productsNumberId){
    let productsNumber = document.getElementById(productsNumberId)
    let container = document.getElementById(containerId);
    let numberOfProducts = data.length
    productsNumber.innerHTML = numberOfProducts + " منتجات"
    container.innerHTML =``
    data.forEach((Element,i) => {
        let _class;
        let _text
        if (Element.availability) {
            _class = "green"
            _text ="متاح"
        } else {
            _class = "red"
            _text ="غير متاح"
        }
        console.log(Element.image);
        
        container.innerHTML +=
        `
                    <div class="card">
            <img src=${Element.image} alt=${Element.title}>
            <div class="info">
                <p>${Element.category}</p>
                <h4>${Element.title}</h4>
                <div class="price-box">
                    <h5 class="price">${Element.price + " ج.م"}</h5>
                    <p class=${_class}>${_text}</p>
                </div>
            </div>
        </div>
        `
    });

}


