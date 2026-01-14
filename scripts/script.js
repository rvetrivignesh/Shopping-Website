const loadWebsite = async () => {
    const data = await getData();
    generateCategories(data);
}


const getData = async () => {
    const response = await fetch("./scripts/products.json");
    const data = await response.json();
    console.log(data);
    return data;
};

const generateCategories = (data) => {
    for(let category in data) {
        console.log(category);
        getProductData(data[category]);
    }
}

const getProductData = (productsArray) => {
    console.log(productsArray);
    for (let product of productsArray) {
        renderProduct(product);
    }
}

loadWebsite();