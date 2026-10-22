import { Container } from "@ui/Container";
import { Text } from "@ui/Text";
import { Title } from "@ui/Title";
import { useTranslations } from "next-intl";

// Экран главной страницы: собирает секции по порядку.
// Пока — заглушка первого экрана, секции появятся на следующих этапах.
const MainPage = () => {
  const translate = useTranslations("Sections.Main");

  return (
    <main>
      <Container>
        <Title order={1}>{translate("title")}</Title>
        <Text>{translate("description")}</Text>
      </Container>
    </main>
  );
};

export default MainPage;
