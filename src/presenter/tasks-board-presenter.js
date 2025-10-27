import TaskListContainerComponent from './../view/task-list-container-component.js';
import TaskBoardComponent from './../view/task-board-component.js';
import { render } from '../framework/render.js';
import TaskListComponent from './../view/task-list-component.js';
import TaskComponent from './../view/task-component.js';
import DeleteButtonComponent from '../view/delete-button-component.js';
import EmptyListComponent from '../view/empty-list-component.js';
import { UserAction } from '../const.js';
import LoadingViewComponent from '../view/loading-view-component.js';

export default class TaskBoardPresenter {
    tasksBoardComponent = new TaskBoardComponent();
    taskListContainerComponent = new TaskListContainerComponent();
    #taskTypes = [];
    #boardContainer = null;
    #taskModel = null;
    #loadingViewComponent = new LoadingViewComponent();
    isLoading = false;
    #needsRerender = false;

    constructor({ boardContainer, taskModel }) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
        this.#taskModel.addObserver(this.#handleModelChange.bind(this));
    }

    /** Показать компонент загрузки */
    #showLoading() {
        this.isLoading = true;
        this.#clearBoard();
        render(this.#loadingViewComponent, this.#boardContainer);
    }

    /** Скрыть компонент загрузки */
    #hideLoading() {
        this.isLoading = false;
        this.#loadingViewComponent.element?.remove();

        if (this.#needsRerender) {
            this.#clearBoard();
            this.#renderBoard();
            this.#needsRerender = false;
        }
    }

    async createTask() {
        const taskTitle = document.querySelector('.inputTask').value.trim();
        if (!taskTitle) return;

        this.#showLoading();

        try {
            await this.#taskModel.addTask(taskTitle);
        } catch (err) {
            console.error('Ошибка при создании задачи: ', err);
        } finally {
            this.#hideLoading();
        }

        document.querySelector('.inputTask').value = '';
    }

    async removeTasks() {
        this.#showLoading();
        try {
            await this.#taskModel.removeTasks();
        } catch (err) {
            console.error('Ошибка при очистке корзины: ', err);
        } finally {
            this.#hideLoading();
        }
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
            name,
            this.#handleTaskDrop.bind(this)
        );
        render(taskListContainerComponent, container);
        return taskListContainerComponent;
    }

    #renderDeleteButton(container) {
        render(new DeleteButtonComponent({ onClick: this.removeTasks.bind(this) }), container);
    }

    async #handleTaskDrop(taskId, newStatus) {
        this.#showLoading();
        try {
            await this.#taskModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи: ', err);
        } finally {
            this.#hideLoading();
        }
    }

    #renderBoard() {
        render(this.tasksBoardComponent, this.#boardContainer);

        for (let i = 0; i < 4; i++) {
            const taskListContainerComponent = this.#renderTaskListContainerComponent(
                this.#taskTypes[i].className,
                this.#taskTypes[i].name,
                this.tasksBoardComponent.element
            );

            const taskListComponent = this.#renderTasksList(
                this.#taskTypes[i].className,
                taskListContainerComponent.element
            );

            const boardTasks = [...this.tasks].filter(
                (task) => task.status === this.#taskTypes[i].className
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

    #clearBoard() {
        if (this.tasksBoardComponent.element) {
            this.tasksBoardComponent.element.innerHTML = '';
        }
    }

    async init() {
        this.#showLoading();
        try {
            await this.#taskModel.init();
            this.#taskTypes = [...this.#taskModel.getTaskTypes()];
            this.#renderBoard();
        } catch (err) {
            console.error('Ошибка инициализации доски: ', err);
        } finally {
            this.#hideLoading();
        }
    }

    #handleModelChange(event, payload) {
        if (this.isLoading) {
            this.#needsRerender = true;
            return;
        }

        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }

    get tasks() {
        return this.#taskModel.tasks;
    }
}
