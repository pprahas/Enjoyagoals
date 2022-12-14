import React, { useState } from "react";
import axios from "axios";
import "../TaskModal.css";

const TaskModal = (props) => {
  if (!props.show) {
    return null;
  }
  const [task_name, settask_name] = useState("");
  const [task_description, settask_description] = useState("");
  const [task_difficulty, settask_difficulty] = useState("");
  const [task_deadline, settask_deadline] = useState("");
  const [points, setpoints] = useState("");
  const [assigned_user, setassigned_user] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task_deadline == "" || task_name == "" || task_description == "" || isNaN(points)) {  
      if (task_name == "") {
        props.createNotif("warning", "Error!", "Please name the task.");
        return;
      }
      if (task_description == "") {
        props.createNotif("warning", "Error!", "Please write a description.");
        return;
      }
      if (isNaN(points)) {
        props.createNotif("warning", "Error!", "The input must be a number.");
        return;
      }
      if (task_deadline == "") {
        props.createNotif("warning", "Error!", "Please select a deadline.");
        return;
      }
    }
    const user_id = window.localStorage.getItem("userId");
    let user_object = window.localStorage.getItem("user_data");
    user_object = JSON.parse(user_object);
    //complete, pending, unassigned
    const status = "unassigned";
    const roomId = window.localStorage.getItem("currentRoom");

    axios
      .post("http://localhost:8080/task/create", {
        creatorId: user_object._id,
        name: task_name,
        description: task_description,
        difficulty: task_difficulty,
        deadline: task_deadline,
        points: points,
        status: status,
        roomId: roomId,
      })
      .then((res) => {
        props.createNotif("success", "Success!", "Task created.");
        console.log("Posting data", res);
      })
      .catch((err) => {
        props.createNotif("warning", "Error!", "Task was not created.");
        console.log(err.response.data.msg);
      });
  };

  return (
    //    <div className="overlay" class="fixed pin z-50 overflow-auto flex">
    <div className="fixed pin z-50 overflow-auto flex">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            Create Task
          </h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="w-full border-b border-gray-100"></div>

            <div className=" rounded-md px-4">
              <input
                id="task_name"
                name="task_name"
                type="text"
                autoComplete="task_name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Task Name"
                onChange={(e) => settask_name(e.target.value)}
              // value={task_name}
              />
              {/* <Input label="text" htmlFor="text" placeholder="Last Name" /> */}
              <input
                id="task_description"
                name="task_description"
                type="text"
                autoComplete="task_description"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Task Description"
                onChange={(e) => settask_description(e.target.value)}
                value={task_description}
              />
              <input
                id="task_difficulty"
                name="task_difficulty"
                autoComplete="task_description"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Task Difficulty"
                list="difficulty"
                onChange={(e) => settask_difficulty(e.target.value)}
                value={task_difficulty}
              />
              <datalist id="difficulty">
                <option value="Easy" />
                <option value="Medium" />
                <option value="Hard" />
              </datalist>

              {/* <Input label="text" htmlFor="text" placeholder="Username" /> */}
              {/* <Input
                label="email"
                htmlFor="email-address"
                placeholder="Email address"
              /> */}
              <input
                id="points"
                name="points"
                type="points"
                autoComplete="points"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Points"
                onChange={(e) => setpoints(e.target.value)}
                value={points}
              />
              {/* <Input
                label="password"
                htmlFor="password"
                placeholder="Password"
              /> */}
              {/* <input
                id="assigned_user"
                name="assigned_user"
                type="text"
                autoComplete="assigned_user"
                className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Assigned User"
                onChange={(e) => setassigned_user(e.target.value)}
                value={assigned_user}
              /> */}
              <input
                id="deadline"
                name="deadline"
                type="date"
                autoComplete=""
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Deadline"
                onChange={(e) => settask_deadline(e.target.value)}
                value={task_deadline}
              />
              {/* <Input
                label="password"
                htmlFor="password"
                placeholder="Confirm Password"
              /> */}
              {/* <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="confirm_password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
              /> */}
              <div className="border-t border-gray-200"></div>
            </div>
            {/* <div class="w-full border-b border-gray-100"></div> */}
            <div className="w-full border-b border-gray-100"></div>

            {/* <p className="mt-2 text-center text-sm text-red-600">{} </p> */}
            {/* <p className="mt-2 text-center text-sm text-red-600">{message} </p> */}

            <div className="px-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Task
              </button>
              <button
                type="button"
                className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={props.onClose}
              >
                Abort
              </button>
              <div>
                {/* <p className="mt-2 text-center text-sm text-gray-600">
                  <b>Or</b>
                </p> */}
              </div>
              &nbsp;
              <div>
                {/* <img
                  className="mx-auto h-12 w-auto"
                  src={SignIn}
                  onclick="this.src='{SignIn2}'"
                  alt="Google"
                /> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TaskModal;
