import { tasks } from "../mock/task.js";
import { taskTypes } from "../mock/task-types.js";

export default class TaskModel {
    #boardtasks = tasks;
    #tasktypes = taskTypes
    
    getTasks() {
        return this.#boardtasks;
    }

    getTaskTypes() {
        return this.#tasktypes;
    }


}