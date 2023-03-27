import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Episode } from "../models/models";
import { AddButton, DeleteButton } from "../components/EpisodeFavButton";
import logo from "../assets/images/episodePageImg.png";
import Loading from "../components/Loading";
import "./DetailPages.css";

const EpisodeDetails: React.FC = () => {
  const { id: episodeId } = useParams();
  const [episode, setEpisode] = useState<Episode>();
  const favEpisodes = useSelector(
    (state: RootState) => state.favorites.favEpisodes
  );

  const fetchEpisodeById = () => {
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((res) => res.json())
      .then((res) => setEpisode(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEpisodeById();
  }, []);

  return (
    <div className="details-page">
      {episode === undefined ? (
        <Loading />
      ) : (
        <>
          <img src={logo} alt="logo" className="details-page__banner" />
          <h2 className="details-page__text details-page__text--title">
            <span className="details-page__text--black"> Title: </span>

            {episode?.name}
          </h2>
          {favEpisodes.find((ep) => ep.id === episode.id) === undefined ? (
            <AddButton episode={episode} />
          ) : (
            <DeleteButton episode={episode} />
          )}
          <p className=" details-page__text ">
            <span className="details-page__text details-page__text--black">
              Episode:
            </span>
            {episode?.episode}
          </p>
          <p className="details-page__text">
            <span className="details-page__text details-page__text--black">
              Air Date:
            </span>
            {episode?.air_date}
          </p>
          <p className="details-page__text details-page__text--black">
            Id of the Characters that appear on this episode:
          </p>
          <br />

          {/* Create Link for every character that appears on this episode*/}
          <div className="table-container">
            {episode?.characters.map((char) => {
              const charId: string = char.substring(42, char.length);
              return (
                <Link
                  to={`/character/${charId}`}
                  key={charId}
                  className="table-container__element table-container__element--wider"
                >
                  {charId}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default EpisodeDetails;
