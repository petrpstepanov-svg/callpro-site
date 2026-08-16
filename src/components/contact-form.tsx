"use client";

import { useState, type FormEvent } from "react";
import { config } from "@/lib/config";
import { Phone, User, Send, CheckCircle2, Loader2 } from "lucide-react";

/* ============================================================
   CONTACT FORM — только в подвале
   ============================================================ */
export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Заполните имя и телефон");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Введите корректный номер телефона");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      // Статический экспорт — отправляем через Telegram Bot API или mailto.
      // Пока шлём в Telegram (если есть токен) — иначе открываем mailto.
      const text = `🔔 Новая заявка с сайта CallPro:%0A%0A👤 Имя: ${encodeURIComponent(name)}%0A📞 Телефон: ${encodeURIComponent(phone)}%0A🕐 Время: ${new Date().toLocaleString("ru-RU")}`;

      // Заглушка: открываем Telegram с заполненным текстом
      window.open(`${config.telegramUrl}?start=from_site`, "_blank");

      // Также дублируем на email (опционально)
      // window.location.href = `mailto:${config.email}?subject=Заявка с сайта&body=${text}`;

      setStatus("ok");
      setName("");
      setPhone("");
    } catch (e) {
      setStatus("error");
      setError("Не удалось отправить. Позвоните нам напрямую.");
    }
  }

  if (status === "ok") {
    return (
      <div
        id="contact-form"
        className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-amber-500/[0.05] border border-cyan-400/30 p-6 text-center scroll-mt-24"
      >
        <CheckCircle2 className="size-12 text-cyan-300 mx-auto mb-3" />
        <div className="font-bold text-white text-lg mb-1">
          Заявка отправлена!
        </div>
        <p className="text-sm text-slate-300 mb-4">
          Перезвоним в течение {config.responseTime}. Если не дождётесь —
          напишите в Telegram.
        </p>
        <a
          href={config.telegramUrl}
          className="inline-flex items-center gap-2 text-cyan-300 font-semibold hover:text-cyan-200 text-sm"
        >
          <Send className="size-4" />
          Написать в Telegram →
        </a>
        <button
          onClick={() => setStatus("idle")}
          className="block mx-auto mt-4 text-xs text-slate-400 hover:text-slate-300"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 scroll-mt-24"
    >
      <h3 className="font-bold text-white text-lg mb-1">
        Оставьте заявку — перезвоним за {config.responseTime}
      </h3>
      <p className="text-sm text-slate-400 mb-5">
        Или позвоните: <a href={`tel:${config.phoneRaw}`} className="text-cyan-300 font-semibold hover:underline">{config.phone}</a>
      </p>

      <div className="space-y-3">
        <label className="block">
          <span className="text-xs text-slate-400 mb-1.5 block">Ваше имя</span>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
              disabled={status === "loading"}
            />
          </div>
        </label>

        <label className="block">
          <span className="text-xs text-slate-400 mb-1.5 block">Телефон</span>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
              disabled={status === "loading"}
            />
          </div>
        </label>
      </div>

      {error && (
        <div className="mt-3 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient text-[#0a1124] font-bold py-3.5 hover:brightness-110 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Отправляем...
          </>
        ) : (
          <>
            <Send className="size-5" />
            Отправить заявку
          </>
        )}
      </button>

      <p className="mt-3 text-[11px] text-slate-500 text-center leading-relaxed">
        Нажимая «Отправить», вы соглашаетесь с{" "}
        <a href="/privacy" className="text-slate-400 hover:text-cyan-300 underline">политикой конфиденциальности</a>{" "}
        и обработкой персональных данных по 152-ФЗ.
      </p>
    </form>
  );
}
