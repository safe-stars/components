export const verifyRecipient = async ({ username }: { username: string }): Promise<boolean> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/verify_recipient`,
      {
        method: 'POST',
        body: JSON.stringify({ recipient: username }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return false;
    }
    return !!data?.recipient;
  } catch (error) {
    console.error(error);
    return false;
  }
};
