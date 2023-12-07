import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../store/task/task.slice";
import { selectTaskMessage } from "../store/task/task.selectors";
import { toast } from "react-toastify";

const CreateTaskModel = ({ open, setOpen }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const taskMessage = useSelector(selectTaskMessage);

  const handleSubmit = () => {
    console.log(title, description);
    dispatch(
      createTask({
        title,
        description,
        completed: false,
      })
    );
  };

  useEffect(() => {
    if (taskMessage === "Create task successfully") {
      toast.success(taskMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [taskMessage]);

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Create New Task</Modal.Header>
        <Modal.Content image>
          <Modal.Description className="flex justify-center items-center flex-col">
            <Form className="">
              <Form.Field>
                <label>Enter Task Title</label>
                <input
                  placeholder="Enter Task Title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter Task Description</label>
                <textarea
                  placeholder="Enter Task Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
            positive
          >
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CreateTaskModel;
