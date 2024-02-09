import "./ModalQuote.css";
import Button, { buttonVariants } from "../Button/Button";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as quoteService from "../../services/quoteService";
import { sleep } from "../../utils/utils";
import { quotesStatus } from "../../constants/constants";
import { Modal } from "../Modal/Modal";

export const ModalQuote = ({ currentBoat }) => {
  const [startDate, setStartDate] = useState("yyyy-mm-dd");
  const [endDate, setEndDate] = useState("yyyy-mm-dd");

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const formRef = useRef();

  const startDateCheck = new Date(startDate).getTime();
  const endDateCheck = new Date(endDate).getTime();
  const isDateRangeValid = endDateCheck < startDateCheck;

  const onSubmit = async (e) => {
    e.preventDefault();

    const startDate = formRef.current?.start.value;
    const endDate = formRef.current?.end.value;
    console.log(startDate);
    console.log(endDate);

    const quoteData = {
      name: currentBoat.name,
      type: currentBoat.type,
      _ownerId: currentBoat._ownerId,
      userId: auth._id,
      userEmail: auth.email,
      ownerEmail: currentBoat.ownerEmail,
      startDate,
      endDate,
      status: quotesStatus.pending,
    };
    quoteService.create(quoteData, auth.accessToken);
    await sleep(250);
    navigate("/my-profile");
  };

  return (
    <Modal
      modalId="quoteModal"
      modaTitle="Choose dates"
      modalSubmitButton={
        <Button
          type="submit"
          data-dismiss="modal"
          onClick={onSubmit}
          variant={buttonVariants.green}
          disabled={isDateRangeValid ? true : false}
        >
          Confirm
        </Button>
      }
    >
      <form method="POST" ref={formRef}>
        <div className="calendar">
          <label htmlFor="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="start"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className="calendar">
          <label htmlFor="end">End date:</label>
          <input
            type="date"
            id="end"
            name="end"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        {isDateRangeValid && (
          <div id="validationServerUsernameFeedback" className="invalid-field">
            End date must be after start date
          </div>
        )}
      </form>
    </Modal>
  );
};
