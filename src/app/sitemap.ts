import type { MetadataRoute } from "next";
import { CLIENT_ENV } from "@shared/config/env/client-env";
import { getSitemap } from "@shared/config/seo";

const sitemap = (): MetadataRoute.Sitemap =>
  getSitemap(CLIENT_ENV.NEXT_PUBLIC_SITE_URL);

export default sitemap;
