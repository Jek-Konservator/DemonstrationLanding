import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import {
  SectionAudience,
  SectionFaq,
  SectionFeedback,
  SectionMain,
  SectionPricing,
  SectionProgram,
  SectionReviews,
  SectionTeacher,
  Seo,
} from "./ui";

interface MainPageProps {
  // Адрес сайта для JSON-LD: env читает app, экран получает готовое значение
  siteUrl: string;
}

// Экран главной страницы: порядок секций задаётся только здесь
const MainPage = ({ siteUrl }: MainPageProps) => (
  <main>
    <Seo siteUrl={siteUrl} />
    <SectionMain id={NAVIGATION_NAMES.main} />
    <SectionAudience id={NAVIGATION_NAMES.audience} />
    <SectionProgram id={NAVIGATION_NAMES.program} />
    <SectionTeacher id={NAVIGATION_NAMES.teacher} />
    <SectionReviews id={NAVIGATION_NAMES.reviews} />
    <SectionPricing id={NAVIGATION_NAMES.pricing} />
    <SectionFaq id={NAVIGATION_NAMES.faq} />
    <SectionFeedback id={NAVIGATION_NAMES.feedback} />
  </main>
);

export default MainPage;
