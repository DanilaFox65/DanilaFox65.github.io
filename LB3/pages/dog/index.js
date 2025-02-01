import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, data, id) {
        this.parent = parent;
        this.data = data;
        this.id = id;
    }

    getHTML() {
        return `<div id="product-page" class="d-flex flex-column align-items-center justify-content-center vh-100 text-center"></div>`;
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        const product = this.data.find(item => item.id == this.id);
        if (!product) {
            this.parent.innerHTML = `<p>Продукт не найден.</p>`;
            return;
        }

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const productHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <img src="${product.src}" alt="${product.title}" 
                style="width: 30%; max-width: 250px; height: auto; border-radius: 10px;">
            <h2>${product.title}</h2>
            <p>${product.text}</p>
        </div>
    `;

        const backButtonHTML = `
        <button class="btn btn-danger mt-3" id="back-button">Назад</button>
    `;

        // Сначала добавляем текст и изображение, потом кнопку
        this.pageRoot.insertAdjacentHTML("beforeend", productHTML);
        this.pageRoot.insertAdjacentHTML("beforeend", backButtonHTML);

        document.getElementById("back-button").addEventListener("click", this.clickBack.bind(this));
    }

}
