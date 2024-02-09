import "./Details.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as boatService from "../../services/boatService";
import { AuthContext } from "../../contexts/AuthContext";
import Button, { buttonVariants } from "../Button/Button";
import { ModalQuote } from "../ModalQuote/ModalQuote";
import { ModalDelete } from "../ModalDelete/ModalDelete";

export const Details = () => {
  const [currentBoat, setCurrentBoat] = useState({});
  const { auth } = useContext(AuthContext);
  const { boatId } = useParams();

  useEffect(() => {
    boatService.getOne(boatId).then((boatData) => {
      setCurrentBoat(boatData);
    });
  }, [boatId]);

  const isOwner = currentBoat._ownerId === auth._id;

  return (
    <section className="details">
      <div className="row">
        <div className="col-6">
          <div className="boat-img">
            <img src={currentBoat.image} alt=" " />
          </div>
        </div>
        <div className="col-6">
          <div className="boat-info">
            <div className="boat-text">
              <p className="detail-title font-weight-bold-title">Details</p>
              <p className="detail">
                <span className="font-weight-bold">Name: </span>
                {currentBoat.name}
              </p>
              <p className="detail">
                <span className="font-weight-bold">Car type: </span>
                {currentBoat.type}
              </p>
              <p className="detail">
                <span className="font-weight-bold">Capacity: </span>
                {currentBoat.capacity} persons
              </p>
              <p className="detail">
                <span className="font-weight-bold">Location: </span>
                {currentBoat.location}
              </p>
              <p className="detail">
                <span className="font-weight-bold">Price: </span>$
                {currentBoat.price}
              </p>
              <p id="description">
                <span className="font-weight-bold">
                  Additional information:
                </span>
              </p>
              <p id="description">{currentBoat.description}</p>
              <div className="details-btn">
                {auth._id &&
                  (isOwner ? (
                    <div>
                      <Button
                        to={`/details/${boatId}/edit`}
                        className="btn-edit"
                      >
                        EDIT
                      </Button>
                      <Button
                        data-toggle="modal"
                        data-target="#deleteModal"
                        variant={buttonVariants.red}
                      >
                        DELETE
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      data-toggle="modal"
                      data-target="#quoteModal"
                    >
                      GET A QUOTE
                    </Button>
                  ))}
              </div>

              <ModalQuote currentBoat={currentBoat}></ModalQuote>

              <ModalDelete currentBoat={currentBoat}></ModalDelete>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
