import { tasks } from "../mock/task.js";
import { taskTypes } from "../mock/task-types.js";
import generateId from "../utils.js";

export default class TaskModel {
    #boardtasks = tasks;
    #tasktypes = taskTypes;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTaskTypes() {
        return this.#tasktypes;
    }

    removeTasks(){
        this.#boardtasks = this.#boardtasks.filter((task) => task.status !== 'trash');
        this._notifyObservers();
        debugger
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateId()
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            this._notifyObservers();
        }
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer())
    }

}