export const createNewTodo = async (title, body) => {

  const data = {
    title,
    body,
    userId: 1,
  };
  
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}