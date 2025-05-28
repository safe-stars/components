# @safe-stars/components

React component library for buying Telegram Stars in Telegram Mini Apps via Safe Stars.

## Installation

```bash
npm install @safe-stars/components
# or
yarn add @safe-stars/components
```

## Usage

### Basic Setup

1. Wrap your app with the SafeStarsProvider:

```tsx
import { SafeStarsProvider } from '@safe-stars/components';

<SafeStarsProvider>
  <App />
</SafeStarsProvider>
```

### Components

#### BuyStarsButton

A button component for initiating Telegram Stars purchases.

```tsx
<BuyStarsButton stars={100}>
  Buy 100 Stars
</BuyStarsButton>
```

#### BuyStarsDrawer

The drawer component is automatically managed by the SafeStarsProvider. When you click a BuyStarsButton, it will open the purchase flow drawer.

```tsx
<BuyStarsButton stars={50} />
```

#### Custom Button

You can also create a custom button without specifying stars amount:

```tsx
<BuyStarsButton>
  Buy Stars
</BuyStarsButton>
```

### useSafeStars Hook

You can use the `useSafeStars` hook to programmatically control the drawer:

```tsx
import { useSafeStars } from '@safe-stars/components';

const { openDrawer } = useSafeStars();

// Open drawer with specific amount
<button onClick={() => openDrawer({ stars: 100 })}>
  Custom Buy Button
</button>

// Open drawer without amount (user can choose)
<button onClick={() => openDrawer()}>
  Buy Stars
</button>
```

## Requirements

- React 18.0.0 or higher
- Telegram Mini App environment (for full functionality)
