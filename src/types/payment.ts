export type Payment = {
    id: string;
    username: string;
    amount: string;
    stars_amount: number;
    coin: string;
    timestamp: number;
    tx_hash: string | null;
    success: number;
    address: string;
};

export type Coin = 'TON_USDT' | 'arbitrum_USDT';
export const COINS = ['TON_USDT', 'arbitrum_USDT'];
