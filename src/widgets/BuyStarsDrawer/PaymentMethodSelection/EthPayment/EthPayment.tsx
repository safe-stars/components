import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useState } from 'react';
import { erc20Abi, parseUnits } from 'viem';
import { Button, ButtonProps } from '../../../../components';
import { useAppKit } from '@reown/appkit/react';
import { USDT_ADDRESS } from '../../../../utils/addresses';
import { useSafeStarsConfig } from '../../SafeStarsContext';
import { CustomStyles } from '../../../../types';

type EthPaymentProps = {
  cryptoDeposit: { address: string, amount: string };
  paymentStatus: 'init' | 'loading' | 'success' | 'error';
  setPaymentStatus: (status: 'init' | 'loading' | 'success' | 'error') => void;
  classes?: CustomStyles;
};

export default function EthPayment({
  cryptoDeposit,
  paymentStatus: status,
  setPaymentStatus: setStatus,
  classes
}: EthPaymentProps) {
  const StyledButton = (props: ButtonProps) => (
    <Button {...props} className={classes?.button} />
  );

  const { isConnected, address } = useAccount();
  const [isReady, setIsReady] = useState(false);
  const { open } = useAppKit();
  const usdtAddress = USDT_ADDRESS.arbitrum;
  const { config } = useSafeStarsConfig();

  const { writeContract, isPending, data: hash } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const sendPayment = async () => {
    if (!cryptoDeposit || !isConnected) {
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      
      const amount = parseUnits(cryptoDeposit.amount.toString(), 6);
      writeContract({
        address: usdtAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [cryptoDeposit.address as `0x${string}`, amount]
      });
    } catch (error) {
      console.error('Error sending payment:', error);
      setStatus('error');
    }
  };

  useEffect(() => {
    setIsReady(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (isSuccess) {
      setStatus('success');
    }
  }, [isSuccess, setStatus]);

  if (!config.alchemyApiKey) {
    return null;
  }
  
  return (
    <div className="w-full text-center flex flex-col gap-4 items-center">
      <p>Подключите кошелек чтобы оплатить напрямую</p>
      
      {!isConnected ? (
        <StyledButton onClick={() => open()} className="connect-wallet-button">
          Подключить кошелек
        </StyledButton>
      ) : (
        <div className="wallet-info">
          <p>Подключен: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}</p>
        </div>
      )}
      
      <div className="send-payment-container">
        <StyledButton
          className="send-payment-button"
          onClick={sendPayment}
          disabled={status === 'loading' || status === 'success' || !isReady || isPending || isConfirming}
        >
          {status === 'loading' || isPending || isConfirming ? 'Отправка...' : 
           status === 'success' ? 'Оплачено' : 
           `Отправить ${cryptoDeposit.amount} USDT`}
        </StyledButton>
      </div>
    </div>
  );
}