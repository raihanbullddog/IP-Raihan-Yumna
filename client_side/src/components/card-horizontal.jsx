import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../features/user/userSlice";
import { fetchUserDataRdx } from "../features/asyncActionUser";
import { useEffect } from "react";
import { TbTrashX } from "react-icons/tb";

export default function CardHorizontal(props) {
  const { anime, handleShowDetail, handleOnDelete, fetchDataMyAnime } = props;

  // console.log(lodging, "SSSSSSSSSSSS");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserDataRdx());
    fetchDataMyAnime();
  }, []);

  let isPremium = true;
  if (user.status !== "Premium") {
    isPremium = false;
  }

  // console.log(anime.MALId, anime.title);
  return (
    <>
      <div
        className="card bg-base-100 shadow-xl"
        key={anime.MALId}
        style={{ backgroundColor: "#211818" }}
      >
        <div className="card-body">
          <div className="flex gap-5">
            <div className="p-4 w-1/5">
              <img
                src={anime.imgUrl}
                alt={anime.title}
                className="object-contain w-96"
                style={{ objectFit: "cover", width: 200 }}
              />
            </div>
            <div className="w-4/5">
              <h2 className="card-title">{anime.title}</h2>
              <h2 className="card-title">{anime.titleJap}</h2>
              <p className="">Total Episodes : {anime.episodes}</p>
              <p className="">Status: {anime.status}</p>
              <p className="">Aired: {anime.aired}</p>
              <p className="">Producers: {anime.producers}</p>
              <p className="">Licensors: {anime.licensors}</p>
              <p className="">Studios: {anime.studios}</p>
              <p className="limited-lines">{anime.synopsis}</p>

              <div className="card-actions mt-4 gap-2 justify-end">
                <div
                  className="card-actions flex"
                  onClick={() => handleOnDelete(anime.MALId)}
                >
                  <div className="tooltip" data-tip="remove from favorite">
                    <button
                      className="btn btn-outline btn-error btn-circle text-2xl"
                      id="btn-fav"
                    >
                      <TbTrashX />
                    </button>
                  </div>
                </div>

                <div className="card-actions flex">
                  <button
                    className="btn btn-outline btn-info"
                    id="btn-detail"
                    onClick={handleShowDetail}
                    value={anime.MALId}
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
