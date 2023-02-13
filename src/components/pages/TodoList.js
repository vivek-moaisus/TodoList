import React, { useEffect, useState } from 'react'
import Card from './Card';
import CreateTask from './CreateTask'

function TodoList() {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    const [change, setChange] = useState("All")

    useEffect(() => {
        let arr = localStorage.getItem("tasklist")
        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const deleteTask = (index) => {
        let tmpList = [...taskList]
        tmpList.splice(index, 1)
        localStorage.setItem("tasklist", JSON.stringify(tmpList))
        setTaskList(tmpList)
    }

    const updateListArr = (obj, index) => {
        let tmpList = [...taskList]
        tmpList[index] = obj
        localStorage.setItem("tasklist", JSON.stringify(tmpList))
        setTaskList(tmpList)
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tmpList = taskList
        tmpList.push(taskObj)
        localStorage.setItem("tasklist", JSON.stringify(tmpList))
        setTaskList(tmpList)
        setModal(false)
    }
    return (
        <>
            <div className='bg-gradient bg-secondary header'>
                <div className='container-fluid p-4'>
                    <h3 className='text-white text-center'>Todo List</h3>
                    <div className='row mt-2'>
                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center'>
                            <button className="btn btn-light w-25" onClick={() => setModal(true)}>Create Task</button>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 d-flex d-flex justify-content-center'>
                            <select id='inputState' className='form-select w-25' value={change} onChange={(e)=>setChange(e.target.value)} >
                                <option value="All">All</option>
                                <option value="Complete" >Complete</option>
                                <option value="Incomplete" >Incomplete</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='task-container'>
                {
                    taskList.filter((obj)=>(change!=="All")?obj.Status===change:taskList).map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArr={updateListArr} key={TodoList.id} />)
                }
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    )
}

export default TodoList