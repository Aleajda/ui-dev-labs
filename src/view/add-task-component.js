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

    #handleClick = null;

    constructor(onClick){
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }

    #clickHandler = (e) => {
        e.preventDefault();
        this.#handleClick.onClick();
    }

    get template() {
        return createAddTaskComponentTemplate();
    }
}
