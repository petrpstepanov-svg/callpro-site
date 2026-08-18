import { config } from "@/lib/config";

export const metadata = {
  title: "Политика обработки персональных данных — CallPro",
  description: "Политика обработки персональных данных в соответствии с ФЗ-152",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a1124] text-white pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="font-black text-3xl md:text-4xl text-white mb-6">
          Политика обработки персональных данных
        </h1>
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
          <p className="text-sm text-slate-400">
            Настоящая Политика обработки персональных данных составлена в
            соответствии с требованиями Федерального закона от 27.07.2006 №
            152-ФЗ «О персональных данных» и определяет порядок обработки
            персональных данных и меры по обеспечению безопасности.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            1. Общие положения
          </h2>
          <p>
            Оператор персональных данных — {config.companyFull}, ИНН{" "}
            {config.inn}, ОГРН {config.ogrn}, адрес: {config.address},{" "}
            {config.city}, Россия.
          </p>
          <p>
            Цель обработки — оказание услуг холодного обзвона B2B,
            телемаркетинга, актуализации баз данных, продаж под ключ, а
            также информирования о ходе проекта.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            2. Состав персональных данных
          </h2>
          <p>
            Оператор обрабатывает: имя, телефонный номер, e-mail, наименование
            компании, должность, текстовые сообщения в мессенджерах (MAX,
            Telegram).
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            3. Правовое основание
          </h2>
          <p>
            Согласие субъекта персональных данных на обработку (ст. 6 ФЗ-152),
            заключение и исполнение договора, требования законодательства РФ.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            4. Сроки обработки
          </h2>
          <p>
            Персональные данные обрабатываются до достижения целей обработки,
            но не дольше срока действия договора, и не более 5 лет с момента
            последнего взаимодействия.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            5. Передача третьим лицам
          </h2>
          <p>
            Персональные данные не передаются третьим лицам без согласия
            субъекта, за исключением случаев, предусмотренных законодательством
            РФ.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            6. Права субъекта
          </h2>
          <p>
            Субъект имеет право: на доступ к своим данным, их уточнение,
            блокирование или уничтожение, отзыв согласия на обработку. Для
            реализации прав — напишите на {config.email}.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            7. Cookies
          </h2>
          <p>
            Сайт использует cookies для улучшения работы и аналитики. При
            первом посещении вы можете принять или отклонить использование
            cookies. Без cookies часть функций может быть недоступна.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">
            8. Контакты оператора
          </h2>
          <p>
            По вопросам обработки персональных данных:{" "}
            <a
              href={`mailto:${config.email}`}
              className="text-cyan-300 underline hover:text-cyan-200"
            >
              {config.email}
            </a>
            , тел.{" "}
            <a
              href={`tel:${config.phoneRaw}`}
              className="text-cyan-300 underline hover:text-cyan-200"
            >
              {config.phone}
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
