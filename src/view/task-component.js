import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";
// import { tasks } from './../mock/task.js';

function createTaskComponentTemplate(task) {
    const {title} = task;
    
    return `<div class="task">
                        ${title}
                    </div>`;
}

export default class TaskComponent extends AbstractComponent{

    constructor({task}){
        super();
        this.task = task;
    }

    getTemplate() {
        return createTaskComponentTemplate(this.task);
    }
}
