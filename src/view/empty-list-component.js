import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyListComponentTemplate() {
    return `<div class="emptyList">
                нет задач
            </div>`;
}

export default class EmptyListComponent extends AbstractComponent {
    get template() {
        return createEmptyListComponentTemplate();
    }
}
