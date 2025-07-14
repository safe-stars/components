import React from "react";
import ReactDOM from "react-dom/client";
import { BuyStarsButton, SafeStarsProvider } from "./widgets";
import { mockTelegramEnv } from "@telegram-apps/sdk-react";
import './index.css';

mockTelegramEnv({
  launchParams:
    "tgWebAppData=user%3D%257B%2522id%2522%253A279058397%252C%2522first_name%2522%253A%2522Vladislav%2522%252C%2522last_name%2522%253A%2522Kibenko%2522%252C%2522username%2522%253A%2522vdkfrost%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Ft.me%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%2522%257D%26chat_instance%3D-9019086117643313246%26chat_type%3Dsender%26auth_date%3D1736409902%26signature%3DFNWSy6kv5n4kkmYYmfTbrgRtswTvwXgHTRWBVjp-YOv2srtMFSYCWZ9nGr_PohWZeWcooFo_oQgsnTJge3JdBA%26hash%3D4c710b1d446dd4fd301c0efbf7c31627eca193a2e657754c9e0612cb1eb71d90&tgWebAppVersion=8.0&tgWebAppPlatform=tdesktop&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%236ab3f2%22%2C%22bg_color%22%3A%22%2317212b%22%2C%22bottom_bar_bg_color%22%3A%22%2317212b%22%2C%22button_color%22%3A%22%235289c1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23ec3942%22%2C%22header_bg_color%22%3A%22%2317212b%22%2C%22hint_color%22%3A%22%23708599%22%2C%22link_color%22%3A%22%236ab3f3%22%2C%22secondary_bg_color%22%3A%22%23232e3c%22%2C%22section_bg_color%22%3A%22%2317212b%22%2C%22section_header_text_color%22%3A%22%236ab3f3%22%2C%22section_separator_color%22%3A%22%23111921%22%2C%22subtitle_text_color%22%3A%22%23708599%22%2C%22text_color%22%3A%22%23f5f5f5%22%7D",
});

// Демонстрационные кастомные стили для всего приложения (обновлено в стиле MUI)
const globalCustomStyles = {
  root: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-white/30',
  overlay: 'bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg',
  header: 'bg-gradient-to-r from-indigo-700 to-purple-700 border-b-2 border-indigo-400 backdrop-blur-sm',
  title: 'text-white font-bold text-xl bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg',
  closeButton: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300',
  content: 'bg-gradient-to-br from-indigo-800/30 to-pink-800/30 backdrop-blur-sm'
};

// Демонстрационный компонент для тестирования
const CustomStylesDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          🎨 SafeStars Custom Styles Demo
        </h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Global Custom Styles Applied
          </h2>
          
          <div className="text-gray-300 mb-6">
            <p className="mb-2">• 🌈 <strong>Button:</strong> Индиго-фиолетово-розовый градиент с анимациями</p>
            <p className="mb-2">• 🎭 <strong>Drawer:</strong> Стильный градиентный overlay и контент</p>
            <p className="mb-2">• ⚡ <strong>Spinner:</strong> Градиентные цвета с тенями</p>
            <p className="mb-4">• 🎯 Все стили применяются глобально через SafeStarsProvider</p>
          </div>

          <div className="flex flex-col space-y-4 items-center">
            <BuyStarsButton 
              stars={100}
              classes={globalCustomStyles}
            >
              🌟 Buy 100 Stars (Custom Style)
            </BuyStarsButton>
            
            <BuyStarsButton 
              stars={500}
              classes={globalCustomStyles}
            >
              💫 Buy 500 Stars (Custom Style)
            </BuyStarsButton>
            
            <div className="text-sm text-gray-400 text-center mt-4">
              Нажмите на кнопки, чтобы увидеть как кастомные стили<br/>
              применяются ко всем компонентам внутри BuyStarsDrawer!
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">📝 Technical Notes</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• <code className="bg-gray-800 px-2 py-1 rounded">SafeStarsProvider</code> теперь поддерживает <code className="bg-gray-800 px-2 py-1 rounded">classes</code></p>
            <p>• <code className="bg-gray-800 px-2 py-1 rounded">BuyStarsDrawer</code> передает стили всем дочерним компонентам</p>
            <p>• Все стили наследуются: BuyForm → PaymentMethodSelection → PaymentForm → SuccessModal</p>
            <p>• Паттерн <code className="bg-gray-800 px-2 py-1 rounded">_custom</code> используется для внутренних компонентов</p>
          </div>
        </div>
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
      classes={globalCustomStyles}
    >
      <CustomStylesDemo />
    </SafeStarsProvider>
  </React.StrictMode>,
);
