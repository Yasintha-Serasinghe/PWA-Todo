import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFlag } from "react-icons/fa";
import UpdateModel from "./updateModel";
import DeleteModel from "./deleteModel";

function allTask() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get tasks for user on page load
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      setError("User data not found in session storage.");
      return;
    }

    const data = JSON.parse(userData);
    setUserId(data._id);
    fetchTasks(data._id);
  }, []);

  //get the todo from server
  const fetchTasks = async (userId) => {
    try {
      setLoading(true);
      console.log("Fetching tasks for user:", userId);
      const res = await axios.get("https://pwa-todo.onrender.com/todo/all");
      console.log("Response from server:", res.data);
      const userTasks = res.data.filter((task) => task.User === userId); // filter the todo with user id
      console.log("Filtered user tasks:", userTasks);
      setAllTasks(userTasks);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  //status color method
  function getStatusColor(status) {
    switch (status) {
      case "Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  }

    //priority color method
  function getPriorityIconColor(priority) {
    switch (priority) {
      case "High":
        return "red";
      case "Normal":
        return "blue";
      default:
        return "#FFAC0B";
    }
  }

  //edit model handler
  const handleOpenModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };
  //close edit modal handler
  const handleCloseModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

    //delete model handler
  const handleDeleteOpenModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowDeleteModal(true);
  };

    //close delete modal handler
  const handleDeleteCloseModal = () => {
    setTimeout(() => {
      setShowDeleteModal(false);
    }, 1000);
  };

  return (
    <div>
        {/** loader  */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : allTasks.length === 0 ? (
        <div>No tasks found for the user.</div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/**table  */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-100 uppercase bg-[#05674A] dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
                {/**mapping the server response */}
              {allTasks?.map((task) => (
                <tr
                  key={task._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4  text-sm text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {task.Title}
                  </th>
                  <td className="px-6 py-4">
                    {/* {task.Status} */}
                    <span
                      className={`inline-block px-2 py-1 rounded-lg text-white ${getStatusColor(
                        task.Status
                      )}`}
                    >
                      {task.Status === "To-Do" && (
                        <span className="inline-flex items-center">To-do </span>
                      )}
                      {task.Status === "Progress" && (
                        <span className="inline-flex items-center">
                          Progress
                        </span>
                      )}
                      {task.Status === "Completed" && (
                        <span className="inline-flex items-center">
                          Completed
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 rounded-lg">
                      <FaFlag
                        style={{ color: getPriorityIconColor(task.Priority) }}
                        className=" inline-block ml-1"
                      />
                      <span className=" ml-2">{task.Priority}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {task.Comment ? task.Comment : "No Comments"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(task.DueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                      onClick={() => handleOpenModal(task._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline mr-3"
                      onClick={() => handleDeleteOpenModal(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/** update model component */}
      <UpdateModel
        taskId={selectedTaskId}
        visible={showModal}
        onClose={handleCloseModal}
        onUpdateTodo={handleCloseModal}
      />
        {/** delete model component */}
      <DeleteModel
        taskId={selectedTaskId}
        visible={showDeleteModal}
        onClose={handleDeleteCloseModal}
      />
    </div>
  );
}

export default allTask;
