import React, { createContext, useContext, useState } from 'react';
import { BuyDrawer } from './';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppKitProvider } from '../../utils/AppKitProvider';

interface BuyDrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const BuyDrawerContext = createContext<BuyDrawerContextType | undefined>(undefined);

export const BuyDrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <AppKitProvider>
      <TonConnectUIProvider
        manifestUrl='./tonconnect-manifest.json'
        actionsConfiguration={{ returnStrategy: "back" }}
      >
        <BuyDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
          {children}
          <BuyDrawer isOpen={isOpen} onClose={closeDrawer} />
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
