import {AccordionComponent} from "../../components/accordion/index.js";
import {ProductPage} from "../dog/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [
            {
                id: 1,
                src: "././src/img/images.jpg",
                title: "Далматинец",
                text: "Далматинец это – энергичный и жизнерадостный питомец. Благодаря его яркой внешности, вы точно не останетесь незамеченными во время прогулок в парке и на собачьих площадках."
            },
            {
                id: 2,
                src: "././src/img/Dogs_Bokeh_Labrador_Retriever_Sitting_586668_640x960.jpg",
                title: "Той терьер",
                text: "Той терьер — это миниатюрная гармонично сложенная собака элегантной внешности. У нее высокие тонкие конечности, большие выразительные глаза и костистая морда с плотно прилегающими губами. Уши большие, стоячие, живот подтянут, мускулатура крепкая. Собака никогда не должна производить впечатление рыхлости, напротив, той-терьер всегда выглядит спортивным и готовым к энергичным действиям."
            },
            {
                id: 3,
                src: "././src/img/0c07cce61e4c5b82d6af47c6ec4c5437.jpg",
                title: "Чау-чау",
                text: "Чау-чау это одна из самых древних пород собак родом из Китая, притягивающая восторженные взгляды своим удивительным внешним видом: пышной львиной гривой, нахмуренной мордой и фиолетовым языком. Чау-чау хоть и похож на милого плюшевого медвежонка, характер у него весьма своенравный, поэтому к нему нужен грамотный подход."
            },
            
        ];
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-column align-items-center justify-content-center vh-100"></div>`;
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, this.data, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const accordion = new AccordionComponent(this.pageRoot);
        accordion.render(this.data, this.clickCard.bind(this));
    }
}
