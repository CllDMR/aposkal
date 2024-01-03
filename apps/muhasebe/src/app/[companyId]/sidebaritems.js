import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    BanknotesIcon,
    BuildingOffice2Icon,
    CalculatorIcon,
    HomeIcon,
    SwatchIcon,
    UsersIcon,
    WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";


const navigation = (companyId) => {


    const root = `app/${companyId}`;
    const sidebarItems = [
        {
            name: "Giriş",
            href: `/${root}`,
            icon: HomeIcon,
        },
        {
            name: "Satış",
            href: "#",
            icon: ArrowTrendingUpIcon,
            children: [
                { name: "Teklif", href: "#", icon: null },
                { name: "Sipariş", href: "#", icon: null },
                // { name: "Proforma", href: "#", icon: null },
                { name: "İrsaliye", href: "#", icon: null },
                // { name: "Fatura", href: `/${root}/income/invoice`, icon: null },
                // { name: "Serbest Meslek Makbuzu", href: "#", icon: null },
                // { name: "Z Raporu", href: "#", icon: null },
                // { name: "Satış Ekle", href: `/${root}/income/new`, icon: null },
                // { name: "Fatura Ekle", href: "#", icon: null },
                // { name: "Z Raporu Ekle", href: "#", icon: null },
                // { name: "Serbest Mes. Mak. Ekle", href: "#", icon: null },
                { name: "Satışlar", href: `/${root}/income`, icon: null },

                { name: "Satış Raporu", href: "#", icon: null },
            ],
        },
        {
            name: "Alış",
            href: "#",
            icon: ArrowTrendingDownIcon,
            children: [
                { name: "Gelen Belgeler", href: "#", icon: null },
                // { name: "Sipariş", href: "#", icon: null },
                { name: "İrsaliye", href: "#", icon: null },
                { name: "Fatura", href: "#", icon: null },
                { name: "Fiş", href: "#", icon: null },
                { name: "Giderler", href: "#", icon: null },
                { name: "Gider Raporu", href: "#", icon: null },
            ],
        },
        {
            name: "Cüzdan",
            href: "#",
            icon: BanknotesIcon,
            children: [
                { name: "Nakit", href: "#", icon: null },
                { name: "Banka", href: "#", icon: null },
                { name: "Pos", href: "#", icon: null },
                { name: "Kredi/Banka Kartı", href: "#", icon: null },
                { name: "Çek", href: "#", icon: null },
                { name: "Senet", href: "#", icon: null },
            ],
        },
        {
            name: "Hesaplar",
            href: "#",
            icon: BuildingOffice2Icon,
            children: [
                { name: "Firmalar", href: "#", icon: null },
                { name: "Ortaklar", href: "#", icon: null },
                { name: "Krediler", href: "#", icon: null },
            ],
        },
        {
            name: "Ürün & Hizmetler",
            href: "#",
            icon: SwatchIcon,
            children: [
                { name: "Ürünler", href: "#", icon: null },
                { name: "Hizmetler", href: "#", icon: null },
                { name: "Giderler", href: "#", icon: null },
                { name: "Demirbaşlar", href: "#", icon: null },
                { name: "Depolar", href: "#", icon: null },
                { name: "Stok Sayım", href: "#", icon: null },
                { name: "Stok Virman (Üretim)", href: "#", icon: null },
                { name: "Stok Raporu", href: "#", icon: null },
            ],
        },
        {
            name: "Personel",
            href: "#",
            icon: UsersIcon,
            children: [
                { name: "İş Yerleri", href: "#", icon: null },
                { name: "Personeller", href: "#", icon: null },
                { name: "Bordro", href: "#", icon: null },
            ],
        },
        {
            name: "Muhasebe",
            href: "#",
            icon: CalculatorIcon,
            children: [
                // muhasebeleştirilmemiş bekleyen faturalar
                { name: "Muhasebeleştirme", href: "#", icon: null },
                { name: "Fişler", href: "#", icon: null },
                { name: "Mizan", href: "#", icon: null },
                { name: "Beyannameler", href: "#", icon: null },
                // { name: "e Defter", href: "#", icon: null },
                { name: "Defter (eDefter/D.B.S)", href: "#", icon: null },
                // { name: "Defter Beyan", href: "#", icon: null },
                { name: "Veri Aktarım", href: "#", icon: null },
                { name: "K.D.V. Raporu", href: "#", icon: null },
                { name: "Varlık Raporu", href: "#", icon: null },
                { name: "Karlılık Raporu", href: "#", icon: null },
            ],
        },
        {
            name: "Ayarlar",
            href: "#",
            icon: WrenchScrewdriverIcon,
            location: "bottom",
            children: [
                { name: "Firma Bilgileri", href: "#", icon: null },
                // /app/100011/settings/users
                { name: "Kullanıcılar", href: `/${root}/settings/users`, icon: null },
                { name: "Entegrasyon", href: "#", icon: null },
                { name: "Hesap", href: "#", icon: null },
            ],
        },
    ];



    return sidebarItems



}

export default navigation;


