import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { APIError, APIErrorMessage } from "../utils/error";

export type LoginFormInputs = {
  username: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit: (data: LoginFormInputs) => void;
  error?: APIError;
  loading?: boolean;
  style?: string;
};

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function useLoginForm(apiError?: APIError) {
  const [globalError, setGlobalError] = useState("");

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (apiError) {
      switch (apiError.message) {
        case APIErrorMessage.UNAUTHORIZED:
          setGlobalError(
            "Les informations de connexion sont invalides"
          );
          break;
        default:
          setGlobalError("Erreur de connexion");
          break;
      }
    } else {
      setGlobalError("");
    }
  }, [apiError]);

  return [form, globalError] as const;
}
