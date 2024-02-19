import axios from "axios";

export const fetchCoaches = async () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const response = await axios.get(
    "https://uqulhxbwtj.execute-api.us-east-2.amazonaws.com/dev/coaches",
    {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = JSON.parse(response.data.body);
  return responseData.data;
};
