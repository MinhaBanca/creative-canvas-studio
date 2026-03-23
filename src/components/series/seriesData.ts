// Mock data for series/novela banner generator

export interface SeriesItem {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  episodes: number;
  channel: string;
  type: "serie" | "novela";
  seasons?: number;
  airTime?: string;
}

export interface Character {
  id: number;
  name: string;
  actor: string;
  avatar: string;
  role?: string;
}

export interface Episode {
  id: number;
  seriesId: number;
  number: number;
  title: string;
  date: string;
  summary: string;
  season?: number;
}

export const mockSeries: SeriesItem[] = [
  { id: 1, title: "Renascer", year: 2024, rating: 8.2, genre: "Novela", poster: "🌾", episodes: 180, channel: "Globo", type: "novela", airTime: "21:20" },
  { id: 2, title: "Mania de Você", year: 2024, rating: 7.8, genre: "Novela", poster: "💃", episodes: 120, channel: "Globo", type: "novela", airTime: "21:30" },
  { id: 3, title: "Terra e Paixão", year: 2024, rating: 7.5, genre: "Novela", poster: "🏜️", episodes: 150, channel: "Globo", type: "novela", airTime: "18:25" },
  { id: 8, title: "Família é Tudo", year: 2024, rating: 6.9, genre: "Novela", poster: "👨‍👩‍👧‍👦", episodes: 100, channel: "Globo", type: "novela", airTime: "19:40" },
  { id: 4, title: "The Last of Us", year: 2023, rating: 9.1, genre: "Drama", poster: "🍄", episodes: 9, channel: "HBO", type: "serie", seasons: 2 },
  { id: 5, title: "House of the Dragon", year: 2024, rating: 8.8, genre: "Fantasia", poster: "🐉", episodes: 8, channel: "HBO", type: "serie", seasons: 2 },
  { id: 6, title: "Stranger Things", year: 2022, rating: 8.7, genre: "Ficção", poster: "👾", episodes: 34, channel: "Netflix", type: "serie", seasons: 4 },
  { id: 7, title: "The Bear", year: 2024, rating: 8.9, genre: "Drama", poster: "🐻", episodes: 28, channel: "Disney+", type: "serie", seasons: 3 },
];

export const mockCharacters: Record<number, Character[]> = {
  1: [
    { id: 1, name: "José Inocêncio", actor: "Marcos Palmeira", avatar: "👨", role: "Protagonista" },
    { id: 2, name: "Mariana", actor: "Theresa Fonseca", avatar: "👩", role: "Protagonista" },
    { id: 3, name: "Joana", actor: "Alice Carvalho", avatar: "👩‍🦰", role: "Coadjuvante" },
    { id: 4, name: "Venâncio", actor: "Rodrigo Simas", avatar: "🧔", role: "Vilão" },
  ],
  2: [
    { id: 5, name: "Viola", actor: "Gabz", avatar: "💃", role: "Protagonista" },
    { id: 6, name: "Luma", actor: "Agatha Moreira", avatar: "👱‍♀️", role: "Vilã" },
    { id: 7, name: "Mavi", actor: "Chay Suede", avatar: "🧑", role: "Protagonista" },
  ],
  4: [
    { id: 8, name: "Joel", actor: "Pedro Pascal", avatar: "🧔", role: "Protagonista" },
    { id: 9, name: "Ellie", actor: "Bella Ramsey", avatar: "👧", role: "Protagonista" },
  ],
  5: [
    { id: 10, name: "Rhaenyra", actor: "Emma D'Arcy", avatar: "👸", role: "Protagonista" },
    { id: 11, name: "Daemon", actor: "Matt Smith", avatar: "🤴", role: "Coadjuvante" },
  ],
  6: [
    { id: 12, name: "Eleven", actor: "Millie Bobby Brown", avatar: "👧", role: "Protagonista" },
    { id: 13, name: "Mike", actor: "Finn Wolfhard", avatar: "👦", role: "Protagonista" },
  ],
  7: [
    { id: 14, name: "Carmy", actor: "Jeremy Allen White", avatar: "👨‍🍳", role: "Protagonista" },
    { id: 15, name: "Sydney", actor: "Ayo Edebiri", avatar: "👩‍🍳", role: "Protagonista" },
  ],
};

export const mockEpisodes: Episode[] = [
  { id: 1, seriesId: 1, number: 178, title: "Capítulo 178", date: "Hoje", summary: "José Inocêncio descobre a verdade sobre Mariana e toma uma decisão que muda tudo..." },
  { id: 2, seriesId: 1, number: 179, title: "Capítulo 179", date: "Amanhã", summary: "Mariana toma uma decisão difícil que afeta toda a família..." },
  { id: 3, seriesId: 2, number: 95, title: "Capítulo 95", date: "Hoje", summary: "Viola confronta Luma sobre o segredo que pode destruir tudo..." },
  { id: 4, seriesId: 2, number: 96, title: "Capítulo 96", date: "Amanhã", summary: "Mavi faz uma proposta inesperada que surpreende a todos..." },
  { id: 7, seriesId: 3, number: 140, title: "Capítulo 140", date: "Hoje", summary: "Revelação bombástica abala os personagens..." },
  { id: 8, seriesId: 8, number: 88, title: "Capítulo 88", date: "Hoje", summary: "Uma festa vira o cenário de confusões inesperadas..." },
  { id: 5, seriesId: 4, number: 1, title: "S02E01 - Pilot", date: "2025", summary: "Joel e Ellie continuam a jornada em um mundo devastado...", season: 2 },
  { id: 6, seriesId: 5, number: 1, title: "S02E01 - A Son for a Son", date: "2024", summary: "Rhaenyra busca vingança após eventos devastadores...", season: 2 },
];

export const bannerTypes = [
  { id: "simple", title: "Banner Simples", desc: "Capa + título da série", icon: "Image" as const },
  { id: "trailer", title: "Banner com Trailer", desc: "Fundo animado + visual premium", icon: "Play" as const, premium: true },
  { id: "character", title: "Personagens Destaque", desc: "Personagens principais em evidência", icon: "Users" as const },
  { id: "episode", title: "Episódio de Hoje", desc: "Foco no capítulo atual — ideal para novelas", icon: "Calendar" as const },
];

export const visualStyles = [
  { id: "netflix", name: "Netflix Style", desc: "Visual clean e moderno de streaming" },
  { id: "drama", name: "Drama / Novela", desc: "Tipografia dramática, cores fortes" },
  { id: "suspense", name: "Suspense", desc: "Sombras intensas, clima tenso" },
  { id: "minimal", name: "Modern Clean", desc: "Limpo, elegante e contemporâneo" },
];

export const templates = [
  { id: "novo-episodio", name: "Novo Episódio", icon: "📺" },
  { id: "em-alta", name: "Em Alta", icon: "🔥" },
  { id: "recomendado", name: "Recomendado", icon: "⭐" },
  { id: "capitulo-hoje", name: "Capítulo de Hoje", icon: "📅" },
];

export const trailerPositions = [
  { id: "background", label: "Fundo animado" },
  { id: "lateral", label: "Lateral" },
  { id: "mini", label: "Mini player" },
];

export const trailerEffects = [
  { id: "blur", label: "Blur" },
  { id: "dark", label: "Overlay escuro" },
  { id: "gradient", label: "Gradiente" },
];
