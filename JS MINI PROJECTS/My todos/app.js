document.addEventListener('DOMContentLoaded', function () {
    let todos = [];
    let completedTodos = [];
    let editId = null; // Track which todo is being edited

    // Add or Edit Todo
    document.getElementById('addTodo').addEventListener('click', function () {
        const title = document.getElementById('newTitle').value;
        const description = document.getElementById('newDescription').value;

        if (title && description) {
            if (editId) {
                // Editing an existing todo
                const todoIndex = todos.findIndex(todo => todo.id === editId);
                todos[todoIndex].title = title;
                todos[todoIndex].description = description;
                editId = null; // Reset after editing
            } else {
                // Adding a new todo
                const newTodo = {
                    id: Date.now(),
                    title: title,
                    description: description,
                    completed: false
                };
                todos.push(newTodo);
            }

            renderTodos(); // Re-render todo list
            clearInputFields(); // Clear input fields
        } else {
            alert("Please fill in both title and description.");
        }
    });

    // Show only Todos
    document.getElementById('showTodos').addEventListener('click', function () {
        document.getElementById('todoList').style.display = 'block';
        document.getElementById('completedList').style.display = 'none';
        this.classList.add('active');
        document.getElementById('showCompleted').classList.remove('active');
    });

    // Show only Completed
    document.getElementById('showCompleted').addEventListener('click', function () {
        document.getElementById('todoList').style.display = 'none';
        document.getElementById('completedList').style.display = 'block';
        this.classList.add('active');
        document.getElementById('showTodos').classList.remove('active');
    });

    // Delete Todo
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }

    // Complete Todo
    function completeTodo(id) {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            const completedTodo = todos.splice(todoIndex, 1)[0];
            completedTodo.completedOn = new Date().toLocaleString();
            completedTodos.push(completedTodo);
            renderTodos();
        }
    }

    // Delete Completed Todo
    function deleteCompletedTodo(id) {
        completedTodos = completedTodos.filter(todo => todo.id !== id);
        renderTodos();
    }

    // Edit Todo
    function editTodo(id) {
        const todo = todos.find(todo => todo.id === id);
        document.getElementById('newTitle').value = todo.title; // Populate input fields
        document.getElementById('newDescription').value = todo.description;
        editId = id; // Set editId to track which todo is being edited
    }

    // Render Todos
    function renderTodos() {
        // Render Active Todos
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = ''; // Clear previous list
        todos.forEach(todo => {
            todoList.innerHTML += `
                <div class="todo-list-item">
                    <div>
                        <h3>${todo.title}</h3>
                        <p>${todo.description}</p>
                    </div>
                    <div>
                        <span class="icon" onclick="deleteTodo(${todo.id})">🗑️</span>
                        <span class="check-icon" onclick="completeTodo(${todo.id})">✔️</span>
                        <span class="icon" onclick="editTodo(${todo.id})">✏️</span>
                    </div>
                </div>
            `;
        });

        // Render Completed Todos
        const completedList = document.getElementById('completedList');
        completedList.innerHTML = ''; // Clear previous list
        completedTodos.forEach(todo => {
            completedList.innerHTML += `
                <div class="todo-list-item">
                    <div>
                        <h3>${todo.title}</h3>
                        <p>${todo.description}</p>
                        <p><small>Completed on: ${todo.completedOn}</small></p>
                    </div>
                    <div>
                        <span class="icon" onclick="deleteCompletedTodo(${todo.id})">🗑️</span>
                    </div>
                </div>
            `;
        });
    }

    // Clear input fields after adding or editing a todo
    function clearInputFields() {
        document.getElementById('newTitle').value = '';
        document.getElementById('newDescription').value = '';
    }

    // Expose functions to the global scope
    window.deleteTodo = deleteTodo;
    window.completeTodo = completeTodo;
    window.deleteCompletedTodo = deleteCompletedTodo;
    window.editTodo = editTodo;
});
