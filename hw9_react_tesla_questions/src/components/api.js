const dbURL = "http://localhost:3001/sales";

const checkFetch = (response) => {
  if (!response.ok) {
    throw new Error("response with status not ok");
  }
  return response;
};

export const apiGetSalesData = async () => {
  return fetch(dbURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then(checkFetch)
    .catch((err) => console.error(err));
};
