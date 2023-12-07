import { Button, Table } from "semantic-ui-react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../store/user/user.selectors";
import { getUser } from "../store/user/user.slice";
import React, { useEffect } from "react";
import { deleteTask, getAllTask, updateTask } from "../store/task/task.slice";
import { selectTaskMessage, selectTasks } from "../store/task/task.selectors";
import { toast } from "react-toastify";
import CreateTaskModel from "../components/CreateTaskModel";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserData);
  const tasks = useSelector(selectTasks);
  const taskMessage = useSelector(selectTaskMessage);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllTask());
  }, []);

  const handleUpdateTask = (id: any) => {
    dispatch(updateTask(id));
  };

  const handleDeleteTask = (id: any) => {
    dispatch(deleteTask(id));
  };

  const handleShowCreateTask = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (taskMessage === "Update task successfully") {
      toast.success(taskMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(getAllTask());
    } else if (taskMessage === "Delete task successfully") {
      toast.success(taskMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    dispatch(getAllTask());
  }, [taskMessage]);

  return (
    <div className="w-[90%] mx-auto pt-[2rem]">
      <div>
        <h1 className="text-center">
          Welcome back
          <span className="text-blue-500"> {user?.name}</span>
        </h1>
      </div>
      <div className="flex items-center justify-center my-[1rem] gap-[2rem]">
        {" "}
        <Button
          className="mt-5"
          color="blue"
          onClick={() => {
            handleShowCreateTask();
          }}
        >
          Create a new task
        </Button>
        <Button
          className="mt-5 ml-5"
          color="red"
          onClick={() => {
            localStorage.removeItem("taskManagerToken");
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>
      </div>

      <div className="">
        <Table celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tasks.map((task: any) => (
              <Table.Row key={task._id}>
                <Table.Cell>{task.title}</Table.Cell>

                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    disabled={task.completed}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      task.completed && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => handleUpdateTask(task._id)}
                  >
                    {task.completed ? "Completed" : "Complete"}
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <>
          <CreateTaskModel open={open} setOpen={setOpen} />
        </>
      </div>
    </div>
  );
};

export default Home;
