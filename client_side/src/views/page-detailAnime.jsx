import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../helpers/axios";
import "react-toastify/dist/ReactToastify.css";

import { errorHandler } from "../helpers/errorHandler";
import LoadingAnimation from "../../skeleton";

export default function DetailAnimePage() {
  let navigate = useNavigate();
  let { id } = useParams();

  const [loading, setLoading] = useState(true);

  let [anime, setAnime] = useState([]);
  let fetchDetailAnime = async () => {
    try {
      let response = await Axios.get(`/animes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setAnime(response.data);
      setLoading(false);
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
    fetchDetailAnime();
  }, []);

  // console.log(anime);
  // let reqParams = useParams();
  // let location = useLocation();
  // console.log(reqParams, location);
  // const yourPageUrl = "/anime/";
  // const yourPageIdentifier = reqParams.id;
  // const yourDisqusShortname = "http-localhost-5173-1";

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content relative flex-col lg:flex-row">
              <button
                className="btn btn-ghost btn-circle btn-sm absolute top-4 right-2"
                onClick={handleExit}
              >
                X
              </button>
              <img
                src={anime.imgUrl}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-5xl font-bold">{anime.title}</h1>
                <h2 className="text-5xl font-bold">{anime.titleJap}</h2>
                <p className="">Total Episodes : {anime.episodes}</p>
                <p className="">Status : {anime.status}</p>
                <p className="">Aired : {anime.aired}</p>
                <p className="text-justify">synopsis : {anime.synopsis}</p>
                <p className="">
                  Producers : {anime.producers ? anime.producers : "-"}
                </p>
                <p className="">
                  Licensors : {anime.licensors ? anime.licensors : "-"}
                </p>
                <p className="">
                  Studio : {anime.studios ? anime.studios : "-"}
                </p>
              </div>
            </div>
          </div>
          {/* <DisqusComments
        shortname={yourDisqusShortname}
        pageUrl={yourPageUrl}
        pageIdentifier={yourPageIdentifier}
      /> */}
        </>
      )}
    </>
  );
}
