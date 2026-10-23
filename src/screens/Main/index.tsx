import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import {
  SectionAudience,
  SectionMain,
  SectionProgram,
  SectionTeacher,
} from "./ui";

// Экран главной страницы: порядок секций задаётся только здесь
const MainPage = () => (
  <main>
    <SectionMain id={NAVIGATION_NAMES.main} />
    <SectionAudience id={NAVIGATION_NAMES.audience} />
    <SectionProgram id={NAVIGATION_NAMES.program} />
    <SectionTeacher id={NAVIGATION_NAMES.teacher} />
  </main>
);

export default MainPage;
