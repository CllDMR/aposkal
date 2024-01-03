import clsx from "clsx";

const stats = [
  {
    name: "Gelirler",
    value: "405.091",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Giderler",
    value: "-12.787",
    change: "+54.02%",
    changeType: "negative",
  },
  {
    name: "Maliyetler",
    value: "-30.156",
    change: "+10.18%",
    changeType: "negative",
  },
  {
    name: "Kar",
    value: "245.988",
    change: "-1.39%",
    tax: "61.497 TL",
    changeType: "positive",
  },
];

const secondaryNavigation = [
  { name: "Bu Yıl", href: "#", current: true },
  { name: "Son Bir ay", href: "#", current: false },
  { name: "Tüm Zamanlar", href: "#", current: false },
];

export function Profit() {
  return (
    <div className="relative isolate overflow-hidden rounded-lg border shadow-sm">
      {/* Secondary navigation */}
      <header className="pb-4 pt-6 sm:pb-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            Gelir ve Giderler
          </h1>
          <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={item.current ? "text-teal-600" : "text-gray-700"}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
          {stats.map((stat, statIdx) => (
            <div
              key={statIdx}
              className={clsx(
                statIdx % 2 === 1
                  ? "sm:border-l"
                  : statIdx === 2
                  ? "lg:border-l"
                  : "",
                "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8",
              )}
            >
              <dt className="text-sm font-medium leading-6 text-gray-500">
                {stat.name}
              </dt>
              <dd
                className={clsx(
                  stat.changeType === "negative"
                    ? "text-rose-600"
                    : "text-gray-700",
                  "text-xs font-medium",
                )}
              >
                {stat.change}
              </dd>
              <dd className="w-full flex-none text-2xl font-medium leading-10 tracking-tight text-gray-900">
                {stat.value} ₺
              </dd>
              {stat.tax && (
                <dd className="-my-6 w-full flex-none text-xs font-medium leading-10 tracking-tight text-gray-400">
                  {stat.tax} Tahmini Vergi
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>

      <div
        className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
        aria-hidden="true"
      >
        <div
          className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
          style={{
            clipPath:
              "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
          }}
        />
      </div>
    </div>
  );
}
