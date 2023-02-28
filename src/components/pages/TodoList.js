import React, { useEffect, useState } from "react";
import Card from "./Card";
import CreateTask from "./CreateTask";
import ReactPaginate from "react-paginate";
import axios from "axios";

function TodoList() {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [change, setChange] = useState("All");
  const [query, setQuery] = useState([]);
  const [search, setSearch] = useState([]);
  const [skip, setSkip] = useState(0);
  const [listPerPage, setListPerPage] = useState(2);

  useEffect(() => {
    axios.get("http://localhost:4000/tasklist").then((res) => {
      setTaskList(res.data);
      setQuery(res.data);
      setSearch(res.data);
    });
  }, []);

  const deleteTask = (index) => {
    let tmpList = [...taskList];
    tmpList.splice(index, 1);
    localStorage.setItem("tasklist", JSON.stringify(tmpList));
    setTaskList(tmpList);
  };

  const updateListArr = (obj, index) => {
    let tmpList = [...taskList];
    tmpList[index] = obj;
    localStorage.setItem("tasklist", JSON.stringify(tmpList));
    setTaskList(tmpList);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tmpList = taskList;
    tmpList.push(taskObj);
    localStorage.setItem("tasklist", JSON.stringify(tmpList));
    setTaskList(tmpList);
    setQuery(tmpList);
    setSearch(tmpList);
    setModal(false);
  };

  const stsFilter = () => {
    const tmpList = taskList.filter((obj) =>
      change !== "All" ? obj.Status === change : taskList
    );
    setQuery(tmpList);
  };

  const searchFilter = () => {
    if (change) {
      const tmpList = taskList.filter((obj) =>
        obj.TaskName.toLowerCase().includes(search)
      );
      setSearch(tmpList);
    }
  };
  useEffect(() => {
    stsFilter();
    searchFilter();
  }, [change, taskList]);

  const handelPageClick = (data) => {
    console.log(data.selected, query);
    setSkip(data.selected * 3);
    setQuery(taskList);
  };

  return (
    <>
      <div className="bg-gradient bg-secondary header">
        <div className="container-fluid p-4">
          <h3 className="text-white text-center">Todo List</h3>
          <div className="row mt-2">
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center">
              <button
                className="btn btn-light w-50"
                onClick={() => setModal(true)}
              >
                Create Task
              </button>
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type to search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 d-flex d-flex justify-content-center">
              <select
                id="inputState"
                className="form-select w-50"
                value={change}
                onChange={(e) => setChange(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 d-flex d-flex justify-content-start">
              <select
                className="form-select w-50"
                value={listPerPage}
                onChange={(e) => setListPerPage(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="task-container">
        {query
          .filter((obj) => obj.TaskName.toLowerCase().includes(search))
          .splice(skip, listPerPage)
          .map((obj, index) => (
            <Card
              key={TodoList.id}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArr={updateListArr}
              stsFilter={stsFilter}
            />
          ))}
      </div>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={10}
        onPageChange={handelPageClick}
        containerClassName={"pagination justify-content-center mt-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
}

export default TodoList;
