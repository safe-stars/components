type Data = {
  username: string;
  amount: number;
  stars_amount: number;
};

export const makeDeposit = async ({ username, amount, stars_amount }: Data): Promise<{ url: string } | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/deposit`,
      {
        method: 'POST',
        body: JSON.stringify({
          username,
          amount,
          stars_amount,
          user_id: 1,
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
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
