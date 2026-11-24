import { products } from "./data.js";

window.onload = ()=>{
    ShowData("cardsCont" , products , "productsNumber")
    showCategory("categoriesList" , GetCategory(products));

    }

async function  ShowData(containerId, data , productsNumberId){
    let productsNumber = document.getElementById(productsNumberId)
    let container = document.getElementById(containerId);
    let numberOfProducts = data.length
    productsNumber.innerHTML = numberOfProducts + " منتجات"
    container.classList.add("fade-out");
    
        await new Promise(resolve => {

        container.addEventListener("transitionend", function handler(e) {

            if (e.target === container && e.propertyName === "opacity") {

                container.removeEventListener("transitionend", handler);

                resolve();
            }

        });

    });

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
        
        container.innerHTML +=
        `
                    <div class="card">
            <img src=${Element.image} alt=${Element.title}>
            <div class="info">
                <p class="category">${Element.category}</p>
                <h4>${Element.title}</h4>
                <div class="price-box">
                    <h5 class="price">${Element.price + " ج.م"}</h5>
                    <p class=${_class}>${_text}</p>
                </div>
            </div>
        </div>
        `


    });
            container.classList.remove("fade-out");

}
function GetCategory(Data){
    let categories = [...new Set(Data.map(e=> e.category))]
    return categories
}


function showCategory(id , data) {
    let categoriesList = document.getElementById(id);
    categoriesList.innerHTML=`<option value="كل التصنيفات">كل التصنيفات</option>`
    data.forEach(e=>{
        categoriesList.innerHTML +=
        `
                            <option value=${e} >${e}</option>

        `
    })
}
    let categories= document.querySelector(".FilterBox");

    categories.addEventListener("change" , ()=>{
        let productsHead = document.getElementById("ProductsHead");
        if(categories.value == "كل التصنيفات"){
                ShowData("cardsCont" , products , "productsNumber")
                productsHead.innerHTML = "كل المنتجات"
        }else
        {
            ShowData("cardsCont" , filter(products , categories.value), "productsNumber");
            productsHead.innerHTML = categories.value
        }
        
    })

    function filter(data , value){
        let filterdData =data.filter(e=>{
            return e.category == value
        })
        return filterdData;
    }

let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input" , ()=>{
    let searchValue = searchInput.value.toLowerCase();
    let serchProducts
    if (categories.value =="كل التصنيفات") {
        serchProducts = products
    } else {
        serchProducts = filter(products , categories.value)
    }
    
    let serchedProducts = serchProducts.filter((product)=>{
        return product.title.toLowerCase().includes(searchValue);
    })
        ShowData("cardsCont" , serchedProducts , "productsNumber")

})