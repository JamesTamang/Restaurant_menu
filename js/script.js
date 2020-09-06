function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesReceived(data)
        }
    )
}
init();

function categoriesReceived(cats) {
    createNavigation(cats);
    createSection(cats);
    fetchProducts();

}

function createSection(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h2 = document.createElement("h2");
        h2.textContent = category;
        section.appendChild(h2);
        document.querySelector(".productList").appendChild(section);
    })
}

function catagoriesReceived(cat) {
    createNavigatin(cats);
}

function createNavigation(catagories) {
    catagories.forEach(cat => {
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href", `#${cat}`);

        document.querySelector("nav").appendChild(a);
    })
}


function fetchProducts() {

    //template
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            dataReceived(data);
        })
}

function dataReceived(products) {
    //loop
    products.forEach(showProduct)
}

//display each product individual
function showProduct(myProduct) {
    const template = document.querySelector("#productTemplate").content;

    const copy = template.cloneNode(true);
    const img = copy.querySelector(".productImage");
    img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${myProduct.image}-md.jpg`)

     if (!myProduct.discount) {
        copy.querySelector(".discountp").classList.add("hidden")
    }


    if (myProduct.vegetarian) {
        copy.querySelector(".vegetarian").classList.remove("hidden");
    }



    if (myProduct.soldout) {
        const p = document.createElement("p");
        p.textContent = "Sold Out";
        p.classList.add("soldout");
        copy.querySelector("article").appendChild(p)

    }

    if (myProduct.category == myProduct.category) {
        const parentElem = document.querySelector("section#" + myProduct.category)
    }



    copy.querySelector("div .discountp").textContent = myProduct.discount + "%";




   const article = copy.querySelector("article");


    if (myProduct.vegetarian) {
        article.classList.add("vegetarian")
    }
    if (myProduct.alcohol) {
        article.classList.add("alcoholic")
    }



    copy.querySelector(".full_name").textContent = myProduct.name;
    copy.querySelector(".short-des").textContent = myProduct.shortdescription;

    //buttin
    copy.querySelector(".but").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=` + myProduct.id)
            .then(res => res.json())
            .then(showDetails);
    });
    const parentElem = document.querySelector("section#" + myProduct.category);
    parentElem.appendChild(copy)
}
const modal = document.querySelector(".modal-background");

function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = "Description: " + data.longdescription;
    modal.querySelector(".modal-price").textContent = "Price: " + data.price;

    modal.classList.remove("hide");
}



const veggifilter = document.querySelector("#veggifilter");

veggifilter.addEventListener("click", veggiFilterClicked);

function veggiFilterClicked() {
    veggifilter.classList.toggle("active")
    const articles = document.querySelectorAll("article:not(.vegetarian)");
    articles.forEach(elem => {
        elem.classList.toggle("hidden")
    })
}

const alcoholfilter = document.querySelector("#alcohol");
alcoholfilter.addEventListener("click", alcoholFilterClicked);

function alcoholFilterClicked() {
    alcoholfilter.classList.toggle("active")

    const articles = document.querySelectorAll("article.alcoholic");

    articles.forEach(elem => {
        elem.classList.toggle("hidden")
    })

}
    modal.addEventListener("click", () => {
        modal.classList.add("hide");
    })

