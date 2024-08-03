const API = 'http://localhost:3000';
const WS_API = 'ws://localhost:3000';

// const data = [
//     {id: 'A1', name: 'Vacuum Cleaner', rrp: 100.00, info: 'The suckiest vacuum in the world.'},
//     {id: 'A2', name: 'Leaf Blower', rrp: 250.00, info: 'This product will blow your socks off.'},
//     {id: 'B1', name: 'Chocolate bar', rrp: 20.00, info: 'Delicious overpriced chocolate.'}
// ];

const populateProducts = async (category, method='GET', payload) => {
    /** clear any content in the products div element */
    const products = document.querySelector('#products');
    products.innerHTML = '';

    /** fetch data from the mock server */
    const send = method === 'GET' ? {} : {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }
    const res = await fetch(`${API}/${category}`, {method, ...send});
    const data = await res.json();

    for(const product of data) {
        const item = document.createElement('product-item');
        item.dataset.id = product.id;
        for(const key of ['name', 'rrp', 'info']) {
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
    if(socket) socket.close();
    socket = new WebSocket(`${WS_API}/orders/${category}`);
    socket.addEventListener('message', ({ data }) => {
        try {
            const {id, total} = JSON.parse(data);
            console.log(`id: ${id}, total: ${total}`)
            const item = document.querySelector(`[data-id="${id}"]`);
            if(item === null) return;
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
    console.log("target: ", target);
    console.log('target.name.value:', target.name.value);
    const payload = {
        name: target.name.value,
        rrp: target.rrp.value,
        info: target.info.value
    }

    await populateProducts(category.value, 'POST', payload);
    realtimeOrders(category.value);
    target.reset();
});

class Item extends HTMLElement {
    constructor() {
        super();
        const itemTemplate = document.querySelector('#item').content;
        const shadow = this.attachShadow({mode: 'open'}); // mode: 'open' -> allows access to the underlying shadowRoot
        shadow.appendChild(itemTemplate.cloneNode(true)); // cloneNode(true) -> includes the subtree
    }
}

customElements.define('product-item', Item);