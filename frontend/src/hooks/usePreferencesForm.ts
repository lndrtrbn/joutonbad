import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useHttpPlayer from "../http/useHttpPlayer";
import { useAuthContext } from "../contexts/auth.context";

export const PreferencesSchema = z.object({
  preferMobile: z.boolean(),
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
    },
    resolver: zodResolver(PreferencesSchema),
  });

  const { reset } = form;

  async function onSubmit(data: PreferencesInputs) {
    try {
      if (profil) {
        const updated = await updateProfil({
          favoriteDevice: data.preferMobile ? "mobile" : "desktop",
        });
        setProfil(updated);
        reset({
          preferMobile: updated.favoriteDevice === "mobile",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { form, onSubmit };
}
