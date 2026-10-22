import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { SectionAudience, SectionMain } from "./ui";

// Экран главной страницы: порядок секций задаётся только здесь
const MainPage = () => (
  <main>
    <SectionMain id={NAVIGATION_NAMES.main} />
    <SectionAudience id={NAVIGATION_NAMES.audience} />
  </main>
);

export default MainPage;
