import { useNavigate } from "react-router-dom";

export default function FourOFourPage() {
  let navigate = useNavigate("");

  const backgroundImage = {
    backgroundImage:
      "url('https://i.imgflip.com/j69nf.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: "brightness(90%)",
  };

  async function handleNavToMainPage() {
    try {
      navigate("/");
    } catch (error) {
    }
  }

  return (
    <>
      <section
        className="flex justify-center h-screen items-center"
        style={backgroundImage}
      >
        <div className="container my-12 flex justify-center items-center h-fit p-8 backdrop-blur-lg rounded-xl">
          <div>
            <h1 className="text-8xl"> the developer is sick and tired</h1>
            <h2 className="text-6xl">
              {" "}
              the page you're looking for isn't exist{" "}
              <span className="text-lg">yet</span>
            </h2>
          </div>
          <div className="tooltip" data-tip="back to main page">
            <button
              className="btn btn-primary btn-circle w-24 h-24"
              onClick={handleNavToMainPage}
            >
              BACK
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
