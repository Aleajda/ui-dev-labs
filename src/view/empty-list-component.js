import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyListComponentTemplate() {
    return `<div class="task">
                нет задач
            </div>`;
}

export default class EmptyListComponent extends AbstractComponent {
    getTemplate() {
        return createEmptyListComponentTemplate();
    }
}
