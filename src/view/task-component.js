import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    const { title } = task;
    return `<div class="task" data-id="${task.id}">
                ${title}
            </div>`;
}

export default class TaskComponent extends AbstractComponent {
    constructor({ task }) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
        this.#addDropIndicators();
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);

        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.task.id);
            event.target.classList.add('dragging');
        });

        this.element.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });
    }

    #addDropIndicators() {
        this.element.addEventListener('dragover', (event) => {
            event.preventDefault();
            const draggingTask = document.querySelector('.dragging');
            const container = this.element.parentElement;

            const bounding = this.element.getBoundingClientRect();
            const offset = event.clientY - bounding.top;
            const middle = bounding.height / 2;

            if (offset < middle) {
                container.insertBefore(draggingTask, this.element);
            } else {
                container.insertBefore(draggingTask, this.element.nextSibling);
            }
        });
    }
}
