# B2B Stars API

API endpoints for B2B clients to manage Telegram Stars balance and send stars to users.

## Base URL
`https://safestars.pro/api`

---

## Authentication

All B2B endpoints require an API key for authentication.

**Header:**
```
X-API-Key: your_api_key_here
```

---

## Workflow

1. **Check Balance**: Call `GET /b2b/balance` to view your current stars balance
2. **Get Price**: Call `GET /b2b/price` to calculate the cost for a specific stars amount
3. **Top Up Balance**: Call `POST /b2b/deposit` to add stars to your balance via payment
4. **Send Stars**: Call `POST /b2b/send` to transfer stars to Telegram users
5. **Monitor**: Use idempotency keys to prevent duplicate transactions

---

## Endpoints

### Get Price

Calculate the price for purchasing a specific amount of stars in various currencies.

**Endpoint:** `GET /price`

**Query Parameters:**
- `amount` (optional, number): Amount of stars to purchase. Default: `1`

**Response:**
```json
{
  "rub": 1199.00,
  "eur": 11.99,
  "usd": 11.99,
  "usdt": 11.99,
  "a7a5": 11.99
}
```

**Example:**
```bash
curl "https://safestars.pro/api/price?amount=1000"
```

**Note:** This endpoint returns prices in all supported currencies. B2B clients pay full price without markup.

---

### Get Balance

Get your current B2B client balance.

**Endpoint:** `GET /b2b/balance`

**Headers:**
```
X-API-Key: your_api_key_here
```

**Response:**
```json
{
  "balance": 5000,
  "b2b_client_id": "client_123",
  "b2b_client_name": "Partner Co",
  "commission_rate": 0.0
}
```

**Example:**
```bash
curl "https://safestars.pro/api/b2b/balance" \
  -H "X-API-Key: your_api_key_here"
```

---

### Create Deposit

Top up your stars balance via payment. Supports both fiat (RUB, EUR, USD) and crypto (USDT, A7A5) payment methods.

**Endpoint:** `POST /b2b/deposit`

**Headers:**
```
X-API-Key: your_api_key_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 1199.00,
  "stars_amount": 1000,
  "payment_method": "card",
  "currency": "RUB"
}
```

**Fields:**
- `amount` (required, number): Payment amount in specified currency
- `stars_amount` (required, number): Amount of stars to purchase (50-2500000)
- `payment_method` (required, string): Payment method. Options: `card`, `crypto`
- `currency` (required for card, string): Payment currency for card payments. Options: `RUB`, `EUR`, `USD`
- `coin` (required for crypto, string): Cryptocurrency/network for crypto payments. See supported coins below.

**Response (Card Payment):**
```json
{
  "url": "https://payment-gateway.com/pay/xyz123",
  "orderId": "abc123"
}
```

**Response (Crypto Payment):**
```json
{
  "url": "https://safestars.pro/payment/abc123",
  "orderId": "abc123"
}
```

**Example (Card Payment):**
```bash
curl -X POST https://safestars.pro/api/b2b/deposit \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1199.00,
    "stars_amount": 1000,
    "payment_method": "card",
    "currency": "RUB"
  }'
```

**Example (Crypto Payment):**
```bash
curl -X POST https://safestars.pro/api/b2b/deposit \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 11.99,
    "stars_amount": 1000,
    "payment_method": "crypto",
    "coin": "TON_USDT"
  }'
```

---

### Send Stars

Send Telegram Stars to a user. Stars are deducted from your balance.

**Endpoint:** `POST /b2b/send`

**Headers:**
```
X-API-Key: your_api_key_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "johndoe",
  "stars_amount": 1000,
  "idempotency_key": "unique_key_123"
}
```

**Fields:**
- `username` (required, string): Telegram username (without @)
- `stars_amount` (required, number): Amount of stars to send (50-2500000)
- `idempotency_key` (optional, string): Unique key to prevent duplicate transactions

**Response (Success):**
```json
{
  "transaction_id": "txn_abc123",
  "status": "pending",
  "stars_amount": 1000,
  "commission": 0,
  "total_charged": 1000,
  "remaining_balance": 4000
}
```

**Response (Insufficient Balance):**
```json
{
  "error": "Insufficient balance",
  "required": 1000,
  "current_balance": 500
}
```

**Response (Duplicate with Idempotency Key):**
```json
{
  "transaction_id": "txn_abc123",
  "status": "success",
  "stars_amount": 1000,
  "commission": 0,
  "total_charged": 1000,
  "remaining_balance": 4000,
  "message": "Transaction already exists (idempotency)"
}
```

**Status Values:**
- `pending`: Transaction created, processing stars transfer
- `in_progress`: Stars transfer in progress
- `success`: Stars successfully delivered
- `error`: Transaction failed

**Example:**
```bash
curl -X POST https://safestars.pro/api/b2b/send \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "stars_amount": 1000,
    "idempotency_key": "unique_key_123"
  }'
 ```

 ---

## Premium

### Get Premium Price

Get the cost of Premium subscription in stars for all available periods.

**Endpoint:** `GET /premium/price`

**Headers:**
```
X-API-Key: your_api_key_here
```

**Response:**
```json
{
  "premium": {
    "3": {
      "months": 3,
      "stars": 800,
      "starsWithCommission": 840
    },
    "6": {
      "months": 6,
      "stars": 1067,
      "starsWithCommission": 1120
    },
    "12": {
      "months": 12,
      "stars": 1933,
      "starsWithCommission": 2030
    }
  }
}
```

**Response Fields:**
- `premium` - object with prices for each period
  - Key (3, 6, 12) - number of subscription months
  - `months` - number of months
  - `stars` - cost in stars (base price)
  - `starsWithCommission` - cost in stars including B2B client commission

**Price Calculation:**
- Base star price: 0.015 USD
- Cost in stars = ceil(price_in_USD / 0.015)
- Cost with commission = ceil(cost_in_stars × (1 + commission_rate))

**Example:**
```bash
curl "https://safestars.pro/api/premium/price" \
  -H "X-API-Key: your_api_key_here"
```

---

### Send Premium

Send Telegram Premium subscription to a user. Stars are deducted from your B2B balance.

**Endpoint:** `POST /b2b/premium/send`

**Headers:**
```
X-API-Key: your_api_key_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "johndoe",
  "months": 3,
  "idempotency_key": "unique_key_123"
}
```

**Fields:**
- `username` (required, string): Telegram username (without @)
- `months` (required, number): Premium subscription duration in months. Options: `3`, `6`, `12`
- `idempotency_key` (optional, string): Unique key to prevent duplicate transactions

**Response (Success):**
```json
{
  "transaction_id": "txn_abc123",
  "status": "pending",
  "months": 3,
  "stars_amount": 840,
  "remaining_balance": 4160
}
```

**Response (Insufficient Balance):**
```json
{
  "error": "Insufficient balance",
  "required": 840,
  "current_balance": 500
}
```

**Response (Duplicate with Idempotency Key):**
```json
{
  "transaction_id": "txn_abc123",
  "status": "success",
  "months": 3,
  "stars_amount": 840,
  "remaining_balance": 4160,
  "message": "Transaction already exists (idempotency)"
}
```

**Status Values:**
- `pending`: Transaction created, processing Premium transfer
- `success`: Premium successfully delivered
- `error`: Transaction failed

**Price Calculation:**
- Use `GET /premium/price` to get current prices
- Stars are calculated as: `base_stars × (1 + commission_rate)`
- Example: 3 months = 800 base stars + 5% commission = 840 stars

**Example:**
```bash
curl -X POST https://safestars.pro/api/b2b/premium/send \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "months": 3,
    "idempotency_key": "unique_key_123"
  }'
```

---

## Get Transaction Status

Get the status of a B2B transaction by its ID. Transaction ID is returned by `/send` and `/premium/send` endpoints.

**Endpoint:** `GET /transaction/:id`

**Headers:**
```
X-API-Key: your_api_key_here
```

**URL Parameters:**
- `id` (required, string): Transaction ID (UUID)

**Response (Success):**
```json
{
  "transaction_id": "txn_abc123",
  "status": "success",
  "username": "johndoe",
  "stars_amount": 1000,
  "commission": 50,
  "total_charged": 1050,
  "timestamp": 1704067200
}
```

**Response Fields:**
- `transaction_id` - unique transaction identifier
- `status` - current transaction status
- `username` - Telegram username who received the stars/premium
- `stars_amount` - amount of stars sent
- `commission` - commission charged (based on B2B client rate)
- `total_charged` - total amount charged (stars_amount + commission)
- `timestamp` - Unix timestamp when transaction was created

**Status Values:**
- `null` - awaiting processing
- `pending` - transaction created, processing stars transfer
- `in_progress` - stars transfer in progress
- `success` - stars/premium successfully delivered
- `error` - transaction failed

**Response (Not Found):**
```json
{
  "error": "Transaction not found"
}
```

**Example:**
```bash
curl "https://safestars.pro/api/transaction/txn_abc123" \
  -H "X-API-Key: your_api_key_here"
```

---

## Supported Payment Methods

### Fiat Currencies (Card Payments)
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

## Commission Structure

Extra commisions for B2B clients are disabled. 

## Idempotency

Use the `idempotency_key` parameter in `/b2b/send` to safely retry requests without duplicating transactions. If a request with the same key is sent again, the API returns the original transaction result.

---

## Rate Limiting

B2B API endpoints are rate-limited. Contact support if you need higher limits.

---
