export interface UFCEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  type: "ppv" | "fight-night" | "apex";
}

export interface Fighter {
  id: number;
  name: string;
  country: string;
  flag: string;
  record: string;
  avatar: string;
  weight: string;
}

export interface Fight {
  id: number;
  eventId: number;
  fighterA: number;
  fighterB: number;
  weight: string;
  isMainEvent: boolean;
  round: number;
  time?: string;
}

export const mockEvents: UFCEvent[] = [
  { id: 1, name: "UFC 310", date: "Hoje", location: "Las Vegas, EUA", type: "ppv" },
  { id: 2, name: "UFC Fight Night", date: "Sábado", location: "São Paulo, Brasil", type: "fight-night" },
  { id: 3, name: "UFC 311", date: "Próx. Semana", location: "Los Angeles, EUA", type: "ppv" },
  { id: 4, name: "UFC Apex", date: "Quarta", location: "Las Vegas, EUA", type: "apex" },
];

export const mockFighters: Fighter[] = [
  { id: 1, name: "Alex Pereira", country: "Brasil", flag: "🇧🇷", record: "11-2-0", avatar: "🥊", weight: "Meio-Pesado" },
  { id: 2, name: "Jamahal Hill", country: "EUA", flag: "🇺🇸", record: "12-2-0", avatar: "💪", weight: "Meio-Pesado" },
  { id: 3, name: "Islam Makhachev", country: "Rússia", flag: "🇷🇺", record: "25-1-0", avatar: "🤼", weight: "Leve" },
  { id: 4, name: "Charles Oliveira", country: "Brasil", flag: "🇧🇷", record: "34-10-0", avatar: "⚡", weight: "Leve" },
  { id: 5, name: "Jon Jones", country: "EUA", flag: "🇺🇸", record: "27-1-0", avatar: "👊", weight: "Pesado" },
  { id: 6, name: "Stipe Miocic", country: "EUA", flag: "🇺🇸", record: "20-4-0", avatar: "🏋️", weight: "Pesado" },
  { id: 7, name: "Amanda Nunes", country: "Brasil", flag: "🇧🇷", record: "22-5-0", avatar: "🦁", weight: "Galo Fem." },
  { id: 8, name: "Valentina Shevchenko", country: "Quirguistão", flag: "🇰🇬", record: "23-4-0", avatar: "💃", weight: "Mosca Fem." },
  { id: 9, name: "Sean O'Malley", country: "EUA", flag: "🇺🇸", record: "18-1-0", avatar: "🌈", weight: "Galo" },
  { id: 10, name: "Merab Dvalishvili", country: "Geórgia", flag: "🇬🇪", record: "17-4-0", avatar: "🐻", weight: "Galo" },
];

export const mockFights: Fight[] = [
  { id: 1, eventId: 1, fighterA: 1, fighterB: 2, weight: "Meio-Pesado", isMainEvent: true, round: 5, time: "23:00" },
  { id: 2, eventId: 1, fighterA: 3, fighterB: 4, weight: "Leve", isMainEvent: false, round: 5, time: "22:00" },
  { id: 3, eventId: 1, fighterA: 9, fighterB: 10, weight: "Galo", isMainEvent: false, round: 3, time: "21:00" },
  { id: 4, eventId: 2, fighterA: 5, fighterB: 6, weight: "Pesado", isMainEvent: true, round: 5, time: "22:00" },
  { id: 5, eventId: 2, fighterA: 7, fighterB: 8, weight: "Mosca Fem.", isMainEvent: false, round: 5, time: "20:00" },
  { id: 6, eventId: 3, fighterA: 1, fighterB: 5, weight: "Pesado", isMainEvent: true, round: 5, time: "23:00" },
  { id: 7, eventId: 3, fighterA: 4, fighterB: 9, weight: "Leve", isMainEvent: false, round: 3, time: "21:30" },
];

export const bannerTypes = [
  { id: "fightcard", title: "Fight Card", desc: "Várias lutas do evento", icon: "🥊" },
  { id: "duel", title: "Duelo (VS)", desc: "1 luta destaque", icon: "⚔️" },
  { id: "mainevent", title: "Main Event", desc: "Luta principal", icon: "🔥" },
  { id: "full", title: "Evento Completo", desc: "Card completo do evento", icon: "📅" },
];

export const visualStyles = [
  { id: "dark-fight", name: "Dark Fight", desc: "Sombras intensas, contraste alto", emoji: "🔥" },
  { id: "neon-fight", name: "Neon Fight", desc: "Cores neon, futurista", emoji: "⚡" },
  { id: "blood", name: "Blood Style", desc: "Vermelho intenso, agressivo", emoji: "🩸" },
  { id: "gold", name: "Gold Premium", desc: "Dourado elegante, premium", emoji: "🥇" },
];

export const effects = [
  { id: "glow", label: "Brilho / Glow" },
  { id: "smoke", label: "Fumaça" },
  { id: "particles", label: "Partículas" },
  { id: "shadow", label: "Sombra forte" },
  { id: "sidelight", label: "Luz lateral" },
];

export const templates = [
  { id: "fight-night", name: "Fight Night", icon: "🌙" },
  { id: "main-event", name: "Main Event", icon: "🏆" },
  { id: "epic-duel", name: "Duelo Épico", icon: "⚔️" },
  { id: "full-event", name: "Evento Completo", icon: "📋" },
];
