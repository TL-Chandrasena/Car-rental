import "./car.css";
import Button from "../Button/Button";

export const Boat = ({ boat }) => {
  return (
    <div className="car">
      <div className="row w-100 mx-0">
        <div className="col-6">
          <div className="boat-img">
            <img src={boat.image} alt=" " />
          </div>
        </div>
        <div className="col-6">
          <div className="car-info">
            <div>
              <h6>Car</h6>
              <p>
                <span>Price per day: </span>${boat.price}
              </p>
              <p>
                <span>Type of car: </span>
                {boat.type}
              </p>
            </div>
            <div>
              <Button to={`/details/${boat._id}`}>DETAILS</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
