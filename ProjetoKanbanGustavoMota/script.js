// =================================================================
// Seleção de Elementos do DOM
// =================================================================
const taskModal = document.getElementById('task-modal');
const addTaskBtn = document.getElementById('add-task-btn');
const closeModalBtn = document.querySelector('.close-modal');
const taskForm = document.getElementById('task-form');
const todoColumn = document.getElementById('todo-column');
const inprogressColumn = document.getElementById('inprogress-column');
const doneColumn = document.getElementById('done-column');

// =================================================================
// Funções do Modal
// =================================================================

// Abrir o modal
function openModal() {
    // Define o valor padrão da data de vencimento para hoje
    const today = new Date();
    const formattedToday = today.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    document.getElementById('task-deadline').value = formattedToday;
    taskModal.style.display = 'block';
}

// Fechar o modal
function closeModal() {
    taskModal.style.display = 'none';
    clearTaskForm();
}

// Limpar o formulário do modal
function clearTaskForm() {
    taskForm.reset();
    document.getElementById('task-id').value = '';
}

// Event Listeners para o modal
addTaskBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === taskModal) {
        closeModal();
    }
});

// Função para formatar a data como dd/mm/yyyy
function formatDate(dateString) {
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Manipular a submissão do formulário para salvar a tarefa
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskId = parseInt(document.getElementById('task-id').value, 10);
    const taskData = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        priority: document.getElementById('task-priority').value,
        deadline: document.getElementById('task-deadline').value,
        assigned: document.getElementById('task-assigned').value.split(',').map(item => item.trim())
    };

    if (taskId) {
        updateTask(taskId, taskData);
    } else {
        taskData.status = 'Pendente';
        addTask(taskData);
    }
    closeModal();
});

// =================================================================
// Inicialização do Banco de Dados IndexedDB
// =================================================================
let db;
const dbName = 'kanbanDB';
const dbVersion = 1;

function initializeDB() {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
        console.error('Erro ao abrir o banco de dados:', event.target.error);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log('Banco de dados aberto com sucesso:', db);
        getTasks(); // Carregar tarefas existentes 
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;

        if (!db.objectStoreNames.contains('tasks')) {
            const taskStore = db.createObjectStore('tasks', {
                keyPath: 'id',
                autoIncrement: true
            });
            taskStore.createIndex('titleIndex', 'title', {
                unique: false
            });
        }
    };
}

// =================================================================
// Funções de Gerenciamento de Tarefas (CRUD)
// =================================================================

function addTask(taskData) {
    const transaction = db.transaction(['tasks'], 'readwrite');
    const taskStore = transaction.objectStore('tasks');
    const request = taskStore.add(taskData);

    request.onsuccess = (event) => {
        console.log('Tarefa adicionada com ID:', event.target.result);
        taskData.id = event.target.result;
        renderTask(taskData);
    };

    request.onerror = (event) => {
        console.error('Erro ao adicionar tarefa:', event.target.error);
    };
}

function getTasks() {
    const transaction = db.transaction(['tasks'], 'readonly');
    const taskStore = transaction.objectStore('tasks');
    const request = taskStore.getAll();

    request.onsuccess = (event) => {
        const tasks = event.target.result;
        console.log('Tarefas recuperadas:', tasks);

        todoColumn.querySelector('.task-area').innerHTML = '';
        inprogressColumn.querySelector('.task-area').innerHTML = '';
        doneColumn.querySelector('.task-area').innerHTML = '';

        tasks.forEach(renderTask);
    };

    request.onerror = (event) => {
        console.error('Erro ao recuperar tarefas:', event.target.error);
    };
}

function updateTask(taskId, updatedTaskData) {
    const transaction = db.transaction(['tasks'], 'readwrite');
    const taskStore = transaction.objectStore('tasks');

    const getRequest = taskStore.get(taskId);

    getRequest.onsuccess = (event) => {
        const existingTaskData = event.target.result;

        // Atualiza todas as propriedades primeiro, incluindo o prazo
        Object.assign(existingTaskData, updatedTaskData);

        // Solicitação put inicial para atualizar a tarefa
        const updateRequest = taskStore.put(existingTaskData);

        updateRequest.onsuccess = (event) => {
            console.log('Tarefa atualizada com sucesso no IndexedDB');

            const taskCardToUpdate = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
            if (taskCardToUpdate) {
                // Atualiza os dados no cartão
                taskCardToUpdate.taskData = existingTaskData;

                // Atualiza a visualização do cartão
                taskCardToUpdate.querySelector('h3').textContent = existingTaskData.title;
                taskCardToUpdate.querySelector('p:nth-child(2)').textContent = existingTaskData.description;
                // Atualiza o elemento de prioridade apenas se o status não for "Concluída"
                const priorityElement = taskCardToUpdate.querySelector('.priority-color');
                if (existingTaskData.status !== 'Concluída') {
                    priorityElement.textContent = 'Prioridade: ' + existingTaskData.priority;
                    priorityElement.style.backgroundColor = getPriorityColor(existingTaskData.priority);
                    priorityElement.style.display = 'block'; // Garante que a prioridade seja visível
                } else {
                    priorityElement.style.display = 'none'; // Oculta a prioridade
                }
                taskCardToUpdate.querySelector('p:nth-child(4)').textContent = 'Vencimento: ' + existingTaskData.deadline;
                taskCardToUpdate.querySelector('p:nth-child(5)').textContent = 'Responsável: ' + existingTaskData.assigned.join(', ');
            }

            // Verifica se o prazo expirou APÓS a primeira atualização
            if (isTaskExpiring(existingTaskData.deadline)) {
                existingTaskData.priority = 'urgente';

                // Faz uma segunda solicitação de atualização para salvar a possível alteração de prioridade
                const secondUpdateRequest = taskStore.put(existingTaskData);

                secondUpdateRequest.onsuccess = () => {
                    console.log('Prioridade da tarefa atualizada (se necessário)');
                    clearTaskForm(); // Limpa o formulário após a segunda atualização
                };

                secondUpdateRequest.onerror = (event) => {
                    console.error('Erro ao atualizar a prioridade da tarefa:', event.target.error);
                };
            } else {
                // Se a prioridade não precisar ser atualizada, limpa o formulário aqui
                clearTaskForm();
            }
        };

        updateRequest.onerror = (event) => {
            console.error('Erro ao atualizar a tarefa no IndexedDB:', event.target.error);
        };
    };

    getRequest.onerror = (event) => {
        console.error('Erro ao recuperar a tarefa para atualização:', event.target.error);
    };
}

function deleteTask(taskId) {
    const transaction = db.transaction(['tasks'], 'readwrite');
    const taskStore = transaction.objectStore('tasks');
    const request = taskStore.delete(taskId);

    request.onsuccess = (event) => {
        console.log('Tarefa excluída com sucesso');

        const taskCardToRemove = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
        if (taskCardToRemove) {
            taskCardToRemove.remove();
        }
    };

    request.onerror = (event) => {
        console.error('Erro ao excluir tarefa:', event.target.error);
    };
}


// =================================================================
// Funções de Renderização e Drag and Drop
// =================================================================

function renderTask(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.dataset.taskId = task.id;
    taskCard.taskData = task;

    taskCard.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p class="priority-color" style="background-color: ${getPriorityColor(task.priority)}">Prioridade: ${task.priority}</p>
      <p>Vencimento: ${formatDate(task.deadline)}</p> 
      <p>Responsável: ${task.assigned.join(', ')}</p>
    `;

    if (isTaskExpiring(task.deadline)) {
        updateTask(task.id, { priority: 'urgente' });
    }

    if (task.status === 'Pendente') {
        addTaskButtons(taskCard);
    }

    taskCard.draggable = true;
    taskCard.ondragstart = drag;

    appendToCorrectColumn(taskCard, task.status);
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'baixa': return '#d8d8d8';
        case 'media': return '#216EA0';
        case 'alta': return '#ffd000';
        case 'urgente': return '#cf0000';
        default: return 'lightgray';
    }
}

// Função para verificar se a tarefa está a 1 dia de expirar
function isTaskExpiring(deadline) {
    const today = new Date();
    const dueDate = new Date(deadline);
    const timeDifference = dueDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calcula a diferença em dias e arredonda para cima

    return daysDifference <= 1;
}

// Adicionar botões Editar e Excluir a um cartão de tarefa
function addTaskButtons(taskCard) {
    // *** Correção: Removido o 'if' que impedia a adição do botão Excluir ***
    taskCard.innerHTML += `
        <button class="edit-btn" data-task-id="${taskCard.dataset.taskId}">Editar</button>
        <button class="delete-btn" data-task-id="${taskCard.dataset.taskId}">Excluir</button>
    `;

    // Adiciona os event listeners após adicionar os botões ao DOM
    const editBtn = taskCard.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        const today = new Date();
        const formattedToday = today.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        document.getElementById('task-deadline').value = formattedToday;

        openModal();
        fillTaskForm(taskCard.taskData);
    });

    const deleteBtn = taskCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            deleteTask(parseInt(taskCard.dataset.taskId, 10));
        }
    });
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.dataset.taskId);
}

function drop(ev) {
    ev.preventDefault();
    const taskId = parseInt(ev.dataTransfer.getData("text/plain"), 10);
    const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"]`);

    const targetColumn = ev.target.closest('.column');
    let newStatus = getColumnStatus(targetColumn);

    // Atualiza a tarefa no IndexedDB
    updateTask(taskId, { status: newStatus });

    // Move a tarefa para a nova coluna
    targetColumn.querySelector('.task-area').appendChild(taskCard);

    // Atualiza a visibilidade dos botões
    updateTaskButtons(taskCard, newStatus);

    // Oculta a prioridade se a tarefa for movida para "Concluída"
    const priorityElement = taskCard.querySelector('.priority-color');
    if (newStatus === 'Concluída') {
        priorityElement.style.display = 'none';
    } else {
        priorityElement.style.display = 'block';
    }
}


function getColumnStatus(column) {
    switch (column.id) {
        case 'todo-column':
            return 'Pendente';
        case 'inprogress-column':
            return 'Em Andamento';
        case 'done-column':
            return 'Concluída';
        default:
            console.error('ID de coluna inválido:', column.id);
            return 'Pendente';
    }
}

function appendToCorrectColumn(taskCard, status) {
    switch (status) {
        case 'Pendente':
            todoColumn.querySelector('.task-area').appendChild(taskCard);
            break;
        case 'Em Andamento':
            inprogressColumn.querySelector('.task-area').appendChild(taskCard);
            break;
        case 'Concluída':
            doneColumn.querySelector('.task-area').appendChild(taskCard);
            break;
        default:
            console.error('Status da tarefa inválido:', status);
    }
}

// Atualizando os botões da tarefa
function updateTaskButtons(taskCard, newStatus) {
    const editBtn = taskCard.querySelector('.edit-btn');
    const deleteBtn = taskCard.querySelector('.delete-btn');

    if (newStatus === 'Pendente') {
        if (!editBtn) {
            addTaskButtons(taskCard);
        }
    } else {

        if (editBtn) editBtn.remove();
        if (deleteBtn) deleteBtn.remove();
    }
}

// Preencher o formulário do modal com os dados da tarefa
function fillTaskForm(task) {
    document.getElementById('task-id').value = task.id;
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-priority').value = task.priority;

    // Formata a data para o formato do input date (yyyy-mm-dd)
    const formattedDate = task.deadline.split('/').reverse().join('-');
    document.getElementById('task-deadline').value = formattedDate;
    document.getElementById('task-assigned').value = task.assigned.join(', '); // Exibe múltiplos responsáveis
}

initializeDB();