// Не из @ui/theme: тот тянет theme.ts, который на сервере не работает
import { THEME_COLORS } from "@ui/theme/colors";
import { OG_FONT_FAMILY, OG_IMAGE_SIZE } from "./constants";

interface OgImageProps {
  badge: string;
  description: string;
  siteName: string;
  title: string;
}

// Разметка для next/og (Satori): только инлайн-стили и flex, CSS-модули он не понимает
export const OgImage = ({
  badge,
  description,
  siteName,
  title,
}: OgImageProps) => (
  <div
    style={{
      ...OG_IMAGE_SIZE,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 80,
      fontFamily: OG_FONT_FAMILY,
      color: THEME_COLORS.text,
      backgroundColor: THEME_COLORS.body,
      backgroundImage: `radial-gradient(ellipse at top right, ${THEME_COLORS.primarySoft}, ${THEME_COLORS.body} 65%)`,
    }}
  >
    <div style={{ display: "flex", fontSize: 36, fontWeight: 800 }}>
      {siteName}
    </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          padding: "10px 24px",
          borderRadius: 999,
          fontSize: 26,
          fontWeight: 500,
          color: THEME_COLORS.primary,
          backgroundColor: THEME_COLORS.primaryLight,
        }}
      >
        {badge}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.05,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: 900,
          marginTop: 28,
          fontSize: 32,
          fontWeight: 500,
          lineHeight: 1.4,
          color: THEME_COLORS.dimmed,
        }}
      >
        {description}
      </div>
    </div>
  </div>
);
