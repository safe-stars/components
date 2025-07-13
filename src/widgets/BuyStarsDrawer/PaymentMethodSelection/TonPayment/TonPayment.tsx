import { useTonConnectUI, TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Address, beginCell, toNano, TonClient } from '@ton/ton';
import { useEffect, useState } from "react";
import { Button } from "../../../../components";
import { getUsdtJettonWallet } from "../../../../utils/getUsdtJettonWallet";
import { useSafeStarsConfig } from "../../SafeStarsContext";
import { ComponentsCustomStyles, ButtonCustomProps } from "../../../../types";

type TonPaymentProps = {
  cryptoDeposit: { address: string, amount: string };
  paymentStatus: 'init' | 'loading' | 'success' | 'error';
  setPaymentStatus: (status: 'init' | 'loading' | 'success' | 'error') => void;
  classes?: ComponentsCustomStyles;
};

export default function TonPayment({
  cryptoDeposit,
  paymentStatus: status,
  setPaymentStatus: setStatus,
  classes
}: TonPaymentProps) {
  const Button_custom = (props: ButtonCustomProps) => (
    <Button {...props} classes={classes?.Button} />
  );

  const [tonConnectUI] = useTonConnectUI();
  const tonWallet = useTonWallet();
  const [isConnected, setIsConnected] = useState(false);
  const { config } = useSafeStarsConfig();

  const sendPayment = async () => {
    if (!cryptoDeposit || !tonConnectUI.connected || !config.tonCenterApiKey) {
      setStatus('error');
      return;
    };

    const tonClient = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: config.tonCenterApiKey
    });

    if (!tonConnectUI.wallet?.account.address) {
      setStatus('error');
      return;
    };

    setStatus('loading');
    try {
      const jettonWallet = await getUsdtJettonWallet(tonClient, tonConnectUI.wallet.account.address);
      const body = beginCell()
        .storeUint(0xf8a7ea5, 32)
        .storeUint(0, 64)
        .storeCoins(parseInt((parseFloat(cryptoDeposit.amount) * 1_000_000).toFixed(0)))
        .storeAddress(Address.parse(cryptoDeposit.address))
        .storeAddress(Address.parse(tonConnectUI.wallet.account.address))
        .storeBit(0)
        .storeCoins(0)
        .storeBit(0)
        .endCell();

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: jettonWallet.toString(),
            amount: toNano("0.1").toString(),
            payload: body.toBoc().toString("base64")
          }
        ]
      }

      const result = await tonConnectUI.sendTransaction(transaction);
      if (result) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error sending payment:', error);
    }
  };

  useEffect(() => {
    setIsConnected(!!tonWallet?.account);
  }, [tonWallet]);

  if (!config.tonCenterApiKey) {
    return null;
  }

  return (
    <div className="w-full text-center flex flex-col gap-4 items-center">
      <p>Подлючите кошелек чтобы оплатить напрямую</p>
      <TonConnectButton />
      <div className="send-payment-container">
        <Button_custom
          className="send-payment-button"
          onClick={sendPayment}
          disabled={status === 'loading' || status === 'success' || !isConnected}
        >
          {status === 'loading' ? 'Отправка...' : status === 'success' ? 'Оплачено' : `Отправить ${cryptoDeposit.amount} USDT`}
        </Button_custom>
      </div>
    </div>
  );
}