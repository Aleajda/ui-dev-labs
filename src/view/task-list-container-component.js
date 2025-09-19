import { createElement } from "../framework/render.js";

function createTaskListContainerComponentTemplate() {
    return `<div class="tasks backlog">
                <div class="tasksTitle backlog">
                    Бэклог
                </div>
            </div>`;
}

export default class TaskListContainerComponent {
    getTemplate() {
        return createTaskListContainerComponentTemplate();
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
