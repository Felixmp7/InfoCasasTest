export const createNewTodo = async (title) => {
  let response;

  const data = {
    title,
    userId: 1,
  };

  try {
    const serverResponse = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })

    if (serverResponse.status != 404) {
      response = 'SUCCESS';

    }
    else response = `FAIL`;

    return response;
  } catch (error) {
    console.log(error);
    return response = `ERROR`;
  }
}


export const deleteTodo = async (id) => {

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE"
    })
  
    console.log(response);
  } catch (error) {
    console.log(error)
  }
  
}
export const updateStatusTodo = async (status, id) => {
  console.log(status);
  let response;

  const data = {
    completed: status
  };

  try {
    const serverResponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    console.log(serverResponse)

    if (serverResponse.status != 404) {
      response = 'SUCCESS';
    }
    else response = 'FAIL'

    return response;
  } catch (error) {
    console.log(error)
    return response = 'ERROR' ;
  }

}