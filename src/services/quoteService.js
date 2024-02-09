const baseUrl = "http://localhost:3030/data/quotes";

export const getAll = () => {
  return fetch(baseUrl).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Something went wrong");
  });
};

export const create = (quoteData, accessToken) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({ ...quoteData }),
  }).then((res) => res.json());
};
export const statusChange = (quoteData, statusValue, accessToken) => {
  return fetch(`${baseUrl}/${quoteData._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "X-Authorization": accessToken,
      "X-Admin": "",
    },
    body: JSON.stringify({ ...quoteData, status: statusValue }),
  }).then((res) => res.json());
};
