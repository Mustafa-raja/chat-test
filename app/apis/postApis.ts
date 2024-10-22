export async function addChatbyUser(fromUser: number, toUser: number, message: string) {
    const url = `http://18.143.79.95/api/chatSystem/chat/add`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUser,
          toUser,   
          message    
        }),
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
  