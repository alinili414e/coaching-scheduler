// src/services/coachServices.ts
import axios from "axios";

// If you're not using Create React App and need to explicitly load .env files
// import 'dotenv/config';

export const fetchCoaches = async () => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const response = await axios.get("YOUR_API_ENDPOINT_URL", {
      headers: {
        "x-api-key": apiKey,
      },
    });

    const responseData = JSON.parse(response.data.body);
    return responseData.data; // Return the actual data
  } catch (error) {
    console.error("Failed to fetch coaches:", error);
    throw error; // Rethrow to handle it in the calling context
  }
};
