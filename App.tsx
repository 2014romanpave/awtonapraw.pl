import React, { useState, useEffect } from 'react';

// Импорты всех картинок
const HeroImage = new URL('./src/assets/images/hero-main.jpg', import.meta.url).href;
const DiagnosticsImage = new URL('./src/assets/images/Toyota-Mark.jpg', import.meta.url).href;
const EngineImage = new URL('./src/assets/images/engine.jpg', import.meta.url).href;
const OilImage = new URL('./src/assets/images/oil.jpg', import.meta.url).href;
const BrakesImage = new URL('./src/assets/images/brakes.jpg', import.meta.url).href;
const GboImage = new URL('./src/assets/images/gbo.jpg', import.meta.url).href;
const ElectricImage = new URL('./src/assets/images/electric.jpg', import.meta.url).href;
// --- Types & Translations ---
type Lang = 'UA' | 'PL';
type Theme = 'light' | 'dark';
type Page = 'home' | 'diag' | 'engine' | 'oil' | 'brakes' | 'gbo' | 'electric';

// Конфигурация
const MESSENGER_LINK = "https://t.me/morozovych_ihor"; 
const TARGET_ADDRESS = "Białośliwska 26, 60-418 Poznań";
const DOMAIN = "awtonapraw.pl";
// Ссылка для Google Maps Route (директория от текущего места)
const GOOGLE_MAPS_ROUTE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(TARGET_ADDRESS)}`;

interface TranslationSet {
  nav: { services: string; contact: string; home: string; about: string };
  hero: { tag: string; title: string; desc: string; call: string; request: string };
  stats: { items: { label: string; value: string }[] };
  services: { title: string; desc: string; more: string };
  features: { title: string; items: { title: string; desc: string; icon: string }[] };
  form: { title: string; desc: string; name: string; phone: string; service: string; submit: string; success: string; options: string[] };
  footer: { rights: string; location: string };
  advantages: string[];
  cta_title: string;
}

const TRANSLATIONS: Record<Lang, TranslationSet> = {
  UA: {
    nav: { services: 'Послуги', contact: 'Контакти', home: 'Головна', about: 'Про майстерню' },
    hero: {
      tag: 'Професійний автосервіс у Познані',
      title: 'Автосервіс - ремонт автомобілів за доступними цінами',
      desc: 'Якісна діагностика та ремонт автомобілів. Гарантія. Професійно. Доступні ціни.',
      call: 'Зателефонувати',
      request: 'Залишити запит',
    },
    stats: {
      items: [
        { label: 'Авто обслужено', value: '4800+' },
        { label: 'Років практики', value: '12+' },
        { label: 'Задоволених клієнтів', value: '100%' },
      ]
    },
    features: {
      title: 'Чому обирають нас',
      items: [
        { title: 'Глибока діагностика', desc: 'Використовуємо ліцензійне обладнання. Ми знаємо, как знайти причину, а не просто видалити помилку.', icon: 'precision_manufacturing' },
        { title: 'Технологічний сервіс', desc: 'Дотримуємось заводських регламентів. Знаємо технологію ремонту кожного вузла.', icon: 'verified' },
        { title: 'Якість та ціна', desc: 'Ви отримуєте сервіс дилерського рівня за розумну ціну. Жодних переплат за бренд.', icon: 'account_balance_wallet' },
      ]
    },
    services: {
      title: 'Наші експертні рішення.',
      desc: 'Комплексне обслуговування: від точної комп’ютерної діагностики до складного ремонту.',
      more: 'Детальніше',
    },
    form: {
      title: 'Ми вам зателефонуємо.',
      desc: 'Залиште ваші контакти, і майстер зв’яжеться з вами для уточнення деталей та запису на візит.',
      name: "Ваше ім'я",
      phone: 'Номер телефону',
      service: 'Яка послуга цікавить?',
      submit: 'Надіслати запит',
      success: 'Дякуємо! Майстер перетелефонує вам найближчим часом.',
      options: ['Діагностика', 'Ремонт двигуна', 'Технічне обслуговування', 'Гальма', 'Сервіс ГБО', 'Автоелектрика'],
    },
    footer: { rights: 'Всі права застережено.', location: 'Białośliwska 26, 60-418 Poznań' },
    advantages: ['Ліцензійне ПЗ', 'Заводський регламент', 'Гарантія на роботи', 'Професійний інструмент'],
    cta_title: 'Потрібна консультація?',
  },
  PL: {
    nav: { services: 'Usługi', contact: 'Kontakt', home: 'Start', about: 'O warsztacie' },
    hero: {
      tag: 'Profesjonalny serwis w Poznaniu',
      title: 'Serwis samochodowy - naprawa aut w przystępnych cenach',
      desc: 'Precyzyjna diagnostyka i naprawa samochodów. Gwarancja. Profesjonalizm. Przystępne ceny w Poznaniu.',
      call: 'Zadzwoń',
      request: 'Zostaw zgłoszenie',
    },
    stats: {
      items: [
        { label: 'Obsłużonych aut', value: '4800+' },
        { label: 'Lat praktyki', value: '12+' },
        { label: 'Zadowolenie', value: '100%' },
      ]
    },
    features: {
      title: 'Dlaczego my',
      items: [
        { title: 'Głęboka diagnostyka', desc: 'Używamy licencjonowanego sprzętu. Wiemy, jak znaleźć przyczynę, a nie tylko skasować błąd.', icon: 'precision_manufacturing' },
        { title: 'Serwis technologiczny', desc: 'Przestrzegamy norm fabrycznych. Znamy technologię naprawy każdego podzespołu.', icon: 'verified' },
        { title: 'Jakość i cena', desc: 'Otrzymujesz serwis na poziomie dilerskim w rozsądnej cenie. Bez przepłacania za markę.', icon: 'account_balance_wallet' },
      ]
    },
    services: {
      title: 'Rozwiązania eksperckie.',
      desc: 'Kompleksowa obsługa: od precyzyjnej diagnostyki po skomplikowane naprawy.',
      more: 'Szczegóły',
    },
    form: {
      title: 'Oddzwonimy do Ciebie.',
      desc: 'Zostaw swoje dane, a nasz specjalista skontaktuje się z Tobą w celu ustalenia szczegółów wizyty.',
      name: 'Imię',
      phone: 'Numer telefonu',
      service: 'Rodzaj usługi',
      submit: 'Wyślij zgłoszenie',
      success: 'Dziękujemy! Oddzwonimy do Ciebie tak szybko, jak to możliwe.',
      options: ['Diagnostyka', 'Naprawa silnika', 'Serwis olejowy', 'Układ hamulcowy', 'Serwis LPG', 'Elektryka'],
    },
    footer: { rights: 'Wszelkie prawa zastrzeżone.', location: 'Białośliwska 26, 60-418 Poznań' },
    advantages: ['Licencjonowane oprogramowanie', 'Standardy fabryczne', 'Gwarancja na usługi', 'Profesjonalne narzędzia'],
    cta_title: 'Potrzebujesz konsultacji?',
  },
};

const SERVICES_DATA: ServiceDetails[] = [
  { 
    id: 'diag', 
    icon: 'biotech', 
    image: DiagnosticsImage,
    ua: 'Комп\'ютерна діагностика', 
    pl: 'Diagnostyka komputerowa', 
    price: '120 zł' 
  },
  { 
    id: 'engine', 
    icon: 'settings_input_component', 
    image: EngineImage,
    ua: 'Ремонт двигуна та ГРМ', 
    pl: 'Naprawa silnika i rozrządu', 
    price: 'від 600 zł' 
  },
  { 
    id: 'oil', 
    icon: 'water_drop', 
    image: OilImage,
    ua: 'Регламентне ТО', 
    pl: 'Serwis olejowy / Przegląd', 
    price: 'від 100 zł' 
  },
  { 
    id: 'brakes', 
    icon: 'stop_circle', 
    image: BrakesImage,
    ua: 'Гальмівна система', 
    pl: 'Układ hamulcowy', 
    price: 'від 150 zł' 
  },
  { 
    id: 'gbo', 
    icon: 'propane_tank', 
    image: GboImage,
    ua: 'Сервіс та налаштування ГБО', 
    pl: 'Serwis i regulacja LPG', 
    price: 'від 120 zł' 
  },
  { 
    id: 'electric', 
    icon: 'flash_on', 
    image: ElectricImage,
    ua: 'Автоелектрика', 
    pl: 'Elektryka samochodowa', 
    price: 'від 150 zł' 
  },
];

interface ServiceDetails {
  id: Page;
  icon: string;
  image: string;
  ua: string;
  pl: string;
  price: string;
}

const BookingPopup: React.FC<{ isOpen: boolean; onClose: () => void; lang: Lang; initialService?: string }> = ({ isOpen, onClose, lang, initialService }) => {
  const t = TRANSLATIONS[lang].form;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialService || t.options[0]
  });

  useEffect(() => {
    if (initialService) setFormData(prev => ({ ...prev, service: initialService }));
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Запит на зворотній дзвінок!\nІм'я: ${formData.name}\nТел: ${formData.phone}\nПослуга: ${formData.service}`;
    const encodedText = encodeURIComponent(text);
    const finalLink = MESSENGER_LINK.includes('?') 
      ? `${MESSENGER_LINK}&text=${encodedText}` 
      : `${MESSENGER_LINK}?text=${encodedText}`;
    
    window.open(finalLink, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-apple-dark w-full max-w-lg rounded-apple-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
        <h3 className="text-3xl font-bold mb-2 dark:text-white tracking-tight">{t.title}</h3>
        <p className="text-gray-500 mb-8 font-medium">{t.desc}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">{t.name}</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full bg-gray-50 dark:bg-apple-dark border border-gray-100 dark:border-white/10 rounded-xl p-4 dark:text-white outline-none focus:ring-2 focus:ring-primary" 
              placeholder={t.name}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">{t.phone}</label>
            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 dark:bg-apple-dark border border-gray-100 dark:border-white/10 rounded-xl p-4 dark:text-white outline-none focus:ring-2 focus:ring-primary" placeholder="+48 ..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">{t.service}</label>
            <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-gray-50 dark:bg-apple-dark border border-gray-100 dark:border-white/10 rounded-xl p-4 dark:text-white outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
              {t.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all mt-4 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">send</span>
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ lang: Lang; setLang: (l: Lang) => void; setPage: (p: Page) => void; theme: Theme; toggleTheme: () => void; currentPage: Page }> = ({ lang, setLang, setPage, theme, toggleTheme, currentPage }) => {
  const t = TRANSLATIONS[lang].nav;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      setPage('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass border-b border-gray-200/40 dark:border-white/5 h-[64px] flex items-center">
      <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between">
        <button onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-[10deg] transition-transform duration-300">
            <span className="material-symbols-outlined text-[24px] font-bold">handyman</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[17px] font-extrabold tracking-tight leading-none dark:text-white">awtonapraw.pl</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Workshop Poznań</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-10 text-[13px] font-semibold text-apple-dark/70 dark:text-apple-gray/70 uppercase tracking-widest">
          <button onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-primary transition-colors">{t.home}</button>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-primary transition-colors">{t.services}</a>
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-primary transition-colors">{t.about}</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-primary transition-colors">{t.contact}</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100/80 dark:bg-apple-dark/50 p-1 rounded-xl border border-gray-200/50 dark:border-white/10">
            <button onClick={() => setLang('UA')} className={`px-4 py-1.5 rounded-lg text-[11px] font-extrabold transition-all duration-300 ${lang === 'UA' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>UA</button>
            <button onClick={() => setLang('PL')} className={`px-4 py-1.5 rounded-lg text-[11px] font-extrabold transition-all duration-300 ${lang === 'PL' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>PL</button>
          </div>
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[22px] opacity-60">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const StatItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1 items-center md:items-start transition-all">
    <span className="text-4xl md:text-5xl font-extrabold tracking-tighter dark:text-white italic">{value}</span>
    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">{label}</span>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('PL');
  const [theme, setTheme] = useState<Theme>('light');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const t = TRANSLATIONS[lang];

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const openRoute = () => {
    window.open(GOOGLE_MAPS_ROUTE, '_blank');
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar lang={lang} setLang={setLang} setPage={setCurrentPage} theme={theme} toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} currentPage={currentPage} />
      
      <BookingPopup isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} lang={lang} initialService={selectedService} />

      <main className="transition-opacity duration-700">
        {currentPage === 'home' ? (
          <>
            {/* Hero Section */}
            <section className="pt-48 pb-24 px-6 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-in slide-in-from-left-20 duration-1000">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full text-[13px] font-bold mb-8 border border-primary/20">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
                  {t.hero.tag}
                </div>
                <h1 className="text-[42px] md:text-[54px] font-extrabold tracking-tight mb-8 leading-[1.1] dark:text-white text-balance">
                  {t.hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed max-w-xl font-medium">
                  {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mb-16">
                  <button onClick={() => openBooking()} 
                    className="bg-primary text-white px-12 py-5 rounded-2xl text-[18px] font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                    {t.hero.request}
                  </button>
                  <a href="tel:+48735088101" className="bg-gray-50 dark:bg-apple-dark text-apple-dark dark:text-white px-12 py-5 rounded-2xl text-[18px] font-bold border border-gray-200 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all text-center">
                    {t.hero.call}
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {t.stats.items.map((s, i) => <StatItem key={i} {...s} />)}
                </div>
              </div>
              
              <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
                <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full opacity-60"></div>
                <div className="relative rounded-apple-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[10px] border-white dark:border-apple-dark aspect-square lg:aspect-[4/5] transform hover:rotate-1 transition-transform duration-700">
                  <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1400" className="w-full h-full object-cover" alt="Service Excellence" />
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 bg-apple-gray dark:bg-apple-dark/50 transition-colors">
              <div className="max-w-[1200px] mx-auto">
                <div className="mb-20 text-center">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 dark:text-white leading-none">{t.features.title}</h2>
                  <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto italic font-medium">{lang === 'UA' ? 'Наші компетенції — ваша безпека.' : 'Nasze kompetencje to Twoje bezpieczeństwo.'}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {t.features.items.map((f, i) => (
                    <div key={i} className="bg-white dark:bg-apple-dark p-10 rounded-apple-xl border border-gray-200/50 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <span className="material-symbols-outlined text-4xl">{f.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 dark:text-white tracking-tight">{f.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[16px]">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-32 px-6 max-w-[1200px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 dark:text-white leading-none">{t.services.title}</h2>
                  <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">{t.services.desc}</p>
                </div>
                <div className="hidden lg:block h-px flex-grow bg-gray-100 dark:bg-white/10 mx-12 mb-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES_DATA.map((service) => {
                  const title = lang === 'UA' ? service.ua : service.pl;
                  return (
                    <div key={service.id} 
                      className="group relative h-[480px] rounded-apple-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700"
                      onClick={() => { setCurrentPage(service.id); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
                      <img src={service.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90"></div>
                      <div className="relative h-full flex flex-col p-10 text-white">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                          <span className="material-symbols-outlined text-white/90 text-2xl">{service.icon}</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-auto mb-3 tracking-tight leading-tight">{title}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-3 transition-all duration-300">
                            {t.services.more} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </p>
                          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/10 italic">
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Contact Info */}
            <section id="contact" className="py-32 px-6 bg-white dark:bg-black">
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="animate-in slide-in-from-left-10 duration-1000">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 dark:text-white leading-none">{t.nav.contact}</h2>
                  <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-md">{t.form.desc}</p>
                  
                  <div className="space-y-8">
                    {/* Кликабельный адрес для построения маршрута */}
                    <button onClick={openRoute} className="flex items-center gap-6 group w-full text-left">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <span className="material-symbols-outlined text-2xl">location_on</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === 'UA' ? 'Адреса (Прокласти маршрут)' : 'Adres (Wyznacz trasę)'}</span>
                        <span className="text-lg font-bold dark:text-white group-hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">Białośliwska 26, 60-418 Poznań</span>
                      </div>
                    </button>
                    
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <span className="material-symbols-outlined text-2xl">call</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === 'UA' ? 'Телефон' : 'Telefon'}</span>
                        <a href="tel:+48735088101" className="text-lg font-bold dark:text-white hover:text-primary transition-colors font-display">+48 735 088 101</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-30 rounded-full"></div>
                  <div className="relative glass p-12 rounded-apple-2xl border border-gray-200/50 dark:border-white/10 shadow-2xl text-center">
                     <span className="material-symbols-outlined text-primary text-6xl mb-6">phone_callback</span>
                     <h3 className="text-3xl font-bold dark:text-white mb-6 tracking-tight">{t.cta_title}</h3>
                     <button onClick={() => openBooking()} className="w-full bg-primary text-white py-6 rounded-2xl font-bold text-xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all">
                       {t.hero.request}
                     </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Service Detail View */
          <div className="pt-48 pb-32 px-6 max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
             <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="inline-flex items-center gap-2 text-primary font-extrabold mb-12 hover:gap-4 transition-all duration-300 group">
               <span className="material-symbols-outlined text-[20px] group-hover:translate-x-[-4px] transition-transform">arrow_back</span> 
               {lang === 'UA' ? 'До головної сторінки' : 'Powrót do strony głównej'}
             </button>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
               <div className="rounded-apple-2xl overflow-hidden shadow-2xl relative group">
                 <img src={SERVICES_DATA.find(s => s.id === currentPage)?.image} className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute top-6 left-6 px-4 py-2 bg-black/30 backdrop-blur-xl rounded-full text-white font-bold text-sm italic border border-white/20">
                   {SERVICES_DATA.find(s => s.id === currentPage)?.price}
                 </div>
               </div>
               <div>
                 <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter dark:text-white leading-[1.1]">
                   {lang === 'UA' ? SERVICES_DATA.find(s => s.id === currentPage)?.ua : SERVICES_DATA.find(s => s.id === currentPage)?.pl}
                 </h1>
                 <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 font-medium italic text-balance">
                   {lang === 'UA' 
                     ? 'Ми знаємо, як ремонтувати авто за заводськими стандартами. Ми цінуємо ваш час, тому пропонуємо залишити заявку: майстер проконсультує вас по телефону, зорієнтує по ціні та запише на зручне вікно.' 
                     : 'Wiemy jak naprawiać auta zgodnie ze standardami fabrycznymi. Cenimy Twój czas, dlatego proponujemy zostawić zgłoszenie: specjalista skonsultuje Cię telefonicznie, poda wstępną wycenę i umówi dogodny termin.'}
                 </p>
                 
                 <div className="space-y-4 mb-12">
                   {t.advantages.map((item, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-apple-dark rounded-xl border border-gray-100 dark:border-white/5">
                       <span className="material-symbols-outlined text-primary text-[20px] font-bold">verified</span>
                       <span className="font-bold dark:text-gray-200">{item}</span>
                     </div>
                   ))}
                 </div>

                 <button onClick={() => openBooking(lang === 'UA' ? SERVICES_DATA.find(s => s.id === currentPage)?.ua : SERVICES_DATA.find(s => s.id === currentPage)?.pl)}
                   className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all">
                   {t.hero.request}
                 </button>
               </div>
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-gray-100 dark:border-white/5 bg-apple-gray dark:bg-black transition-colors">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-center md:text-left mb-16">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6 font-extrabold text-apple-dark dark:text-white text-2xl">
                <span className="material-symbols-outlined text-primary text-3xl">handyman</span>
                <span>awtonapraw.pl</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0 font-medium italic">
                {lang === 'UA' 
                  ? 'Преміальна якість сервісу у самому серці Познані. Працюємо на результат та вашу безпеку.' 
                  : 'Serwis jakości premium w samym sercu Poznania. Pracujemy na efekt i Twoje bezpieczeństwo.'}
              </p>
            </div>
            <div className="flex flex-col md:items-end justify-center">
               <button onClick={openRoute} className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-2 hover:text-primary transition-colors">{t.footer.location} (Google Maps)</button>
               <div className="text-xl font-bold text-apple-dark dark:text-white mb-8">Białośliwska 26, 60-418 Poznań</div>
               <div className="text-[11px] font-bold text-gray-400/60 uppercase tracking-widest">© 2025 awtonapraw.pl. {t.footer.rights}</div>
            </div>
          </div>
          
          {/* Developer Attribution */}
          <div className="pt-12 border-t border-gray-200/50 dark:border-white/5 text-center">
            <p className="text-[13px] font-medium text-gray-400 dark:text-gray-500">
              Website developed by:{' '}
              <a 
                href="https://highfalutin-receipt-d7a.notion.site/UX-UI-Designer-5ba1936438ad4bc7beaaf9e8dff8c7e5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-bold transition-all"
              >
                Pavel Roman
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;