import { useState } from "react";
import PendingInformation from "./PendingInformation";

const Pending = (props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-indigo-900 text-center py-4 lg:px-4">
      <button
        className="p-2 w-96 justify-center bg-red-700 items-center text-white leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
        onClick={() => setShow(true)}
      >
        <span className="w-24 text-center rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          {props.date}
        </span>
        <span className="text-center font-semibold mr-2 text-left flex-auto">
          {props.name}
        </span>
        {/* <svg
          className="fill-current opacity-75 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg> */}
        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          {props.points}
        </span>
      </button>

      <PendingInformation
        onClose={() => setShow(false)}
        show={show}
        name={props.name}
        date={props.date}
        points={props.points}
        desc={props.desc}
        difficulty={props.difficulty}
        assigned={props.assigned}
        id={props.id}
        createNotif={props.createNotif}
      />
    </div>
  );
};

export default Pending;
