// 

const API = 'http://localhost:3000';

const keys = ['name', 'rrp', 'info'];

const populateProducts = async (category, method = "GET", payload) => {
    // clear any content in the #products div
    const products = document.querySelector('#products');
    products.innerHTML = '';

    // build the response body, null in case of get request
    const send = method === "GET" ? {} : {  
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }

    // fetch data from the remote server
    const res = await fetch(`${API}/${category}`, {method, ...send});
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

const add = document.querySelector('#add');
const category = document.querySelector('#category');

category.addEventListener('input', async ({ target }) => {
    add.style.display = 'block';
    await populateProducts(target.value);
});

add.addEventListener('submit', async(e) => {
    e.preventDefault();
    const { target } = e;
    const payload = {
        name: target.name.value,
        rrp: target.rrp.value,
        info: target.info.value
    }
    await populateProducts(category.value, 'POST', payload);
    target.reset();
});

customElements.define('product-item', class Item extends HTMLElement {
    constructor() {
        super();
        const itemTemplate = document.querySelector('#item').content;
        this.attachShadow({ mode: 'open' }).appendChild(itemTemplate.cloneNode(true));
    }
});
