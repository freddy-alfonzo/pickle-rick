import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Location } from "../models/models";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { AddButton, DeleteButton } from "../components/LocationFavButton";
import planets from "../assets/images/planets.jpg";
import "./DetailPages.css";
import Loading from "../components/Loading";

const LocationDetails: React.FC = () => {
  const { id: locationId } = useParams();
  const [location, setLocation] = useState<Location>();
  const favLocations = useSelector(
    (state: RootState) => state.favorites.favLocations
  );

  const fetchLocationById = () => {
    fetch(`https://rickandmortyapi.com/api/location/${locationId}`)
      .then((res) => res.json())
      .then((res) => setLocation(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLocationById();
  }, []);

  return (
    <div className="details-page">
      {location === undefined ? (
        <Loading />
      ) : (
        <>
          <img src={planets} alt="logo" className="details-page__planets" />
          <h2 className="details-page__text details-page__text--title">
            <span className="details-page__text--black"> Location: </span>

            {location?.name}
          </h2>
          {favLocations.find((loc) => loc.id === location.id) === undefined ? (
            <AddButton location={location} />
          ) : (
            <DeleteButton location={location} />
          )}

          <p className=" details-page__text ">
            <span className="details-page__text details-page__text--black">
              Type:
            </span>
            {location?.type}
          </p>
          <p className="details-page__text">
            <span className="details-page__text details-page__text--black">
              Dimension:
            </span>
            {location?.dimension}
          </p>

          {/* Checking if there are residents on the location and creating links for them*/}

          {location?.residents.length !== 0 ? (
            <>
              <p className="details-page__text details-page__text--black">
                Id of the Characters that are residents on this location:
              </p>
              <br />

              <div className="table-container">
                {location?.residents.map((char) => {
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
          ) : (
            <p className="details-page__text details-page__text--black">
              There are no characters living in this location
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default LocationDetails;
