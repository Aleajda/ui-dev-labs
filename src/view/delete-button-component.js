import { AbstractComponent } from "../framework/view/abstract-component.js";

function createDeleteButtonComponentTemplate() {
    return `<button class="trashButton">✖ Очистить</button>`;
}

export default class DeleteButtonComponent extends AbstractComponent{
    get template() {
        return createDeleteButtonComponentTemplate();
    }
}
