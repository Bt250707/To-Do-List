const inputbox = document.getElementById('inputbox');
const list = document.getElementById('list-container');

const taskStates = ['todo', 'in-progress', 'done'];

function addTask() {
    const task = inputbox.value;
    if (task) {
        const li = document.createElement('li');
        list.appendChild(li);

        const span = document.createElement('span');
        span.textContent = task;
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
        removeButton.onclick = () => li.remove();
        li.appendChild(removeButton);

        inputbox.value = '';
    }
}