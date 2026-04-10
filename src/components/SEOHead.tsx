import { Helmet } from "react-helmet-async";
import { absoluteUrl, buildTitle } from "../lib/seo";

type SEOHeadProps = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
};

export function SEOHead({ title, description, path, jsonLd }: SEOHeadProps) {
  const url = absoluteUrl(path);

  return (
    <Helmet>
      <title>{buildTitle(title)}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={buildTitle(title)} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Home Front Solutions LLC" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={buildTitle(title)} />
      <meta name="twitter:description" content={description} />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
