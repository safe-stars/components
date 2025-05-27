import { useState } from 'react';
import BuyForm from './BuyForm/BuyForm';
import PaymentMethodSelection from './PaymentMethodSelection/PaymentMethodSelection';
import PaymentForm from './PaymentForm/PaymentForm';
import SuccessModal from './SuccessModal/SuccessModal';
import { Drawer } from '../../components';
import { Coin, Payment } from '../../types';

type BuyDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BuyDrawer = ({ isOpen, onClose }: BuyDrawerProps) => {
  const [step, setStep] = useState<'form' | 'payment-method' | 'payment' | 'success'>('form');
  const [formData, setFormData] = useState({
    username: '',
    starsCount: 50,
  });
  const [paymentMethod, setPaymentMethod] = useState<'RUB' | Coin | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [depositUrl, setDepositUrl] = useState<string | null>(null);
  const [cryptoDeposit, setCryptoDeposit] = useState<Payment | null>(null);

  const handleClose = () => {
    setStep('form');
    setPaymentMethod(null);
    setAmount(null);
    setDepositUrl(null);
    setCryptoDeposit(null);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} title="Покупка Telegram Stars">
      {step === 'form' ? (
        <BuyForm
          formData={formData}
          setFormData={setFormData}
          onContinue={() => {
            setStep('payment-method');
            setDepositUrl(null);
            setCryptoDeposit(null);
            setPaymentMethod(null);
            setAmount(null);
          }}
          onBack={onClose}
        />
      ) : step === 'payment-method' ? (
        <PaymentMethodSelection
          userData={formData}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setAmount={setAmount}
          onBack={() => setStep('form')}
          onContinue={() => setStep('payment')}
        />
      ) : step === 'payment' ? (
        <PaymentForm
          userData={formData}
          paymentMethod={paymentMethod}
          amount={amount ?? 0}
          onBack={() => setStep('payment-method')}
          onContinue={() => setStep('success')}
          depositUrl={depositUrl}
          cryptoDeposit={cryptoDeposit}
          setDepositUrl={setDepositUrl}
          setCryptoDeposit={setCryptoDeposit}
        />
      ) : step === 'success' ? (
        <SuccessModal
          userData={formData}
          onClose={handleClose}
          onBack={() => setStep('payment')}
        />
      ) : null}
    </Drawer>
  );
};

export default BuyDrawer; 