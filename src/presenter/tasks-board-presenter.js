import TaskListContainerComponent from "./../view/task-list-container-component.js";
import TaskBoardComponent from "./../view/task-board-component.js";
import { render } from "../framework/render.js";
import TaskListComponent from "./../view/task-list-component.js";
import TaskComponent from "./../view/task-component.js";
import DeleteButtonComponent from "../view/delete-button-component.js";
import EmptyListComponent from "../view/empty-list-component.js";

export default class TaskBoardPresenter {
    tasksBoardComponent = new TaskBoardComponent();
    taskListContainerComponent = new TaskListContainerComponent();

    #boardContainer = null;
    #taskModel = null;
    #taskTypes = [];

    constructor({ boardContainer, taskModel }) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderEmptyList(container) {
        const emptyListComponent = new EmptyListComponent();
        render(emptyListComponent, container);
    }

    #renderTasksList(className, container) {
        const taskListComponent = new TaskListComponent(className);
        render(taskListComponent, container);
        return taskListComponent;
    }

    #renderTaskListContainerComponent(className, name, container) {
        const taskListContainerComponent = new TaskListContainerComponent(
            className,
            name
        );
        render(taskListContainerComponent, container);
        return taskListContainerComponent;
    }

    #renderDeleteButton(container) {
        render(new DeleteButtonComponent(), container);
    }

    #renderBoard() {
        render(this.tasksBoardComponent, this.#boardContainer);
        for (let i = 0; i < 4; i++) {
            const taskListContainerComponent =
                this.#renderTaskListContainerComponent(
                    this.#taskTypes[i].className,
                    this.#taskTypes[i].name,
                    this.tasksBoardComponent.element
                );

            const taskListComponent = this.#renderTasksList(
                this.#taskTypes[i].className,
                taskListContainerComponent.element
            );

            const boardTasks = [...this.#taskModel.getTasks()].filter(
                (task) => {
                    return task.status === this.#taskTypes[i].className;
                }
            );

            if (boardTasks.length === 0) {
                this.#renderEmptyList(taskListComponent.element);
            }

            for (let j = 0; j < boardTasks.length; j++) {
                this.#renderTask(boardTasks[j], taskListComponent.element);
            }

            if (i === 3) {
                this.#renderDeleteButton(taskListComponent.element);
            }
        }
    }

    init() {
        this.#taskTypes = [...this.#taskModel.getTaskTypes()];

        this.#renderBoard();
    }
}
