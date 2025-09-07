const input = document.querySelector('.taskInput');
const inputBtn = document.querySelector('.taskBtn');
const taskSelect = document.querySelector('.taskSelect');
const taskList = document.querySelector('.taskList');


const getTaskPriority = (select) => {
    switch (select.value) {
        case 'value1':
            return 'высокий'
        case 'value2':
            return 'средний'
        case 'value3':
            return 'низкий'
    }
}


const createTask = () => {
    let li = document.createElement('li');
    let btn = document.createElement('button');
    li.classList.add('task');
    li.textContent = `Текст задачи ${input.value}, Приоритет ${getTaskPriority(taskSelect)}`;
    btn.classList.add('taskDeleteBtn');
    btn.textContent = 'Удалить';
    li.appendChild(btn);
    taskList.appendChild(li);
    btn.addEventListener('click', () => {
        taskList.removeChild(li);
    })
}

inputBtn.addEventListener('click', () => {
    if (input.value === '') {
        alert('Поле input не может быть пустым');
    }else {
        alert(`Текст задачи ${input.value}, Приоритет ${taskSelect.value}`);
        createTask()
    }
})
