import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(className) {
    return `<div class="tasksList ${className}"></div>`;
}

export default class TaskListComponent extends AbstractComponent {

    constructor(className){
        super();
        this.className = className;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.className);
    }

}
