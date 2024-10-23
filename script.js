const inputbox = document.getElementById('inputbox');
const list = document.getElementById('list-container');
const setList = new Set();

const taskStates = ['todo', 'in-progress', 'done'];

document.addEventListener('DOMContentLoaded', loadTasks);

inputbox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.onchange = () => {
    saveTasks();
    sortList();
};

function createTask(task) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;
    span.onclick = () => {
        inputbox.value = span.textContent;
        inputbox.focus();
        removeTask(li);
        saveTasks();
    }
    setList.add(task);
    li.appendChild(span);

    const select = document.createElement('select');
    taskStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        select.appendChild(option);
    });
    li.appendChild(select);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeTask(li);
    li.appendChild(removeButton);

    return li;
}

function removeTask(li) {
    li.remove();
    saveTasks();
    setList.delete(li.querySelector('span').textContent);
}

function addTask() {
    const task = inputbox.value.trim();
    if (task && !setList.has(task)) {
        list.appendChild(createTask(task));
        inputbox.value = '';
        saveTasks();
        setList.add(task);
    }
    else {
        alert('Task already exists or is empty!');
    }
}

function saveTasks() {
    const tasks = [];
    Array.from(list.children).forEach(li => {
        const task = li.querySelector('span').textContent;
        const state = li.querySelector('select').value;
        tasks.push({ task, state });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        tasks.forEach(({ task, state }) => {
            const li = createTask(task);
            li.querySelector('select').value = state;
            setList.add(task);
            list.appendChild(li);
        });
    }
}

function sortList() {
    const tasks = Array.from(list.children);
    tasks.sort((a, b) => {
        const stateA = taskStates.indexOf(a.querySelector('select').value);
        const stateB = taskStates.indexOf(b.querySelector('select').value);
        return stateA - stateB;
    });
    tasks.forEach(task => {
        list.appendChild(task);
    });
}

function clearAll() {
    const tasks = Array.from(list.children);
    tasks.filter(task => task.querySelector('select').value === 'done').forEach(task => task.remove());
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}