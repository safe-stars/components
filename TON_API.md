# TON Purchase API

API endpoints for buying TON cryptocurrency.

## Base URL

`https://safestars.pro/api`

---

## Payment Flow

1. **Get Price**: Call `GET /ton/price?amount=10` to get the price in multiple currencies
2. **Verify Recipient**: Call `POST /ton/verify_recipient` to validate the recipient's Telegram account
3. **Create Deposit**: Call `POST /ton/deposit` with the payment details
4. **Redirect User**: Redirect the user to the payment URL returned in the response
5. **Check Status**: Poll `GET /ton/payment/:id` to check payment status
6. **Payment Complete**: After payment is detected and verified, TON is automatically sent to the recipient's Telegram account

---

## Endpoints

### Get Price

Get the price for TON cryptocurrency in multiple currencies.

**Endpoint:** `GET /ton/price`

**Query Parameters:**

- `amount` (optional, number): Amount of TON to purchase. Min: `1`, Max: `500`. Default: `1`.

**Response:**

```json
{
  "rub": 4500.0,
  "usd": 50.0,
  "valid": true
}
```

**Response (Invalid Amount):**

```json
{
  "rub": 0,
  "usd": 0,
  "valid": false
}
```

**Example:**

```bash
curl "https://safestars.pro/api/ton/price?amount=10"
```

---

### Verify Recipient

Verify that a Telegram account can receive TON.

**Endpoint:** `POST /ton/verify_recipient`

**Request Body:**

```json
{
  "recipient": "telegram_user"
}
```

**Fields:**

- `recipient` (required, string): Telegram username (without @) or user ID

**Response (Success):**

```json
{
  "recipient": "telegram_user"
}
```

**Response (Error):**

```json
{
  "message": "Invalid recipient"
}
```

**Example:**

```bash
curl -X POST https://safestars.pro/api/ton/verify_recipient \
  -H "Content-Type: application/json" \
  -d '{"recipient": "johndoe"}'
```

---

### Create Deposit

Create a payment deposit to purchase TON cryptocurrency.

**Endpoint:** `POST /ton/deposit`

**Request Body:**

```json
{
  "username": "telegram_user",
  "user_id": "123456789",
  "amount": 4500.0,
  "ton_amount": 10,
  "coin": "cardlink_RUB"
}
```

**Fields:**

- `username` (required, string): Telegram username (without @)
- `user_id` (required, string): Telegram user ID
- `amount` (required, number): Payment amount in specified currency
- `ton_amount` (required, number): Amount of TON to purchase. Min: `1`, Max: `199` (must be integer)
- `coin` (required, string): Payment method. Currently only `cardlink_RUB` is supported

**Response:**

```json
{
  "url": "https://payment-gateway.com/pay/xyz123",
  "id": "abc123"
}
```

**Error Responses:**

- Invalid coin: `{"message": "Invalid coin"}`
- Invalid amount: `{"message": "Invalid TON amount"}`
- Price mismatch: `{"message": "Invalid amount"}`
- Invalid recipient: `{"message": "Invalid recipient"}`
- Payment creation failed: `{"message": "Failed to create payment link"}`

**Example:**

```bash
curl -X POST https://safestars.pro/api/ton/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "user_id": "123456789",
    "amount": 4500.00,
    "ton_amount": 10,
    "coin": "cardlink_RUB"
  }'
```

---

### Get Payment Status

Get payment details and status by payment ID.

**Endpoint:** `GET /ton/payment/:id`

**URL Parameters:**

- `id` (required, string): The payment ID returned from `/ton/deposit`

**Response:**

```json
{
  "id": "abc123",
  "amount": "4500.00",
  "ton_amount": 10,
  "coin": "cardlink_RUB",
  "timestamp": 1703001600,
  "status": null
}
```

**Status Values:**

- `null`: Payment pending, waiting for transaction
- `"in_progress"`: Payment detected, TON delivery in progress
- `"success"`: Payment complete, TON delivered
- `"error"`: Payment failed or delivery error

**Example:**

```bash
curl "https://safestars.pro/api/ton/payment/abc123"
```

---

## Supported Payment Methods

### Fiat Currencies

- **cardlink_RUB** - Russian Ruble

### Cryptocurrencies

*Currently, cryptocurrency payment methods are not supported for TON purchases. Only fiat (RUB) payments via Cardlink are available.*

---

