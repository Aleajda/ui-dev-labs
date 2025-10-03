import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardComponentTemplate() {
    return `<div class="tasksContainer"></div>`;
}

export default class TaskBoardComponent extends AbstractComponent{
    getTemplate() {
        return createTaskBoardComponentTemplate();
    }
}
