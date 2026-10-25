import { getAbsoluteUrl, getLocalePath } from "@shared/config/seo";
import type { Locale } from "@shared/constants/internalization";

interface CourseJsonLdParams {
  description: string;
  locale: Locale;
  name: string;
  schoolName: string;
  siteUrl: string;
}

// Разметка schema.org/Course: адреса и контактов у школы нет, поэтому
// Course с провайдером Organization, а не LocalBusiness
export const getCourseJsonLd = ({
  description,
  locale,
  name,
  schoolName,
  siteUrl,
}: CourseJsonLdParams) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name,
  description,
  inLanguage: locale,
  url: getAbsoluteUrl(siteUrl, getLocalePath(locale)),
  provider: {
    "@type": "Organization",
    name: schoolName,
    url: getAbsoluteUrl(siteUrl, "/"),
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    // ISO 8601: 6 недель
    courseWorkload: "P6W",
  },
});

// JSON внутри <script>: «<» экранируем, чтобы текст не мог закрыть тег
export const serializeJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
