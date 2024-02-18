import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { APIError, APIErrorMessage } from "../utils/error";

export type SignupFormInputs = {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
};

export type SignupFormProps = {
  onSubmit: (data: SignupFormInputs) => void;
  error?: APIError;
  loading?: boolean;
  canReset?: boolean;
  style?: string;
};

const schema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    passwordConfirm: z.string().min(1),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default function useSignupForm(
  canReset: boolean,
  apiError?: APIError,
) {
  const [globalError, setGlobalError] = useState("");

  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
    },
  });

  useEffect(() => {
    if (canReset) {
      form.reset();
    }
  }, [canReset, form]);

  useEffect(() => {
    if (apiError) {
      switch (apiError.message) {
        case APIErrorMessage.ALREADY_EXISTING_USER:
          setGlobalError(
            "Un compte existe déjà pour cette licence ou cet email",
          );
          break;
        case APIErrorMessage.NO_PLAYER_FOUND:
          setGlobalError("Aucun profil trouvé avec cette licence");
          break;
        case APIErrorMessage.PLAYER_ALREADY_LINKED:
          setGlobalError(
            "Le profil lié à cette licence est déjà actif",
          );
          break;
        default:
          setGlobalError("Erreur à la création de compte");
          break;
      }
    } else {
      setGlobalError("");
    }
  }, [apiError]);

  return [form, globalError] as const;
}
