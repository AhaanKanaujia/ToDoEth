 pragma solidity ^0.5.0;

 contract ToDoList {
     uint public taskCounter = 0;

     struct Task {
         uint ID;
         string title;
         string desc;
         bool completed;
     }

     mapping(uint => Task) public tasks;

     constructor() public {
        addTask("Welcome to ToDoETH", "A Smart Contract based to do list application on Ethereum");
     }

     function addTask(string memory title, string memory desc, uint memory priority) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, title, desc, 1, false);
     }
 }
