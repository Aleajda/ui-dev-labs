import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate(className) {
    return `<div class="tasksList ${className}"></div>`;
}

export default class TaskListComponent {

    constructor(className){
        this.className = className;
    }


    getTemplate() {
        return createTaskListComponentTemplate(this.className);
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
