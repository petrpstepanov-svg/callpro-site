import { config } from "@/lib/config";

export const metadata = {
  title: "Пользовательское соглашение — CallPro",
  description: "Пользовательское соглашение сайта CallPro",
};

export default function AgreementPage() {
  return (
    <main className="min-h-screen bg-[#0a1124] text-white pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="font-black text-3xl md:text-4xl text-white mb-6">
          Пользовательское соглашение
        </h1>
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
          <p className="text-sm text-slate-400">
            Настоящее соглашение регулирует отношения между{" "}
            {config.companyFull} (далее — «Исполнитель») и пользователем сайта
            (далее — «Заказчик»).
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            1. Предмет соглашения
          </h2>
          <p>
            Исполнитель оказывает услуги холодного обзвона B2B, телемаркетинга,
            актуализации баз данных, приёма входящих звонков и сопутствующие
            услуги. Заказчик оформляет заявку через сайт, по телефону или в
            мессенджерах.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            2. Стоимость и порядок оплаты
          </h2>
          <p>
            Стоимость услуг определяется в зависимости от выбранной модели
            (оплата за результат, повременная, фикс. за проект) и фиксируется в
            договоре. Точная стоимость согласовывается по телефону за 15 минут.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            3. Сроки запуска
          </h2>
          <p>
            Стандартный срок запуска проекта — 3–5 рабочих дней с момента
            подписания договора. Срочный запуск за 24 часа возможен по запросу и
            за доплату.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            4. Гарантии
          </h2>
          <p>
            Исполнитель гарантирует: оплату за результат (по согласованной
            модели), запись всех звонков, ежедневную отчётность, замену
            оператора без доплат при неудовлетворительном результате. Критерии
            лида фиксируются в договоре.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            5. Конфиденциальность
          </h2>
          <p>
            Стороны обязуются сохранять конфиденциальность коммерческой
            информации. Передача баз данных третьим лицам запрещена. Обработка
            персональных данных осуществляется в соответствии с ФЗ-152 и{" "}
            <a href="/privacy" className="text-cyan-300 underline hover:text-cyan-200">
              Политикой обработки ПДн
            </a>
            .
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            6. Ответственность
          </h2>
          <p>
            Исполнитель не несёт ответственности за качество предоставленной
            Заказчиком базы, некорректные критерии лида, изменения в продукте
            Заказчика в ходе проекта.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            7. Контакты
          </h2>
          <p>
            Связь с Исполнителем:{" "}
            <a
              href={`tel:${config.phoneRaw}`}
              className="text-cyan-300 underline hover:text-cyan-200"
            >
              {config.phone}
            </a>
            ,{" "}
            <a
              href={`mailto:${config.email}`}
              className="text-cyan-300 underline hover:text-cyan-200"
            >
              {config.email}
            </a>
            .
          </p>

          <p className="text-sm text-slate-500 mt-8">
            Документ обновлён: {new Date().toLocaleDateString("ru-RU")}
          </p>
        </div>

        <div className="mt-10 text-center">
          <a
            href={`/`}
            className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3.5 text-base font-bold text-[#0a1124] hover:brightness-110 transition-all"
          >
            ← Вернуться на сайт
          </a>
        </div>
      </div>
    </main>
  );
}
