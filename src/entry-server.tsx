import React from "react";
import { renderToString } from "react-dom/server";
import App, { getJobsForAutomation, getPrerenderPaths, getSeoForPath, __setArticlePages, __setUsPaths } from "./ExactHomefrontApp";
import { ARTICLE_PAGES } from "./articles";
import { US_STATE_PATHS } from "./usMap";

// Preload lazy chunks synchronously for SSR/prerender so rendered HTML is complete
__setArticlePages(ARTICLE_PAGES);
__setUsPaths(US_STATE_PATHS);

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
export { getJobsForAutomation };
