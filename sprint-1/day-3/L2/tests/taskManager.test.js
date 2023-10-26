"use strict";
const { TaskManager,Task } = require("../index");

describe("Task Manager Class", () => {
    it("should initialize Task Manager Class with Tasks Array", () => {
        const task = new Task(new Task("Test Task", "Description", new Date()));
        const testTaskManager = new TaskManager([task]);
        expect(Array.isArray(testTaskManager.tasks)).toBe(true); // Check if tasks is an array
        expect(testTaskManager.tasks.length).toBe(1); // Check if there's one task in the array
        expect(testTaskManager.tasks[0]).toEqual(task); // Check
    });
    it("should add a new task to the tasks array", () => {
        const testTaskManager = new TaskManager([]);
        const newTask = new Task(new Task("Test Task", "Description", new Date()));
        testTaskManager.addTask(newTask);
        expect(testTaskManager.tasks).toEqual([newTask]);
    });
    it("should delete a task from the tasks array by index", () => {
        const task1 = new Task("Task 1", "Description 1", new Date());
        const task2 = new Task("Task 2", "Description 2", new Date());
        const task3 = new Task("Task 3", "Description 3", new Date());
        const testTaskManager = new TaskManager([task1, task2, task3]);
        // Delete the task at index 1 (task2)
        testTaskManager.deleteTask(1);
        // Expect task2 to be removed from the tasks array
        expect(testTaskManager.tasks).toEqual([task1, task3]);
    });
    it("should update the title of task by index", () => {
        const task1 = new Task("Task 1", "Description 1", new Date());
        const task2 = new Task("Task 2", "Description 2", new Date());
        const task3 = new Task("Task 3", "Description 3", new Date());
        const testTaskManager = new TaskManager([task1, task2, task3]);
        // Update the title of the task at index 1 (task2)
        const newTitle = "Updated Task 2";
        testTaskManager.updateTaskTitle(1, newTitle);
        expect(testTaskManager.tasks[1].title).toBe(newTitle);
    });
    it("should update the description of task by index", () => {
        const task1 = new Task("Task 1", "Description 1", new Date());
        const task2 = new Task("Task 2", "Description 2", new Date());
        const task3 = new Task("Task 3", "Description 3", new Date());
        const testTaskManager = new TaskManager([task1, task2, task3]);
        const newDesc = "Updated Description 2";
        testTaskManager.updateTaskDesc(1, newDesc);
        expect(testTaskManager.tasks[1].description).toBe(newDesc);
    });
    it("should update the date of task by index", () => {
        const task1 = new Task("Task 1", "Description 1", new Date());
        const task2 = new Task("Task 2", "Description 2", new Date());
        const task3 = new Task("Task 3", "Description 3", new Date());
        const testTaskManager = new TaskManager([task1, task2, task3]);
        const newDueDate = new Date('2023-11-15');
        testTaskManager.updateTaskDate(1, newDueDate);
        expect(testTaskManager.tasks[1].dueDate).toEqual(newDueDate);
    });
    it("should mark a task as completed by index", () => {
        const task1 = new Task("Task 1", "Description 1", new Date());
        const task2 = new Task("Task 2", "Description 2", new Date());
        const task3 = new Task("Task 3", "Description 3", new Date());
        const testTaskManager = new TaskManager([task1, task2, task3]);
        testTaskManager.markCompleted(1);
        expect(testTaskManager.tasks[1].isCompleted).toBe(true);
    });
    it("should filter and return tasks by their completed status", () => {
        const task1 = new Task("Task 1", "Description 1", new Date());
        const task2 = new Task("Task 2", "Description 2", new Date());
        const task3 = new Task("Task 3", "Description 3", new Date());
        const testTaskManager = new TaskManager([task1, task2, task3]);
        testTaskManager.markCompleted(1);
        const completedTasks = testTaskManager.filterTasksByCompletionStatus(true);
        expect(completedTasks).toEqual([task2]);
        const pendingTasks = testTaskManager.filterTasksByCompletionStatus(false);
        expect(pendingTasks).toEqual([task1, task3]);
    });
    it("should generate a report with the correct values", () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
      
        const task1 = new Task("Task 1", "Description 1", today);
        const task2 = new Task("Task 2", "Description 2", today);
        const task3 = new Task("Task 3", "Description 3", yesterday);

        task1.taskCompleted();
        const testTaskManager = new TaskManager([task1, task2, task3]);
        const report = testTaskManager.generateReport();
        expect(report.completed).toBe(1); // One task is completed
        expect(report.pending).toBe(2); // Two tasks are pending
        expect(report.tasksDueToday).toEqual([task1, task2]); // Two tasks are due today
        expect(report.overdueTasks).toEqual([task3]); // One task is overdue
    });
});
