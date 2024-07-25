const API = 'http://localhost:3000';
const WS_API = 'ws://localhost:3000';

const populateProducts = async (category, method = 'GET', payload) => {
    const keys = ['name', 'rrp', 'info'];

    // clear the content of the div with id 'products'
    const products = document.querySelector('#products');
    products.innerHTML = '';

    const send = method === 'GET' ? {} : {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    // fetch data from the external service
    const res = await fetch(`${API}/${category}`, { method, ...send });
    const data = await res.json();

    for (const product of data) {
        const item = document.createElement('product-item');
        item.dataset.id = product.id;
        for (const key of keys) {
            const span = document.createElement('span');
            span.slot = key;
            span.textContent = product[key];
            item.appendChild(span);
        }
        products.appendChild(item);
    }
}

let socket = null;
const realtimeOrders = (category) => {
    if (socket) socket.close();
    socket = new WebSocket(`${WS_API}/orders/${category}`);
    socket.addEventListener('message', ({ data }) => {
        try {
            const { id, total } = JSON.parse(data);
            const item = document.querySelector(`[data-id=${id}]`);
            console.log('item with data-id found');
            if (item === null) return;
            const span = item.querySelector('[slot="orders"]') || document.createElement('span');
            span.slot = 'orders';
            span.textContent = total;
            item.appendChild(span);
        } catch (err) {
            console.error(err);
        }
    });
}

const category = document.querySelector('#category');
const add = document.querySelector('#add');

category.addEventListener('input', async ({ target }) => {
    add.style.display = 'block';
    await populateProducts(target.value);
    realtimeOrders(target.value);
});

add.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { target } = e;
    const payload = {
        name: target.name.value,
        rrp: target.rrp.value,
        info: target.info.value
    }
    await populateProducts(category.value, 'POST', payload);
    realtimeOrders(category.value);
    target.reset();     // reset the form after submitting
});

class Item extends HTMLElement {
    constructor() {
        super();
        const itemTemplate = document.querySelector('#item').content;
        const shadow = this.attachShadow({ mode: 'open' });     // mode -> open => shadowRoot is accessible and can be manipulated
        shadow.appendChild(itemTemplate.cloneNode(true));     // cloneNode(true) -> clone also sub components
    }
}

customElements.define('product-item', Item);
