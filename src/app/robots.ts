import type { MetadataRoute } from "next";
import { CLIENT_ENV } from "@shared/config/env/client-env";
import { getRobots } from "@shared/config/seo";

const robots = (): MetadataRoute.Robots =>
  getRobots(CLIENT_ENV.NEXT_PUBLIC_SITE_URL);

export default robots;
