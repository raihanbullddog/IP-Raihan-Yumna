import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../helpers/axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { errorHandler } from "../helpers/errorHandler";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimesRdx } from "../features/asyncAction";

import CardContents from "../components/card-contents";

import InfiniteScroll from "react-infinite-scroll-component";
import LoadingAnimation from "../../skeleton";

export default function HomePage() {
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.animes.animes);

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const [reqParams, setReqParams] = useState({
    page: "",
    status: "",
    order_by: "",
    sort: "",
  });

  const [animesList, setAnimesList] = useState([]);

  const [pagination, setPagination] = useState({
    last_visible_page: 0,
    has_next_page: true,
    current_page: 1,
    items: {
      count: 10,
      total: 0,
      per_page: 0,
    },
  });

  const fetchDataAnimes = async () => {
    try {
      const { page, status, order_by, sort } = reqParams;
      let { data } = await Axios.get("http://localhost:3000/animes/", {
        params: { page, status, order_by, sort },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setAnimesList(data.data);

      setPagination(data.pagination);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleStatus = (e) => {
    setReqParams((prevValue) => ({
      ...prevValue,
      status: e.target.value,
    }));
  };

  const handleRemoveFilter = (e) => {
    setReqParams((prevValue) => ({
      ...prevValue,
      page: "",
      status: "",
      order_by: "",
      sort: "",
    }));
  };

  const handleSort = (e) => {
    setReqParams((prevValue) => ({
      ...prevValue,
      sort: e.target.value,
    }));
  };

  const handleShowDetail = async (event) => {
    try {
      navigate(`/anime/${event.target.value}`);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleToAddFav = async (rating) => {
    try {
      // console.log(rating,">>>>>>>>>>>>>>>>")
      let { data } = await Axios({
        url: `http://localhost:3000/myanime/addfav/${rating}`,
        method: "post",
        data: {},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const customId = `toast-anime-id-${data.MALId}`;

      toast.success(`succeeded adding anime :${data.title} to your favorite`, {
        theme: "dark",
        toastId: customId,
      });
      // console.log(data, "aaaaaaaaa");
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    fetchDataAnimes();
    dispatch(fetchAnimesRdx());
  }, [reqParams]);

  const fetchMoreData = async () => {
    try {
      const nextPage = pagination.current_page + 1;
      const { status, order_by, sort } = reqParams;
      const { data } = await Axios.get("http://localhost:3000/animes/", {
        params: { page: nextPage, status, order_by, sort },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setAnimesList([...animesList, ...data.data]);
      setPagination(data.pagination);
    } catch (error) {
      errorHandler(error);
    }
  };
  // console.log(animesList);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <ToastContainer />
          <InfiniteScroll
            dataLength={animesList.length}
            next={fetchMoreData}
            hasMore={pagination.has_next_page}
            loader={
              <div className="flex justify-center items-center h-screen">
                <LoadingAnimation />
              </div>
            }
          >
            <div className="flex flex-wrap gap-8 justify-center ml-4 mr-4 mt-8 mb-8">
              {animesList.map((anime) => {
                return (
                  <CardContents
                    key={anime.mal_id}
                    anime={anime}
                    handleShowDetail={handleShowDetail}
                    handleToAddFav={handleToAddFav}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </>
      )}
    </>
  );
}
