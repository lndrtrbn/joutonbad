import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button, { ButtonProps } from "../Button/Button";

export type ButtonLoadingProps = ButtonProps & {
  loading: boolean;
};

export default function ButtonLoading({
  loading,
  children,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button {...props}>
      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <span>{children}</span>}
    </Button>
  );
}
