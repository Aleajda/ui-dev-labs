import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardContainerComponentTemplate() {
    return `<div class="tasksBoardContainer"></div>`;
}

export default class TaskBoardContainerComponent extends AbstractComponent{
    get template() {
        return createTaskBoardContainerComponentTemplate();
    }
}
