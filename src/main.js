
import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskListContainerComponent from './view/task-list-container-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';




const bodyContainer = document.querySelector('.body');
const mainContainer = document.querySelector('.main')
const taskBoardComponent = new TaskBoardComponent();

const taskModel = new TaskModel();

const taskBoardPresenter = new TaskBoardPresenter({boardContainer: mainContainer, taskModel});


render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new AddTaskComponent(), mainContainer, RenderPosition.AFTERBEGIN);


taskBoardPresenter.init();

