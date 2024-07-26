import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import { useUpdateProfil } from "../../http/useHttpPlayer";
import Separator from "../../components/Separator/Separator";
import { useAuthContext } from "../../contexts/auth.context";
import { DEFAULT_MAIN_COLOR } from "../../styles/designSystem/colors";
import InputCheckbox from "../../components/InputCheckbox/InputCheckbox";
import ButtonLoading from "../../components/ButtonLoading/ButtonLoading";

const schema = z.object({
  preferMobile: z.boolean(),
  favoriteColor: z.string(),
});

type Inputs = z.infer<typeof schema>;

export default function ProfilPage() {
  const {
    profil: [profil],
  } = useAuthContext();
  const { mutateAsync, isPending } = useUpdateProfil();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      preferMobile: profil?.favoriteDevice === "mobile",
      favoriteColor: profil?.favoriteColor ?? DEFAULT_MAIN_COLOR,
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: Inputs) {
    try {
      if (profil) {
        const updated = await mutateAsync({
          favoriteDevice: data.preferMobile ? "mobile" : "desktop",
          favoriteColor: data.favoriteColor,
        });
        reset({
          preferMobile: updated.favoriteDevice === "mobile",
          favoriteColor: updated.favoriteColor,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Title size="3xl">Mon profil</Title>
      <Title subtitle>
        Se trouvent sur cette page tes préférences personnelles
      </Title>

      <Separator />

      <Title size="2xl">Mes préférences</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="preferMobile"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputCheckbox
              checked={value}
              onChange={(val) => onChange(val)}
              children="Utiliser la version mobile quand je suis sur téléphone"
            />
          )}
        />

        <div className="flex gap-4 items-center mt-8">
          <ButtonLoading
            disabled={!isDirty || !isValid || isPending}
            loading={isPending}
          >
            Sauvegarder
          </ButtonLoading>
          <Button
            variant="light"
            disabled={!isDirty}
            onClick={() => reset()}
          >
            Annuler
          </Button>
        </div>
      </form>
    </>
  );
}
