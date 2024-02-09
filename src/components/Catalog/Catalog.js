import "./Catalog.css";
import { Boat } from "../Car/car";
import { useEffect, useState } from "react";
import * as boatService from "../../services/boatService";
import Button from "../Button/Button";

export const Catalog = () => {
  const [boats, setBoats] = useState([]);
  const [filteredBoats, setFilteredBoats] = useState([]);

  useEffect(() => {
    boatService
      .getAll()
      .then((result) => {
        setBoats(result);
      })
      .catch(() => {
        setBoats([]);
      });

    return () => {
      setBoats([]);
    };
  }, []);

  useEffect(() => {
    boatService
      .getAll()
      .then((result) => {
        setFilteredBoats(result);
      })
      .catch(() => {
        setFilteredBoats([]);
      });

    return () => {
      setFilteredBoats([]);
    };
  }, []);

  const onSearchHandler = (e) => {
    e.preventDefault();
    const { name, type } = Object.fromEntries(
      new FormData(e.target.parentElement)
    );
    let searchNameInput = name;
    let searchTypeInput = type;

    if (searchTypeInput === "all-boats") {
      searchTypeInput = null;
    }

    const resultBoats = boats.filter((boat) => {
      if (searchNameInput && !searchTypeInput) {
        return boat.name.includes(searchNameInput);
      } else if (searchTypeInput && !searchNameInput) {
        return boat.type === searchTypeInput;
      } else if (searchTypeInput && searchNameInput) {
        return (
          boat.name.includes(searchNameInput) && boat.type === searchTypeInput
        );
      } else {
        return boat;
      }
    });
    setFilteredBoats(resultBoats);
  };

  const onClearHandler = (e) => {
    e.preventDefault();
    setFilteredBoats(boats);
  };

  return (
    <section className="catalog">
      <h1>
        <span>CARS FOR RENT</span>
      </h1>

      <nav className="navbar navbar-light">
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="name" className="font-weight-bold-small label-name">
              Search by name:
            </label>
            <input
              className="form-control search-name"
              id="name"
              name="name"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <div className="form-group form-group-type">
            <label htmlFor="type" className="font-weight-bold-small label-type">
              Search by type:
            </label>
            <select className="form-control type-select" id="type" name="type">
              <option value="all-cars">All cars</option>
              <option value="Tesla">Tesla</option>
              <option value="BMW">BMW</option>
              <option value="SUV">SUV</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Button className="btn-go" onClick={onSearchHandler}>
            GO
          </Button>
          <Button
            className="btn-clear"
            data-testid="clear"
            onClick={onClearHandler}
          >
            CLEAR
          </Button>
        </form>
      </nav>

      <div className="row">
        {filteredBoats.length > 0 ? (
          filteredBoats?.map((boat) => {
            return (
              <div className="col-4" key={boat._id}>
                <Boat boat={boat} />
              </div>
            );
          })
        ) : (
          <div className="no-offer text-center">
            <p>There are no cars to rent at the moment!</p>
          </div>
        )}
      </div>
    </section>
  );
};
