import React, { createContext, useContext, useState } from 'react';
import { BuyDrawer } from './';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppKitProvider } from '../../utils/AppKitProvider';
import { useLaunchParams } from '@telegram-apps/sdk-react';

interface BuyDrawerContextType {
  isOpen: boolean;
  openDrawer: (params?: { stars?: number }) => void;
  closeDrawer: () => void;
}

const BuyDrawerContext = createContext<BuyDrawerContextType | undefined>(undefined);

export type BuyStarsData = {
  username: string;
  starsCount: number;
};

export const BuyDrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skipFirstStep, setSkipFirstStep] = useState(false);
  const launchParams = useLaunchParams();
  const username = launchParams.tgWebAppData?.user?.username;

  const defaultFormData: BuyStarsData = {
    username: username ?? '',
    starsCount: 50
  };

  const [formData, setFormData] = useState<BuyStarsData>(defaultFormData);

  const openDrawer = (params?: { stars?: number }) => {
    setIsOpen(true);
    if (params?.stars) {
      const stars = params?.stars ?? 50;
      setFormData(d => ({ ...d, starsCount: stars }));
      setSkipFirstStep(true);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setSkipFirstStep(false);
    setFormData(defaultFormData);
  };

  return (
    <AppKitProvider>
      <TonConnectUIProvider
        manifestUrl='./tonconnect-manifest.json'
        actionsConfiguration={{ returnStrategy: "back" }}
      >
        <BuyDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
          {children}
          <BuyDrawer
            isOpen={isOpen}
            onClose={closeDrawer}
            formData={formData}
            setFormData={setFormData}
            skipFirstStep={skipFirstStep}
          />
        </BuyDrawerContext.Provider>
      </TonConnectUIProvider>
    </AppKitProvider>
  );
};

export const useBuyDrawer = () => {
  const context = useContext(BuyDrawerContext);
  if (context === undefined) {
    throw new Error('useBuyDrawer must be used within a BuyDrawerProvider');
  }
  return context;
};
