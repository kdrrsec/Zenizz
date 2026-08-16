"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { team } from "@/data/team";
import { getUpcomingOpenDays, getTimeSlots } from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fadeStep = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const ANY_PROFESSIONAL_ID = "any";

function toIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
}

export function QuickBookingFlow() {
  const t = useTranslations("booking");
  const tServices = useTranslations("services");
  const tTeam = useTranslations("team");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const hasProfessionals = team.length > 1;
  const requestedBarber = searchParams.get("barber");
  const initialProfessionalId =
    hasProfessionals && requestedBarber && team.some((member) => member.id === requestedBarber)
      ? requestedBarber
      : null;

  const [professionalId, setProfessionalId] = useState<string | null>(initialProfessionalId);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const days = useMemo(() => getUpcomingOpenDays(6), []);
  const selectedProfessional = team.find((member) => member.id === professionalId) ?? null;
  const selectedService = services.find((service) => service.id === serviceId) ?? null;
  const selectedDay = days.find((day) => toIso(day.date) === dateIso) ?? null;
  const slots =
    selectedDay && selectedService ? getTimeSlots(selectedDay.hours, selectedService.durationMinutes) : [];

  const weekdayFmt = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: "short" }), [locale]);
  const dateFmt = useMemo(() => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }), [locale]);

  const professionalChosen = !hasProfessionals || Boolean(professionalId);
  const professionalLabel = selectedProfessional ? selectedProfessional.name : t("anyProfessional");

  function resetAll() {
    setSubmitted(false);
    setProfessionalId(null);
    setServiceId(null);
    setDateIso(null);
    setTime(null);
    setName("");
    setPhone("");
    setNote("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedService || !selectedDay || !time) return;

    const serviceName = tServices(`${selectedService.id}.name`);
    const dateLabel = `${weekdayFmt.format(selectedDay.date)} ${dateFmt.format(selectedDay.date)}`;
    const bodyLines = [
      hasProfessionals ? `${t("professionalStepTitle")}: ${professionalLabel}` : null,
      `${serviceName} (${selectedService.price})`,
      `${dateLabel}, ${time}`,
      "",
      `${t("nameLabel")}: ${name}`,
      `${t("phoneLabel")}: ${phone}`,
      note ? `${t("noteLabel")}: ${note}` : null,
    ].filter((line): line is string => Boolean(line));

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      t("subject"),
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  if (submitted && selectedService && selectedDay && time) {
    const serviceName = tServices(`${selectedService.id}.name`);
    const dateLabel = `${weekdayFmt.format(selectedDay.date)} ${dateFmt.format(selectedDay.date)}`;
    return (
      <div className="mt-10 border border-line bg-paper p-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone">
          {t("summaryLine", { service: serviceName, date: dateLabel, time })}
        </p>
        <h3 className="display mt-3 text-2xl">{t("successTitle")}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-faded">{t("successText")}</p>
        <Button className="mt-6" variant="secondary" size="sm" showArrow={false} onClick={resetAll}>
          {t("newRequest")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-8">
      {hasProfessionals ? (
        <div>
          {professionalId ? (
            <button
              type="button"
              onClick={() => setProfessionalId(null)}
              className="flex w-full items-center justify-between border border-line bg-paper px-5 py-4 text-left transition-colors hover:border-ink"
            >
              <span className="font-mono text-sm font-semibold">{professionalLabel}</span>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-stone">{t("change")}</span>
            </button>
          ) : (
            <>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-stone">
                {t("professionalStepTitle")}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setProfessionalId(ANY_PROFESSIONAL_ID)}
                  className="flex items-center gap-3 border border-line bg-paper p-4 text-left transition-colors hover:border-ink"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-line bg-soft font-mono text-xs uppercase text-faded">
                    {t("anyProfessional").slice(0, 2)}
                  </span>
                  <span className="font-mono text-sm font-semibold">{t("anyProfessional")}</span>
                </button>
                {team.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setProfessionalId(member.id)}
                    className="flex items-center gap-3 border border-line bg-paper p-4 text-left transition-colors hover:border-ink"
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden border border-line bg-soft">
                      <Image src={member.image} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block font-mono text-sm font-semibold">{member.name}</span>
                      <span className="block font-mono text-xs text-faded">{tTeam(`${member.id}.role`)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : null}

      {professionalChosen ? (
        <div>
          {selectedService ? (
            <button
              type="button"
              onClick={() => setServiceId(null)}
              className="flex w-full items-center justify-between border border-line bg-paper px-5 py-4 text-left transition-colors hover:border-ink"
            >
              <span className="font-mono text-sm">
                <span className="font-semibold">{tServices(`${selectedService.id}.name`)}</span>
                <span className="ml-2 text-faded">
                  {selectedService.price} · {t("minutesShort", { minutes: selectedService.durationMinutes })}
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-stone">{t("change")}</span>
            </button>
          ) : (
            <>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-stone">{t("step1Title")}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setServiceId(service.id)}
                    className="border border-line bg-paper p-5 text-left transition-colors hover:border-ink"
                  >
                    <span className="block font-mono text-sm font-semibold">
                      {tServices(`${service.id}.name`)}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-faded">
                      {service.price} · {t("minutesShort", { minutes: service.durationMinutes })}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : null}

      {professionalChosen && selectedService ? (
        <motion.div initial="hidden" animate="visible" variants={fadeStep}>
          {dateIso && time ? (
            <button
              type="button"
              onClick={() => {
                setDateIso(null);
                setTime(null);
              }}
              className="flex w-full items-center justify-between border border-line bg-paper px-5 py-4 text-left transition-colors hover:border-ink"
            >
              <span className="font-mono text-sm font-semibold">
                {selectedDay ? `${weekdayFmt.format(selectedDay.date)} ${dateFmt.format(selectedDay.date)}` : ""} ·{" "}
                {time}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-stone">{t("change")}</span>
            </button>
          ) : (
            <>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-stone">{t("step2Title")}</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {days.map((day) => {
                  const iso = toIso(day.date);
                  const active = iso === dateIso;
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => {
                        setDateIso(iso);
                        setTime(null);
                      }}
                      className={cn(
                        "flex min-w-[64px] flex-col items-center gap-1 border px-3 py-3 font-mono text-xs transition-colors",
                        active ? "border-ink bg-ink text-white" : "border-line hover:border-ink",
                      )}
                    >
                      <span className="uppercase tracking-[0.06em]">
                        {isToday(day.date) ? t("today") : weekdayFmt.format(day.date)}
                      </span>
                      <span className="text-base font-semibold">{day.date.getDate()}</span>
                    </button>
                  );
                })}
              </div>

              {dateIso ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeStep}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {slots.length > 0 ? (
                    slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={cn(
                          "border px-4 py-2 font-mono text-xs transition-colors",
                          time === slot ? "border-ink bg-ink text-white" : "border-line hover:border-ink",
                        )}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-faded">{t("noSlots")}</p>
                  )}
                </motion.div>
              ) : null}
            </>
          )}
        </motion.div>
      ) : null}

      {professionalChosen && selectedService && dateIso && time ? (
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeStep}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone">{t("step3Title")}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t("namePlaceholder")}
              aria-label={t("nameLabel")}
              className="border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-ink"
            />
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={t("phonePlaceholder")}
              aria-label={t("phoneLabel")}
              className="border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-ink"
            />
          </div>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={t("notePlaceholder")}
            aria-label={t("noteLabel")}
            rows={2}
            className="w-full border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-ink"
          />
          <Button type="submit" variant="primary">
            {t("submit")}
          </Button>
        </motion.form>
      ) : null}
    </div>
  );
}
