import { taskTypes } from "../mock/task-types.js";
import generateId from "../utils.js";
import Observable from "../framework/observable.js";
import { UpdateType, UserAction } from "../const.js";

export default class TaskModel extends Observable {
    #boardtasks = [];
    #tasksApiService = null;
    #tasktypes = taskTypes;

    constructor({ tasksApiService }) {
        super();
        this.#tasksApiService = tasksApiService;

        this.#tasksApiService.tasks.then((tasks) => {
            console.log(tasks);
        });
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;
        } catch (err) {
            this.#boardtasks = [];
        }
    }

    get tasks() {
        return this.#boardtasks;
    }

    getTaskTypes() {
        return this.#tasktypes;
    }

    deleteTask(taskId) {
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, { id: taskId });
    }

    async removeTasks() {
        const basketTasks = this.#boardtasks.filter(task => task.status === 'trash');

        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
            this._notify(UserAction.DELETE_TASK, { status: 'trash' });
        } catch (err) {
            console.error('Ошибка при очистке корзины: ', err);
            throw err;
        }
    }

    hasBasketTasks() {
        return this.#boardtasks.some(task => task.status === 'trash');
    }

    async addTask(title) {
        const newTask = {
            title,
            status: "backlog",
            id: generateId(),
        };
        
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при создании задачи: ', err);
            throw err;
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (!task) return;

        const previousStatus = task.status;
        task.status = newStatus;

        try {
            const updatedTask = await this.#tasksApiService.updateTask(task);
            Object.assign(task, updatedTask);
            this._notify(UserAction.UPDATE_TASK, task);
        } catch (err) {
            console.error('Ошибка при обновлении задачи на сервере');
            task.status = previousStatus;
            throw err;
        }
    }
}
