const dbURL = "http://localhost:3001/todos";

const checkFetch = (resp) => {
  if (!resp.ok) {
    throw new Error("response not ok");
  }
  return resp;
};

export const apiFetchTodos = async () => {
  return fetch(dbURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then(checkFetch)
    .catch((err) => console.error(err));
};

export const apiCreateTodo = async (newTodo) => {
  return fetch(dbURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then(checkFetch)
    .catch((err) => console.error(err));
};

export const apiDeleteTodo = async (id) => {
  return fetch(`${dbURL}/${id}`, {
    method: "DELETE",
  })
    .then(checkFetch)
    .catch((err) => console.error(err));
};

export const apiEditTodo = async (id, updatedTodo) => {
  return fetch(`${dbURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  })
    .then(checkFetch)
    .catch((err) => console.error(err));
};
