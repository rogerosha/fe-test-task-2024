const productContainer = document.querySelector('[data-card-list]');
const loadingOverlay = document.querySelector('.loading-container');
const defaultImage = '../alternative-images/error.svg';

function createProductCardElement(product) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('product-card');

    const image = document.createElement('img');

    image.setAttribute('data-card-image', '');

    image.alt = product.title;

    if (product.image) {
        image.src = product.image;
    } else {
        image.src = defaultImage;
    }

    const titleElement = document.createElement('h5');
    titleElement.textContent = product.title;
    titleElement.classList.add('product-title');

    const priceElement = document.createElement('p');
    priceElement.textContent = `$${product.price.toFixed(2)}`;
    priceElement.classList.add('product-price');

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = product.description;

    descriptionElement.classList.add('product-description');

    cardElement.appendChild(titleElement);
    cardElement.appendChild(priceElement);
    cardElement.appendChild(descriptionElement);

    return cardElement;
}

function renderProductCards(container, products) {
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        const image = document.createElement('img');

        image.alt = product.title;
        image.classList.add('product-image');

        const title = document.createElement('h5');
        title.textContent = product.title;
        title.classList.add('product-title');

        const description = document.createElement('p');
        description.textContent = product.description;
        description.classList.add('product-description');

        const price = document.createElement('p');
        price.textContent = `$${product.price.toFixed(2)}`;
        price.classList.add('product-price');

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(price);

        container.appendChild(card);
    });
}

async function init() {
    try {
        loadingOverlay.classList.remove('hide');
        console.log('Fetching products...');
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data);
        renderProductCards(productContainer, data);
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        loadingOverlay.classList.add('hide');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    init();
});
