import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListContainerComponentTemplate(className, name) {
    return `<div class="tasks ${className}">
                <div class="tasksTitle ${className}">
                    ${name}
                </div>
            </div>`;
}

export default class TaskListContainerComponent extends AbstractComponent{

    constructor(className, name) {
        super();
        this.className = className;
        this.name = name;
    }

    get template() {
        return createTaskListContainerComponentTemplate(this.className, this.name);
    }
}
