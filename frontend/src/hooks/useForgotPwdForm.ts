import * as z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type ForgotPwdFormInputs = {
  email: string;
};

export type FormForgotPwdProps = {
  onSubmit: (data: ForgotPwdFormInputs) => void;
  loading?: boolean;
  canReset?: boolean;
};

const schema = z.object({
  email: z.string().email(),
});

export default function useForgotPwdForm(canReset: boolean) {
  const form = useForm<ForgotPwdFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (canReset) {
      form.reset();
    }
  }, [canReset, form]);

  return form;
}
