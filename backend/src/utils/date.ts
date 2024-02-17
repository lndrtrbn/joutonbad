import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function strShortDate(date: Date) {
  return format(date, "dd/MM/yyyy", {
    locale: fr,
  });
}
