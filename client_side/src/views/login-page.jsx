import { useState } from "react";
import Axios from "../helpers/axios";
import { errorHandler } from "../helpers/errorHandler";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function LoginPage() {
  let navigate = useNavigate("");
  const [form, setForm] = useState({
    inputCreds: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // console.log(form)

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const { data } = await Axios.post("/login", form);
      localStorage.setItem("access_token", data.access_token);

      toast.success(`Login succeeded!`, {
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      // console.error(error);
      errorHandler(error);
    }
  }

  function handleNavToRegister() {
    navigate("/register");
  }

  async function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    try {
      const { data } = await Axios.post(
        "/login/google",
        {},
        {
          headers: {
            ["google-token"]: response.credential,
          },
        }
      );

      localStorage.setItem("access_token", data.access_token);
      toast.success(`Login succeeded with google`, {
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "529517764601-n501j8ncil97p9sjcam83bddrndpbaun.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
  }, []);

  return (
    <>
      <section>
        <div className="hero min-h-screen bg-base-200" style={{
          backgroundImage: "url(http://www.pixelstalk.net/wp-content/uploads/2016/08/HD-1920x1080-Anime-Background.jpg)"
        }}>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold subpixel-antialiased text-white italic">Login now!</h1>
              <p className="py-6 no-underline italic subpixel-antialiased text-white">
                The MyAnimeList website is a comprehensive database for
                anime and manga enthusiasts. It allows users to create and
                manage their own personalized anime and manga lists, tracking
                their progress, ratings, and reviews. MAL also provides detailed
                information about each title, including synopses, character
                profiles, staff and cast lists, episode guides, and more.
                Additionally, users can interact with each other through forums,
                groups, and messaging features.
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username / email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username / email"
                    className="input input-bordered"
                    name="inputCreds"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    onChange={handleOnChange}
                  />
                  <label className="label">
                    new here?
                    <span>
                      <a
                        onClick={handleNavToRegister}
                        className="label-text-alt link link-hover"
                      >
                        Register Now!
                      </a>
                    </span>
                  </label>
                </div>
                <div className="form-control mt-6 flex justify-center items-center">
                  <button className="btn btn-primary w-full" type="submit">
                    Login
                  </button>
                  <p>OR</p>
                  <div id="buttonDiv"></div>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
