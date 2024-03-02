import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import ScreenLoaderStyle from "./ScreenLoader.style";

export default function ScreenLoader() {
  return (
    <div className={ScreenLoaderStyle.base}>
      <FontAwesomeIcon
        icon={faCircleNotch}
        spin
        size="6x"
        className="text-m-moon/20"
      />
    </div>
  );
}
