import { Button } from "../../../components";
import { ComponentsCustomStyles, ButtonCustomProps } from "../../../types";

type SuccessModalProps = {
  userData: {
    username: string;
    starsCount: number;
  };
  onClose: () => void;
  onBack: () => void;
  classes?: ComponentsCustomStyles;
};

const SuccessModal = ({ 
  userData, 
  onClose, 
  onBack,
  classes 
}: SuccessModalProps) => {
  const Button_custom = (props: ButtonCustomProps) => (
    <Button {...props} classes={classes?.Button} />
  );

  return (
    <div className="flex flex-col h-full">
      <p className="mb-6 text-lg">
        Покупка {userData.starsCount} звезд для пользователя {userData.username}
      </p>

      <p className="mb-6 text-center text-green-500">
        Звезды будут автоматически зачислены на счет пользователя в течение 5 минут после подтверждения платежа.
      </p>

      <div className="flex justify-between mt-auto">
        <Button_custom variant="secondary" onClick={onBack}>
          Назад
        </Button_custom>
        <Button_custom onClick={onClose}>
          Закрыть
        </Button_custom>
      </div>
    </div>
  );
};

export default SuccessModal;
