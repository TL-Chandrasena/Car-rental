import "./MyProfile.css";

import * as quoteService from "../../services/quoteService";
import { AuthContext } from "../../contexts/AuthContext";
import { Table } from "../Table/Table";

import { useContext, useState, useEffect } from "react";
import { quotesStatus } from "../../constants/constants";

export const MyProfile = () => {
  const { auth } = useContext(AuthContext);
  const [sentQuotes, setSentQuotes] = useState([]);
  const [receivedQuotes, setReceivedQuotes] = useState([]);

  useEffect(() => {
    quoteService
      .getAll()
      .then((result) => {
        const sentQuotes = result.filter((quote) => quote.userId === auth._id);
        const receivedQuotes = result.filter(
          (quote) => quote.ownerEmail === auth.email
        );
        setSentQuotes(sentQuotes);
        setReceivedQuotes(receivedQuotes);
      })
      .catch(() => {
        setSentQuotes([]);
        setReceivedQuotes([]);
      });
  }, [auth._id, auth.email]);

  const changeStatusHandler = (
    quotes,
    setQuotesFn,
    currentQuoteData,
    statusChange
  ) => {
    quoteService
      .statusChange(currentQuoteData, statusChange, auth.accessToken)
      .then((result) => {
        const foundQuote = quotes.find((quote) => quote._id === result._id);
        const foundQuoteIndex = quotes.findIndex(
          (quote) => quote._id === result._id
        );

        foundQuote.status = result.status;
        setQuotesFn((quotes) => [
          ...quotes.slice(0, foundQuoteIndex),
          foundQuote,
          ...quotes.slice(foundQuoteIndex + 1),
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section className="profile-container">
        <p className="font-weight-bold-title">My Profile</p>

        <div className="profile-container-info">
          <h4>Name: {auth.username}</h4>
          <h4>Email: {auth.email}</h4>
        </div>

        <h4 className="quotes-title">My Quotes</h4>
        <Table
          quotes={sentQuotes}
          onReject={(quote) =>
            changeStatusHandler(
              sentQuotes,
              setSentQuotes,
              quote,
              quotesStatus.rejected
            )
          }
        />

        <h4 className="quotes-title">Quotes For My Listings</h4>
        <Table
          quotes={receivedQuotes}
          onReject={(quote) =>
            changeStatusHandler(
              receivedQuotes,
              setReceivedQuotes,
              quote,
              quotesStatus.rejected
            )
          }
          onAccept={(quote) =>
            changeStatusHandler(
              receivedQuotes,
              setReceivedQuotes,
              quote,
              quotesStatus.accepted
            )
          }
          showReceived
        />
      </section>
    </>
  );
};
