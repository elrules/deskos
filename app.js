// DeskOS V1 - Main application JavaScript

// Storage helper
const Storage = {
    // Settings
    getSettings() {
        const settings = localStorage.getItem('deskosSettings');
        return settings ? JSON.parse(settings) : {
            theme: 'dark', // dark, light, auto
            showWeather: true,
            showTodo: true,
            showSchool: true,
            showMovies: true,
            showGaming: true,
            clockFormat: '12', // 12 or 24
            displayName: '',
            location: '',
            greeting: '',
            nightMode: false
        };
    },
    saveSettings(settings) {
        localStorage.setItem('deskosSettings', JSON.stringify(settings));
    },
    // Tasks
    getTasks() {
        try {
            const tasks = localStorage.getItem('deskosTasks');
            return tasks ? JSON.parse(tasks) : [];
        } catch (e) {
            console.error('Error parsing tasks from localStorage:', e);
            return [];
        }
    },
    saveTasks(tasks) {
        try {
            localStorage.setItem('deskosTasks', JSON.stringify(tasks));
        } catch (e) {
            console.error('Error saving tasks to localStorage:', e);
        }
    },
    // School
    getSchool() {
        try {
            const school = localStorage.getItem('deskosSchool');
            return school ? JSON.parse(school) : {
                currentClass: {
                    subject: '',
                    time: '',
                    room: '',
                    notes: ''
                },
                upcoming: [],
                timetable: [] // Added timetable for storing all classes
            };
        } catch (e) {
            console.error('Error parsing school from localStorage:', e);
            return {
                currentClass: {
                    subject: '',
                    time: '',
                    room: '',
                    notes: ''
                },
                upcoming: [],
                timetable: []
            };
        }
    },
    saveSchool(school) {
        try {
            localStorage.setItem('deskosSchool', JSON.stringify(school));
        } catch (e) {
            console.error('Error saving school to localStorage:', e);
        }
    },
    // Movie
    getMovie() {
        try {
            const movie = localStorage.getItem('deskosMovie');
            return movie ? JSON.parse(movie) : {
                title: '',
                rating: 0,
                poster: '',
                runtime: '',
                notes: ''
            };
        } catch (e) {
            console.error('Error parsing movie from localStorage:', e);
            return {
                title: '',
                rating: 0,
                poster: '',
                runtime: '',
                notes: ''
            };
        }
    },
    saveMovie(movie) {
        try {
            localStorage.setItem('deskosMovie', JSON.stringify(movie));
        } catch (e) {
            console.error('Error saving movie to localStorage:', e);
        }
    },
    // Gaming
    getGaming() {
        try {
            const gaming = localStorage.getItem('deskosGaming');
            return gaming ? JSON.parse(gaming) : {
                game: '',
                goal: '',
                progress: 0
            };
        } catch (e) {
            console.error('Error parsing gaming from localStorage:', e);
            return {
                game: '',
                goal: '',
                progress: 0
            };
        }
    },
    saveGaming(gaming) {
        try {
            localStorage.setItem('deskosGaming', JSON.stringify(gaming));
        } catch (e) {
            console.error('Error saving gaming to localStorage:', e);
        }
    },
    // Weather (we'll store last fetched data and timestamp)
    getWeather() {
        try {
            const weather = localStorage.getItem('deskosWeather');
            return weather ? JSON.parse(weather) : {
                temperature: '--',
                condition: '--',
                icon: '',
                timestamp: 0
            };
        } catch (e) {
            console.error('Error parsing weather from localStorage:', e);
            return {
                temperature: '--',
                condition: '--',
                icon: '',
                timestamp: 0
            };
        }
    },
    saveWeather(weather) {
        try {
            localStorage.setItem('deskosWeather', JSON.stringify(weather));
        } catch (e) {
            console.error('Error saving weather to localStorage:', e);
        }
    }
};

// App state
let state = {
    settings: Storage.getSettings(),
    tasks: Storage.getTasks(),
    school: Storage.getSchool(),
    movie: Storage.getMovie(),
    gaming: Storage.getGaming(),
    weather: Storage.getWeather(),
    currentSection: 'home' // home, school, movie, gaming, settings
};

// DOM elements
let elements = {};

// Initialize the app
function initApp() {
    // Cache DOM elements
    cacheElements();
    // Render the app
    render();
    // Start clock update
    startClock();
    // Load initial data (if any)
    loadInitialData();
}

// Cache DOM elements
function cacheElements() {
    elements.app = document.getElementById('app');
    // We'll populate more as we build components
}

// Render the entire app
function render() {
    // Based on settings, show the appropriate layout
    const appElement = document.getElementById('app');
    if (!appElement) return;

    appElement.innerHTML = `
        <div class="app-container">
            <!-- Header -->
            <header class="app-header">
                <div class="header-content">
                    <h1 class="app-title">DeskOS</h1>
                </div>
            </header>

            <!-- Main content -->
            <main class="app-main">
                <!-- Content will be rendered here based on currentSection -->
                <div id="section-content"></div>
            </main>

            <!-- Navigation bar -->
            <nav class="app-nav">
                <button class="nav-btn" data-section="home">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-label">Home</span>
                </button>
                <button class="nav-btn" data-section="school">
                    <span class="nav-icon">📚</span>
                    <span class="nav-label">School</span>
                </button>
                <button class="nav-btn" data-section="movie">
                    <span class="nav-icon">🎬</span>
                    <span class="nav-label">Movies</span>
                </button>
                <button class="nav-btn" data-section="gaming">
                    <span class="nav-icon">🎮</span>
                    <span class="nav-label">Gaming</span>
                </button>
                <button class="nav-btn" data-section="settings">
                    <span class="nav-icon">⚙️</span>
                    <span class="nav-label">Settings</span>
                </button>
            </nav>
        </div>
    `;

    // Render the current section
    renderSection();
    // Apply theme
    applyTheme();
    // Attach navigation event listeners
    attachNavigationListeners();
}

// Render the current section
function renderSection() {
    const content = document.getElementById('section-content');
    if (!content) return;

    switch (state.currentSection) {
        case 'home':
            renderHomeSection();
            break;
        case 'school':
            renderSchoolSection();
            break;
        case 'movie':
            renderMovieSection();
            break;
        case 'gaming':
            renderGamingSection();
            break;
        case 'settings':
            renderSettingsSection();
            break;
        default:
            renderHomeSection();
    }
}

// Render the home section (dashboard with cards)
function renderHomeSection() {
    const content = document.getElementById('section-content');
    content.innerHTML = `
        <div class="dashboard">
            <!-- We'll build the dashboard here -->
            <div class="clock-container">
                <div id="clock" class="clock">--:--</div>
                <div id="date" class="date">--/--/----</div>
            </div>
            <div id="cards-container" class="cards-container">
                <!-- Cards will be injected here -->
            </div>
        </div>
    `;
    // Render the cards
    renderCards();
    // Apply theme
    applyTheme();
    // Attach event listeners for cards
    attachEventListeners();
}

// Render the cards based on settings (for home section)
function renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return; // Not in home section

    container.innerHTML = ''; // Clear

    // We'll create a card for each enabled section
    const fragments = [];

    if (state.settings.showWeather) {
        fragments.push(renderWeatherCard());
    }
    if (state.settings.showTodo) {
        fragments.push(renderTodoCard());
    }
    if (state.settings.showSchool) {
        fragments.push(renderSchoolCard());
    }
    if (state.settings.showMovies) {
        fragments.push(renderMovieCard());
    }
    if (state.settings.showGaming) {
        fragments.push(renderGamingCard());
    }

    // Append all fragments
    fragments.forEach(fragment => {
        container.appendChild(fragment);
    });
}

// Create a card element with a given title and content
function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-header">
            <h2>${title}</h2>
        </div>
        <div class="card-content">
            ${content}
        </div>
    `;
    return card;
}

// Weather card
function renderWeatherCard() {
    const weather = state.weather;
    const content = `
        <div class="weather-info">
            <div class="weather-temperature">${weather.temperature}</div>
            <div class="weather-condition">${weather.condition}</div>
            <div class="weather-icon">${weather.icon}</div>
        </div>
    `;
    return createCard('Weather', content);
}

// To-Do card
function renderTodoCard() {
    // We'll build a simple list for now
    const tasks = state.tasks;
    const incompleteTasks = tasks.filter(t => !t.completed);
    const completeTasks = tasks.filter(t => t.completed);
    const remainingCount = incompleteTasks.length;

    let tasksHTML = '';

    // Incomplete tasks
    incompleteTasks.forEach(task => {
        const priorityColor = task.priority === 'high' ? '#ff5252' : task.priority === 'medium' ? '#ffb74d' : '#81c784';
        tasksHTML += `
            <div class="todo-item" data-id="${task.id}">
                <div class="todo-left">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="todo-text">${task.text}</span>
                </div>
                <div class="todo-right">
                    <span class="priority" style="background-color: ${priorityColor};"></span>
                    ${task.dueDate ? `<span class="due-date">${task.dueDate}</span>` : ''}
                    <button class="todo-edit-btn" data-id="${task.id}" title="Edit">✏️</button>
                    <button class="todo-delete-btn" data-id="${task.id}" title="Delete">🗑️</button>
                </div>
            </div>
        `;
    });

    // Completed tasks (we'll show them below, maybe collapsed)
    if (completeTasks.length > 0) {
        tasksHTML += `<div class="divider"></div>`;
        tasksHTML += `<div class="completed-section"><h3>Completed (${completeTasks.length})</h3>`;
        completeTasks.forEach(task => {
            tasksHTML += `
                <div class="todo-item completed" data-id="${task.id}">
                    <div class="todo-left">
                        <input type="checkbox" checked>
                        <span class="todo-text completed-text">${task.text}</span>
                    </div>
                    <div class="todo-right">
                        <span class="priority" style="background-color: #81c784;"></span>
                        <button class="todo-edit-btn" data-id="${task.id}" title="Edit">✏️</button>
                        <button class="todo-delete-btn" data-id="${task.id}" title="Delete">🗑️</button>
                    </div>
                </div>
            `;
        });
        tasksHTML += `</div>`;
    }

    // Add task button
    tasksHTML += `<div class="add-task-container"><button id="add-task-btn">+ Add Task</button></div>`;

    // Remaining tasks count
    tasksHTML += `<div class="todo-count">${remainingCount} ${remainingCount === 1 ? 'task' : 'tasks'} remaining</div>`;

    const content = `<div class="todo-list">${tasksHTML}</div>`;
    const card = createCard('To-Do List', content);

    // We'll add event listeners later
    return card;
}

// School card (for home section - shows current/next class)
function renderSchoolCard() {
    const school = state.school;
    const current = getCurrentClass();
    const nextClass = getNextClass();

    let content = '';

    if (current) {
        content += `
            <div class="current-class">
                <div class="current-label">NOW</div>
                <div class="class-subject">${current.subject}</div>
                <div class="class-time">${current.time}</div>
                <div class="class-room">${current.room}</div>
                ${current.notes ? `<div class="class-notes">${current.notes}</div>` : ''}
            </div>
        `;
    } else {
        content += `<div class="empty-state">No current class</div>`;
    }

    if (nextClass && nextClass !== current) {
        content += `<div class="divider"></div><div class="upcoming-label">UP NEXT</div>`;
        content += `
            <div class="upcoming-item">
                <div class="upcoming-subject">${nextClass.subject}</div>
                <div class="upcoming-time">${nextClass.time}</div>
                <div class="upcoming-room">${nextClass.room}</div>
            </div>
        `;
    } else if (!current) {
        // If no current class, show next class as the main item
        if (nextClass) {
            content += `
                <div class="current-class">
                    <div class="current-label">UP NEXT</div>
                    <div class="class-subject">${nextClass.subject}</div>
                    <div class="class-time">${nextClass.time}</div>
                    <div class="class-room">${nextClass.room}</div>
                    ${nextClass.notes ? `<div class="class-notes">${nextClass.notes}</div>` : ''}
                </div>
            `;
        } else {
            content += `<div class="empty-state">No classes scheduled</div>`;
        }
    }

    const card = createCard('School', content);
    return card;
}

// Movie card
function renderMovieCard() {
    const movie = state.movie;
    const content = `
        <div class="movie-info">
            ${movie.poster ? `<img src="${movie.poster}" alt="Poster" class="movie-poster">` : ''}
            <div class="movie-details">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-rating">★ ${movie.rating}</div>
                ${movie.runtime ? `<div class="movie-runtime">${movie.runtime}</div>` : ''}
                ${movie.notes ? `<div class="movie-notes">${movie.notes}</div>` : ''}
            </div>
        </div>
    `;
    // Add edit button
    const card = createCard('Currently Watching', content);
    // We'll add event listener for editing after card is created
    return card;
}

// Gaming card
function renderGamingCard() {
    const gaming = state.gaming;
    const progressPercent = gaming.progress ? parseInt(gaming.progress) : 0;
    const content = `
        <div class="gaming-info">
            <div class="game-title">${gaming.game}</div>
            <div class="game-goal">Current goal: ${gaming.goal}</div>
            <div class="game-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <div class="progress-text">${progressPercent}%</div>
            </div>
        </div>
    `;
    // Add edit button
    const card = createCard('Gaming', content);
    // We'll add event listener for editing after card is created
    return card;
}

// Get current class based on time
function getCurrentClass() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight

    // Check timetable for current class
    for (const cls of state.school.timetable) {
        if (!cls.startTime || !cls.endTime) continue;

        const [startHours, startMinutes] = cls.startTime.split(':').map(Number);
        const [endHours, endMinutes] = cls.endTime.split(':').map(Number);

        const startTime = startHours * 60 + startMinutes;
        const endTime = endHours * 60 + endMinutes;

        if (currentTime >= startTime && currentTime <= endTime) {
            return cls;
        }
    }

    // Fallback to currentClass if timetable is empty
    if (state.school.currentClass.subject) {
        return state.school.currentClass;
    }

    return null;
}

// Get next class based on time
function getNextClass() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight

    let nextClass = null;
    let minTimeDiff = Infinity;

    // Check timetable for next class
    for (const cls of state.school.timetable) {
        if (!cls.startTime) continue;

        const [startHours, startMinutes] = cls.startTime.split(':').map(Number);
        const startTime = startHours * 60 + startMinutes;

        if (startTime > currentTime) {
            const timeDiff = startTime - currentTime;
            if (timeDiff < minTimeDiff) {
                minTimeDiff = timeDiff;
                nextClass = cls;
            }
        }
    }

    return nextClass;
}

// Apply theme based on settings
function applyTheme() {
    const root = document.documentElement;
    if (state.settings.theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    } else if (state.settings.theme === 'light') {
        root.setAttribute('data-theme', 'light');
    } else {
        // auto - follow system preference
        root.removeAttribute('data-theme');
    }
}

// Start the clock update
function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    if (state.settings.clockFormat === '12') {
        const suffix = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;
        hours = hours.toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}${suffix}`;
    } else {
        hours = hours.toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}`;
    }

    // Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = dateString;
}

// Load initial data (sample data if no user data exists)
function loadInitialData() {
    // If no tasks, add sample tasks
    if (state.tasks.length === 0) {
        state.tasks = [
            { id: 1, text: 'Finish Technology project', completed: false, priority: 'high', dueDate: '' },
            { id: 2, text: 'Pack school bag', completed: false, priority: 'medium', dueDate: '' },
            { id: 3, text: 'Do Maths homework', completed: false, priority: 'low', dueDate: '' }
        ];
        Storage.saveTasks(state.tasks);
    }

    // If no school data, add sample
    if (!state.school.currentClass.subject && state.school.timetable.length === 0) {
        // Create a sample timetable
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        state.school = {
            currentClass: {
                subject: 'Science',
                time: '10:45 AM',
                room: 'Room 23',
                notes: ''
            },
            upcoming: [],
            timetable: [
                {
                    id: 1,
                    subject: 'Mathematics',
                    startTime: '09:00',
                    endTime: '10:00',
                    room: 'Room 101',
                    notes: 'Chapter 5: Algebra'
                },
                {
                    id: 2,
                    subject: 'Science',
                    startTime: '10:45',
                    endTime: '11:45',
                    room: 'Room 23',
                    notes: 'Experiment day'
                },
                {
                    id: 3,
                    subject: 'English Literature',
                    startTime: '13:00',
                    endTime: '14:00',
                    room: 'Room 15',
                    notes: 'Read Shakespeare'
                }
            ]
        };
        Storage.saveSchool(state.school);
    }

    // If no movie data, add sample
    if (!state.movie.title) {
        state.movie = {
            title: 'Dune',
            rating: 8.7,
            poster: '',
            runtime: '155 min',
            notes: 'Epic sci-fi masterpiece'
        };
        Storage.saveMovie(state.movie);
    }

    // If no gaming data, add sample
    if (!state.gaming.game) {
        state.gaming = {
            game: 'Stardew Valley',
            goal: 'Make 170 Starfruit Wine',
            progress: 45
        };
        Storage.saveGaming(state.gaming);
    }

    // If no weather data, we'll leave it as default (--). In a real app, we might fetch or set a demo.
    // For now, we'll set a demo weather if empty
    const weather = Storage.getWeather();
    if (weather.temperature === '--' && weather.condition === '--') {
        state.weather = {
            temperature: '72°F',
            condition: 'Sunny',
            icon: '☀️',
            timestamp: Date.now()
        };
        Storage.saveWeather(state.weather);
    }

    // Reload state from storage (in case we updated it)
    state = {
        settings: Storage.getSettings(),
        tasks: Storage.getTasks(),
        school: Storage.getSchool(),
        movie: Storage.getMovie(),
        gaming: Storage.getGaming(),
        weather: Storage.getWeather(),
        currentSection: state.currentSection || 'home'
    };
}

// We'll add event listeners after rendering
function attachEventListeners() {
    // Add task button
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', showAddTaskForm);
    }

    // Todo item clicks (for toggling completion)
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent toggling if clicking on the priority or due date? We'll handle checkbox separately
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                toggleTaskCompletion(this.dataset.id);
            }
        });
    });

    // Todo edit buttons
    const editBtns = document.querySelectorAll('.todo-edit-btn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent toggling completion
            editTask(this.dataset.id);
        });
    });

    // Todo delete buttons
    const deleteBtns = document.querySelectorAll('.todo-delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent toggling completion
            deleteTask(this.dataset.id);
        });
    });

    // Movie card edit
    const movieCard = document.querySelector('.card-header h2');
    if (movieCard && movieCard.textContent === 'Currently Watching') {
        const movieCardElement = movieCard.closest('.card');
        if (movieCardElement) {
            movieCardElement.addEventListener('click', showMovieEditForm);
        }
    }

    // Gaming card edit
    const gamingCard = document.querySelector('.card-header h2');
    if (gamingCard && gamingCard.textContent === 'Gaming') {
        const gamingCardElement = gamingCard.closest('.card');
        if (gamingCardElement) {
            gamingCardElement.addEventListener('click', showGamingEditForm);
        }
    }

    // We'll add more listeners as we build
}

// Show form to add a new task
function showAddTaskForm() {
    // We'll create a simple form overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Add New Task</h3>
            <form id="add-task-form">
                <div class="form-group">
                    <label for="task-text">Task*</label>
                    <input type="text" id="task-text" required>
                </div>
                <div class="form-group">
                    <label for="task-priority">Priority</label>
                    <select id="task-priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="task-due">Due Date (optional)</label>
                    <input type="date" id="task-due">
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-task-btn">Cancel</button>
                    <button type="submit">Add Task</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    // Form submit
    const form = overlay.querySelector('#add-task-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = this.querySelector('#task-text').value;
        const priority = this.querySelector('#task-priority').value;
        const dueDate = this.querySelector('#task-due').value;
        addTask(text, priority, dueDate);
        overlay.remove();
    });

    // Cancel button
    const cancelBtn = overlay.querySelector('#cancel-task-btn');
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
    });
}

// Add a new task
function addTask(text, priority, dueDate) {
    const newTask = {
        id: Date.now(), // Simple ID generation
        text: text,
        completed: false,
        priority: priority,
        dueDate: dueDate
    };
    state.tasks.push(newTask);
    Storage.saveTasks(state.tasks);
    // Re-render the todo card
    renderCards(); // This will re-render all cards, but we can optimize later
    // Re-attach event listeners for the new todo items
    attachEventListeners();
}

// Toggle task completion
function toggleTaskCompletion(id) {
    const task = state.tasks.find(t => t.id == id);
    if (task) {
        task.completed = !task.completed;
        Storage.saveTasks(state.tasks);
        // Re-render the todo card
        renderCards();
        attachEventListeners();
    }
}

// Edit a task
function editTask(id) {
    const task = state.tasks.find(t => t.id == id);
    if (!task) return;

    // We'll create a simple form overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Edit Task</h3>
            <form id="edit-task-form">
                <div class="form-group">
                    <label for="edit-task-text">Task*</label>
                    <input type="text" id="edit-task-text" value="${task.text}" required>
                </div>
                <div class="form-group">
                    <label for="edit-task-priority">Priority</label>
                    <select id="edit-task-priority">
                        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-task-due">Due Date (optional)</label>
                    <input type="date" id="edit-task-due" value="${task.dueDate || ''}">
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-edit-task-btn">Cancel</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    // Form submit
    const form = overlay.querySelector('#edit-task-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = this.querySelector('#edit-task-text').value;
        const priority = this.querySelector('#edit-task-priority').value;
        const dueDate = this.querySelector('#edit-task-due').value;

        // Update task
        task.text = text;
        task.priority = priority;
        task.dueDate = dueDate;

        Storage.saveTasks(state.tasks);
        // Re-render the todo card
        renderCards();
        attachEventListeners();

        overlay.remove();
    });

    // Cancel button
    const cancelBtn = overlay.querySelector('#cancel-edit-task-btn');
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
    });
}

// Delete a task
function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    state.tasks = state.tasks.filter(t => t.id != id);
    Storage.saveTasks(state.tasks);
    // Re-render the todo card
    renderCards();
    attachEventListeners();
}

// Show form to edit movie
function showMovieEditForm() {
    // We'll create a simple form overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Edit Currently Watching</h3>
            <form id="edit-movie-form">
                <div class="form-group">
                    <label for="edit-movie-title">Title*</label>
                    <input type="text" id="edit-movie-title" value="${state.movie.title}" required>
                </div>
                <div class="form-group">
                    <label for="edit-movie-rating">Rating (0-10)</label>
                    <input type="number" id="edit-movie-rating" value="${state.movie.rating}" min="0" max="10" step="0.1">
                </div>
                <div class="form-group">
                    <label for="edit-movie-runtime">Runtime (e.g., "155 min")</label>
                    <input type="text" id="edit-movie-runtime" value="${state.movie.runtime}">
                </div>
                <div class="form-group">
                    <label for="edit-movie-poster">Poster URL (optional)</label>
                    <input type="text" id="edit-movie-poster" value="${state.movie.poster}">
                </div>
                <div class="form-group">
                    <label for="edit-movie-notes">Notes</label>
                    <textarea id="edit-movie-notes">${state.movie.notes}</textarea>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-edit-movie-btn">Cancel</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    // Form submit
    const form = overlay.querySelector('#edit-movie-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = this.querySelector('#edit-movie-title').value;
        const rating = parseFloat(this.querySelector('#edit-movie-rating').value) || 0;
        const runtime = this.querySelector('#edit-movie-runtime').value;
        const poster = this.querySelector('#edit-movie-poster').value;
        const notes = this.querySelector('#edit-movie-notes').value;

        // Update movie
        state.movie.title = title;
        state.movie.rating = rating;
        state.movie.runtime = runtime;
        state.movie.poster = poster;
        state.movie.notes = notes;

        Storage.saveMovie(state.movie);
        // Re-render the movie card
        renderSection();

        overlay.remove();
    });

    // Cancel button
    const cancelBtn = overlay.querySelector('#cancel-edit-movie-btn');
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
    });
}

// Show form to edit gaming
function showGamingEditForm() {
    // We'll create a simple form overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Edit Gaming</h3>
            <form id="edit-gaming-form">
                <div class="form-group">
                    <label for="edit-gaming-game">Game*</label>
                    <input type="text" id="edit-gaming-game" value="${state.gaming.game}" required>
                </div>
                <div class="form-group">
                    <label for="edit-gaming-goal">Current Goal*</label>
                    <input type="text" id="edit-gaming-goal" value="${state.gaming.goal}" required>
                </div>
                <div class="form-group">
                    <label for="edit-gaming-progress">Progress (0-100)</label>
                    <input type="number" id="edit-gaming-progress" value="${state.gaming.progress}" min="0" max="100">
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-edit-gaming-btn">Cancel</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    // Form submit
    const form = overlay.querySelector('#edit-gaming-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const game = this.querySelector('#edit-gaming-game').value;
        const goal = this.querySelector('#edit-gaming-goal').value;
        const progress = parseInt(this.querySelector('#edit-gaming-progress').value) || 0;

        // Update gaming
        state.gaming.game = game;
        state.gaming.goal = goal;
        state.gaming.progress = progress;

        Storage.saveGaming(state.gaming);
        // Re-render the gaming card
        renderSection();

        overlay.remove();
    });

    // Cancel button
    const cancelBtn = overlay.querySelector('#cancel-edit-gaming-btn');
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
    });
}

// Navigation
function attachNavigationListeners() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            state.currentSection = section;
            render();
        });

        // Highlight active section
        if (btn.dataset.section === state.currentSection) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Render school section (full screen)
function renderSchoolSection() {
    const content = document.getElementById('section-content');
    content.innerHTML = `
        <div class="school-section">
            <h2>School Timetable</h2>

            <!-- Add class button -->
            <div class="add-class-container">
                <button id="add-class-btn">+ Add Class</button>
            </div>

            <!-- Timetable list -->
            <div class="timetable-list">
                ${renderTimetable()}
            </div>

            <!-- Current/Next class info -->
            <div class="current-next-info">
                <h3>Today's Schedule</h3>
                <div class="current-class">
                    <h4>Current Class</h4>
                    ${renderCurrentClassInfo()}
                </div>
                <div class="next-class">
                    <h4>Next Class</h4>
                    ${renderNextClassInfo()}
                </div>
            </div>
        </div>
    `;

    // Attach event listeners for school section
    attachSchoolSectionListeners();
}

// Render timetable
function renderTimetable() {
    const timetable = state.school.timetable || [];

    if (timetable.length === 0) {
        return '<div class="empty-state">No classes scheduled. Add your first class!</div>';
    }

    return timetable.map(cls => `
        <div class="timetable-item" data-id="${cls.id}">
            <div class="timetable-content">
                <div class="timetable-subject">${cls.subject}</div>
                <div class="timetable-time">${cls.startTime} - ${cls.endTime}</div>
                <div class="timetable-room">${cls.room}</div>
                ${cls.notes ? `<div class="timetable-notes">${cls.notes}</div>` : ''}
            </div>
            <div class="timetable-actions">
                <button class="timetable-edit-btn" data-id="${cls.id}" title="Edit">✏️</button>
                <button class="timetable-delete-btn" data-id="${cls.id}" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

// Render current class info
function renderCurrentClassInfo() {
    const current = getCurrentClass();
    if (!current) {
        return '<div class="empty-state">No current class</div>';
    }

    return `
        <div class="class-subject">${current.subject}</div>
        <div class="class-time">${current.time}</div>
        <div class="class-room">${current.room}</div>
        ${current.notes ? `<div class="class-notes">${current.notes}</div>` : ''}
    `;
}

// Render next class info
function renderNextClassInfo() {
    const nextClass = getNextClass();
    const current = getCurrentClass();

    // If we have a current class, next class is the one after that
    // Otherwise, next class is the first upcoming class
    if (!nextClass || (current && current.id === nextClass.id)) {
        return '<div class="empty-state">No more classes today</div>';
    }

    return `
        <div class="class-subject">${nextClass.subject}</div>
        <div class="class-time">${nextClass.time}</div>
        <div class="class-room">${nextClass.room}</div>
        ${nextClass.notes ? `<div class="class-notes">${nextClass.notes}</div>` : ''}
    `;
}

// Attach event listeners for school section
function attachSchoolSectionListeners() {
    // Add class button
    const addClassBtn = document.getElementById('add-class-btn');
    if (addClassBtn) {
        addClassBtn.addEventListener('click', showAddClassForm);
    }

    // Timetable edit buttons
    const editBtns = document.querySelectorAll('.timetable-edit-btn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            editClass(this.dataset.id);
        });
    });

    // Timetable delete buttons
    const deleteBtns = document.querySelectorAll('.timetable-delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteClass(this.dataset.id);
        });
    });
}

// Show form to add a new class
function showAddClassForm() {
    // We'll create a simple form overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Add New Class</h3>
            <form id="add-class-form">
                <div class="form-group">
                    <label for="class-subject">Subject*</label>
                    <input type="text" id="class-subject" required>
                </div>
                <div class="form-group">
                    <label for="class-start-time">Start Time*</label>
                    <input type="time" id="class-start-time" required>
                </div>
                <div class="form-group">
                    <label for="class-end-time">End Time*</label>
                    <input type="time" id="class-end-time" required>
                </div>
                <div class="form-group">
                    <label for="class-room">Room*</label>
                    <input type="text" id="class-room" required>
                </div>
                <div class="form-group">
                    <label for="class-notes">Notes (optional)</label>
                    <textarea id="class-notes"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-add-class-btn">Cancel</button>
                    <button type="submit">Add Class</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    // Form submit
    const form = overlay.querySelector('#add-class-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const subject = this.querySelector('#class-subject').value;
        const startTime = this.querySelector('#class-start-time').value;
        const endTime = this.querySelector('#class-end-time').value;
        const room = this.querySelector('#class-room').value;
        const notes = this.querySelector('#class-notes').value;

        // Generate ID
        const id = Date.now();

        // Add to timetable
        const newClass = {
            id,
            subject,
            startTime,
            endTime,
            room,
            notes
        };

        state.school.timetable.push(newClass);
        Storage.saveSchool(state.school);
        // Re-render the school section
        renderSchoolSection();

        overlay.remove();
    });

    // Cancel button
    const cancelBtn = overlay.querySelector('#cancel-add-class-btn');
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
    });
}

// Show form to edit a class
function editClass(id) {
    const cls = state.school.timetable.find(c => c.id == id);
    if (!cls) return;

    // We'll create a simple form overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h3>Edit Class</h3>
            <form id="edit-class-form">
                <div class="form-group">
                    <label for="edit-class-subject">Subject*</label>
                    <input type="text" id="edit-class-subject" value="${cls.subject}" required>
                </div>
                <div class="form-group">
                    <label for="edit-class-start-time">Start Time*</label>
                    <input type="time" id="edit-class-start-time" value="${cls.startTime}" required>
                </div>
                <div class="form-group">
                    <label for="edit-class-end-time">End Time*</label>
                    <input type="time" id="edit-class-end-time" value="${cls.endTime}" required>
                </div>
                <div class="form-group">
                    <label for="edit-class-room">Room*</label>
                    <input type="text" id="edit-class-room" value="${cls.room}" required>
                </div>
                <div class="form-group">
                    <label for="edit-class-notes">Notes (optional)</label>
                    <textarea id="edit-class-notes">${cls.notes}</textarea>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-edit-class-btn">Cancel</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(overlay);

    // Form submit
    const form = overlay.querySelector('#edit-class-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const subject = this.querySelector('#edit-class-subject').value;
        const startTime = this.querySelector('#edit-class-start-time').value;
        const endTime = this.querySelector('#edit-class-end-time').value;
        const room = this.querySelector('#edit-class-room').value;
        const notes = this.querySelector('#edit-class-notes').value;

        // Update class
        cls.subject = subject;
        cls.startTime = startTime;
        cls.endTime = endTime;
        cls.room = room;
        cls.notes = notes;

        Storage.saveSchool(state.school);
        // Re-render the school section
        renderSchoolSection();

        overlay.remove();
    });

    // Cancel button
    const cancelBtn = overlay.querySelector('#cancel-edit-class-btn');
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
    });
}

// Delete a class
function deleteClass(id) {
    if (!confirm('Are you sure you want to delete this class?')) return;

    state.school.timetable = state.school.timetable.filter(c => c.id != id);
    Storage.saveSchool(state.school);
    // Re-render the school section
    renderSchoolSection();
}

// Render movie section (full screen)
function renderMovieSection() {
    const content = document.getElementById('section-content');
    content.innerHTML = `
        <div class="movie-section">
            <h2>Currently Watching</h2>

            <div class="movie-details-large">
                ${state.movie.poster ? `<img src="${state.movie.poster}" alt="Poster" class="movie-poster-large">` : ''}
                <div class="movie-info-large">
                    <div class="movie-title-large">${state.movie.title}</div>
                    <div class="movie-rating-large">★ ${state.movie.rating}</div>
                    ${state.movie.runtime ? `<div class="movie-runtime-large">${state.movie.runtime}</div>` : ''}
                    ${state.movie.notes ? `<div class="movie-notes-large">${state.movie.notes}</div>` : ''}
                </div>
            </div>

            <div class="edit-section">
                <button id="edit-movie-btn">Edit Information</button>
            </div>
        </div>
    `;

    // Attach event listeners for movie section
    attachMovieSectionListeners();
}

// Attach event listeners for movie section
function attachMovieSectionListeners() {
    const editBtn = document.getElementById('edit-movie-btn');
    if (editBtn) {
        editBtn.addEventListener('click', showMovieEditForm);
    }
}

// Render gaming section (full screen)
function renderGamingSection() {
    const content = document.getElementById('section-content');
    const progressPercent = state.gaming.progress ? parseInt(state.gaming.progress) : 0;

    content.innerHTML = `
        <div class="gaming-section">
            <h2>Gaming</h2>

            <div class="gaming-details-large">
                <div class="game-title-large">${state.gaming.game}</div>
                <div class="game-goal-large">Current goal: ${state.gaming.goal}</div>
                <div class="game-progress-large">
                    <div class="progress-bar-large">
                        <div class="progress-fill-large" style="width: ${progressPercent}%;"></div>
                    </div>
                    <div class="progress-text-large">${progressPercent}%</div>
                </div>
            </div>

            <div class="edit-section">
                <button id="edit-gaming-btn">Edit Information</button>
            </div>
        </div>
    `;

    // Attach event listeners for gaming section
    attachGamingSectionListeners();
}

// Attach event listeners for gaming section
function attachGamingSectionListeners() {
    const editBtn = document.getElementById('edit-gaming-btn');
    if (editBtn) {
        editBtn.addEventListener('click', showGamingEditForm);
    }
}

// Render settings section (full screen)
function renderSettingsSection() {
    const content = document.getElementById('section-content');
    content.innerHTML = `
        <div class="settings-section">
            <h2>Settings</h2>

            <div class="settings-group">
                <h3>Appearance</h3>
                <div class="setting-option">
                    <span>Theme</span>
                    <select id="theme-select">
                        <option value="dark" ${state.settings.theme === 'dark' ? 'selected' : ''}>Dark</option>
                        <option value="light" ${state.settings.theme === 'light' ? 'selected' : ''}>Light</option>
                        <option value="auto" ${state.settings.theme === 'auto' ? 'selected' : ''}>Auto (System)</option>
                    </select>
                </div>
            </div>

            <div class="settings-group">
                <h3>Dashboard</h3>
                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="weather-toggle" ${state.settings.showWeather ? 'checked' : ''}>
                        Show Weather
                    </label>
                </div>
                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="todo-toggle" ${state.settings.showTodo ? 'checked' : ''}>
                        Show To-Do List
                    </label>
                </div>
                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="school-toggle" ${state.settings.showSchool ? 'checked' : ''}>
                        Show School
                    </label>
                </div>
                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="movie-toggle" ${state.settings.showMovies ? 'checked' : ''}>
                        Show Movies
                    </label>
                </div>
                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="gaming-toggle" ${state.settings.showGaming ? 'checked' : ''}>
                        Show Gaming
                    </label>
                </div>
            </div>

            <div class="settings-group">
                <h3>Clock</h3>
                <div class="setting-option">
                    <label>
                        <input type="radio" name="clock-format" value="12" ${state.settings.clockFormat === '12' ? 'checked' : ''}>
                        12-hour format
                    </label>
                </div>
                <div class="setting-option">
                    <label>
                        <input type="radio" name="clock-format" value="24" ${state.settings.clockFormat === '24' ? 'checked' : ''}>
                        24-hour format
                    </label>
                </div>
            </div>

            <div class="settings-group">
                <h3>Personalisation</h3>
                <div class="setting-option">
                    <label for="display-name">Display Name</label>
                    <input type="text" id="display-name" value="${state.settings.displayName}">
                </div>
                <div class="setting-option">
                    <label for="location">Location</label>
                    <input type="text" id="location" value="${state.settings.location}">
                </div>
                <div class="setting-option">
                    <label for="greeting">Dashboard Greeting (optional)</label>
                    <input type="text" id="greeting" value="${state.settings.greeting}">
                </div>
            </div>

            <div class="settings-group">
                <h3>Night Mode</h3>
                <div class="setting-option">
                    <label>
                        <input type="checkbox" id="night-mode-toggle" ${state.settings.nightMode ? 'checked' : ''}>
                        Enable Night Mode
                    </label>
                </div>
            </div>

            <div class="settings-actions">
                <button type="button" id="cancel-settings-btn">Cancel</button>
                <button type="submit" id="save-settings-btn">Save Settings</button>
            </div>
        </div>
    `;

    // Attach event listeners for settings section
    attachSettingsSectionListeners();
}

// Attach event listeners for settings section
function attachSettingsSectionListeners() {
    // Theme select
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            state.settings.theme = this.value;
        });
    }

    // Toggle switches
    const weatherToggle = document.getElementById('weather-toggle');
    if (weatherToggle) {
        weatherToggle.addEventListener('change', function() {
            state.settings.showWeather = this.checked;
        });
    }

    const todoToggle = document.getElementById('todo-toggle');
    if (todoToggle) {
        todoToggle.addEventListener('change', function() {
            state.settings.showTodo = this.checked;
        });
    }

    const schoolToggle = document.getElementById('school-toggle');
    if (schoolToggle) {
        schoolToggle.addEventListener('change', function() {
            state.settings.showSchool = this.checked;
        });
    }

    const movieToggle = document.getElementById('movie-toggle');
    if (movieToggle) {
        movieToggle.addEventListener('change', function() {
            state.settings.showMovies = this.checked;
        });
    }

    const gamingToggle = document.getElementById('gaming-toggle');
    if (gamingToggle) {
        gamingToggle.addEventListener('change', function() {
            state.settings.showGaming = this.checked;
        });
    }

    // Clock format radio buttons
    const clockFormat12 = document.querySelector('input[name="clock-format"][value="12"]');
    if (clockFormat12) {
        clockFormat12.addEventListener('change', function() {
            if (this.checked) {
                state.settings.clockFormat = '12';
            }
        });
    }

    const clockFormat24 = document.querySelector('input[name="clock-format"][value="24"]');
    if (clockFormat24) {
        clockFormat24.addEventListener('change', function() {
            if (this.checked) {
                state.settings.clockFormat = '24';
            }
        });
    }

    // Personalisation fields
    const displayNameInput = document.getElementById('display-name');
    if (displayNameInput) {
        displayNameInput.addEventListener('change', function() {
            state.settings.displayName = this.value;
        });
    }

    const locationInput = document.getElementById('location');
    if (locationInput) {
        locationInput.addEventListener('change', function() {
            state.settings.location = this.value;
        });
    }

    const greetingInput = document.getElementById('greeting');
    if (greetingInput) {
        greetingInput.addEventListener('change', function() {
            state.settings.greeting = this.value;
        });
    }

    // Night mode toggle
    const nightModeToggle = document.getElementById('night-mode-toggle');
    if (nightModeToggle) {
        nightModeToggle.addEventListener('change', function() {
            state.settings.nightMode = this.checked;
        });
    }

    // Save button
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveSettings);
    }

    // Cancel button
    const cancelBtn = document.getElementById('cancel-settings-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Reload settings from storage to discard changes
            state.settings = Storage.getSettings();
            render();
        });
    }
}

// Save settings
function saveSettings() {
    Storage.saveSettings(state.settings);
    // Reload state to ensure consistency
    state = {
        settings: Storage.getSettings(),
        tasks: Storage.getTasks(),
        school: Storage.getSchool(),
        movie: Storage.getMovie(),
        gaming: Storage.getGaming(),
        weather: Storage.getWeather(),
        currentSection: state.currentSection
    };
    // Re-render to apply changes
    render();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Expose some functions for debugging
window.State = state;
window.Storage = Storage;