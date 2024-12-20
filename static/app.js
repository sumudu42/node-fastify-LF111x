// 

const API = 'http://localhost:3000';

const keys = ['name', 'rrp', 'info'];

const populateProducts = async (category) => {
    // clear any content in the #products div
    const products = document.querySelector('#products');
    products.innerHTML = '';

    // fetch data from the remote server
    const res = await fetch(`${API}/${category}`);
    const data = await res.json();

    for (const product of data) {
        const item = document.createElement('product-item');
        for (const key of keys) {
            const span = document.createElement('span');
            span.slot = key;
            span.textContent = product[key];
            item.appendChild(span);
        }
        products.appendChild(item);
    }
}

const category = document.querySelector('#category');
category.addEventListener('input', async ({ target }) => {
    console.log('target: ', target, ' value: ', target.value);
    await populateProducts(target.value);
});

customElements.define('product-item', class Item extends HTMLElement {
    constructor() {
        super();
        const itemTemplate = document.querySelector('#item').content;
        this.attachShadow({ mode: 'open' }).appendChild(itemTemplate.cloneNode(true));
    }
});
