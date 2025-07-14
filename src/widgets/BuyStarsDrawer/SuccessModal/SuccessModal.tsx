import { Button } from "../../../components";
import { CustomStyles, ButtonCustomProps } from "../../../types";

type SuccessModalProps = {
  userData: {
    username: string;
    starsCount: number;
  };
  onClose: () => void;
  onBack: () => void;
  classes?: CustomStyles;
};

const SuccessModal = ({ 
  userData, 
  onClose, 
  onBack,
  classes 
}: SuccessModalProps) => {
  const StyledButton = (props: ButtonCustomProps) => (
    <Button {...props} classes={classes?.['Button']} />
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
        <StyledButton variant="secondary" onClick={onBack}>
          Назад
        </StyledButton>
        <StyledButton onClick={onClose}>
          Закрыть
        </StyledButton>
      </div>
    </div>
  );
};

export default SuccessModal;
