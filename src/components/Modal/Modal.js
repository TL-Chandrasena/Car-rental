import "./Modal.css";
import Button from "../Button/Button";

export const Modal = ({ modalId, modaTitle, modalSubmitButton, children }) => {
  return (
    <div id={modalId} className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title w-100">{modaTitle}</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            {modalSubmitButton}
            <Button type="button" data-dismiss="modal">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
