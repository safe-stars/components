import { ButtonProps } from "components/Button/Button";
import { Button } from "../../components";
import { useSafeStars } from "../BuyStarsDrawer";

type BuyStarsButtonProps = {
  stars?: number;
  children?: React.ReactNode;
} & Pick<ButtonProps, 'className' | 'variant'>;

const BuyStarsButton = ({ stars, children, ...rest }: BuyStarsButtonProps) => {
  const { openDrawer } = useSafeStars();

  if (stars && (stars < 50 || stars > 10000)) {
    throw new Error('Stars must be greater than 50 and less than 10000');
  }

  return (
    <Button onClick={() => openDrawer({ stars })} {...rest}>
      {children
        ? children
        : (stars ? `Buy ⭐ ${stars}` : 'Buy Stars')
      }
    </Button>
  );
};

export default BuyStarsButton;
