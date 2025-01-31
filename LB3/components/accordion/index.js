export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${data.pos}">
                    <button class="accordion-button ${data.collapse ? "collapsed" : ""}" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapse${data.pos}" 
                            aria-expanded="${data.show ? "true" : "false"}" 
                            aria-controls="collapse${data.pos}">
                        ${data.name}
                    </button>
                </h2>
                <div id="collapse${data.pos}" class="accordion-collapse collapse ${data.show ? "show" : ""}" 
                     aria-labelledby="heading${data.pos}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="h"><strong>${data.name}</strong></div>
                        <img src="${data.src}" class="img-fluid" alt="${data.name}">
                        <button type="button" class="btn btn-primary mybt" 
                                id="click-card-${data.id}" 
                                data-id="${data.id}" 
                                data-src="${data.src}" 
                                data-name="${data.name}" 
                                data-info="${data.info}">
                            Подробнее о породе
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        const btn = document.getElementById(`click-card-${data.id}`);
        if (btn) {
            btn.addEventListener("click", listener);
        } else {
            console.warn(`Кнопка с id "click-card-${data.id}" не найдена.`);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
