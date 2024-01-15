const productListContainer = document.getElementById("product-list-container");
console.log(productListContainer);
const productUrl = "./Images/product.png";
const searchInput = document.getElementById("searchInput");
const list = document.getElementById("listView");
const menu = document.getElementById("menu");
const apiUrl = "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093";

const productsList = (products) =>{
    let searchValue;
    products.forEach(product => {
        const {product_image,product_badge,product_variants,product_title} = product;
        // Creating List Element
        const listElement = document.createElement("li");
        // Creating Image Container
        const productImageContainer = document.createElement("div");
        productImageContainer.classList.add("product-image-size");
        //creating badge element
        const badgeElement = document.createElement("p");
        badgeElement.textContent = product_badge;
        badgeElement.classList.add("badge");   
        productImageContainer.appendChild(badgeElement);
        // Creating Product Info
        const productInfo = document.createElement("div");
        const h2Element = document.createElement(`h2`);
        h2Element.textContent = product_title;
        h2Element.style.marginBottom = "15px";
        productInfo.appendChild(h2Element);
        // higlighting product Title
        searchInput.addEventListener("input",(event) =>{
            searchValue = event.target.value.toLowerCase();
            if (searchValue){
                if (product_title.toLowerCase().includes(searchValue)){
                h2Element.classList.add("highlighted-style");
            }else{
                h2Element.classList.remove("highlighted-style");
            }
            }else{
                h2Element.classList.remove("highlighted-style");
            }
        })
        product_variants.forEach((eachVariant) =>{
            let searchValue;
            const {v1,v2,v3} = eachVariant;
            const varaintElement = document.createElement("p");
            searchInput.addEventListener("input",(event) =>{
            searchValue = event.target.value.toLowerCase();
            console.log("Search Value......... in each var",searchValue);
            if (searchValue){
                if (v1){
                if (v1.toLowerCase().includes(searchValue)){
                    varaintElement.classList.add("highlighted-style");
                }else{
                    varaintElement.classList.remove("highlighted-style");
                }
            }
            else if (v2){
                if (v2.toLowerCase().includes(searchValue)){
                    varaintElement.classList.add("highlighted-style");
                }else{
                    varaintElement.classList.remove("highlighted-style");
                }
            }
            else if (v3){
                if (v3.toLowerCase().includes(searchValue)){
                    varaintElement.classList.add("highlighted-style");
                }else{
                    varaintElement.classList.remove("highlighted-style");
                }
            }
            }else{
                varaintElement.classList.remove("highlighted-style");
            }
            
        });
            if (v1){
                varaintElement.textContent = v1;
            }else if (v2){
                varaintElement.textContent = v2;
            }else if (v3){
                varaintElement.textContent = v3;
            }
            varaintElement.classList.add("product-variant");
            productInfo.appendChild(varaintElement);
        })
        console.log("Search Value........",searchValue);
        listElement.appendChild(productImageContainer);
        listElement.appendChild(productInfo);
        menu.addEventListener("click",() =>{
            productListContainer.classList.remove("product-list-container");
            productListContainer.classList.add("product-list-container-grid");
            listElement.classList.remove("product-item");
            listElement.classList.add("list-view-grid");
            badgeElement.classList.remove("badge");
            badgeElement.classList.add("badge-grid");
            productImageContainer.classList.add("image-container");
        })
        list.addEventListener("click",() =>{
            productListContainer.classList.add("product-list-container");
            productListContainer.classList.remove("product-list-container-grid");
            listElement.classList.add("product-item");
            listElement.classList.remove("list-view-grid");
            badgeElement.classList.add("badge");
            badgeElement.classList.remove("badge-grid");
            productImageContainer.classList.remove("image-container");
        });
        listElement.classList.add("product-item");
        badgeElement.classList.add("badge");
        productListContainer.classList.add("product-list-container");
        productListContainer.appendChild(listElement);
    });
}
const productsData = async () =>{
    try{
        const response = await fetch(apiUrl);
        const responseData = await response.json()
        const {data:products} = responseData;
        productsList(products)
    }catch(error){
        console.log("Error occured in fetching products data",error)
    }

}

productsData()
