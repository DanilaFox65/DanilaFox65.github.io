import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            this.renderData(data.response);
        });
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="container text-center"></div>
        `;
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        const userData = item[0];
    
        this.pageRoot.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
                <div class="text-center mb-3">
                    <img src="${userData.photo_400_orig}" class="img-fluid mb-3" alt="Фото пользователя">
                    <h3>${userData.first_name} ${userData.last_name}</h3>
                    <p>ID: ${userData.id || 'Неизвестно'}</p>  <!-- Добавлено отображение ID -->
                </div>
                <!-- Кнопка назад под именем -->
                <div id="back-button-container"></div>
            </div>
        `;

        // Рендерим кнопку "Назад"
        const backButton = new BackButtonComponent(document.getElementById('back-button-container'));
        backButton.render(this.clickBack.bind(this));
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();
    }
}
