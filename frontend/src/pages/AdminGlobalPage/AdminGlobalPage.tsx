import Box from "../../components/Box/Box";
import useFetch from "../../http/useFetch";
import Title from "../../components/Title/Title";
import ExportData from "./ExportData/ExportData";
import FormSettings from "./FormSettings/FormSettings";
import useHttpSettings from "../../http/useHttpSettings";
import Separator from "../../components/Separator/Separator";
import useUpdateSettings from "../../hooks/useUpdateSettings";

export default function AdminGlobalPage() {
  const { getSettings } = useHttpSettings();
  const [settings] = useFetch(getSettings);

  const [callUpdate, updateError, updateFetching] =
    useUpdateSettings();

  return (
    <>
      <Title size="3xl">Paramètres globaux</Title>
      <Separator />

      <div className="flex flex-col gap-10 items-start flex-wrap">
        <Box title="Paramètres" style="sm:w-[350px]">
          {settings && (
            <FormSettings
              onSubmit={callUpdate}
              settings={settings}
              error={updateError}
              loading={updateFetching}
            />
          )}
        </Box>

        <Box title="Export de données" style="sm:w-[350px]">
          <ExportData />
        </Box>
      </div>
    </>
  );
}
