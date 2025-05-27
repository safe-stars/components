import { Coin, Payment } from "../types";

type Data = {
  username: string;
  amount: number;
  stars_amount: number;
  coin: Coin;
};

export const makeCryptoDeposit = async ({ username, amount, stars_amount, coin }: Data): Promise<Payment | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/crypto/deposit`,
      {
        method: 'POST',
        body: JSON.stringify({
          username,
          amount,
          stars_amount,
          user_id: 1,
          coin,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return { ...data, id: data.paymentId };
  } catch (error) {
    console.error(error);
    return null;
  }
};
