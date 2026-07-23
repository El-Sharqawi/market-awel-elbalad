// Javascript

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const modal = document.getElementById("productModal");

const modalImage = document.getElementById("modal-image");

const modalName = document.getElementById("modal-name");

const modalPrice = document.getElementById("modal-price");

const modalCategory = document.getElementById("modal-category");

const modalStatus = document.getElementById("modal-status");

const closeModal = document.querySelector(".close-modal");
const categoriesContainer = document.getElementById("categories");

let allProducts = [];

function displayProducts(products){

    productGrid.innerHTML="";

    if (products.length === 0) {

        productGrid.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-face-frown"></i>
                <h2>لا يوجد منتج بهذا الاسم</h2>
                <p>جرّب كلمة بحث أخرى.</p>
        </div>
    `;

    return;
}

    products.forEach(product=>{

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`

            <img src="${product.image}">

           <div class="card-body">

            <h3 class="product-name">
                ${product.name}
            </h3>

            <div class="price-row">

                <span class="price">
                    💰 ${product.price} جنيه
                </span>

            </div>

            <span class="available ${product.available ? "" : "out"}">

                ${product.available ? "🟢 متوفر" : "🔴 غير متوفر"}

            </span>

</div>

        `;

    productGrid.appendChild(card);

    card.addEventListener("click",()=>{

        modal.classList.add("show");

        modalImage.src = product.image;

        modalName.textContent = product.name;

        modalPrice.textContent = product.price + " جنيه";

        modalCategory.textContent = "القسم : " + product.category;

        modalStatus.textContent =
            product.available ? "متوفر" : "غير متوفر";

        modalStatus.style.background =
            product.available ? "#2E7D32" : "#d32f2f";

});

    });

}

function createCategories(products){

    const categories = [...new Set(products.map(product => product.category))];

    categoriesContainer.innerHTML = "";

    const allButton = document.createElement("button");

    allButton.className = "category active";

    allButton.textContent = "الكل";

    allButton.dataset.category = "الكل";

    categoriesContainer.appendChild(allButton);

    categories.forEach(category =>{

        const button = document.createElement("button");

        button.className = "category";

        button.dataset.category = category;

        button.textContent = category;

        categoriesContainer.appendChild(button);

    });

    addCategoryEvents();

}


fetch("data/products.json")
.then(response=>response.json())
.then(data=>{

    allProducts = data;

    displayProducts(allProducts);

    createCategories(allProducts);

});

searchInput.addEventListener("input",()=>{

    const value=searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product => {

        return (

            product.name.toLowerCase().includes(value) ||

            product.category.toLowerCase().includes(value) ||

            product.price.toString().includes(value)

    );

});

    displayProducts(filtered);

});

function addCategoryEvents(){

    const buttons = document.querySelectorAll(".category");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const category = button.dataset.category;

            if(category==="الكل"){

                displayProducts(allProducts);

                return;

            }

            const filtered = allProducts.filter(product=>

                product.category===category

            );

            displayProducts(filtered);

        });

    });

}

closeModal.addEventListener("click",()=>{

    modal.classList.remove("show");

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("show");

    }
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});