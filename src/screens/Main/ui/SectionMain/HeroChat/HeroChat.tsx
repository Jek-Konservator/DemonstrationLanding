import { useTranslations } from "next-intl";
import SparkleIcon from "./assets/sparkle.svg?react";
import TableIcon from "./assets/table.svg?react";
import { CHAT_ANSWER_NAMES } from "./constants";
import styles from "./styles.module.scss";

// Иллюстрация первого экрана: диалог с ассистентом. Анимация — только CSS,
// поэтому компонент серверный и не добавляет JS. Для скринридера — картинка
// с подписью, как аватар преподавателя
export const HeroChat = () => {
  const translate = useTranslations("Sections.Main.chat");

  return (
    <div aria-label={translate("label")} className={styles.heroChat} role="img">
      <div className={styles.window}>
        <div className={styles.header}>
          <span className={styles.avatar}>
            <SparkleIcon aria-hidden className={styles.avatarIcon} />
          </span>
          <span className={styles.name}>{translate("title")}</span>
          <span className={styles.status}>{translate("status")}</span>
        </div>
        <div className={styles.messages}>
          <div className={styles.question}>
            <p className={styles.questionText}>{translate("question")}</p>
            <span className={styles.file}>
              <TableIcon aria-hidden className={styles.fileIcon} />
              {translate("file")}
            </span>
          </div>
          <div className={styles.reply}>
            <span aria-hidden className={styles.typing}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>
            <div className={styles.answer}>
              <p className={styles.answerTitle}>{translate("answer.title")}</p>
              <ul className={styles.answerList}>
                {CHAT_ANSWER_NAMES.map((name) => (
                  <li className={styles.answerItem} key={name}>
                    {translate(`answer.${name}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.saved}>{translate("saved")}</p>
    </div>
  );
};
