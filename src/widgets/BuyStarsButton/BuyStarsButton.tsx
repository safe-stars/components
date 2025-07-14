import { ButtonProps } from "components/Button/Button";
import { Button } from "../../components";
import { useSafeStars } from "../BuyStarsDrawer";
import { CustomStyles, ButtonCustomProps } from "../../types";

type BuyStarsButtonProps = {
  stars?: number;
  children?: React.ReactNode;
  classes?: CustomStyles;
} & Pick<ButtonProps, 'className' | 'variant'>;

const BuyStarsButton = ({ 
  stars, 
  children, 
  classes,
  ...rest 
}: BuyStarsButtonProps) => {
  const { openDrawer } = useSafeStars();

  const StyledButton = (props: ButtonCustomProps) => (
    <Button {...props} classes={classes} />
  );

  if (stars && (stars < 50 || stars > 10000)) {
    throw new Error('Stars must be greater than 50 and less than 10000');
  }

  return (
    <StyledButton 
      onClick={() => openDrawer({ stars })} 
      {...rest}
    >
      {children
        ? children
        : (stars ? `Buy ⭐ ${stars}` : 'Buy Stars')
      }
    </StyledButton>
  );
};

export default BuyStarsButton;
