import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createDeleteButtonComponentTemplate() {
    return `<button class="trashButton">✖ Очистить</button>`;
}

export default class DeleteButtonComponent extends AbstractComponent{
    getTemplate() {
        return createDeleteButtonComponentTemplate();
    }
}
