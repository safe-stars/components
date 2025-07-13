import { useEffect, useState } from 'react';
import { Button, Spinner } from '../../../components';
import { makeDeposit } from '../../../api/makeDeposit';
import { Coin, COINS, ComponentsCustomStyles, ButtonCustomProps, SpinnerCustomProps } from '../../../types';
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
  classes?: ComponentsCustomStyles;
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
  setCryptoDeposit,
  classes
}: PaymentMethodSelectionProps) => {
  // Переопределяем компоненты с применением кастомных стилей (короткий синтаксис)
  const Button_custom = (props: ButtonCustomProps) => (
    <Button {...props} classes={classes} />
  );
  const Spinner_custom = (props: SpinnerCustomProps) => (
    <Spinner {...props} classes={classes} />
  );

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
          <Spinner_custom />
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
        <div className="flex-1 flex flex-col">
          {depositUrl && paymentMethod === 'RUB' && (
            <div className="flex-1 flex flex-col mb-4">
              <div className="relative w-full mb-4 flex-1">
                <iframe
                  src={depositUrl}
                  className="w-full h-full rounded-lg border-0"
                  title="Payment Page"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                />
              </div>
              <Button_custom
                variant="secondary"
                onClick={() => window.open(depositUrl, '_blank', 'noopener,noreferrer')}
                size="sm"
                className="mx-auto"
              >
                Открыть в новой вкладке
              </Button_custom>
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
                <TonPayment 
                  cryptoDeposit={cryptoDeposit} 
                  paymentStatus={cryptoPaymentStatus} 
                  setPaymentStatus={setCryptoPaymentStatus}
                  classes={classes}
                />
              )}

              {networkName === 'arbitrum' && (
                <EthPayment 
                  cryptoDeposit={cryptoDeposit} 
                  paymentStatus={cryptoPaymentStatus} 
                  setPaymentStatus={setCryptoPaymentStatus}
                  classes={classes}
                />
              )}
            </div>
          )}
        </div>
      )}

      {onBack && onContinue && (
        <div className="flex justify-between mt-auto">
          <Button_custom variant="secondary" onClick={onBack}>
            Назад
          </Button_custom>
          <Button_custom
            onClick={handleContinue}
            disabled={(status !== 'success' || !paymentStatus) && cryptoPaymentStatus !== 'success'}
          >
            Готово
          </Button_custom>
        </div>
      )}
    </div>
  );
};

export default PaymentForm; 