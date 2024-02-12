import React, { useState } from "react";
import { Tabs, Spinner } from "flowbite-react";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import AllTask from "../components/allTask";
import Completed from "../components/completed";
import AddModel from "../components/addModel";
import Navbar from "../components/navBar";

function home() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  //add todo button handler
  const handleOpenModal = () => {
    setShowModal(true);
  };

  //model close method
  const handleCloseModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  //refresh button handler
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRefreshKey((prevKey) => prevKey + 1);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className=" bg-[#F9F9F9]">
        <div className=" p-2 w-full bg-white/60  md:p-10 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/** button */}
          <div className=" flex float-right p-2 ">
            <button
              onClick={handleOpenModal}
              type="button"
              class="  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <IoMdAddCircle className="inline-block mr-2 " size={20} />
              Add Todo{" "}
            </button>
            {/** refresh button */}
            <button
              onClick={handleRefresh}
              type="button"
              class="  focus:outline-none text-black bg-white border-2 border-green-700  font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 dark:text-white"
            >
              <FiRefreshCcw className="inline-block mr-2 " size={20} />
              Refresh{" "}
            </button>
          </div>

          {/** tabs*/}

          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            className="flex-auto w-full"
          >
            <Tabs.Item
              active
              title="All Tasks"
              icon={FaTasks}
              className="w-full"
            >{/**all task component  */}
              <AllTask key={refreshKey} />
            </Tabs.Item>

            <Tabs.Item
              title="Completed Tasks"
              icon={MdOutlineTaskAlt}
              className=" w-full"
            >
              {/**completed task component  */}
              <Completed key={refreshKey} />
            </Tabs.Item>
          </Tabs>
        </div>
        <AddModel
          visible={showModal}
          onClose={handleCloseModal}
          onAddTodo={handleCloseModal}
        />
        {/**spinner component */}
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Spinner size="xl" />
          </div>
        )}
      </div>
    </>
  );
}

export default home;
