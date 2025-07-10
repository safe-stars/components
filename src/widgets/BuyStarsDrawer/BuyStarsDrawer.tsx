import { useEffect, useState } from 'react';
import BuyForm from './BuyForm/BuyForm';
import PaymentMethodSelection from './PaymentMethodSelection/PaymentMethodSelection';
import PaymentForm from './PaymentForm/PaymentForm';
import SuccessModal from './SuccessModal/SuccessModal';
import { Drawer } from '../../components';
import { Coin, Payment, ComponentsCustomStyles, DrawerCustomProps } from '../../types';
import { BuyStarsData } from './SafeStarsContext';

type BuyStarsDrawerProps = {
  formData: BuyStarsData;
  setFormData: (data: BuyStarsData) => void;
  isOpen: boolean;
  onClose: () => void;
  skipFirstStep: boolean;
  components_custom_styles?: ComponentsCustomStyles;
};

type Step = 'form' | 'payment-method' | 'payment' | 'success';

const BuyStarsDrawer = (props: BuyStarsDrawerProps) => {
  const { 
    formData, 
    setFormData, 
    isOpen, 
    onClose, 
    skipFirstStep,
    components_custom_styles 
  } = props;

  const Drawer_custom = (props: DrawerCustomProps) => (
    <Drawer {...props} custom_styles={components_custom_styles?.Drawer} />
  );

  const [step, setStep] = useState<Step>('form');
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

  useEffect(() => {
    if (skipFirstStep) {
      setStep('payment-method');
    }
  }, [skipFirstStep, isOpen]);

  return (
    <Drawer_custom 
      isOpen={isOpen} 
      onClose={handleClose} 
      title="Покупка Telegram Stars"
    >
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
          components_custom_styles={components_custom_styles}
        />
      ) : step === 'payment-method' ? (
        <PaymentMethodSelection
          userData={formData}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setAmount={setAmount}
          onBack={() => setStep('form')}
          onContinue={() => setStep('payment')}
          skipFirstStep={skipFirstStep}
          components_custom_styles={components_custom_styles}
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
          components_custom_styles={components_custom_styles}
        />
      ) : step === 'success' ? (
        <SuccessModal
          userData={formData}
          onClose={handleClose}
          onBack={() => setStep('payment')}
          components_custom_styles={components_custom_styles}
        />
      ) : null}
    </Drawer_custom>
  );
};

export default BuyStarsDrawer; 