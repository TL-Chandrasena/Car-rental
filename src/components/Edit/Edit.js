import "./Edit.css";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { boatTypes, formFields } from "../../constants/constants";
import {
  checkMaxLength,
  checkMinLength,
  checkUrl,
} from "../../services/validationService";
import * as boatService from "../../services/boatService";
import Button from "../Button/Button";
import { sleep } from "../../utils/utils";

export const Edit = () => {
  const [currentBoat, setCurrentBoat] = useState({});
  const [selectedType, setSelectedType] = useState(boatTypes[0]);
  const [validationErrors, setValidationErrors] = useState({});
  const [areAllFormFieldsFilled, setAreAllFormFieldsFilled] = useState(false);
  const { auth } = useContext(AuthContext);
  const { boatId } = useParams();
  const formRef = useRef();
  const navigate = useNavigate();

  const isValidationErrorsEmpty = !Object.values(validationErrors).length;

  const onSubmit = async (e) => {
    e.preventDefault();
    const boatData = Object.fromEntries(new FormData(e.target));
    await boatService.edit(boatData, boatId, auth.accessToken);
    await sleep(250);
    navigate(`/details/${boatId}`);
  };

  useEffect(() => {
    boatService.getOne(boatId).then((boatData) => {
      setCurrentBoat(boatData);
      setSelectedType(boatData.type);
    });
  }, [boatId]);

  useEffect(() => {
    const fieldsFilled = Object.values(formFields).every(
      (inputName) =>
        formRef.current?.[inputName]?.value ||
        formRef.current?.[inputName]?.defaultValue
    );
    setAreAllFormFieldsFilled(fieldsFilled);
  }, [currentBoat]);

  const selectTypeHandler = (e) => {
    setSelectedType(e.target.value);
  };

  const addToValidationErrors = (key, value) => {
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [key]: value,
    }));
  };

  const removeValidationErrors = (key) => {
    setValidationErrors((currentErrors) => {
      const { [key]: value, ...rest } = currentErrors;
      return rest;
    });
  };

  const blurHandler = (keyName) => {
    const name = formRef.current?.name.value;
    const isNameValid = checkMaxLength(name, 20) && checkMinLength(name, 3);

    const image = formRef.current?.image.value;
    const isImageValid = checkUrl(image);

    const capacity = formRef.current?.capacity.value;
    const isCapacityValid =
      checkMaxLength(capacity, 2) && checkMinLength(capacity, 1);

    const location = formRef.current?.location.value;
    const isLocationValid = checkMaxLength(location, 30);

    const price = formRef.current?.price.value;
    const isPriceValid = checkMinLength(price, 1);

    const description = formRef.current?.description.value;
    const isDescriptionValid = checkMaxLength(description, 200);

    if (keyName === formFields.name) {
      if (!isNameValid) {
        addToValidationErrors(
          formFields.name,
          "Name should be between 3 and 12 chars"
        );
      } else {
        removeValidationErrors(formFields.name);
      }
    }

    if (keyName === formFields.image) {
      if (!isImageValid) {
        addToValidationErrors(formFields.image, "Invalid image URL");
      } else {
        removeValidationErrors(formFields.image);
      }
    }

    if (keyName === formFields.capacity) {
      if (!isCapacityValid) {
        addToValidationErrors(
          formFields.capacity,
          "Capacity should be between 1 and 2 chars"
        );
      } else {
        removeValidationErrors(formFields.capacity);
      }
    }

    if (keyName === formFields.location) {
      if (!isLocationValid) {
        addToValidationErrors(
          formFields.location,
          "Location should be less than 30 chars"
        );
      } else {
        removeValidationErrors(formFields.location);
      }
    }

    if (keyName === formFields.price) {
      if (!isPriceValid) {
        addToValidationErrors(
          formFields.price,
          "Price should be at least 1 char"
        );
      } else {
        removeValidationErrors(formFields.price);
      }
    }

    if (keyName === formFields.description) {
      if (!isDescriptionValid) {
        addToValidationErrors(
          formFields.description,
          "Additional information should be less than 200 chars"
        );
      } else {
        removeValidationErrors(formFields.description);
      }
    }
  };

  return (
    <>
      <section id="edit-container">
        <div className="edit-container-info">
          <p className="font-weight-bold-title">Edit Listing</p>
          <form onSubmit={onSubmit} ref={formRef}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="name" className="font-weight-bold">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={currentBoat.name}
                    onBlur={() => blurHandler(formFields.name)}
                  />
                  {validationErrors?.name && (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-field"
                    >
                      {validationErrors.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="image" className="font-weight-bold">
                    Image:
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    defaultValue={currentBoat.image}
                    onBlur={() => blurHandler(formFields.image)}
                  />
                  {validationErrors?.image && (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-field"
                    >
                      {validationErrors.image}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="type" className="font-weight-bold">
                    Boat type:
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={selectedType}
                    onChange={selectTypeHandler}
                  >
                    {boatTypes.map((type) => {
                      return (
                        <option value={type.toLowerCase()} key={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="capacity" className="font-weight-bold">
                    Capacity:
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    defaultValue={currentBoat.capacity}
                    onBlur={() => blurHandler(formFields.capacity)}
                  />
                  {validationErrors?.capacity && (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-field"
                    >
                      {validationErrors.capacity}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="font-weight-bold">
                    Location:
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    defaultValue={currentBoat.location}
                    onBlur={() => blurHandler(formFields.location)}
                  />
                  {validationErrors?.location && (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-field"
                    >
                      {validationErrors.location}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="font-weight-bold">
                    Price per day:
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={currentBoat.price}
                    onBlur={() => blurHandler(formFields.price)}
                  />
                  {validationErrors?.price && (
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-field"
                    >
                      {validationErrors.price}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description" className="font-weight-bold">
                Additional information:
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={currentBoat.description}
                onBlur={() => blurHandler(formFields.description)}
              />
              {validationErrors?.description && (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-field"
                >
                  {validationErrors.description}
                </div>
              )}
            </div>
            <div className="btn-container">
              <Button
                type="submit"
                id="btn"
                className="submit-btn"
                disabled={
                  isValidationErrorsEmpty && areAllFormFieldsFilled
                    ? false
                    : true
                }
              >
                SAVE
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
