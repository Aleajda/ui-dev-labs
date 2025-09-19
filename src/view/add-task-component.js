import { createElement } from "../framework/render.js";

function createAddTaskComponentTemplate() {
    return `<div class="addTaskContainer">
            <div class ="addTaskTitle">
                Новая задача
            </div>
            <div class="inputTaskContainer">
                <input class="inputTask"  placeholder="Название задачи..."/>
                <button class="inputTaskButton">+ Добавить</button>
            </div>
        </div>`;
}

export default class AddTaskComponent {
    getTemplate() {
        return createAddTaskComponentTemplate();
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
