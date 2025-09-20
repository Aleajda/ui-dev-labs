import { createElement } from "../framework/render.js";
// import { tasks } from './../mock/task.js';

function createTaskComponentTemplate(task) {
    const {title} = task;
    
    return `<div class="task">
                        ${title}
                    </div>`;
}

export default class TaskComponent {

    constructor({task}){
        this.task = task;
    }


    getTemplate() {
        return createTaskComponentTemplate(this.task);
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
