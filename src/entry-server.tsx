import React from "react";
import { renderToString } from "react-dom/server";
import App, { getPrerenderPaths, getSeoForPath } from "./ExactHomefrontApp";

export function render(pathname: string) {
  const appHtml = renderToString(
    <React.StrictMode>
      <App initialPath={pathname} staticMode={true} />
    </React.StrictMode>,
  );

  return {
    appHtml,
    seo: getSeoForPath(pathname),
  };
}

export { getPrerenderPaths };
