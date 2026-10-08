// DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load saved tasks when the app initializes
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submission
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();

  // Validate non-empty input
  if (taskText !== '') {
    addTask(taskText);
    saveTasks(); // Persist new task to localStorage
    taskInput.value = '';
    taskInput.focus();
  }
});

// Render a new task element on the screen
function addTask(text, isCompleted = false) {
  const li = document.createElement('li');

  const taskSpan = document.createElement('span');
  taskSpan.textContent = text;
  
  // Apply completed style if task was previously finished
  if (isCompleted) {
    taskSpan.classList.add('completed');
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', 'Delete task');

  // Toggle task completion status
  taskSpan.addEventListener('click', () => {
    taskSpan.classList.toggle('completed');
    saveTasks();
  });

  // Remove task from list
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save all current DOM tasks to localStorage
function saveTasks() {
  const tasks = [];

  // Extract text and status from each list item
  document.querySelectorAll('#taskList li').forEach(li => {
    const span = li.querySelector('span');
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains('completed')
    });
  });

  // Store array as a JSON string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Read and render existing tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    
    // Re-create each stored task
    tasks.forEach(task => {
      addTask(task.text, task.completed);
    });
  }
}