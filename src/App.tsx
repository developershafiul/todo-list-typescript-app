import React from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import {ITask} from './Interfaces';

function App() {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    if(e.target.name === "task"){
      setTask(e.target.value)
    }else{
      setDeadline(Number(e.target.value));
    }
  };

  const addTask = () =>{
    const newTask = {taskName: task, deadline: deadline};
    setTodoList([...todoList, newTask ]);
    setTask("");
    setDeadline(0);
  };

  const complateTask = (taskNameToDelete: string) =>{
    setTodoList(todoList.filter((task)=>{
      return task.taskName !== taskNameToDelete;
    }))
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" placeholder="Task..." value={task} name="task" onChange={handleChange} />
          <input type="number" placeholder="Deadline (in Days)" value={deadline} name="deadline" onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {
          todoList.map((task: ITask, key: number)=>{
            return <TodoTask key={key} task={task} complateTask={complateTask}></TodoTask>
          })
        }
      </div>
    </div>
  );
}

export default App;
