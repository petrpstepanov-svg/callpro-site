"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Phone,
  PhoneCall,
  Presentation,
  Database,
  Megaphone,
  ClipboardList,
  Headset,
  FileText,
  TrendingUp,
  BadgeCheck,
  Zap,
  ShieldCheck,
  Target,
  RefreshCw,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  Star,
  CheckCircle2,
  Clock,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
  Quote,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { config } from "@/lib/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

/* ============================================================
   ИКОНКИ — маппинг строковых ключей в Lucide-компоненты
   ============================================================ */
const ICONS: Record<string, LucideIcon> = {
  Phone,
  PhoneCall,
  Presentation,
  Database,
  Megaphone,
  ClipboardList,
  Headset,
  FileText,
  TrendingUp,
  BadgeCheck,
  Zap,
  ShieldCheck,
  Target,
  RefreshCw,
  BarChart3,
};

/* ============================================================
   ХУКИ
   ============================================================ */

/** Reveal on Scroll — IntersectionObserver с порогом 0.15 */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/** AnimatedCounter — накручивание чисел при появлении */
function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1800,
  delay = 400,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
}) {
  // Инициализируем через ленивый useState, чтобы не вызывать setState синхронно в эффекте
  const [display, setDisplay] = useState(() => {
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return value;
    }
    return 0;
  });
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // значение уже установлено в инициализаторе
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const timer = setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }, delay);
          // очистка таймера при размонтировании до старта
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, delay]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals).replace(".", ",")
      : Math.round(display).toLocaleString("ru-RU");

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

/** Reveal — обёртка для анимации появления */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Хук отслеживания скролла */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/* ============================================================
   КНОПКА ЗВОНКА — tel: ссылка, можно с pulse
   ============================================================ */
function CallButton({
  variant = "gold",
  size = "lg",
  pulse = false,
  className = "",
  children,
}: {
  variant?: "gold" | "white" | "cyan" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  pulse?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const variants: Record<string, string> = {
    gold: "bg-gold-gradient text-[#0a1124] hover:brightness-110 shadow-lg shadow-amber-500/25",
    white: "bg-white text-[#0a1124] hover:bg-slate-100 shadow-lg",
    cyan: "bg-premium-gradient text-white hover:brightness-110 shadow-lg shadow-cyan-500/25",
    outline:
      "border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 backdrop-blur-sm",
  };
  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-3.5 text-base md:text-lg",
    xl: "px-8 py-5 text-lg md:text-xl",
  };
  return (
    <a
      href={`tel:${config.phoneRaw}`}
      className={`pulse-call inline-flex items-center justify-center gap-2.5 rounded-xl font-bold tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${pulse ? "glow-gold" : ""} ${className}`}
    >
      <Phone className="size-5" />
      <span>{children ?? config.phone}</span>
    </a>
  );
}

/* ============================================================
   1. НАВИГАЦИЯ
   ============================================================ */
function Navigation() {
  const y = useScrollY();
  const scrolled = y > 40;
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#pains", label: "Боли" },
    { href: "#services", label: "Услуги" },
    { href: "#steps", label: "Как работаем" },
    { href: "#pricing", label: "Цены" },
    { href: "#trust", label: "Гарантии" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1124]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="gold-strip" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Логотип */}
          <a href="#hero" className="flex items-center gap-2.5 shrink-0">
            <div className="relative">
              <div className="size-9 md:size-10 rounded-xl bg-premium-gradient flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <PhoneCall className="size-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 size-3 rounded-full bg-gold-gradient border-2 border-[#0a1124]" />
            </div>
            <div className="leading-none">
              <div className="font-black text-lg md:text-xl tracking-tight text-white">
                {config.company}
              </div>
              <div className="text-[10px] md:text-xs text-cyan-300/80 font-medium uppercase tracking-wider">
                B2B колл-центр
              </div>
            </div>
          </a>

          {/* Навигация (десктоп) */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Телефон + кнопка (десктоп) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${config.phoneRaw}`}
              className="flex items-center gap-2 text-white font-semibold hover:text-cyan-300 transition-colors"
            >
              <Phone className="size-4 text-cyan-400" />
              <span className="text-sm md:text-base">{config.phone}</span>
            </a>
            <a
              href={`tel:${config.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient px-4 py-2.5 text-sm font-bold text-[#0a1124] hover:brightness-110 transition-all hover:scale-[1.03]"
            >
              <Phone className="size-4" />
              Позвонить
            </a>
          </div>

          {/* Бургер (мобилка) */}
          <button
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div className="lg:hidden bg-[#0a1124] border-b border-white/10">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${config.phoneRaw}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-3.5 text-base font-bold text-[#0a1124]"
            >
              <Phone className="size-5" />
              {config.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   2. HERO
   ============================================================ */
function Hero() {
  const stats = config.socialProof.stats;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-hero-gradient"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 dot-pattern opacity-60" />
      <div
        className="orb bg-cyan-500"
        style={{ width: 500, height: 500, top: -100, right: -100 }}
      />
      <div
        className="orb bg-amber-500"
        style={{ width: 400, height: 400, bottom: -100, left: -100 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1124]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Левая часть — текст */}
          <div className="text-center lg:text-left">
            {/* Бейдж */}
            <div className="inline-flex float-badge">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 px-4 py-2 text-sm font-medium text-cyan-200">
                <ShieldCheck className="size-4 text-cyan-400" />
                {config.heroBadge}
              </div>
            </div>

            {/* Заголовок */}
            <h1 className="mt-6 font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.05] text-white">
              {config.heroTitle}
              <br />
              <span className="text-gradient-cyan">{config.heroAccent}</span>
            </h1>

            {/* Подзаголовок */}
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {config.heroSubtitle}{" "}
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
                <Zap className="size-4" />
                {config.heroHighlight}
              </span>
            </p>

            {/* Главная кнопка */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <CallButton variant="gold" size="xl" pulse>
                {config.phone}
              </CallButton>
              <div className="text-center sm:text-left">
                <div className="text-sm text-slate-400">
                  {config.ctaCallbackText}
                </div>
                <div className="text-xs text-slate-500">
                  {config.workHours}
                </div>
              </div>
            </div>

            {/* Рейтинг */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-slate-300">
                <span className="font-bold text-white">
                  {config.socialProof.rating}
                </span>{" "}
                / 5 · {config.socialProof.reviewCount} отзывов на{" "}
                {config.socialProof.sources.join(", ")}
              </span>
            </div>
          </div>

          {/* Правая часть — метрики доверия */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="premium-card h-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-6">
                  <div className="text-3xl md:text-4xl font-black text-gradient-cyan tabular-nums">
                    <AnimatedCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                    />
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-slate-300 font-medium">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. БОЛИ
   ============================================================ */
function Pains() {
  return (
    <section id="pains" className="relative py-20 md:py-28 bg-[#0d1530]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/20">
              Знакомая ситуация?
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Теряете клиентов из-за{" "}
              <span className="text-gradient-cyan">слабого обзвона?</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Решим это за {config.launchTime}. 6 типичных болей B2B, которые
              закрываем на аутсорсе — без найма, налогов и текучки.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {config.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="premium-card h-full rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.06]">
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="font-bold text-lg text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <CallButton variant="gold" size="lg">
              Решить проблему за {config.launchTime}
            </CallButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   4. УСЛУГИ
   ============================================================ */
function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28 bg-[#0a1124]">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20">
              Услуги
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Полный спектр телефонных{" "}
              <span className="text-gradient-cyan">коммуникаций B2B</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              От холодных звонков до горячей линии — всё в одних руках. Оплата
              за результат или по минутам.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {config.services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? PhoneCall;
            return (
              <Reveal key={s.title} delay={i * 80}>
                <div className="premium-card h-full relative rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.06] flex flex-col">
                  {s.featured && (
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0a1124]">
                      <Sparkles className="size-3" /> Топ
                    </span>
                  )}
                  <div className="size-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-4">
                    <Icon className="size-6 text-cyan-300" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {s.desc}
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-amber-300 font-bold">{s.price}</span>
                    <ArrowRight className="size-4 text-slate-500" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. КАК МЫ РАБОТАЕМ — таймлайн
   ============================================================ */
function Steps() {
  return (
    <section id="steps" className="relative py-20 md:py-28 bg-[#0d1530]">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20">
              Как мы работаем
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Запуск за {config.launchTime} —{" "}
              <span className="text-gradient-cyan">без бюрократии</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              От звонка до первых лидов — 4 шага и максимум неделя.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 relative">
          {/* Вертикальная линия */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {config.steps.map((step, i) => {
              const Icon = ICONS[step.icon] ?? Phone;
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={step.num} delay={i * 100}>
                  <div
                    className={`relative flex items-start gap-4 md:gap-8 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Кружок с номером */}
                    <div className="relative z-10 shrink-0 ml-6 md:ml-0 md:w-1/2 md:flex md:justify-end md:items-center">
                      <div
                        className={`size-12 md:size-14 rounded-full bg-premium-gradient border-4 border-[#0d1530] flex items-center justify-center shadow-lg shadow-cyan-500/30 ${
                          isLeft ? "md:order-1" : "md:order-1"
                        }`}
                      >
                        <Icon className="size-5 md:size-6 text-white" />
                      </div>
                    </div>

                    {/* Контент */}
                    <div className="flex-1 md:w-1/2 pb-2">
                      <div className="premium-card rounded-2xl bg-white/[0.03] border border-white/10 p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl md:text-3xl font-black text-gradient-cyan tabular-nums">
                            {step.num}
                          </span>
                          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/20">
                            <Clock className="size-3 mr-1" />
                            {step.time}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-lg md:text-xl text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <CallButton variant="gold" size="lg">
              Запустить обзвон за {config.launchTime}
            </CallButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   6. ЦЕНЫ / ТАРИФЫ
   ============================================================ */
function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 bg-[#0a1124]">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/20">
              Цены
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Прозрачные цены —{" "}
              <span className="text-gradient-cyan">без скрытых платежей</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Выберите формат сотрудничества. Точную стоимость назовём по
              телефону за 15 минут.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {config.pricing.map((p, i) => (
            <Reveal key={p.type} delay={i * 100}>
              <div
                className={`relative h-full rounded-2xl p-6 md:p-8 flex flex-col ${
                  p.popular
                    ? "bg-gradient-to-br from-cyan-500/10 to-amber-500/5 border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/10"
                    : "bg-white/[0.03] border border-white/10"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0a1124] shadow-lg">
                    <Sparkles className="size-3" /> Хит
                  </span>
                )}
                <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
                  {p.model}
                </div>
                <h3 className="mt-2 font-bold text-xl text-white">{p.type}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black text-gradient-cyan">
                    {p.price}
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-400">{p.unit}</div>

                <ul className="mt-6 space-y-3 flex-1">
                  {p.includes.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-2.5 text-sm text-slate-200"
                    >
                      <CheckCircle2 className="size-5 text-trust shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`tel:${config.phoneRaw}`}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-base font-bold transition-all hover:scale-[1.02] ${
                    p.popular
                      ? "bg-gold-gradient text-[#0a1124] shadow-lg shadow-amber-500/25"
                      : "bg-white/10 text-white hover:bg-white/15 border border-white/15"
                  }`}
                >
                  <Phone className="size-4" />
                  Узнать точную цену
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Точную стоимость назовём по телефону за 15 секунд — зависит от ниши,
            базы и критериев лида.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   7. КЕЙСЫ / РЕЗУЛЬТАТЫ
   ============================================================ */
function Cases() {
  return (
    <section id="cases" className="relative py-20 md:py-28 bg-[#0d1530]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20">
              Кейсы
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Результаты <span className="text-gradient-cyan">в цифрах</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Каждый проект — измеримый результат. Не «много звонков», а лиды и
              деньги.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {config.cases.map((c, i) => (
            <Reveal key={c.niche} delay={i * 100}>
              <div className="premium-card h-full rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
                {/* Header с цифрой */}
                <div className="relative h-40 bg-gradient-to-br from-cyan-500/20 via-[#131c3d] to-amber-500/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 dot-pattern opacity-50" />
                  <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/15 px-2.5 py-1 rounded-full border border-cyan-500/30">
                    {c.tag}
                  </span>
                  <span className="absolute -bottom-2 right-3 text-7xl md:text-8xl font-black text-white/5 leading-none">
                    {c.ghost}
                  </span>
                  <div className="relative text-center">
                    <div className="text-3xl md:text-4xl font-black text-gradient-cyan">
                      {c.conversion}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      {c.leads}
                    </div>
                  </div>
                </div>
                {/* Тело */}
                <div className="p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    {c.niche}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {c.task}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Звонков</div>
                      <div className="text-sm font-bold text-white">
                        {c.calls}
                      </div>
                    </div>
                    <Trophy className="size-5 text-amber-400" />
                  </div>
                  <div className="mt-3 rounded-lg bg-trust/10 border border-trust/20 px-3 py-2 text-xs text-trust font-semibold">
                    {c.result}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. ГАРАНТИИ / ДОВЕРИЕ
   ============================================================ */
function Trust() {
  return (
    <section id="trust" className="relative py-20 md:py-28 bg-trust-gradient overflow-hidden">
      <div
        className="orb bg-cyan-500"
        style={{ width: 400, height: 400, top: -100, left: "30%" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/20">
              Гарантии
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              6 гарантий, которые снимают{" "}
              <span className="text-gradient-gold">все риски</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Платите за результат, контролируете каждый звонок, заменяем
              оператора если не нравится.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {config.guarantees.map((g, i) => {
            const Icon = ICONS[g.icon] ?? ShieldCheck;
            return (
              <Reveal key={g.title} delay={i * 80}>
                <div className="premium-card h-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                  <div className="size-12 rounded-xl bg-gold-gradient/20 border border-amber-500/40 flex items-center justify-center mb-4">
                    <Icon className="size-6 text-amber-300" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">
                    {g.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <CallButton variant="white" size="lg">
              Получить гарантии в договоре
            </CallButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   9. ОТЗЫВЫ
   ============================================================ */
function Reviews() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0a1124]">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/20">
              Отзывы
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Что говорят{" "}
              <span className="text-gradient-cyan">клиенты</span>
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-slate-300">
                <span className="font-bold text-white">
                  {config.socialProof.rating}
                </span>{" "}
                из 5 · {config.socialProof.reviewCount} отзывов
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {config.socialProof.reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <div className="premium-card h-full rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col">
                <Quote className="size-8 text-cyan-400/40 mb-3" />
                <p className="text-sm text-slate-200 leading-relaxed flex-1">
                  «{r.text}»
                </p>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-premium-gradient flex items-center justify-center text-sm font-bold text-white">
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {r.name}
                    </div>
                    <div className="text-xs text-slate-400">{r.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   10. FAQ — аккордеон
   ============================================================ */
function Faq() {
  return (
    <section id="faq" className="relative py-20 md:py-28 bg-[#0d1530]">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Reveal>
          <div className="text-center">
            <Badge className="mb-4 bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20">
              Вопросы
            </Badge>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Коротко <span className="text-gradient-cyan">о главном</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Не нашли ответ? Звоните — расскажем за 2 минуты.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {config.faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl bg-white/[0.03] border border-white/10 px-5"
                >
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-cyan-300 hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-amber-500/10 border border-cyan-500/30 p-6 md:p-8 text-center">
            <h3 className="font-bold text-xl md:text-2xl text-white mb-2">
              Остались вопросы? Звоните!
            </h3>
            <p className="text-slate-300 mb-5">
              Ответим за 15 секунд. Если не ответим — перезвоним за{" "}
              {config.responseTime}.
            </p>
            <CallButton variant="gold" size="lg" pulse>
              {config.phone}
            </CallButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   11. ФИНАЛЬНЫЙ CTA
   ============================================================ */
function FinalCta() {
  return (
    <section className="relative py-20 md:py-32 bg-cta-gradient overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div
        className="orb bg-amber-500"
        style={{ width: 500, height: 500, top: -150, right: -150 }}
      />
      <div
        className="orb bg-cyan-400"
        style={{ width: 400, height: 400, bottom: -100, left: -100 }}
      />

      <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center">
        <Reveal>
          <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-500/40 hover:bg-amber-500/30">
            <Zap className="size-3 mr-1" />
            Запуск за {config.launchTime}
          </Badge>
          <h2 className="font-black text-3xl md:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            Нужен обзвон <br />
            <span className="text-gradient-gold">прямо сейчас?</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
            Позвоните — рассчитаем стоимость за 15 минут, запустим обзвон за{" "}
            {config.launchTime}. Первые лиды — на третий день.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <CallButton variant="gold" size="xl" pulse>
              {config.phone}
            </CallButton>
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <Clock className="size-4 text-amber-300" />
              {config.workHours}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-trust" />
              Без предоплаты
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-trust" />
              Договор с гарантиями
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-trust" />
              Платите за результат
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   12. FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-[#050818] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Бренд */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-9 rounded-xl bg-premium-gradient flex items-center justify-center">
                <PhoneCall className="size-5 text-white" />
              </div>
              <div className="leading-none">
                <div className="font-black text-lg text-white">
                  {config.company}
                </div>
                <div className="text-[10px] text-cyan-300/80 font-medium uppercase tracking-wider">
                  B2B колл-центр
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {config.companyFull}. Холодные звонки, телемаркетинг, обзвон базы,
              горячая линия. Оплата за результат.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <BadgeCheck className="size-4 text-cyan-400" />
              {config.inn} · {config.ogrn}
            </div>
          </div>

          {/* Услуги */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Услуги
            </h4>
            <ul className="space-y-2 text-sm">
              {config.services.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${config.phoneRaw}`}
                  className="flex items-center gap-2 text-white font-semibold hover:text-cyan-300 transition-colors"
                >
                  <Phone className="size-4 text-cyan-400" />
                  {config.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, "")}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <MessageCircle className="size-4 text-trust" />
                  WhatsApp: {config.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <span className="text-cyan-400">📍</span>
                <span>
                  {config.address}
                  <br />
                  {config.city}, Россия
                </span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Clock className="size-4 text-cyan-400 mt-0.5" />
                <span>{config.workHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {config.company}. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-cyan-300 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-cyan-300 transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   13. STICKY CTA — мобильная плавающая панель
   ============================================================ */
function StickyCta() {
  const y = useScrollY();
  const visible = y > 350;

  return (
    <div
      className={`sticky-cta ${visible ? "visible" : ""} fixed inset-x-0 bottom-0 z-50 md:hidden`}
    >
      <div className="bg-[#0a1124]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${config.phoneRaw}`}
            className="pulse-call flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-3.5 text-base font-bold text-[#0a1124] glow-gold"
          >
            <Phone className="size-5" />
            Позвонить
          </a>
          <a
            href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, "")}`}
            className="inline-flex items-center justify-center size-12 rounded-xl bg-trust text-white shrink-0"
            aria-label="WhatsApp"
          >
            <MessageCircle className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a1124] text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Pains />
      <Services />
      <Steps />
      <Pricing />
      <Cases />
      <Trust />
      <Reviews />
      <Faq />
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}

