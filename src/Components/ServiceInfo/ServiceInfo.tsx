import React from "react";
import styles from "./ServiceInfo.module.css";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";
import { ReactComponent as TelegramLogoIcon } from "../../images/telegram-logo.svg";
import { ReactComponent as DonutLogoIcon } from "../../images/donut-icon.svg";

export default function ServiceInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.companyContainer}>
        <LogoIcon className={styles.logo} />
        <div className={styles.nameContainer}>
          <span className={styles.name}>виктория манькова</span>
          <span className={styles.title}>система</span>
        </div>
      </div>
      <div className={styles.feedbackContainer}>
        <p className={styles.feedbackFullInfo}>
          Я сделала этот сайт, чтобы анализировать различные параметры по дате
          рождения человека, рожденного с 23 по 80 градус северной широты. На
          истину пока не претендую) сайт будет развиваться и корректироваться. В
          работе уже многие полезные дополнения.
        </p>
        <p className={styles.feedbackInfo}>
          Оставить отзыв, сообщить об ошибке, задать вопрос:
        </p>
        <a
          href="https://t.me/ViktoriaMankova"
          className={styles.feedbackButton}
        >
          <TelegramLogoIcon className={styles.feedbackIcon} />
          <span className={styles.feedbackButtonName}>система</span>
        </a>
      </div>
      <div className={styles.donutContainer}>
        <p className={styles.donutInfo}>
          Сказать Виктории "Спасибо" - любая сумма по сердцу
        </p>
        <a
          href="https://pay.cloudtips.ru/p/48f16266"
          className={styles.donutButton}
        >
          <DonutLogoIcon className={styles.donutIcon} />
          <span className={styles.donutButtonName}>CLOUDTIPS</span>
        </a>
      </div>
    </div>
  );
}
