import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { CodeBlock } from "@/components/code-block";
import { LayerStack } from "@/components/layer-stack";
import { PhaseGroup } from "@/components/phase-group";
import { ProgressProvider } from "@/components/progress-provider";
import { ProgressBar } from "@/components/progress-bar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Stat } from "@/types/course";
import { IDEAS } from "@/content/ideas";
import { BEATS, GENERATOR_DEFAULTS, SPEC_TEMPLATE, WIRING } from "@/content/method";
import { PHASES, TOTAL_DAYS } from "@/content/days";
import {
  DESIGN_STEPS,
  DOMAIN_FLOW,
  DOMAIN_REASONS,
  LADDER,
  LAYERS,
  TERRITORY,
  TOPOLOGIES,
  TRAPS,
  WORKSHEET,
} from "@/content/system";

const STATS: readonly Stat[] = [
  { n: "13", label: "блоков\nтерритории" },
  { n: "20", label: "дней\nпрактики" },
  { n: "19", label: "сен —\nдедлайн", hot: true },
];

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="top" className="mx-auto w-full max-w-6xl px-5">
        {/* Hero */}
        <div className="grain -mx-5 border-b border-border px-5">
          <div className="flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
            <div>
              <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
                Курс · подготовка к HackAlem AI
              </p>
              <h1 className="max-w-[14ch] text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] md:text-6xl">
                Агент за двадцать дней
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                Цель — система, а не чат с агентом. Агентный цикл это один слой
                из девяти; остальные восемь и решают исход защиты.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={
                    s.hot
                      ? "rounded-xl border border-primary/40 bg-brand-soft px-4 py-3"
                      : "rounded-xl border border-border bg-card px-4 py-3"
                  }
                >
                  <div
                    className={
                      s.hot
                        ? "tabular text-3xl font-semibold tracking-tight text-brand"
                        : "tabular text-3xl font-semibold tracking-tight"
                    }
                  >
                    {s.n}
                  </div>
                  <div className="mt-1.5 whitespace-pre-line font-mono text-[10px] uppercase leading-tight tracking-[0.08em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Каркас */}
        <Section
          id="core"
          eyebrow="Часть первая"
          title="Каркас"
          note="Восемь идей, на которые вешается вся остальная тема. Это не сокращённая версия и не замена полной картины — это скелет, без которого тринадцать блоков рассыпаются на несвязанные термины."
        >
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {IDEAS.map((idea) => (
              <div key={idea.n} className="grid gap-4 p-5 md:grid-cols-[44px_1fr] md:p-6">
                <span className="tabular font-mono text-sm font-medium text-primary">
                  {idea.n}
                </span>
                <div>
                  <h3 className="text-balance text-[19px] font-semibold tracking-tight">
                    {idea.title}
                  </h3>
                  {idea.body.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                  {idea.code ? <CodeBlock code={idea.code} className="mt-4" /> : null}
                  {idea.punch ? (
                    <p className="mt-4 border-l-2 border-primary pl-4 text-[16.5px] font-medium leading-snug tracking-tight">
                      {idea.punch}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Территория */}
        <Section
          id="territory"
          eyebrow="Часть вторая"
          title="Карта территории"
          note="Вся тема целиком — тринадцать блоков. Ничего не спрятано и не отложено «на потом»: справа день, на котором блок закрывается."
        >
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[220px]">Блок</TableHead>
                  <TableHead>Что внутри</TableHead>
                  <TableHead className="w-[90px] text-right">Дни</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TERRITORY.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="align-top font-medium text-foreground">
                      <span className="tabular font-mono text-xs text-muted-foreground">
                        {b.id}
                      </span>{" "}
                      {b.name}
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      {b.contents}
                    </TableCell>
                    <TableCell className="tabular align-top text-right font-mono text-sm text-brand">
                      {b.days}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            Половина этих названий звучит как отдельная наука, но ни одно не
            вводит новой сущности. <b className="text-foreground">RAG</b> —
            инструмент, который ищет. <b className="text-foreground">Мультиагентность</b>{" "}
            — инструмент, которым оказался другой агент.{" "}
            <b className="text-foreground">Guardrails</b> — валидация вокруг
            цикла. <b className="text-foreground">MCP</b> — стандартный формат
            описания инструментов. Каркас держит их все.
          </p>
        </Section>

        {/* Проектирование */}
        <Section
          id="design"
          eyebrow="Часть третья"
          title="Как спроектировать систему"
          note="Код вам напишет генератор. Систему не спроектирует никто. Это единственная часть работы, которую нельзя делегировать — и именно её оценивает жюри."
        >
          <div className="rounded-xl border border-border bg-card p-5 md:p-6">
            <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground">
              <b className="text-foreground">
                Агент отвечает. Система делает работу во времени.
              </b>{" "}
              У системы есть вход, состояние, контроль и выход, а агентный цикл
              сидит внутри одним слоем из девяти.
            </p>
            <LayerStack rows={LAYERS} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Большинство команд соберут слой 4 и остановятся. Слои 1, 6, 7 и 8 —
              даже сделанные тонко — превращают демо из чат-бота в систему, и это
              видно с первого взгляда на экран.
            </p>
          </div>

          {/* Лестница */}
          <div className="mt-4 rounded-xl border border-border bg-card p-5 md:p-6">
            <div className="flex flex-wrap gap-1.5">
              {LADDER.map((rung) => (
                <div
                  key={rung}
                  className={
                    rung === "Агент"
                      ? "flex-1 rounded-lg border border-primary bg-brand-soft px-3 py-2.5 text-center font-mono text-xs font-medium text-brand"
                      : "flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-center font-mono text-xs text-muted-foreground"
                  }
                >
                  {rung}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              <span>дёшево · надёжно</span>
              <span>дорого · хрупко</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Поднимайтесь на следующую ступень, только когда предыдущая явно не
              тянет. Большинство «агентных систем» в проде должны были остаться
              цепочкой.
            </p>
          </div>

          {/* Шаги */}
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {DESIGN_STEPS.map((step) => (
              <div key={step.n} className="grid gap-3 p-5 md:grid-cols-[34px_1fr]">
                <span className="tabular font-mono text-[13px] font-medium text-primary">
                  {step.n}
                </span>
                <div>
                  <h4 className="text-[16.5px] font-semibold tracking-tight">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Топологии */}
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[210px]">Топология</TableHead>
                  <TableHead>Когда брать</TableHead>
                  <TableHead>На коридоре</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOPOLOGIES.map((t) => (
                  <TableRow key={t.name}>
                    <TableCell className="align-top font-medium text-foreground">
                      {t.name}
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      {t.when}
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      {t.example}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <CodeBlock
            code={WORKSHEET}
            label="Лист проектирования — заполнять до первого промпта"
            className="mt-4"
          />
        </Section>

        {/* Обвязка */}
        <Section
          id="wiring"
          eyebrow="Часть четвёртая"
          title="Обвязка агента"
          note="Харнес, правила, скилы, MCP и память. Выглядят как пять разных технологий — на деле это одна шкала: насколько рано что-то попадает в контекст."
        >
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[130px]">Элемент</TableHead>
                  <TableHead>Когда попадает в контекст</TableHead>
                  <TableHead>Цена и риск</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WIRING.map((w) => (
                  <TableRow key={w.element}>
                    <TableCell className="align-top font-medium text-foreground">
                      {w.element}
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      {w.when}
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      {w.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            <b className="text-foreground">Прогрессивная подгрузка</b> — главный
            приём здесь и прямое следствие идеи 03. Модель не помнит ничего,
            значит окно контекста — дефицитный ресурс, который вы распределяете.
            Скил, подгружаемый по имени, стоит почти ничего. Тот же текст в
            правилах платится в каждом запросе всей сессии.
          </p>
        </Section>

        {/* Метод */}
        <Section
          id="method"
          eyebrow="Часть пятая"
          title="Как вайбкодить агента"
          note="У агентов есть свойство, которое ломает обычный вайбкодинг: сломанный агент выглядит точно как рабочий. Веб-апп с багом показывает белый экран, агент с багом — складный ответ с выдуманным кодом ТН ВЭД."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BEATS.map((beat) => (
              <div
                key={beat.n}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-primary">
                  {beat.n}
                </p>
                <h4 className="mt-2 text-[17px] font-semibold tracking-tight">
                  {beat.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {beat.desc}
                </p>
              </div>
            ))}
          </div>

          <CodeBlock
            code={SPEC_TEMPLATE}
            label="Заготовка заказа — держите под рукой, меняйте блок инструментов"
            className="mt-4"
          />

          <div className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid gap-2 bg-secondary/60 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground md:grid-cols-2 md:gap-6">
              <span>Что генератор делает по умолчанию</span>
              <span>Что заказать вместо этого</span>
            </div>
            {GENERATOR_DEFAULTS.map((g) => (
              <div
                key={g.badLead}
                className="grid gap-3 px-5 py-4 md:grid-cols-2 md:gap-6"
              >
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  <b className="text-destructive">{g.badLead}</b> {g.bad}
                </p>
                <p className="border-l-2 border-primary pl-4 text-[14.5px] leading-relaxed text-muted-foreground">
                  {g.fix}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* План */}
        <Section
          id="plan"
          eyebrow="Часть шестая"
          title="Двадцать дней"
          note="Три-четыре часа в день. Каждый день по четыре такта: что заказать, что проверить в полученном коде, что вы после этого поняли. Дни 1–12 собирают агентное ядро, 13–16 достраивают вокруг него систему, 17–20 доводят до защиты."
        >
          <ProgressProvider total={TOTAL_DAYS}>
            <ProgressBar />
            {PHASES.map((phase) => (
              <PhaseGroup key={phase.n} phase={phase} />
            ))}
          </ProgressProvider>
        </Section>

        {/* Домен */}
        <Section
          id="domain"
          eyebrow="Часть седьмая"
          title="Домен для практики"
          note="Одно направление на все двадцать дней. Смена домена на середине обнуляет накопленные мок-данные и понимание предмета. Единственная запланированная смена — на дне 20, как экзамен."
        >
          <div className="rounded-xl border border-border bg-card p-5 md:p-6">
            <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-border pb-5 font-mono text-xs text-muted-foreground">
              <Badge className="bg-brand-soft text-brand">Транспорт и логистика</Badge>
              <span>Средний коридор · ТМТМ</span>
              <span className="text-primary">——</span>
              <span>Китай → Хоргос → Актау → Каспий → Баку → ЕС</span>
            </div>
            <LayerStack
              rows={DOMAIN_FLOW.map((f) => ({
                n: "→",
                name: f.name,
                desc: f.desc,
                core: f.core,
              }))}
            />
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {DOMAIN_REASONS.map((r) => (
                <div key={r.title}>
                  <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.09em] text-primary">
                    {r.title}
                  </h4>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Ловушки */}
        <Section
          id="traps"
          eyebrow="Часть восьмая"
          title="Чего не делать"
          note="Ошибки, которые стоят курса или хакатона."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TRAPS.map((trap) => (
              <div
                key={trap.title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h4 className="text-[15.5px] font-semibold tracking-tight">
                  {trap.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {trap.body}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <footer className="mt-10 border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-4 px-5 py-8 font-mono text-[11px] text-muted-foreground">
          <span>
            Программа и выбор направления — предложение, а не официальные
            материалы организаторов
          </span>
          <span>HackAlem AI · 23.09.2026 · Астана</span>
        </div>
      </footer>
    </>
  );
}
