pragma solidity ^0.5.0;

contract ToDoList {
    uint public taskCounter = 0;

    struct Task {
        uint ID;
        string desc;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    constructor() public {
        addTask("Welcome to ToDoETH, A Smart Contract based to do list application on Ethereum");
    }

    event addedTask(
        uint id,
        string content,
        bool completed
    );

    event completedTask(
        uint id,
        bool completed
    );

    function addTask(string memory desc) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, desc, false);
        emit addedTask(taskCounter, desc, false);
    }

    function toggleCompleted(uint id) public {
        Task memory task = tasks[id];
        task.completed = !task.completed;
        tasks[id] = task;
        emit completedTask(id, task.completed);
    }
}
