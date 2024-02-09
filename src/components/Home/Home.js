import { useEffect, useState } from "react";
import * as boatService from "../../services/boatService";
//import boatSign from "../../img/boat-sign.png";
import "./Home.css";
import { Boat } from "../Car/car";
import Button from "../Button/Button";

export const Home = () => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    boatService
      .getAll()
      .then((result) => {
        if (result.length <= 3) {
          return setBoats(result);
        }
        const resultArray = result.slice(result.length - 3);
        setBoats(resultArray);
      })
      .catch(() => {
        setBoats([]);
      });
  }, []);

  return (
    <div className="home">
      

      <Button to="/catalog">BOOK YOUR CAR</Button>

      {boats.length > 0 && (
        <>
          <h2 className="title">Latest Listings</h2>

          <div className="boat-list">
            <div className="row">
              {boats?.map((x) => {
                return (
                  <div className="col-4" key={x._id}>
                    <Boat boat={x} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
