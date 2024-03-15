import Axios from "../helpers/axios";

import { errorHandler } from "../helpers/errorHandler";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const backgroundImage = {
    backgroundImage:
      "url('http://wallup.net/wp-content/uploads/2015/12/95020-anime.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: "brightness(90%)",
  };
  let token = localStorage.getItem("access_token");

  const formRef = useRef(null);
  let navigate = useNavigate();
  let [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const doneAdd = (data) => {
    // console.log(data,"AAAAA")
    formRef.current.reset();
    setInput({
      username: "",
      email: "",
      password: "",
    });
    
    navigate("/");
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    setInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      let data = await Axios.post("/register", input, {});
      doneAdd(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  async function handleExit() {
    try {
      navigate("/login");
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <>
      <section className="flex justify-center h-screen" style={backgroundImage}>
        <div className="container shadow-xl w-96 my-8 backdrop-blur-xl rounded-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleExit}
          >
            ✕
          </button>
          <form
            ref={formRef}
            className="py-2 px-8"
            id="form-add"
            onSubmit={handleAddUser}
          >
            <div className="flex justify-center">
              <h2 className="text-lg font-bold" style={{ color: "black" }}>
                Register User Form
              </h2>
            </div>
            <div className="mb-2">
              <label
                style={{ color: "black" }}
                htmlFor="InputUserName"
                className="text-md label"
              >
                User's Name
              </label>
              <input
                type="text"
                placeholder="insert user's Name"
                className="input input-bordered input-primary w-full"
                name="username"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-2">
              <label
                style={{ color: "black" }}
                htmlFor="inputEmail"
                className="text-md label"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="insert user's email"
                className="input input-bordered input-primary w-full"
                name="email"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-2">
              <label
                style={{ color: "black" }}
                htmlFor="inputUserPassword"
                className="text-md label"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="insert password"
                className="input input-bordered input-primary w-full"
                name="password"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-success w-32 my-2 bottom-4 right-4">
                Register User
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
