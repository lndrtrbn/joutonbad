import Box from "../../components/Box/Box";
import Title from "../../components/Title/Title";
import ExportData from "./ExportData/ExportData";
import FormSettings from "./FormSettings/FormSettings";
import Separator from "../../components/Separator/Separator";
import { useQuerySettings } from "../../http/useHttpSettings";

export default function AdminGlobalPage() {
  const { data: settings } = useQuerySettings();

  return (
    <>
      <Title size="3xl">Paramètres globaux</Title>
      <Separator />

      <div className="flex flex-col gap-10 items-start flex-wrap">
        <Box title="Paramètres" style="sm:w-[350px]">
          {settings && <FormSettings settings={settings} />}
        </Box>

        <Box title="Export de données" style="sm:w-[350px]">
          <ExportData />
        </Box>
      </div>
    </>
  );
}
