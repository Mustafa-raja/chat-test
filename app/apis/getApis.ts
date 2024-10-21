export async function getUsers() {
  const url = "https://cors-anywhere.herokuapp.com/http://18.143.79.95/api/chatSystem/users/list";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error with the fetch operation:", error);
    return null;
  }
}

export async function getGroups() {
    const url = "https://cors-anywhere.herokuapp.com/http://18.143.79.95/api/chatSystem/groups/list";
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error with the fetch operation:", error);
      return null;
    }
  }
  