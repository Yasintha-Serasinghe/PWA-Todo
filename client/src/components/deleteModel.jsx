import React, { useState } from "react";
import axios from "axios"; // Add axios import
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DeleteModel({ visible, onClose, taskId }) {
  const [openModal, setOpenModal] = useState(visible);
  

    // Function to handle the delete task
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`https://pwa-todo.onrender.com/todo/delete/${taskId}`);
      onClose(); //close model
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error
    }
  };

  return (
    <Modal show={visible} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this task?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteTask}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModel;
