# Stars Purchase API

API endpoints for buying Telegram stars.

## Base URL
`https://safestars.pro/api`

---

## Payment Flow

### RUB Payment Flow
1. **Get Price**: Call `GET /price?amount=100` to get the price in RUB
2. **Create Deposit**: Call `POST /deposit` with the amount and stars_amount
3. **Redirect User**: Redirect the user to the payment URL returned in the response
4. **Payment Complete**: After payment, stars are automatically delivered to the user

### Crypto Payment Flow
1. **Get Price**: Call `GET /price?amount=100` to get the price in USDT
2. **Create Deposit**: Call `POST /crypto/deposit` with the amount and stars_amount
3. **Show Payment Info**: Display the payment address and exact amount to the user or redirect user to payment page
4. **Check Status**: Poll `GET /crypto/payment/:id` to check payment status
5. **Payment Complete**: After payment is detected, stars are automatically delivered

---

## Endpoints

### Get Price

Get the price for purchasing stars in multiple currencies.

**Endpoint:** `GET /price`

**Query Parameters:**
- `amount` (optional, number): Number of stars to purchase. Default: `1`. Min: `1`, Max: `50000`.
- `partner` (optional, string): Partner code for custom pricing.
- `markup` (optional, number): Additional markup percentage.

**Response:**
```json
{
  "price": 100.50,
  "rub": 100.50,
  "usd": 1.05,
  "usdt": 1.05
}
```

**Example:**
```bash
curl "https://safestars.pro/api/price?amount=100"
```

---

### Create Deposit (RUB)

Create a payment deposit to purchase stars with RUB or cardlink_RUB.

**Endpoint:** `POST /deposit`

**Request Body:**
```json
{
  "username": "telegram_user",
  "user_id": "123456789",
  "amount": 100.50,
  "stars_amount": 100,
  "currency": "RUB",
  "partner": "partner_code"
}
```

**Fields:**
- `username` (required, string): Telegram username (without @)
- `user_id` (required, string): Telegram user ID
- `amount` (required, number): Payment amount in specified currency
- `stars_amount` (required, number): Number of stars to purchase. Min: `50`, Max: `50000`.
- `currency` (optional, string): Payment currency. Options: `RUB`.
- `partner` (optional, string): Partner code for custom pricing

**Response:**
```json
{
  "url": "https://payment-gateway.com/pay/xyz123",
  "orderId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Example:**
```bash
curl -X POST https://safestars.pro/api/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "user_id": "123456789",
    "amount": 100.50,
    "stars_amount": 100,
    "currency": "RUB"
  }'
```

---

### Create Crypto Deposit

Create a crypto payment deposit to purchase stars with USDT.

**Endpoint:** `POST /crypto/deposit`

**Request Body:**
```json
{
  "username": "telegram_user",
  "user_id": "123456789",
  "amount": 1.05,
  "stars_amount": 100,
  "coin": "TON_USDT",
  "partner": "partner_code"
}
```

**Fields:**
- `username` (required, string): Telegram username (without @)
- `user_id` (required, string): Telegram user ID
- `amount` (required, number): Payment amount in USDT
- `stars_amount` (required, number): Number of stars to purchase. Min: `50`, Max: `50000`.
- `coin` (optional, string): Crypto network. Options: `TON_USDT`, `arbitrum_USDT`, `TRON_USDT`, `eth_USDT`, `optimism_USDT`, `base_USDT`, `polygon_USDT`. Default: `TON_USDT`
- `partner` (optional, string): Partner code for custom pricing

**Response:**
```json
{
  "url": "https://safestars.pro/payment/abc123",
  "paymentId": "abc123",
  "amount": 1.05,
  "coin": "TON_USDT",
  "address": "UQDxxx..."
}
```

**Example:**
```bash
curl -X POST https://safestars.pro/api/crypto/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "user_id": "123456789",
    "amount": 1.05,
    "stars_amount": 100,
    "coin": "TON_USDT"
  }'
```

---

### Get Crypto Payment

Get crypto payment details by payment ID.

**Endpoint:** `GET /crypto/payment/:id`

**URL Parameters:**
- `id` (required, string): The payment ID returned from `/crypto/deposit`

**Response:**
```json
{
  "id": "abc123",
  "username": "johndoe",
  "user_id": "123456789",
  "amount": "1.05",
  "stars_amount": 100,
  "timestamp": 1703001600,
  "coin": "TON_USDT",
  "status": null,
  "address": "UQDxxx..."
}
```

**Status Values:**
- `null`: Payment pending, waiting for transaction
- `"in_progress"`: Payment detected, stars delivery in progress
- `"success"`: Payment complete, stars delivered
- `"error"`: Payment failed or delivery error

**Example:**
```bash
curl "https://safestars.pro/api/crypto/payment/abc123"
```

---

## Simple Payment Page

Direct your users to the hosted payment page with pre-filled information:

`https://safestars.pro/{lng}/buy?username={username}&amount={amount}&method={method}&partner={partner}`

**Parameters:**
- `lng` (required): Language - `ru` or `en`
- `username` (required): Telegram username (without @) who will receive stars
- `amount` (required): Number of stars. Min: `50`, Max: `20000`
- `method` (optional): Payment method. Options: `rub`, `ton_usdt`, `arbitrum_usdt`, `tron_usdt`, `eth_usdt`, `optimism_usdt`, `base_usdt`, `polygon_usdt`. Default: `rub`
- `partner` (required): Partner code provided by SafeStars

**Example:**
```
https://safestars.pro/ru/buy?username=ivanludvig&amount=100&method=rub&partner=safestars
```
