import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskListContainerComponent from './view/task-list-container-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';




const bodyContainer = document.querySelector('.body');
const mainContainer = document.querySelector('.main')

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const taskBoardComponent = new TaskBoardComponent();

render(taskBoardComponent, mainContainer, RenderPosition.AFTERBEGIN);

for (let i= 0 ; i < 4; i++){
    const taskListContainerComponent = new TaskListContainerComponent();
    const taskListComponent = new TaskListComponent();
    render(taskListContainerComponent, taskBoardComponent.getElement());
    render(taskListComponent, taskListContainerComponent.getElement());
    for (let j = 0; j < 4; j++){
        render(new TaskComponent(), taskListComponent.getElement());
    }

}

render(new AddTaskComponent(), mainContainer, RenderPosition.AFTERBEGIN);

