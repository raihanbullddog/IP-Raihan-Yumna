import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Axios from "../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { errorHandler } from "../helpers/errorHandler";

export default function MyEditPage() {
  const { id } = useParams();
  let navigate = useNavigate();

  const backgroundImage = {
    backgroundImage:
      "url('https://static3.cbrimages.com/wordpress/wp-content/uploads/2019/11/Anime-Funny-Deku.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: "brightness(90%)",
  };

  let token = localStorage.getItem("access_token");

  const formRef = useRef(null);

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  let fetchUserData = async () => {
    try {
      let response = await Axios.get(`/user/findUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setInput(response.data.findUser);
    } catch (error) {
      errorHandler(error);
    }
  };

  const closePage = () => {
    formRef.current.reset();
    setInput({
      username: "",
      email: "",
      password: "",
    });
    toast.success("Profile has been updated successfully");
    navigate(`/`);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    setInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();
    try {
      let { data } = await Axios.put(`/user/editUser`, input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closePage(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  async function handleExit(event) {
    try {
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  // console.log(input);
  return (
    <>
      <section className="flex justify-center h-screen" style={backgroundImage}>
        <div className="card shadow-xl backdrop-blur-xl rounded-xl my-8 h-fit">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleExit}
          >
            ✕
          </button>
          <h1 className="text-3xl font-bold flex justify-center m-4">
            Edit Profile
          </h1>
          <div className="">
            <form
              ref={formRef}
              className="py-2 px-8 grid grid-cols-2 gap-4"
              id="form-add"
              onSubmit={handleEditProfile}
            >
              <div className="mb-2">
                <label htmlFor="inputUsername" className="text-md label">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="insert username"
                  className="input input-bordered input-primary w-full"
                  name="username"
                  value={input.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="inputEmail" className="text-md label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="insert email"
                  className="input input-bordered input-primary w-full"
                  name="email"
                  value={input.email}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="inputPassword" className="text-md label">
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
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
