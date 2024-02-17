import { Controller } from "react-hook-form";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import MProfilPageStyle from "./MProfilPage.style";
import MText from "../../../components/mobile/MText/MText";
import MIcon from "../../../components/mobile/MIcon/MIcon";
import { useAuthContext } from "../../../contexts/auth.context";
import MButton from "../../../components/mobile/MButton/MButton";
import usePreferencesForm from "../../../hooks/usePreferencesForm";
import MInputCheckbox from "../../../components/mobile/MInputCheckbox/MInputCheckbox";

export default function MProfilPage() {
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
    <div className={MProfilPageStyle.base}>
      <MText type="title" style="px-6 pb-6">
        Mon profil
      </MText>

      <MText color="text-m-moonlight60" type="text" style="px-6 mb-2">
        {profil.license}
      </MText>
      <MText color="text-m-moonlight60" type="text" style="px-6">
        {profil.name} {profil.lastname}
      </MText>

      <MText type="subtitle" style="px-6 pt-12 pb-6">
        Préférences
      </MText>

      <form
        className={MProfilPageStyle.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="preferMobile"
          control={control}
          render={({ field: { value, onChange } }) => (
            <MInputCheckbox
              value={value}
              onChange={(val) => onChange(val)}
              children="Utiliser la version mobile quand je suis sur téléphone"
            />
          )}
        />

        <div className="flex gap-4 items-center">
          <MButton disabled={!isDirty || !isValid} style="flex-1">
            Sauvegarder
          </MButton>
          <MIcon
            disabled={!isDirty}
            icon={faXmark}
            onClick={() => reset()}
          />
        </div>
      </form>
    </div>
  );
}
