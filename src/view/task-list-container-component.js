import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListContainerComponentTemplate(className, name) {
    return `<div class="tasks ${className}">
                <div class="tasksTitle ${className}">
                    ${name}
                </div>
            </div>`;
}

export default class TaskListContainerComponent extends AbstractComponent {
    constructor(className, name, onTaskDrop) {
        super();
        this.className = className;
        this.name = name;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return createTaskListContainerComponentTemplate(this.className, this.name);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');

            const tasksList = container.querySelector('.tasksList');
            const newOrder = [...tasksList.querySelectorAll('.task')].map(el => el.dataset.id);

            onTaskDrop(taskId, this.className, newOrder);
        });
    }
}
