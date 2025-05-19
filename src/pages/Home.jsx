import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = ({ list, onStatus, onDeleted, onUndo, count }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // useeffect addtask

  useEffect(() => {
    if (location.state?.addTask) {
      toast.success("task berhasil ditambahkan");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // end

  useEffect(() => {
    if (location.state?.edit) {
      toast.info("item berhasil dirubah");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // state search

  const [searchTask, setSearchTask] = useState("");

  const getSearch = () => {
    return list.filter((item) =>
      item.title.toLowerCase().includes(searchTask.toLowerCase())
    );
  };

  // end

  return (
    <>
      <div className="w-2/5 border-2 border-gray-500 h-auto rounded-xl font-serif ">
        <h2 className="mb-8 text-2xl ml-3 pt-8 font-bold">To-Do-List</h2>
        <div className="flex items-center  justify-between mb-5 bg-white rounded-xl shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col gap-2 ml-3 text-xs mt-5">
            <h3 className="text-xl font-bold ">My Tasks</h3>
            <p className="text-gray-800 ">You have 3 task left!</p>
          </div>
          <div className="me-3 text-xs mt-9 flex flex-col gap-2">
            <Link to={"/addTask"}>
              <button className="bg-black  rounded-xl p-2 w-32 text-white">
                Add Task
              </button>
            </Link>
            <button
              onClick={() => onUndo()}
              className="bg-red-500 rounded-xl p-2 w-32 text-white"
            >
              Undo {count ? <span> {count}</span> : null}
            </button>
          </div>
        </div>
        <div className="flex ml-3  ">
          <input
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
            className="p-1 border rounded-md outline-none"
            type="text"
            placeholder="cari task ......"
          />
        </div>
        {/* konten lis */}
        {getSearch().map((item) => (
          <div key={item.id} className="p-3 flex  items-center ">
            <div className="border h-auto  p-3 w-full rounded-md border-gray-500 items-center ">
              <div className="flex justify-between items-center   ">
                <div className="flex gap-2 items-center  ">
                  <button onClick={() => onStatus(item.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`size-5 border item-center rounded-sm ${
                        item.status ? "bg-black text-white" : ""
                      }`}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clip-rule="evenodd"
                      />{" "}
                    </svg>
                  </button>
                  <h2
                    className={`text-sm font-bold uppercase ${
                      item.status ? "line-through text-red-600" : ""
                    }`}
                  >
                    {item.title}
                  </h2>
                </div>

                <div className="flex gap-2 items-center ">
                  <button onClick={() => navigate(`/editTask/${item.id}`)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="size-5"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                  </button>
                  <button onClick={() => onDeleted(item.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="size-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-xs ml-7 mt-3">
                <h2 className="capitalize">{item.description}</h2>
                <p className="text-red-400">{item.dueDate}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center text-xs font-semibold text-gray-600">
          <span>...</span>
          Displaying 5 out of 5<span>...</span>
        </div>

        {/* fotter */}
        <div className="flex items-center justify-center mt-20 mb-8">
          <p className="text-xs text-gray-400">Designed By Liani ajol</p>
        </div>
      </div>
    </>
  );
};

export default Home;
