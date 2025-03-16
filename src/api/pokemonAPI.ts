import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/types`);
    return response;
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
  }
};

export const getSets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sets`);
    return response;
  } catch (error) {
    console.error("Error fetching Pokemon Sets:", error);
  }
};

export const getRarity = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rarities`);
    return response;
  } catch (error) {
    console.error("Error fetching Pokemon Rarity:", error);
  }
};

export const GetCards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards`);
    return response;
  } catch (error) {
    console.error("Error fetching Pokemon Cards:", error);
  }
};
