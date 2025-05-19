import { useEffect, useRef, useState } from "react";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Home from "./pages/Home";
import Datas from "./datas/Datas";
import { data, Route, Routes } from "react-router-dom";

function App() {
  // state datas dummy

  const [list, setList] = useState(Datas);

  // end

  // add function

  const add = (dataForm) => {
    const idAdd = {
      ...dataForm,
      id: crypto.randomUUID(),
      status: false,
    };
    setList((dataForm) => [...dataForm, idAdd]);
  };

  // end

  // status function

  const handleStatus = (id) => {
    setList((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: !item.status,
            }
          : item
      )
    );
  };

  // end

  // deleted  function

  // state undo
  const [undo, setUndo] = useState(null);
  const [count, setCount] = useState(0);
  const toastDelayRef = useRef(0);

  const handleDeleted = (id) => {
    const findItem = list.find((item) => item.id === id);
    if (!findItem) {
      toast.info("item tidak ditemukan");
      return;
    }
    setUndo(findItem);
    setList((list) => list.filter((item) => item.id !== id));
    setCount(5);

    if (toastDelayRef.current) {
      clearTimeout(toastDelayRef.current);
    }
    toastDelayRef.current = setTimeout(() => {
      toast.info("item berhasil dihapus, klik undo untuk membatalkan");
    }, 1000);
  };

  // handle Undo

  const handleUndo = () => {
    if (!undo) {
      toast.error("tidak ada item yang bisa diundo");
      return;
    }
    setList((list) => [...list, undo]);
    toast.info("item berhasil di undo");
    setUndo(null);
    setCount(0);
  };

  // timer undo

  useEffect(() => {
    if (!undo || count === 0) {
      setUndo(null);
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, undo]);

  // end

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home
                list={list}
                onStatus={handleStatus}
                onDeleted={handleDeleted}
                onUndo={handleUndo}
                count={count}
              />
            }
          />
          <Route path="addTask" element={<AddTask add={add} />} />
          <Route
            path="editTask/:id"
            element={<EditTask list={list} setList={setList} />}
          />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}

export default App;
