import { Payment } from "../types";

type Data = {
  id: string;
};

export const getPayment = async ({ id }: Data): Promise<Payment | null> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/crypto/payment/${id}`);
    const data = await response.json();
    if (!response.ok) {
      return null;
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
