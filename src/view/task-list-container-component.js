import { createElement } from "../framework/render.js";

function createTaskListContainerComponentTemplate(className, name) {
    return `<div class="tasks ${className}">
                <div class="tasksTitle ${className}">
                    ${name}
                </div>
            </div>`;
}

export default class TaskListContainerComponent {

    constructor(className, name) {
        this.className = className;
        this.name = name;
    }

    getTemplate() {
        return createTaskListContainerComponentTemplate(this.className, this.name);
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
