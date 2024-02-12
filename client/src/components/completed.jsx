import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFlag } from "react-icons/fa";
import DeleteModel from "./deleteModel";

function completed() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //get user data from session storage
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
      const userTasks = res.data.filter(
        (task) => task.User === userId && task.Status === "Completed" // filter todos with user id and completed status
      );
      console.log("Filtered user tasks:", userTasks);
      setCompletedTasks(userTasks);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

    //status color method
  function getStatusColor(status) {
    switch (status) {
      case "Not Started":
        return "bg-gray-500";
      case "Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-400";
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

    //open delete modal
  const handleDeleteOpenModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowDeleteModal(true); // Set showDeleteModal to true when opening the modal
  };

    //close delete modal
  const handleDeleteCloseModal = () => {
    setShowDeleteModal(false); // Set showDeleteModal to false when closing the modal
  };

  return (
    <div>
        {/** loader  */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : completedTasks.length === 0 ? (
        <div>No tasks found for the user.</div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/**table */}
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
                  <span className="sr-only text-red-700">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
                {/** mapping server response */}
              {completedTasks.map((task) => (
                <tr
                  key={task._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4  text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    {task.Title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-lg text-white bg-green-500`}
                    >
                      Completed
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
        {/** delete modal */}
      <DeleteModel
        taskId={selectedTaskId}
        visible={showDeleteModal}
        onClose={handleDeleteCloseModal}
      />
    </div>
  );
}

export default completed;
