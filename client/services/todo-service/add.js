import handleJsonResponse from "../handle-json-response";

const createOptions = (body) => ({
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  method: "POST",
  body: JSON.stringify(body)
});

const add = ({ text, completed }) => {
  const options = createOptions({ text, completed });

  return fetch("/api/todos/add", options)
    .then(handleJsonResponse);
};

export default add;
