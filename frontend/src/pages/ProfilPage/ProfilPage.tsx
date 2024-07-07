import { Controller } from "react-hook-form";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Separator from "../../components/Separator/Separator";
import { useAuthContext } from "../../contexts/auth.context";
import usePreferencesForm from "../../hooks/usePreferencesForm";
import InputCheckbox from "../../components/InputCheckbox/InputCheckbox";

export default function ProfilPage() {
  const {
    profil: [profil],
  } = useAuthContext();
  const { form, onSubmit } = usePreferencesForm();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = form;

  if (!profil) return null;
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
          <Button disabled={!isDirty || !isValid}>Sauvegarder</Button>
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
