import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditTask = ({ list, setList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // handler

  const handler = (e) => {
    const { name, value } = e.target;
    setEdit((edit) => ({
      ...edit,
      [name]: value,
    }));
  };

  // end

  // useeffect terima id from app

  useEffect(() => {
    const itemEdit = list.find((item) => item.id.toString() === id);
    if (!itemEdit) {
      toast.info("item tidak ditemukan");
      return;
    }
    setEdit((edit) => ({
      title: itemEdit.title,
      description: itemEdit.description,
      dueDate: itemEdit.dueDate,
    }));
  }, [list, id]);

  // end

  // submit function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit.title.trim() || !edit.dueDate.trim()) {
      toast.info("input tidak boleh kosong");
      return;
    }
    const opsional = {
      ...edit,
      description: edit.description.trim(),
    };

    setList((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              ...opsional,
            }
          : item
      )
    );
    navigate("/", { state: { edit: true } });
  };

  // end

  return (
    <div className="w-2/5 border-2 border-gray-500 h-auto rounded-xl font-serif ">
      <h2 className="mb-8 text-2xl ml-3 pt-8 font-bold">To-Do-Edit</h2>
      <div className="flex items-center  justify-between bg-white rounded-xl shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col gap-2 ml-3 text-xs mt-5">
          <h3 className="text-xl font-bold ">Edit Tasks</h3>
        </div>
        <div className="me-3 text-xs flex mt-9">
          <Link to={"/"}>
            <button className="transition-transform duration-500 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} type="submit" className="px-3 py-3 mb-28 ">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="" className="mb-1 font-semibold text-sm">
            {"  "}
            Title <span className="text-red-600">*</span>
          </label>
          {/* title */}
          <input
            name="title"
            value={edit.title}
            onChange={handler}
            className="ring rounded-md p-2 w-full flex"
            type="text"
            placeholder="write up chemistry lab report"
          />
          <label htmlFor="" className="mb-1 font-semibold text-sm my-3">
            {" "}
            Description (optional)
          </label>
          {/* description */}
          <input
            name="description"
            value={edit.description}
            onChange={handler}
            className="ring rounded-md p-2 w-full flex  "
            type="text"
            placeholder="write up your description "
          />

          <div className="flex flex-col mt-3">
            <label htmlFor="dueDate" className="mb-3 font-semibold text-sm ">
              {" "}
              Deadline <span className="text-red-500">*</span>
            </label>

            <div className=" ring rounded-md w-full overflow-hidden">
              {/* duedate */}
              <input
                name="dueDate"
                value={edit.dueDate}
                onChange={handler}
                id="dueDate"
                type="date"
                className="p-2 w-full outline-none "
                required
              />
            </div>
          </div>
          <button className=" rounded-md w-full overflow-hidden mt-10 p-2 bg-black text-white transition-transform duration-300 hover:scale-105">
            Save Task
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center mt-20 mb-8">
        <p className="text-xs text-gray-400">Designed By Liani ajol</p>
      </div>
    </div>
  );
};

export default EditTask;
