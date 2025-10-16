import { AbstractComponent } from "../framework/view/abstract-component.js";

function createDeleteButtonComponentTemplate() {
    return `<button class="trashButton">✖ Очистить</button>`;
}

export default class DeleteButtonComponent extends AbstractComponent{
    #handleClick = null;

    constructor(onClick){
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }

    #clickHandler = (e) => {
        e.preventDefault();
        this.#handleClick.onClick();
    }

    get template() {
        return createDeleteButtonComponentTemplate();
    }
}
