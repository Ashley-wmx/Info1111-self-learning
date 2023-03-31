window.addEventListener('load', () => {
    const taskForm = document.querySelector("#add-task-form");
    const taskInput = document.querySelector("#task-input");
    const taskList = document.querySelector("#tasks");

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newTask = taskInput.value;

        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const taskContentElement = document.createElement('div');
        taskContentElement.classList.add('content');
        taskElement.appendChild(taskContentElement);

        const taskInputElement = document.createElement('input');
        taskInputElement.classList.add('text');
        taskInputElement.type = 'text';
        taskInputElement.value = newTask;
        taskInputElement.setAttribute('readonly', 'readonly');
        taskContentElement.appendChild(taskInputElement);

        const taskActionsElement = document.createElement('div');
        taskActionsElement.classList.add('actions');
        taskElement.appendChild(taskActionsElement);

        const editTaskButton = document.createElement('button');
        editTaskButton.classList.add('edit');
        editTaskButton.innerText = 'Edit';
        taskActionsElement.appendChild(editTaskButton);

        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('delete');
        deleteTaskButton.innerText = 'Delete';
        taskActionsElement.appendChild(deleteTaskButton);

        taskList.appendChild(taskElement);

        taskInput.value = '';

        editTaskButton.addEventListener('click', () => {
            if (editTaskButton.innerText.toLowerCase() === "edit") {
                editTaskButton.innerText = "Save";
                taskInputElement.removeAttribute("readonly");
                taskInputElement.focus();
            } else {
                editTaskButton.innerText = "Edit";
                taskInputElement.setAttribute("readonly", "readonly");
            }
        });

        deleteTaskButton.addEventListener('click', () => {
            taskList.removeChild(taskElement);
        });
    });
});
