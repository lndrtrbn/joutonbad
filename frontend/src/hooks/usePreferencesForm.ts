import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useHttpPlayer from "../http/useHttpPlayer";
import { hexToRgb, rgbToHex } from "../utils/color";
import { useAuthContext } from "../contexts/auth.context";
import { DEFAULT_MOBILE_MAIN_COLOR } from "../styles/designSystem/colors";

export const PreferencesSchema = z.object({
  preferMobile: z.boolean(),
  favoriteColor: z.string(),
});

export type PreferencesInputs = z.infer<typeof PreferencesSchema>;

export default function usePreferencesForm() {
  const {
    profil: [profil, setProfil],
  } = useAuthContext();
  const { updateProfil } = useHttpPlayer();

  const form = useForm<PreferencesInputs>({
    defaultValues: {
      preferMobile: profil?.favoriteDevice === "mobile",
      favoriteColor: rgbToHex(
        profil?.favoriteColor ?? DEFAULT_MOBILE_MAIN_COLOR,
      ),
    },
    resolver: zodResolver(PreferencesSchema),
  });

  const { reset } = form;

  async function onSubmit(data: PreferencesInputs) {
    try {
      if (profil) {
        const updated = await updateProfil({
          favoriteDevice: data.preferMobile ? "mobile" : "desktop",
          favoriteColor: hexToRgb(data.favoriteColor),
        });
        setProfil(updated);
        reset({
          preferMobile: updated.favoriteDevice === "mobile",
          favoriteColor: rgbToHex(updated.favoriteColor),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { form, onSubmit };
}
