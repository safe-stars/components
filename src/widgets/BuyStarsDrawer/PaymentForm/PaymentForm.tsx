import { useEffect, useState } from 'react';
import { Button, Spinner } from '../../../components';
import { makeDeposit } from '../../../api/makeDeposit';
import { Coin, COINS } from '../../../types';
import TonPayment from '../PaymentMethodSelection/TonPayment/TonPayment';
import { Payment } from '../../../types';
import EthPayment from '../PaymentMethodSelection/EthPayment/EthPayment';
import { getPayment, makeCryptoDeposit } from '../../../api';

type PaymentMethodSelectionProps = {
  userData: {
    username: string;
    starsCount: number;
  };
  paymentMethod: 'RUB' | Coin | null;
  amount: number;
  onBack?: () => void;
  onContinue?: () => void;
  depositUrl: string | null;
  cryptoDeposit: Payment | null;
  setDepositUrl: (url: string | null) => void;
  setCryptoDeposit: (deposit: Payment | null) => void;
};

const PaymentForm = ({
  userData,
  paymentMethod,
  amount,
  onBack,
  onContinue,
  depositUrl,
  cryptoDeposit,
  setDepositUrl,
  setCryptoDeposit
}: PaymentMethodSelectionProps) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [copied, setCopied] = useState<'address' | 'amount' | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [cryptoPaymentStatus, setCryptoPaymentStatus] = useState<'init' | 'loading' | 'success' | 'error'>('init');

  useEffect(() => {
    const fetchDeposit = async () => {
      if (paymentMethod === 'RUB' && !depositUrl) {
        const deposit = await makeDeposit({ username: userData.username, amount, stars_amount: userData.starsCount });
        if (deposit) {
          setDepositUrl(deposit.url);
          setCryptoDeposit(null);
          setStatus('success');
        } else {
          setStatus('error');
        }
      } else if (paymentMethod && COINS.includes(paymentMethod) && !cryptoDeposit) {
        const cryptoDeposit = await makeCryptoDeposit({
          username: userData.username,
          amount,
          stars_amount: userData.starsCount,
          coin: paymentMethod as Coin
        });
        if (cryptoDeposit) {
          setCryptoDeposit(cryptoDeposit);
          setDepositUrl(null);
          setStatus('success');
        } else {
          setStatus('error');
        }
      } else {
        setStatus('success');
      }
    }
    fetchDeposit();
  }, [paymentMethod, amount, userData.username, userData.starsCount, setDepositUrl, setCryptoDeposit, depositUrl, cryptoDeposit]);


  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (cryptoDeposit?.id) {
        const payment = await getPayment({ id: cryptoDeposit.id });
        if (payment?.tx_hash) {
          setPaymentStatus(payment.tx_hash);
        }
      }
    }
    const interval = setInterval(fetchPaymentStatus, 10000);

    return () => clearInterval(interval);
  }, [cryptoDeposit]);

  const handleContinue = () => {
    if (paymentMethod) {
      onContinue?.();
    }
  };

  const copyToClipboard = (text: string, copiedValue: 'amount' | 'address') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(copiedValue);
        setTimeout(() => {
          setCopied(null);
        }, 2000);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const networkName = paymentMethod?.split('_')[0];

  return (
    <div className="flex flex-col h-full">
      <p className="mb-6 text-lg">
        Покупка {userData.starsCount} звезд для пользователя {userData.username}
      </p>

      {status === 'loading' && (
        <div className="mb-8 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {status === 'error' && (
        <div className="mb-8 flex justify-center items-center">
          <p className="font-medium mb-2 text-danger text-center  ">
            Произошла ошибка
          </p>
        </div>
      )}
      {status === 'success' && (
        <div className="mb-8">
          {depositUrl && paymentMethod === 'RUB' && (
            <div className="mb-4">
              <a href={depositUrl} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col gap-4 bg-dark-700 px-16 py-8 pb-6 mt-4 rounded-lg items-center w-fit mx-auto">
                  <img src="/sbp.png" alt="QR" className="h-[100px]" />
                  <Button>Оплатить {amount} RUB</Button>
                </div>
              </a>
            </div>
          )}
          {cryptoDeposit && paymentMethod && COINS.includes(paymentMethod) && (
            <div className="mb-4">
              <p className="text-white mb-4">
                Переведите <b>точную</b> сумму на указанный адрес в сети {networkName}
              </p>

              <div
                className="flex flex-col gap-2 bg-dark-700 p-4 rounded-lg mb-4"
                onClick={() => copyToClipboard(cryptoDeposit.address, 'address')}
              >
                <p className="text-gray-400 font-medium text-sm">Адрес {copied === 'address' ? <span className="text-green-500 ml-2">Скопировано</span> : ''}</p>
                <p className="text-white font-medium text-sm break-all">{cryptoDeposit.address}</p>
              </div>

              <div
                className="flex flex-col gap-2 bg-dark-700 p-4 rounded-lg mb-4"
                onClick={() => copyToClipboard(cryptoDeposit.amount, 'amount')}
              >
                <p className="text-gray-400 font-medium text-sm">Сумма {copied === 'amount' ? <span className="text-green-500 ml-2">Скопировано</span> : ''}</p>
                <p className="text-white font-medium text-sm">{cryptoDeposit.amount} USDT</p>
              </div>

              {networkName === 'TON' && (
                <TonPayment cryptoDeposit={cryptoDeposit} paymentStatus={cryptoPaymentStatus} setPaymentStatus={setCryptoPaymentStatus} />
              )}

              {networkName === 'arbitrum' && (
                <EthPayment cryptoDeposit={cryptoDeposit} paymentStatus={cryptoPaymentStatus} setPaymentStatus={setCryptoPaymentStatus} />
              )}
            </div>
          )}
        </div>
      )}

      {onBack && onContinue && (
        <div className="flex justify-between mt-auto">
          <Button variant="secondary" onClick={onBack}>
            Назад
          </Button>
          <Button
            onClick={handleContinue}
            disabled={(status !== 'success' || !paymentStatus) && cryptoPaymentStatus !== 'success'}
          >
            Готово
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm; 