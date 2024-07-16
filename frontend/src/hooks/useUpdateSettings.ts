import { useCallback, useState } from "react";

import useHttpSettings, {
  UpdateSettingsPayload,
} from "../http/useHttpSettings";
import useLazyFetch from "../http/useLazyFetch";

export default function useUpdateSettings() {
  const [fetching, setFetching] = useState(false);

  const { updateSettings } = useHttpSettings();
  const [fetch, , error] = useLazyFetch((p: UpdateSettingsPayload) =>
    updateSettings(p),
  );

  const call = useCallback(
    async (p: UpdateSettingsPayload) => {
      setFetching(true);
      await fetch(p);
      setFetching(false);
    },
    [fetch],
  );

  return [call, error, fetching] as const;
}
