import { Button } from "../../../components";

type SuccessModalProps = {
  userData: {
    username: string;
    starsCount: number;
  };
  onClose: () => void;
  onBack: () => void;
};

const SuccessModal = ({ userData, onClose, onBack }: SuccessModalProps) => {
  return (
    <div className="flex flex-col h-full">
      <p className="mb-6 text-lg">
        Покупка {userData.starsCount} звезд для пользователя {userData.username}
      </p>

      <p className="mb-6 text-center text-green-500">
        Звезды будут автоматически зачислены на счет пользователя в течение 5 минут после подтверждения платежа.
      </p>

      <div className="flex justify-between mt-auto">
        <Button variant="secondary" onClick={onBack}>
          Назад
        </Button>
        <Button
          onClick={onClose}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
