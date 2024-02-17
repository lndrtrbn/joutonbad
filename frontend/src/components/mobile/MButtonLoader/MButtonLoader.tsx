import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MButton, { MButtonProps } from "../MButton/MButton";

type Props = MButtonProps & {
  loading?: boolean;
};

export default function MButtonLoader({
  loading,
  ...btnProps
}: Props) {
  const { disabled, children } = btnProps;
  return (
    <MButton {...btnProps} disabled={disabled || loading}>
      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : children}
    </MButton>
  );
}
