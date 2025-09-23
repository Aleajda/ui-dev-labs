import { createElement } from "../framework/render.js";

function createDeleteButtonComponentTemplate() {
    return `<button class="trashButton">✖ Очистить</button>`;
}

export default class DeleteButtonComponent {
    getTemplate() {
        return createDeleteButtonComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}
