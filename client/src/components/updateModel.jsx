import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

function updateModel({ visible, onClose, onUpdateTodo, taskId }) {
  const [Title, setTitle] = useState("");
  const [Status, setStatus] = useState("");
  const [Priority, setPriority] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [Comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  //get task id from all task
  useEffect(() => {
    if (taskId) {
      fetchTaskDetails(taskId);
    }
  }, [taskId]);

  //fetch task details
  const fetchTaskDetails = async (taskId) => {
    try {
      //call the server
      const res = await axios.get(
        `https://pwa-todo.onrender.com/todo/single/${taskId}`
      );
      const task = res.data;
      setTitle(task.Title);
      setStatus(task.Status);
      setPriority(task.Priority);
      setDueDate(task.DueDate);
      setComment(task.Comment);
    } catch (error) {
      console.error("Error fetching task details:", error);
      setError(error);
    }
  };

  //submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedTodo = {
      Title,
      Status,
      Priority,
      DueDate,
      Comment,
    };
    try {
      //call the server
      await axios.put(
        `https://pwa-todo.onrender.com/todo/update/${taskId}`,
        updatedTodo
      );
      onUpdateTodo(taskId, updatedTodo);
      setSuccess("Task updated successfully");
      setError("");
      setTimeout(() => {
        setLoading(false);
        setSuccess("");
      }, 4000);
      onClose();
    } catch (err) {
      console.error("Error updating todo:", err);
      setError(err.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal show={visible} onClose={onClose}>
        <Modal.Header>{taskId ? "Edit Todo" : "Add Todo"}</Modal.Header>
        {/** error */}
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> {error}
          </Alert>
        )}
        {success && <Alert color="success">{success}</Alert>}
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex flex-col mb-2">
              {/**title */}
              <label
                htmlFor="title"
                className="inline-block text-sm text-gray-800 sm:text-base mb-2"
              >
                Todo Title*
              </label>
              <input
                type="text"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Todo Title"
                className="w-full rounded border bg-gray-50 px-3 text-gray-800 outline-none ring-green-400 transition duration-100 focus:ring"
              />
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/3 px-3 mb-2">
                {/**status */}
                <label
                  htmlFor="status"
                  className="inline-block text-sm text-gray-800 sm:text-base mb-2"
                >
                  Status
                </label>
                <select
                  value={Status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded border bg-gray-50 px-3 text-gray-800 outline-none ring-green-400 transition duration-100 focus:ring"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="Progress">Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-2">
                {/**priority */}
                <label
                  htmlFor="priority"
                  className="inline-block text-sm text-gray-800 sm:text-base mb-2"
                >
                  Priority
                </label>
                <select
                  value={Priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded border bg-gray-50 px-3 text-gray-800 outline-none ring-green-400 transition duration-100 focus:ring"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-2">
                {/**due date */}
                <label
                  htmlFor="dueDate"
                  className="inline-block text-sm text-gray-800 sm:text-base mb-2"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  value={DueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="Due Date"
                  className="w-full rounded border bg-gray-50 px-3 text-gray-800 outline-none ring-green-400 transition duration-100 focus:ring"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              {/**comment */}
              <label
                htmlFor="comment"
                className="inline-block text-sm text-gray-800 sm:text-base mb-2"
              >
                Comment
              </label>
              <textarea
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
                className="w-full rounded border bg-gray-50 px-3 text-gray-800 outline-none ring-green-400 transition duration-100 focus:ring"
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className=" justify-between">
          {/** buttons */}
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className=" bg-[#05674A]"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Update Todo"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default updateModel;
