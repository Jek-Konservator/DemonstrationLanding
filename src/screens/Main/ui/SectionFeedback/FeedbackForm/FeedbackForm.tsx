"use client";

import { useEffect } from "react";
import { CheckboxAdapter } from "@form/adapters/CheckboxAdapter";
import { PhoneInputAdapter } from "@form/adapters/PhoneInputAdapter";
import { SelectAdapter } from "@form/adapters/SelectAdapter";
import { TextInputAdapter } from "@form/adapters/TextInputAdapter";
import { PHONE_MASKS } from "@form/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@ui/Button";
import { LoadingOverlay } from "@ui/LoadingOverlay";
import { useUnit } from "effector-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { PLAN_NAMES } from "@shared/constants/plans";
import {
  createLeadQuery,
  leadSchema,
  planSelected,
  type Lead,
} from "@entities/Lead";
import { FeedbackResult } from "../FeedbackResult";
import styles from "./styles.module.scss";

// Тариф не выбран заранее — его выбирают в списке или кнопкой в «Тарифах»
const DEFAULT_VALUES = { name: "", phone: "", consent: false, website: "" };

export const FeedbackForm = () => {
  const translate = useTranslations("Sections.Feedback");
  const translatePricing = useTranslations("Sections.Pricing");
  const locale = useLocale();
  const { failed, pending, reset, start, succeeded } = useUnit({
    failed: createLeadQuery.$failed,
    pending: createLeadQuery.$pending,
    reset: createLeadQuery.reset,
    start: createLeadQuery.start,
    succeeded: createLeadQuery.$succeeded,
  });
  const {
    control,
    handleSubmit,
    register,
    reset: resetForm,
    setValue,
  } = useForm<Lead>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(leadSchema),
  });

  // Кнопка тарифа в соседней секции выбирает его здесь; отписка — при размонтировании
  useEffect(
    () =>
      planSelected.watch((plan) =>
        setValue("plan", plan, { shouldValidate: true }),
      ),
    [setValue],
  );

  const onSubmit = (lead: Lead) => {
    // Вторая отправка, пока идёт первая, ничего не делает
    if (!pending) {
      start(lead);
    }
  };

  const onSendAgain = () => {
    reset();
    resetForm(DEFAULT_VALUES);
  };

  return (
    <div className={styles.feedbackForm}>
      <form
        aria-label={translate("form")}
        className={styles.form}
        noValidate
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <TextInputAdapter
          autoComplete="name"
          control={control}
          label={translate("fields.name.label")}
          name="name"
          placeholder={translate("fields.name.placeholder")}
          size="md"
        />
        <PhoneInputAdapter
          autoComplete="tel"
          control={control}
          label={translate("fields.phone.label")}
          mask={PHONE_MASKS[locale]}
          name="phone"
          placeholder={translate("fields.phone.placeholder")}
          size="md"
        />
        <SelectAdapter
          control={control}
          data={PLAN_NAMES.map((plan) => ({
            value: plan,
            label: translatePricing(`list.${plan}.name`),
          }))}
          label={translate("fields.plan.label")}
          name="plan"
          placeholder={translate("fields.plan.placeholder")}
          size="md"
        />
        <CheckboxAdapter
          control={control}
          label={translate("fields.consent")}
          name="consent"
        />
        {/* Honeypot: скрыт от людей и скринридеров, его заполняют только боты */}
        <div aria-hidden className={styles.honeypot}>
          <input autoComplete="off" tabIndex={-1} {...register("website")} />
        </div>
        <Button fullWidth loading={pending} size="lg" type="submit">
          {translate("submit")}
        </Button>
      </form>
      <LoadingOverlay visible={pending} />
      {succeeded && (
        <FeedbackResult
          buttonLabel={translate("success.button")}
          onButtonClick={onSendAgain}
          text={translate("success.text")}
          title={translate("success.title")}
        />
      )}
      {failed && (
        <FeedbackResult
          buttonLabel={translate("error.button")}
          isError
          onButtonClick={reset}
          text={translate("error.text")}
          title={translate("error.title")}
        />
      )}
    </div>
  );
};
