import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

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

export default class AddTaskComponent extends AbstractComponent {
    getTemplate() {
        return createAddTaskComponentTemplate();
    }
}
