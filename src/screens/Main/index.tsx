import { useTranslations } from "next-intl";

// Экран главной страницы: собирает секции по порядку.
// Пока — заглушка первого экрана, секции появятся на следующих этапах.
const MainPage = () => {
  const translate = useTranslations("Sections.Main");

  return (
    <main>
      <h1>{translate("title")}</h1>
      <p>{translate("description")}</p>
    </main>
  );
};

export default MainPage;
