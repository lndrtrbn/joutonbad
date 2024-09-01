import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router/router.tsx";
import { SvgProvider } from "./contexts/svg.context.tsx";
import ScreenLoader from "./components/ScreenLoader/ScreenLoader.tsx";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={<ScreenLoader />}>
    <SvgProvider>
      <RouterProvider router={router} />
    </SvgProvider>
  </Suspense>,
);
