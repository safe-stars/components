# Premium Purchase API

API endpoints for buying Telegram Premium subscription.

## Base URL
`https://safestars.pro/api`

---

## Payment Flow

1. **Get Price**: Call `GET /premium/price?months=3` to get the price in multiple currencies
2. **Verify Recipient**: Call `POST /premium/verify_recipient` to validate the recipient's Telegram account (recipient account requires not to have an active Premium subscription)
3. **Create Deposit**: Call `POST /premium/deposit` with the payment details and chosen payment method
4. **Redirect User**: Redirect the user to the payment URL returned in the response (for card payments) or show payment details (for crypto)
5. **Check Status**: Poll `GET /premium/payment/:id` to check payment status
6. **Payment Complete**: After payment is detected and verified, Premium is automatically delivered to the user

---

## Endpoints

### Get Price

Get the price for Premium subscription in multiple currencies.

**Endpoint:** `GET /premium/price`

**Query Parameters:**
- `months` (optional, number): Subscription duration in months. Options: `3`, `6`, `12`. Default: `3`.
- `partner` (optional, string): Partner code for custom pricing.

**Response:**
```json
{
  "rub": 1199.00,
  "usd": 11.99,
  "eur": 11.99,
  "usdt": 11.99,
  "a7a5": 11.99
}
```

**Example:**
```bash
curl "https://safestars.pro/api/premium/price?months=3"
```

---

### Verify Recipient

Verify that a Telegram account can receive Premium subscription.

**Endpoint:** `POST /premium/verify_recipient`

**Request Body:**
```json
{
  "username": "telegram_user"
}
```

**Fields:**
- `username` (required, string): Telegram username (without @)

**Response (Success):**
```json
{
  "valid": true,
  "user_id": "123456789",
  "username": "telegram_user"
}
```

**Response (Error):**
```json
{
  "valid": false,
  "error": "User not found or cannot receive Premium"
}
```

**Example:**
```bash
curl -X POST https://safestars.pro/api/premium/verify_recipient \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe"}'
```

---

### Create Deposit

Create a payment deposit to purchase Premium subscription. Supports both fiat (RUB, EUR, USD) and crypto (USDT, A7A5) payment methods.

**Endpoint:** `POST /premium/deposit`

**Request Body:**
```json
{
  "username": "telegram_user",
  "user_id": "123456789",
  "amount": 11.99,
  "months": 3,
  "currency": "RUB",
  "partner": "partner_code"
}
```

**Fields:**
- `username` (required, string): Telegram username (without @)
- `user_id` (required, string): Telegram user ID
- `amount` (required, number): Payment amount in specified currency
- `months` (required, number): Subscription duration. Options: `3`, `6`, `12`
- `currency` (required, string): Payment currency/method. Options: `RUB`, `EUR`, `USD`, `TON_USDT`, `arbitrum_USDT`, `TRON_USDT`, `TRON_A7A5`, `eth_USDT`, `optimism_USDT`, `base_USDT`, `polygon_USDT`
- `partner` (optional, string): Partner code for custom pricing

**Response (Card Payment - RUB/EUR/USD):**
```json
{
  "url": "https://payment-gateway.com/pay/xyz123",
  "paymentId": "abc123"
}
```

**Response (Crypto Payment):**
```json
{
  "url": "https://safestars.pro/premium/payment/abc123",
  "paymentId": "abc123",
  "amount": "11.99",
  "coin": "TON_USDT",
  "address": "UQDxxx..."
}
```

**Example (Card Payment):**
```bash
curl -X POST https://safestars.pro/api/premium/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "user_id": "123456789",
    "amount": 1199.00,
    "months": 3,
    "currency": "RUB"
  }'
```

**Example (Crypto Payment):**
```bash
curl -X POST https://safestars.pro/api/premium/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "user_id": "123456789",
    "amount": 11.99,
    "months": 3,
    "currency": "TON_USDT"
  }'
```

---

### Get Payment Status

Get payment details and status by payment ID.

**Endpoint:** `GET /premium/payment/:id`

**URL Parameters:**
- `id` (required, string): The payment ID returned from `/premium/deposit`

**Response:**
```json
{
  "id": "abc123",
  "username": "johndoe",
  "user_id": "123456789",
  "amount": "11.99",
  "months": 3,
  "timestamp": 1703001600,
  "currency": "TON_USDT",
  "status": null,
  "address": "UQDxxx..."
}
```

**Status Values:**
- `null`: Payment pending, waiting for transaction
- `"in_progress"`: Payment detected, Premium delivery in progress
- `"success"`: Payment complete, Premium delivered
- `"error"`: Payment failed or delivery error

**Example:**
```bash
curl "https://safestars.pro/api/premium/payment/abc123"
```

---

## Supported Payment Methods

### Fiat Currencies
- **RUB** - Russian Ruble
- **EUR** - Euro

### Cryptocurrencies (USDT)
- **TON_USDT** - USDT on TON network
- **TRON_USDT** - USDT on TRON network (TRC-20)
- **arbitrum_USDT** - USDT on Arbitrum network
- **eth_USDT** - USDT on Ethereum network
- **optimism_USDT** - USDT on Optimism network
- **base_USDT** - USDT on Base network
- **polygon_USDT** - USDT on Polygon network

### Cryptocurrencies (A7A5)
- **TRON_A7A5** - A7A5 token on TRON network (TRC-20)

---

