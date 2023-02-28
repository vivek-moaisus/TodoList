import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import UpdateTask from "./UpdateTask";
const Card = ({ taskObj, index, deleteTask, updateListArr }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArr(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="card border-0 shadow">
            <div className="p-3">
              <div className="bg-gradient bg-secondary p-2 text-white rounded text-center w-25">
                {taskObj.TaskName}
              </div>
              <p className="p-2">{taskObj.Status}</p>
              <div className="text-end">
                <FiEdit className="edit-icon" onClick={() => setModal(true)} />
                <MdDelete className="delete-icon" onClick={handleDelete} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
