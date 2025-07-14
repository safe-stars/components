type Price = {
  price: number;
  valid: boolean;
};

type Data = {
  amount: number;
  currency: 'RUB' | 'USDT';
  markUp: number;
};

export const getPrice = async ({
  amount,
  currency,
  markUp
}: Data): Promise<Price | null> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL +
      `/${currency === 'USDT' ? 'crypto/' : ''}price?amount=${amount}&markUp=${markUp}`
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
