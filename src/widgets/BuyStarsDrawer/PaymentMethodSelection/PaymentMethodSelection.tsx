import { useEffect, useState } from 'react';
import { Button, Spinner } from '../../../components';
import { getPrice } from '../../../api/getPrice';
import { verifyRecipient } from '../../../api/verifyRecipient';
import { Coin } from '../../../types';
import cn from 'classnames';

type PaymentMethodSelectionProps = {
  userData: {
    username: string;
    starsCount: number;
  };
  paymentMethod: 'RUB' | Coin | null;
  setPaymentMethod: (method: 'RUB' | Coin) => void;
  setAmount: (amount: number) => void;
  onBack: () => void;
  onContinue: () => void;
  skipFirstStep: boolean;
};

const PaymentMethodSelection = ({
  userData,
  paymentMethod,
  setPaymentMethod,
  setAmount,
  onBack,
  onContinue,
  skipFirstStep
}: PaymentMethodSelectionProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [cryptoPrice, setCryptoPrice] = useState<number | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const fetchPrice = async () => {
      const rubPrice = await getPrice({ amount: userData.starsCount, currency: 'RUB' });
      const usdtPrice = await getPrice({ amount: userData.starsCount, currency: 'USDT' });

      if (rubPrice?.valid) {
        if (status !== 'error') {
          setStatus('success');
        }
        setPrice(rubPrice?.price ?? null);
        setCryptoPrice(usdtPrice?.price ?? null);
      } else {
        setStatus('error');
      }
    }
    fetchPrice();
  }, [userData.starsCount, status]);

  useEffect(() => {
    const fetchVerifyRecipient = async () => {
      const isValid = await verifyRecipient({ username: userData.username });
      if (!isValid) {
        setStatus('error');
      }
    }
    fetchVerifyRecipient();
  }, [userData.username]);

  const handleContinue = () => {
    if (paymentMethod && price && cryptoPrice) {
      if (paymentMethod === 'RUB') {
        setAmount(price);
      } else {
        setAmount(cryptoPrice);
      }
      onContinue();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <p className="mb-6 text-lg">
        Покупка {userData.starsCount} звезд для пользователя {userData.username}
      </p>

      {status === 'loading' && (
        <div className="mb-8 flex justify-center items-center flex-1">
          <Spinner />
        </div>
      )}
      {status === 'error' && (
        <div className="mb-8 flex justify-center items-center">
          <p className="font-medium mb-2 text-danger text-center">
            {!skipFirstStep
              ? 'Произошла ошибка. Проверьте имя пользователя и количество звезд.'
              : 'Произошла ошибка. Проверьте, что у вас задано имя пользователя.'
            }
          </p>
        </div>
      )}
      {status === 'success' && (
        <div className="mb-8">
          <p className="text-white font-medium mb-2">
            Выберите способ оплаты:
          </p>

          <div className="space-y-3">
            <div
              className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 ${paymentMethod === 'RUB' ? 'border-primary bg-primary/10' : 'border-gray-700'
                }`}
              onClick={() => setPaymentMethod('RUB')}
            >
              <img src="/sbp.png" alt="Sbp" className="w-10 h-10" />
              <div>
                <h3 className="font-medium">{parseFloat(price?.toString() ?? '0').toFixed(2)} RUB</h3>
                <p className="text-sm text-gray-400">Оплата в рублях через СБП</p>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 ${paymentMethod === 'TON_USDT' ? 'border-primary bg-primary/10' : 'border-gray-700'
                }`}
              onClick={() => setPaymentMethod('TON_USDT')}
            >
              <div className="relative">
                <img src="/usdt.png" alt="Tether" className="w-10 h-10" />
                <img src="/ton.png" alt="TON" className="w-4 h-4 absolute bottom-0 right-0" />
              </div>
              <div>
                <h3 className="font-medium">{cryptoPrice} USDT (TON)</h3>
                <p className="text-sm text-gray-400">Оплата в сети TON</p>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 ${paymentMethod === 'arbitrum_USDT' ? 'border-primary bg-primary/10' : 'border-gray-700'
                }`}
              onClick={() => setPaymentMethod('arbitrum_USDT')}
            >
              <div className="relative">
                <img src="/usdt.png" alt="Tether" className="w-10 h-10" />
                <img src="/arb.png" alt="Arbitrum" className="w-4 h-4 absolute bottom-0 right-0" />
              </div>
              <div>
                <h3 className="font-medium">{cryptoPrice} USDT (Arbitrum)</h3>
                <p className="text-sm text-gray-400">Оплата в сети Arbitrum</p>
              </div>
            </div>

          </div>

          {skipFirstStep && (
            <div className="w-full mt-6 flex justify-center">
              <Button variant="secondary" onClick={onBack} size="lg">
                Выбрать другую сумму
              </Button>
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "flex mt-auto", {
          'justify-between': !skipFirstStep,
          'justify-end': skipFirstStep
        }
        )}
      >
        {!skipFirstStep && (
          <Button variant="secondary" onClick={onBack}>
            Назад
          </Button>
        )}
        <Button
          onClick={handleContinue}
          disabled={!paymentMethod && status === 'success'}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodSelection; 