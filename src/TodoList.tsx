import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditAbleSpan from "./EditAbleSpan";
import {Button, IconButton} from "@mui/material";
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksListItems = props.tasks.length
        ? <ul>{
            props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.todoListId)
                }

                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatus}
                        />
                        <div style={{display: "inline-block"}} className={task.isDone ? "task-done" : ""}>
                            <EditAbleSpan title={task.title} changeTitle={changeTaskTitle}/>
                        </div>
                        {/*<button onClick={removeTask}>x</button>*/}
                        <IconButton onClick={removeTask}
                        sx= {{p:'0px', ml:'10px'}}>
                            <CancelPresentationOutlinedIcon/>
                        </IconButton>
                    </li>
                )
            })}</ul>
        : <span>List is empty</span>

    const addNewTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const onClickHandlerCreator = (filter: FilterValuesType) =>
        () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = ()=> props.removeTodoList(props.todoListId)

    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todoListId)

    return (
        <div>
            <h3>
                <EditAbleSpan title={props.title} changeTitle={changeTodolistTitle} />
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton onClick={removeTodoList}>
                    <CancelPresentationOutlinedIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addNewTask} />

            {tasksListItems}
            <div>
                <Button
                    sx={{mr:'5px', height:'20px', fontSize:'10px', pt:'6px'}}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size='small'
                    variant='contained'
                    onClick={onClickHandlerCreator("all")}>All
                </Button>
                <Button
                    sx={{mr:'5px', height:'20px', fontSize:'10px', pt:'6px'}}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size='small'
                    variant='contained'
                    onClick={onClickHandlerCreator("active")}>Active
                </Button>
                <Button
                    sx={{height:'20px', fontSize:'10px', pt:'6px'}}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size='small'
                    variant='contained'
                    onClick={onClickHandlerCreator("completed")}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;