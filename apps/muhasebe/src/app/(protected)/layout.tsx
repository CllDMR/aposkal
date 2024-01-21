import { auth } from "@acme/auth";
import { env } from "@acme/env";
import { Drawer, DrawerMobileWrapper, Navbar } from "@acme/ui/organisms";
import type { DrawerNavigationPath } from "@acme/ui/organisms/drawer";
import type { NavbarNavigationPath } from "@acme/ui/organisms/navbar";
import type { AppsDropdownSolution } from "@acme/ui/organisms/navbar/apps-dropdown";
import { getBaseAuthUrl } from "@acme/util";

import packageJson from "../../../package.json";

const baseAuthUrl = getBaseAuthUrl();

const toAuthURL = (path: string) => `${baseAuthUrl}${path}`;

const navbarNavigationPaths: NavbarNavigationPath[] = [
  { name: "Profil", href: toAuthURL("/profile") },
  { name: "Firma Değiştir", href: toAuthURL("/auth/select-tenant") },
  { name: "Çıkış Yap", href: toAuthURL("/auth/logout") },
];

const drawerNavigationPaths: DrawerNavigationPath[] = [
  {
    name: "Gösterge Paneli",
    href: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    name: "Satış",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        />
      </svg>
    ),
    children: [
      { name: "Teklif", href: "#" },
      { name: "Sipariş", href: "#" },
      { name: "İrsaliye", href: "#" },
      { name: "Satışlar", href: "/income" },
      { name: "Satış Raporu", href: "#" },
    ],
  },
  {
    name: "Alış",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
        />
      </svg>
    ),
    children: [
      { name: "Gelen Belgeler", href: "#" },
      { name: "İrsaliye", href: "#" },
      { name: "Fatura", href: "#" },
      { name: "Fiş", href: "#" },
      { name: "Giderler", href: "#" },
      { name: "Gider Raporu", href: "#" },
    ],
  },
  {
    name: "Cüzdan",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>
    ),
    children: [
      { name: "Nakit", href: "#" },
      { name: "Banka", href: "#" },
      { name: "Pos", href: "#" },
      { name: "Kredi/Banka Kartı", href: "#" },
      { name: "Çek", href: "#" },
      { name: "Senet", href: "#" },
    ],
  },
  {
    name: "Hesaplar",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
        />
      </svg>
    ),
    children: [
      { name: "Firmalar", href: "#" },
      { name: "Ortaklar", href: "#" },
      { name: "Krediler", href: "#" },
    ],
  },
  {
    name: "Ürün & Hizmetler",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
        />
      </svg>
    ),
    children: [
      { name: "Ürünler", href: "#" },
      { name: "Hizmetler", href: "#" },
      { name: "Giderler", href: "#" },
      { name: "Demirbaşlar", href: "#" },
      { name: "Depolar", href: "#" },
      { name: "Stok Sayım", href: "#" },
      { name: "Stok Virman (Üretim)", href: "#" },
      { name: "Stok Raporu", href: "#" },
    ],
  },
  {
    name: "Personel",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
    children: [
      { name: "İş Yerleri", href: "#" },
      { name: "Personeller", href: "#" },
      { name: "Bordro", href: "#" },
    ],
  },
  {
    name: "Muhasebe",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
        />
      </svg>
    ),
    children: [
      { name: "Muhasebeleştirme", href: "#" },
      { name: "Fişler", href: "#" },
      { name: "Mizan", href: "#" },
      { name: "Beyannameler", href: "#" },
      { name: "Defter (eDefter/D.B.S)", href: "#" },
      { name: "Veri Aktarım", href: "#" },
      { name: "K.D.V. Raporu", href: "#" },
      { name: "Varlık Raporu", href: "#" },
      { name: "Karlılık Raporu", href: "#" },
    ],
  },
  {
    name: "Ayarlar",
    href: "#",
    location: "bottom",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
        />
      </svg>
    ),
    children: [
      { name: "Firma Bilgileri", href: "#" },
      { name: "Kullanıcılar", href: `/settings/users` },
      { name: "Entegrasyon", href: "#" },
      { name: "Hesap", href: "#" },
    ],
  },
];

const solutions: AppsDropdownSolution[] = [
  {
    name: "Membership Manager",
    description: "Control your accounts, users, organizations and billing",
    subdomain: env.ACCOUNT_SUBDOMAIN,
    port: env.ACCOUNT_PORT,
    pathname: "/",
    iconName: "one",
  },
  {
    name: "Customer Manager",
    description: "Manage and track relationships with your customers",
    subdomain: env.CUSTOMER_SUBDOMAIN,
    port: env.CUSTOMER_PORT,
    pathname: "/dashboard",
    iconName: "three",
  },
  {
    name: "Inventory Manager",
    description: "Keep your products organized",
    subdomain: env.INVENTORY_SUBDOMAIN,
    port: env.INVENTORY_PORT,
    pathname: "/dashboard",
    iconName: "two",
  },
  {
    name: "Logistic Manager",
    description: "Track and analyze your logictics",
    subdomain: env.LOGISTIC_SUBDOMAIN,
    port: env.LOGISTIC_PORT,
    pathname: "/dashboard",
    iconName: "three",
  },
  {
    name: "Order Manager",
    description: "Interact with your orders of customers and suppliers",
    subdomain: env.ORDER_SUBDOMAIN,
    port: env.ORDER_PORT,
    pathname: "/dashboard",
    iconName: "three",
  },
  {
    name: "Accounting",
    description: "Calculate your financial properties",
    subdomain: env.MUHASEBE_SUBDOMAIN,
    port: env.MUHASEBE_PORT,
    pathname: "/dashboard",
    iconName: "three",
  },
];

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) throw new Error("No session");

  return (
    <>
      <Navbar
        session={session}
        navigationPaths={navbarNavigationPaths}
        domain={env.DOMAIN}
        projectName="Accounting"
        solutions={solutions}
      />
      <div>
        <DrawerMobileWrapper navigationPaths={drawerNavigationPaths} />

        <Drawer
          navigationPaths={drawerNavigationPaths}
          packageJsonVersion={packageJson.version}
        />

        {props.children}
      </div>
    </>
  );
}
