"use strict";
const { Task } = require("../index");
describe("Task Class", () => {
    it("should initialize a Task Object with properties", () => {
        const task = new Task("Test Task", "Description", new Date());
        expect(task.title).toBe("Test Task");
        expect(task.description).toBe("Description");
        expect(task.dueDate).toBeInstanceOf(Date);
        expect(task.isCompleted).toBe(false);
    });
    it("should update the title of the task object", () => {
        const task = new Task("Test Task", "Description", new Date());
        task.updateTitle('New Title');
        expect(task.title).toBe('New Title');
    });
    it("should update the description of the tasj object", () => {
        const task = new Task("Test Task", "Description", new Date());
        task.updateDesc("New Description");
        expect(task.description).toBe("New Description");
    });
    it("should update the date of the task object", () => {
        const originalDate = new Date();
        const task = new Task("Test Task", "Description", originalDate);
        const newDate = new Date('2023-10-30'); // Replace with the desired date
        task.updateDate(newDate);
        expect(task.dueDate).toEqual(newDate);
    });
    it("should mark task as completed", () => {
        const task = new Task("Test Task", "Description", new Date());
        task.taskCompleted();
        expect(task.isCompleted).toBe(true);
    });
});
