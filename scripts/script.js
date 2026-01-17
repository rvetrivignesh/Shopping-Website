const myCart = [];

const toggleTheme = () => {
    const pageBody = document.getElementById("page-body");
    const toggleButton = document.getElementById("theme-toggle");

    pageBody.classList.toggle("dark");

    toggleButton.textContent = pageBody.classList.value == "dark" ? "🌞" : "🌙";
};

const loadWebsite = async () => {
    const productsData = await getProductsData();
    renderProductsArray(productsData);
    const categoryHeader = document.getElementById("products-identifier");
    categoryHeader.textContent = "All Products";
}

const getProductsData = async () => {
    const response = await fetch("./scripts/products.json");
    const data = await response.json();
    // console.log(data);
    return data;
};

const renderProductsArray = async (productsData) => {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    productsData.forEach(product => {
        // console.log(product);
        container.innerHTML += renderProduct(product);
    });
}

const renderProduct = (product) => {
    // console.log("product is", product);
    return `
            <div class="product-card">
                <img class="product-image" src="${product.image}" alt="${product.name}"></img>
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-description">${product.description}</div>
                <div class="price-container">
                    <div class="product-price">${product.price}</div>
                    <div class="product-rating">${product.rating}</div>
                </div>
                <button class="cart-button" onclick="addToCart('${product.name}')">Add to Cart</button>
            </div>
    `;
}

const renderCategory = async (category) => {
    const categoryHeader = document.getElementById("products-identifier");
    categoryHeader.textContent = category;
    const productsData = await getProductsData();
    const categoryProducts = productsData.filter(product => product.category === category);
    renderProductsArray(categoryProducts);
}

document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    if (event.target.matches("#search-input")) {
        event.preventDefault();
        searchItems();
    }
});

const searchItems = async () => {
    const searchText = document.getElementById("search-input").value;
    const categoryHeader = document.getElementById("products-identifier");
    categoryHeader.textContent = "Search Items";
    const productsData = await getProductsData();

    const query = searchText.trim().toLowerCase();
    if (!query) return [];

    const searchResult =  productsData.filter(product => {
        return (
            product.brand?.toLowerCase().includes(query) ||
            product.name?.toLowerCase().includes(query) ||
            product.image?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query)
        );
    });

    renderProductsArray(searchResult);
};

const addToCart = async (productName) => {
    const productsData = await getProductsData();

    const product = productsData.find(
        product => product.name === productName
    );

    if (!product) {
        return;
    }

    const alreadyInCart = myCart.some(
        item => item.name === product.name
    );

    if (alreadyInCart) {
        return;
    }

    myCart.push(product);
};


const displayCart = () => {
    const categoryHeader = document.getElementById("products-identifier");
    categoryHeader.textContent = "Cart Items";
    renderProductsArray(myCart);
}

loadWebsite();
