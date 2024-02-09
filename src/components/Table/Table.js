import { quotesStatus } from "../../constants/constants";
import "./Table.css";

export const Table = ({ quotes, onReject, onAccept, showReceived }) => {
  const getStatusClass = (quote) => {
    if (quote.status === quotesStatus.rejected) {
      return "status-rejected";
    } else if (quote.status === quotesStatus.accepted) {
      return "status-accepted";
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Car Name</th>
          <th scope="col">Car Type</th>
          <th scope="col">Start date</th>
          <th scope="col">End date</th>
          <th scope="col">{showReceived ? "From " : "To "} (email):</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {quotes.length > 0 ? (
          quotes?.map((quote) => {
            return (
              <tr key={quote._id}>
                <td>{quote.name}</td>
                <td>{quote.type}</td>
                <td>{quote.startDate}</td>
                <td>{quote.endDate}</td>
                <td>{showReceived ? quote.userEmail : quote.ownerEmail}</td>
                <td
                  className={`font-weight-bold ${getStatusClass(quote) || ""}`}
                >
                  {quote.status}
                </td>
                <td className="btns">
                  {showReceived && (
                    <button
                      className="btn-accept"
                      onClick={() => onAccept(quote)}
                    >
                      &#10004;
                    </button>
                  )}
                  <button
                    className="btn-reject"
                    onClick={() => onReject(quote)}
                  >
                    &#10006;
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>There are no quotes at the moment</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
