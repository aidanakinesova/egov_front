export const baseFetchAsync = async ( url, method, body, token ) => {
  try {
    console.log( body);
    console.log(url);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      "Accept-Language": "en",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      headers,
      method,
      body,
      mode: "no-cors",
    });
    return response.json();
  } catch (e) {
    return console.error(e);
  }
};