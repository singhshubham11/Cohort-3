import { program } from 'commander';
import fs from 'fs/promises';

async function loadTasks() {
    try {
        const data = await fs.readFile('file.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveTasks(tasks) {
    await fs.writeFile('file.json', JSON.stringify(tasks, null, 2));
}

program
  .command('create <task>')
  .description('Add a new todo task')
  .action(async (task) => {
    const tasks = await loadTasks();
    tasks.push({id: Date.now(), task});
    await saveTasks(tasks);
    console.log('Task added!');
  })  

program
    .command('read')
    .description('Read all todo task')
    .action(async () => {
        const tasks = await loadTasks();
        if (tasks.length === 0) {
            console.log("No tasks found");
        } else {
            console.log('Todo List: ');
            tasks.forEach((todo, index) => {
                console.log(`${index + 1}. ${todo.task}`)
            });
        }
    })  


program
    .command('update <index> <newTask>')
    .description('update an existing task')
    .action(async (index, newTask) => {
        const tasks = await loadTasks();
        console.log("index: ", index);
        console.log("parse: ", parseInt(index));
        const i = parseInt(index) - 1;
        console.log("i: ", i);
        if (tasks[i]) {
            tasks[i].task = newTask;
            await saveTasks(tasks);
            console.log('Task updated!');
        } else {
            console.log('Task not found.');
        }
    })

program.parse(process.argv);