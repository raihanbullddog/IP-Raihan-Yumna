import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataRdx } from "../features/asyncActionUser";
import { useEffect } from "react";
import { FaRegStar } from "react-icons/fa";

export default function CardContents(props) {
  const { anime, handleShowDetail, handleToAddFav } = props;
  // console.log(lodging, "SSSSSSSSSSSS");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserDataRdx());
  }, []);

//   let isPremium = true;
//   if (user.status !== "Premium") {
//     isPremium = false;
//   }

  // console.log(anime.mal_id)
  return (
    <>
      <div
        className="card card-compact w-72 bg-base-100 shadow-xl justify-center gap-5 py-10"
        style={{ backgroundColor: "#211818" }}
        key={anime.mal_id}
      >
        <div className="card-body">
          <figure className="h-3/5 object-contain">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="h-full rounded-xl"
            />
          </figure>
          <h2 className="card-title">{anime.title}</h2>
          <h2 className="card-title">{anime.title_japanese}</h2>
          <p className="limited-lines">{anime.synopsis}</p>
          <div className="card-actions flex gap-4 justify-between bottom-0">
            {/* {isPremium && ( */}
              <div
                className="card-actions justify-start"
                onClick={() => handleToAddFav(anime.mal_id)}
              >
                <div className="tooltip" data-tip="add to favorite ">
                  <button
                    className="btn btn-outline btn-warning btn-circle text-2xl"
                    id="btn-fav"
                  >
                    <FaRegStar />
                  </button>
                </div>
              </div>
            {/* )} */}
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline btn-info"
                id="btn-detail"
                onClick={handleShowDetail}
                value={anime.mal_id}
              >
                See Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
