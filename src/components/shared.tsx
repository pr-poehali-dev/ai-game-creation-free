export const neonColors: Record<string, string> = {
  cyan: "#00ffff",
  magenta: "#ff00ff",
  lime: "#00ff88",
  orange: "#ff6600",
  blue: "#0088ff",
};

export const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "editor", label: "Редактор" },
  { id: "gallery", label: "Галерея" },
  { id: "docs", label: "Документация" },
  { id: "community", label: "Сообщество" },
  { id: "faq", label: "FAQ" },
];

export const GALLERY_GAMES = [
  { title: "Nebula Runner", genre: "Раннер", plays: "12.4K", color: "cyan", icon: "Rocket" as const },
  { title: "Void Tactics", genre: "Стратегия", plays: "8.7K", color: "magenta", icon: "Swords" as const },
  { title: "Pixel Dungeon X", genre: "RPG", plays: "21.2K", color: "lime", icon: "Skull" as const },
  { title: "Hyper Drive", genre: "Гонки", plays: "5.9K", color: "orange", icon: "Zap" as const },
  { title: "Echo Protocol", genre: "Головоломка", plays: "9.1K", color: "blue", icon: "Brain" as const },
  { title: "Cyber Farm", genre: "Симулятор", plays: "3.3K", color: "cyan", icon: "Sprout" as const },
];

export const FEATURES = [
  {
    icon: "Sparkles",
    title: "ИИ-генерация кода",
    desc: "Опишите механику словами — ИИ напишет код на JavaScript автоматически",
    color: "cyan",
  },
  {
    icon: "Image",
    title: "Генерация активов",
    desc: "Персонажи, фоны, спрайты и звуки — всё создаётся нейросетью по описанию",
    color: "magenta",
  },
  {
    icon: "Cpu",
    title: "Авто-механики",
    desc: "Физика, коллизии, AI-враги, инвентарь — подключаются одним кликом",
    color: "lime",
  },
];

export const DOCS = [
  { title: "Быстрый старт", desc: "Создайте первую игру за 5 минут", icon: "Play", color: "cyan" },
  { title: "ИИ-промпты", desc: "Как правильно описывать игровые механики", icon: "MessageSquare", color: "magenta" },
  { title: "Типы игр", desc: "Платформеры, RPG, стратегии, аркады", icon: "Gamepad2", color: "lime" },
  { title: "Публикация", desc: "Экспорт и публикация игры в интернет", icon: "Upload", color: "orange" },
  { title: "API активов", desc: "Интеграция с внешними библиотеками ресурсов", icon: "Link", color: "blue" },
  { title: "Монетизация", desc: "Как добавить донат и рекламу в игру", icon: "DollarSign", color: "cyan" },
];

export const COMMUNITY_POSTS = [
  { user: "Starforge_Dev", avatar: "S", text: "Сделал файтинг за ночь! ИИ сгенерировал всех персонажей", likes: 142, color: "cyan" },
  { user: "PixelWitch", avatar: "P", text: "Наконец-то платформа без регистрации. Моя первая игра готова!", likes: 89, color: "magenta" },
  { user: "N3X7_Games", avatar: "N", text: "Физика в раннере работает идеально — ИИ сам настроил гравитацию", likes: 211, color: "lime" },
];

export const FAQ_ITEMS = [
  {
    q: "Это действительно бесплатно?",
    a: "Да, базовый функционал полностью бесплатен без ограничений по времени. Платные планы только для расширенных функций.",
  },
  {
    q: "Нужно ли знать программирование?",
    a: "Нет. ИИ пишет весь код автоматически. Вы просто описываете, что хотите — на русском языке.",
  },
  {
    q: "Какие типы игр можно создать?",
    a: "Платформеры, раннеры, RPG, стратегии, головоломки, файтинги, симуляторы, аркады и многое другое.",
  },
  {
    q: "Можно ли опубликовать игру?",
    a: "Да, игры публикуются одним кликом. Получаете ссылку для шеринга и возможность встроить игру на свой сайт.",
  },
  {
    q: "Какой движок используется?",
    a: "Собственный WebGL-движок, оптимизированный для браузерных игр. Работает на любом устройстве без установки.",
  },
];

export function NeonLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 border"
      style={{
        color: neonColors[color],
        borderColor: `${neonColors[color]}44`,
        backgroundColor: `${neonColors[color]}10`,
        textShadow: `0 0 8px ${neonColors[color]}`,
      }}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ children, accent = "cyan" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8" style={{ background: neonColors[accent], boxShadow: `0 0 6px ${neonColors[accent]}` }} />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: neonColors[accent] }}>
          NEXGEN
        </span>
        <div className="h-px flex-1" style={{ background: `${neonColors[accent]}30` }} />
      </div>
      <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white leading-tight">{children}</h2>
    </div>
  );
}
