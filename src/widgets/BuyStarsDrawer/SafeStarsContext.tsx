import React, { createContext, useContext, useState } from 'react';
import { BuyStarsDrawer } from '.';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppKitProvider } from '../../utils/AppKitProvider';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { CustomStyles } from '../../types';

export interface SafeStarsConfig {
  tonCenterApiKey?: string;
  alchemyApiKey?: string;
  markUp?: number;
}

interface SafeStarsContextType {
  isOpen: boolean;
  openDrawer: (params?: { stars?: number; classes?: CustomStyles }) => void;
  closeDrawer: () => void;
}

interface SafeStarsConfigContextType {
  config: SafeStarsConfig;
}

const SafeStarsContext = createContext<SafeStarsContextType | undefined>(undefined);
const SafeStarsConfigContext = createContext<SafeStarsConfigContextType | undefined>(undefined);

export type BuyStarsData = {
  username: string;
  starsCount: number;
};

export const SafeStarsProvider: React.FC<{ 
  children: React.ReactNode;
  config?: SafeStarsConfig;
  classes?: CustomStyles;
}> = ({ children, config = {}, classes: defaultClasses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skipFirstStep, setSkipFirstStep] = useState(false);
  const [classes, setClasses] = useState<CustomStyles | undefined>(defaultClasses);
  const launchParams = useLaunchParams();
  const username = launchParams.tgWebAppData?.user?.username;

  const defaultFormData: BuyStarsData = {
    username: username ?? '',
    starsCount: 50
  };

  const [formData, setFormData] = useState<BuyStarsData>(defaultFormData);

  const openDrawer = (params?: { stars?: number; classes?: CustomStyles }) => {
    setIsOpen(true);
    if (params?.stars) {
      const stars = params?.stars ?? 50;
      setFormData(d => ({ ...d, starsCount: stars }));
      setSkipFirstStep(true);
    }
    if (params?.classes) {
      setClasses(params.classes);
    } else {
      setClasses(defaultClasses);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setSkipFirstStep(false);
    setFormData(defaultFormData);
    setClasses(defaultClasses);
  };

  return (
    <SafeStarsConfigContext.Provider value={{ config }}>
      <AppKitProvider>
        <TonConnectUIProvider
          manifestUrl='./tonconnect-manifest.json'
          actionsConfiguration={{ returnStrategy: "back" }}
        >
          <SafeStarsContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
            {children}
            <BuyStarsDrawer
              isOpen={isOpen}
              onClose={closeDrawer}
              formData={formData}
              setFormData={setFormData}
              skipFirstStep={skipFirstStep}
              classes={classes}
            />
          </SafeStarsContext.Provider>
        </TonConnectUIProvider>
      </AppKitProvider>
    </SafeStarsConfigContext.Provider>
  );
};

export const useSafeStars = () => {
  const context = useContext(SafeStarsContext);
  if (context === undefined) {
    throw new Error('useSafeStars must be used within a SafeStarsProvider');
  }
  return context;
};

export const useSafeStarsConfig = () => {
  const context = useContext(SafeStarsConfigContext);
  if (context === undefined) {
    throw new Error('useSafeStarsConfig must be used within a SafeStarsProvider');
  }
  return context;
};
