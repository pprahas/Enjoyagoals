import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarView from "./Calendar/CalendarView";
import Progressbar from "./ProgressBar/Progressbar";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Roomcode from "./Room/InviteRoom";
// import { useNavigate } from "react-router-dom";

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: Squares2X2Icon,
  },
  {
    name: "Automations",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: LifebuoyIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkSquareIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function logOut() {
  //   const navigate = useNavigate();
  window.localStorage.removeItem("user_data");
  window.localStorage.removeItem("other_user_data");

  // window.localStorage.removeItem("username");
  // window.localStorage.removeItem("email");
  // window.localStorage.removeItem("firstName");
  // window.localStorage.removeItem("lastName");
  // window.localStorage.removeItem("userId");
  window.localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("currentRoom");
  window.localStorage.removeItem("percentageComp");
  window.localStorage.removeItem("numberComp");
  //   navigate("/login");
}

function leaveRoom() {
  const currentRoomID = window.localStorage.getItem("currentRoom");
  const user_object = JSON.parse(window.localStorage.getItem("user_data"));
  const userID = user_object._id;

  // remove User from Room Object's users[] array
  axios
    .post("http://localhost:8080/room/update", {
      id: currentRoomID,
      fieldName: "users",
      remove: true,
      value: userID,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  // remove Room from User Object's rooms[] array
  axios
    .post("http://localhost:8080/user/updateOM", {
      id: userID,
      fieldName: "rooms",
      remove: true,
      value: currentRoomID,
    })
    .then((res2) => {
      console.log(res2.data);
      window.localStorage.setItem("currentRoom", res2.data.rooms[0]._id);
      window.localStorage.setItem("user_data", JSON.stringify(res2.data));
      window.localStorage.setItem("other_user_data", JSON.stringify(res2.data));
    })
    .catch((err2) => {
      console.log(err2);
    });

  /*
    // update user_data in localStorage & set currentRoom to the first room in the User's rooms[] array
    axios
      .post("http://localhost:8080/query_database/user", {
        "id": userID,
      })
      .then((res3) => {
        window.localStorage.setItem("user_data", JSON.stringify(res3.data));
        window.localStorage.setItem("currentRoom", res3.data.rooms[0]);
      })
      .catch((err3) => {
        console.log(err3);
      });
      */
}

const Header = (props) => {
  const [calIsShown, setCalIsShown] = useState(false);
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("0");
  const [teamList, setteamList] = useState([]);
  const [code, setShowCode] = useState(false);

  //  const roomId = window.localStorage.getItem("currentRoom");
  const [roomId, setRoomId] = useState(
    window.localStorage.getItem("currentRoom")
  );
  const [roomName, setRoomName] = useState("Room Name");
  const [completeCount, setCompleteCount] = useState(0);
  const [pendingTaskCount, setPendingCount] = useState(0);
  const [teamTaskCount, setTeamCount] = useState(0);
  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  const username = user_object.username;

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    axios
      .post("http://localhost:8080/room/get", {
        id: roomId,
      })
      .then((res) => {
        setRoomName(res.data.name);
      })
      .catch((err) => {
        console.log("error", err);
      });
    axios
      .post("http://localhost:8080/task/task_count", {
        id: roomId,
        username: username,
      })
      .then((res) => {
        //may have to change to UID when username changes are implemented
        setTeamCount(res.data[2]);
        setPendingCount(res.data[0]);
        setCompleteCount(res.data[1]);
      });
  };

  //Progressbar backend request
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(id)
    axios
      .post("http://localhost:8080/progress_bar", {
        id: roomId,
      })
      .then((res) => {
        console.log(res.data.percent);
        window.localStorage.setItem("percentageComp", res.data.percent);
        window.localStorage.setItem("numberComp", res.data.number);
        setNumber(res.data.number);
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.log(message);
      });
  };

  //Calendar backend request
  const submitCal = async (e) => {
    e.preventDefault();
    //props.createNotif("warning", "Aaaa scary warning", "This is a test from header");
    setCalIsShown(true);
    setRoomId(window.localStorage.getItem("currentRoom"));
    console.log(roomId);
    axios
      .post("http://localhost:8080/task/pending_tasks", {
        id: roomId,
        username: username,
      })
      .then((res) => {
        setteamList(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  // useEffect(() => {}, []);

  const currDate = new Date().toLocaleDateString();

  return (
    <Popover className="fixed inset-x-0 border-b-2 border-gray-100 mb-24 bg-white z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 md:space-x-16">
            <a href="#">
              <span className="sr-only">Your Company</span>
              {/* <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
              <div></div>
              <img className="h-8 w-auto sm:h-10" src="/logo.png" alt="" />
            </a>
            <a
              // href="/homepage"
              className="text-2xl font-semibold text-green-500"
            >
              {completeCount}
            </a>
            <a
              // href="/homepage"
              className="text-2xl font-semibold text-red-500"
            >
              {pendingTaskCount}
            </a>
            <a
              // href="/homepage"
              className="text-2xl font-semibold text-blue-500"
            >
              {teamTaskCount}
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
            <a
              // href="/homepage"
              className="text-2xl font-semibold text-green-500"
            >
              32
            </a>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <div>
              {/* <Progressbar /> */}
              <a
                href="/homepage"
                className="text-2xl font-semibold text-gray-500 hover:text-gray-900"
              >
                {roomName}
              </a>
              <div className="flex-row min-h-fit">
                {/* <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-row flex float-right ml-1 mb-1 rounded-md border border-gray-300 bg-white px-1  text-xs font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none"
                >
                  Re
                </button> */}
                <Progressbar number={number} />
                <h1>Tasks Left: {window.localStorage.getItem("numberComp")}</h1>
              </div>
            </div>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <div>
              <button
                // href="#"
                //calendar here
                onClick={submitCal}
                className="whitespace-nowrap font-semibold text-xl text-gray-500 hover:text-gray-900 mr-12"
              >
                {currDate}
              </button>
              <CalendarView
                onClose={() => setCalIsShown(false)}
                data={teamList}
                show={calIsShown}
              />
              {/* {calIsShown && <Calendar />} */}
              {/* {<Calendar onClose={() => setCalIsShown(false)} />} */}
            </div>

            <button
              onClick={() => {
                setShowCode(true);
              }}
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Invite Users
            </button>
            <Roomcode
              onClose={() => {
                setShowCode(false);
              }}
              id={roomId}
              show={code}
            />
            <button
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700"
              onClick={leaveRoom}
            >
              Leave Room
            </button>
            <a href="/login">
              <button
                type="button"
                className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                onClick={logOut}
              >
                Log Out
              </button>
            </a>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-indigo-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
