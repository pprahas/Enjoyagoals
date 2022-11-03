import React, { useState } from "react";
import axios from "axios";
import "./TaskModal.css";
import TextInput from "./TextInput";

const PendingInformation = (props) => {
  if (!props.show) {
    return null;
  }
  const [showText, setShowText] = useState(false);

  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  const username = user_object.username;

  const submitTask = async (e) => {
    e.preventDefault();
    props.onClose;
    //open a text box
    setShowText(true);
  };

  return (
    // <div className="overlay" class="fixed pin z-50 overflow-auto flex w-36">
    <div className="fixed pin z-50 overflow-auto flex w-36">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            {props.name}
          </h1>
          <p>Description: {props.desc}</p>
          <p>Difficulty: {props.difficulty} </p>
          <p>Deadline: {props.date}</p>
          <p>Points: {props.points}</p>
          <p>Assigned: {props.assigned}</p>

          <button
            type="button"
            className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={submitTask}
          >
            Submit
          </button>

          <TextInput onClose={() => setShowText(false)} show={showText}
            date={props.date}
            desc={props.desc}
            difficulty={props.difficulty}
            assigned={props.assigned}
            name={props.name}
            points={props.points}
            id={props.id} />

          <button
            type="button"
            className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onClose}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default PendingInformation;
