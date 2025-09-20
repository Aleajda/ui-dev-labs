import TaskListContainerComponent from './../view/task-list-container-component.js';
import TaskBoardComponent from './../view/task-board-component.js';
import { render } from '../framework/render.js';
import TaskListComponent from './../view/task-list-component.js';
import TaskComponent from './../view/task-component.js';



export default class TaskBoardPresenter {

    tasksBoardComponent = new TaskBoardComponent();
    taskListContainerComponent = new TaskListContainerComponent();

    #boardContainer = null;
    #taskModel = null;

    constructor({boardContainer, taskModel, }) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }

    init() {

        const taskTypes = [...this.#taskModel.getTaskTypes()]

        render(this.tasksBoardComponent, this.#boardContainer);
        for (let i = 0; i < 4; i++){
            const taskListContainerComponent = new TaskListContainerComponent(taskTypes[i].className, taskTypes[i].name);
            render(taskListContainerComponent, this.tasksBoardComponent.getElement());
            const taskListComponent = new TaskListComponent(taskTypes[i].className);
            render(taskListComponent, taskListContainerComponent.getElement());

            const boardTasks = [...this.#taskModel.getTasks()].filter((task) => {
                return task.status === taskTypes[i].className;
            })

            for (let j = 0; j < boardTasks.length; j++){
                const taskComponent = new TaskComponent({task: boardTasks[j]});
                render(taskComponent, taskListComponent.getElement());
            }
        }
    }

}