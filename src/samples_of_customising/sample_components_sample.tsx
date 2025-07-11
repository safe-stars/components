import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BuyStarsButton, BuyStarsDrawer, SafeStarsProvider } from "./widgets";
import { Button, Spinner } from "./components";
import { mockTelegramEnv } from "@telegram-apps/sdk-react";
import './index.css';

mockTelegramEnv({
  launchParams:
    "tgWebAppData=user%3D%257B%2522id%2522%253A279058397%252C%2522first_name%2522%253A%2522Vladislav%2522%252C%2522last_name%2522%253A%2522Kibenko%2522%252C%2522username%2522%253A%2522vdkfrost%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Ft.me%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%2522%257D%26chat_instance%3D-9019086117643313246%26chat_type%3Dsender%26auth_date%3D1736409902%26signature%3DFNWSy6kv5n4kkmYYmfTbrgRtswTvwXgHTRWBVjp-YOv2srtMFSYCWZ9nGr_PohWZeWcooFo_oQgsnTJge3JdBA%26hash%3D4c710b1d446dd4fd301c0efbf7c31627eca193a2e657754c9e0612cb1eb71d90&tgWebAppVersion=8.0&tgWebAppPlatform=tdesktop&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%236ab3f2%22%2C%22bg_color%22%3A%22%2317212b%22%2C%22bottom_bar_bg_color%22%3A%22%2317212b%22%2C%22button_color%22%3A%22%235289c1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23ec3942%22%2C%22header_bg_color%22%3A%22%2317212b%22%2C%22hint_color%22%3A%22%23708599%22%2C%22link_color%22%3A%22%236ab3f3%22%2C%22secondary_bg_color%22%3A%22%23232e3c%22%2C%22section_bg_color%22%3A%22%2317212b%22%2C%22section_header_text_color%22%3A%22%236ab3f3%22%2C%22section_separator_color%22%3A%22%23111921%22%2C%22subtitle_text_color%22%3A%22%23708599%22%2C%22text_color%22%3A%22%23f5f5f5%22%7D",
});

// Компонент для демонстрации кастомных стилей
const CustomStylesDemo = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'default' | 'gradient' | 'neon'>('default');
  const [formData, setFormData] = useState({
    username: '@testuser',
    starsCount: 100
  });

  // Различные наборы кастомных стилей
  const gradientStyles = {
    Button: {
      'button': 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-white/20'
    },
    Drawer: {
      'drawer-overlay': 'bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-red-900/80 backdrop-blur-md',
      'drawer': 'bg-gradient-to-br from-purple-900 via-pink-800 to-red-800 border-t-4 border-gradient-to-r from-purple-400 to-pink-400',
      'drawer-header': 'bg-gradient-to-r from-purple-700 to-pink-700 border-b-2 border-purple-400',
      'drawer-title': 'text-white font-bold text-2xl bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent',
      'drawer-close': 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full',
      'drawer-body': 'bg-gradient-to-br from-purple-800/50 to-pink-800/50'
    },
    Spinner: {
      'spinner': 'border-purple-500 border-t-pink-500 w-12 h-12 animate-spin'
    }
  };

  const neonStyles = {
    Button: {
      'button': 'bg-black border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-6 rounded-lg shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/80 transition-all duration-300 hover:scale-105'
    },
    Drawer: {
      'drawer-overlay': 'bg-black/90 backdrop-blur-sm',
      'drawer': 'bg-black border-t-4 border-cyan-400 shadow-lg shadow-cyan-400/50',
      'drawer-header': 'bg-gray-900 border-b-2 border-cyan-400',
      'drawer-title': 'text-cyan-400 font-bold text-xl font-mono tracking-wider',
      'drawer-close': 'bg-red-600 hover:bg-red-500 text-white border border-red-400 rounded-md',
      'drawer-body': 'bg-gray-900/50'
    },
    Spinner: {
      'spinner': 'border-cyan-400 border-t-transparent w-10 h-10'
    }
  };

  const retro8bitStyles = {
    Button: {
      'button': 'bg-yellow-400 border-4 border-black text-black hover:bg-yellow-300 font-black py-2 px-4 transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-75 shadow-lg shadow-black/50'
    },
    Drawer: {
      'drawer-overlay': 'bg-green-900/95',
      'drawer': 'bg-green-200 border-8 border-black',
      'drawer-header': 'bg-blue-500 border-b-4 border-black',
      'drawer-title': 'text-white font-black text-lg font-mono uppercase tracking-widest',
      'drawer-close': 'bg-red-500 hover:bg-red-400 text-white border-2 border-black font-black',
      'drawer-body': 'bg-white border-4 border-black'
    },
    Spinner: {
      'spinner': 'border-black border-t-yellow-400 w-8 h-8 border-4'
    }
  };

  const getCurrentStyles = () => {
    switch (drawerType) {
      case 'gradient': return gradientStyles;
      case 'neon': return neonStyles;
      default: return retro8bitStyles;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🎨 Custom Styles Demo
        </h1>

        {/* BuyStarsButton с различными стилями */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">BuyStarsButton Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Градиентная кнопка */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Gradient Style</h3>
              <BuyStarsButton 
                stars={100}
                components_custom_styles={gradientStyles}
              >
              </BuyStarsButton>
            </div>

            {/* Неоновая кнопка */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Neon Cyber Style</h3>
              <BuyStarsButton 
                stars={250}
                components_custom_styles={neonStyles}
              >
              </BuyStarsButton>
            </div>

            {/* Ретро 8-bit кнопка */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Retro 8-bit Style</h3>
              <BuyStarsButton 
                stars={500}
                components_custom_styles={retro8bitStyles}
              >
              </BuyStarsButton>
            </div>
          </div>
        </section>

        {/* Базовые компоненты с кастомными стилями */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Base Components Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Градиентные компоненты */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Gradient Components</h3>
              <div className="space-y-4">
                <Button custom_styles={gradientStyles.Button}>
                  Gradient Button
                </Button>
                <Spinner custom_styles={gradientStyles.Spinner} />
              </div>
            </div>

            {/* Неоновые компоненты */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Neon Components</h3>
              <div className="space-y-4">
                <Button custom_styles={neonStyles.Button}>
                  Neon Button
                </Button>
                <Spinner custom_styles={neonStyles.Spinner} />
              </div>
            </div>

            {/* Ретро компоненты */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Retro Components</h3>
              <div className="space-y-4">
                <Button custom_styles={retro8bitStyles.Button}>
                  RETRO BUTTON
                </Button>
                <Spinner custom_styles={retro8bitStyles.Spinner} />
              </div>
            </div>
          </div>
        </section>

        {/* Drawer демо */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">BuyStarsDrawer Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => {
                setDrawerType('gradient');
                setIsDrawerOpen(true);
              }}
              custom_styles={gradientStyles.Button}
            >
              Open Gradient Drawer
            </Button>
            
            <Button 
              onClick={() => {
                setDrawerType('neon');
                setIsDrawerOpen(true);
              }}
              custom_styles={neonStyles.Button}
            >
              Open Neon Drawer
            </Button>
            
            <Button 
              onClick={() => {
                setDrawerType('default');
                setIsDrawerOpen(true);
              }}
              custom_styles={retro8bitStyles.Button}
            >
              OPEN RETRO DRAWER
            </Button>
          </div>
        </section>

        {/* BuyStarsDrawer */}
        <BuyStarsDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          formData={formData}
          setFormData={setFormData}
          skipFirstStep={false}
          components_custom_styles={getCurrentStyles()}
        />

        {/* Информация */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-4">💡 About This Demo</h3>
          <div className="text-gray-300 space-y-2">
            <p>• <strong>Gradient Style:</strong> Яркие градиенты с анимациями и тенями</p>
            <p>• <strong>Neon Cyber Style:</strong> Киберпанк стиль с неоновыми эффектами</p>
            <p>• <strong>Retro 8-bit Style:</strong> Ретро игровой стиль с пиксельными эффектами</p>
            <p>• Все стили применяются через проп <code className="bg-gray-700 px-2 py-1 rounded">components_custom_styles</code></p>
            <p>• Стили наследуются всеми дочерними компонентами внутри виджетов</p>
          </div>
        </section>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SafeStarsProvider 
      config={{
        tonCenterApiKey: import.meta.env.VITE_TON_API_KEY,
        alchemyApiKey: import.meta.env.VITE_ALCHEMY_API_KEY
      }}
    >
      <CustomStylesDemo />
    </SafeStarsProvider>
  </React.StrictMode>,
);
