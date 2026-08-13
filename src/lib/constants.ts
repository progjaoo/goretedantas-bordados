import { FAQItem, ProductCategory, Testimonial } from "@/types/portfolio";

export const SITE_CONFIG = {
  name: "Ateliê Gorete Bordados",
  owner: "Gorete",
  tagline: "Bordados computadorizados & peças artesanais personalizadas",
  phoneDisplay: "+55 24 99935-6139",
  phoneNumber: "5524999356139",
  instagram: "@goretebordados",
  instagramUrl: "https://instagram.com",
  location: "Petrópolis / RJ • Envios para todo o Brasil",
};

export const COLOR_PALETTE = {
  primary: "#8d7966", // Warm Taupe
  secondary: "#a8a39d", // Warm Grey / Stone
  accent: "#d8c8b8", // Linen Sand
  surface: "#e2ddd9", // Soft Cream Bone
  background: "#f8f1e9", // Alabaster / Warm Canvas
  dark: "#2c2825", // Deep Stone Brown
  text: "#1c1917", // Rich Dark Text
};

export const CATEGORIES: { id: ProductCategory; label: string; tag: string; description: string; icon: string }[] = [
  {
    id: "toalhas-monograma",
    label: "Monogramas & Casais",
    tag: "Luxo & Bodas",
    description: "Toalhas de banho e lavabo com brasões bordados, flores nobres e rendas finas.",
    icon: "Crown",
  },
  {
    id: "necessaires",
    label: "Necessaires & Estojos",
    tag: "Couro Sintético",
    description: "Peças estruturadas, forro impermeável higienizável e personalização com nomes em relevo.",
    icon: "ShoppingBag",
  },
  {
    id: "linha-bebe",
    label: "Linha Bebê & Infantil",
    tag: "Enxoval Afetivo",
    description: "Bordados antialérgicos com temas encantadores: Safari, Trenzinho, Bichinhos e Nuvens.",
    icon: "Baby",
  },
  {
    id: "kits-presente",
    label: "Kits Coordenados",
    tag: "Toalha + Necessaire",
    description: "Combinações harmônicas de toalha de veludo e necessaire coordenadas para presentes inesquecíveis.",
    icon: "Sparkles",
  },
  {
    id: "toalhas-religiosas",
    label: "Toalhas Clérigo & Músicos",
    tag: "Clássicos & Solenes",
    description: "Títulos pastorais, instrumentos musicais em fios metalizados dourados e monogramas distintos.",
    icon: "Music",
  },
  {
    id: "tematicas",
    label: "Temáticas & Clubes",
    tag: "Edições Especiais",
    description: "Escudos de futebol, hobbies e brasões bordados com alta fidelidade de pontos.",
    icon: "Shield",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    clientName: "Mariana Albuquerque",
    city: "Rio de Janeiro, RJ",
    productPurchased: "Kit Luciana Floral (Toalha + Necessaire)",
    comment: "O capricho da Dona Gorete é emocionante! O conjunto veio perfeitamente bordado, as cores da linha combinam perfeitamente e o cheirinho na embalagem foi um carinho à parte.",
    rating: 5,
  },
  {
    id: "2",
    clientName: "Pr. Marcos Silveira",
    city: "Juiz de Fora, MG",
    productPurchased: "Toalha Pastoral com Monograma",
    comment: "Qualidade de alto nível! O bordado em dourado no veludo preto ficou solene e impecável. Todos na igreja elogiaram o acabamento.",
    rating: 5,
  },
  {
    id: "3",
    clientName: "Camila Guimarães",
    city: "São Paulo, SP",
    productPurchased: "Dupla de Toalhas Bebê Isaac",
    comment: "A toalhinha com o trenzinho e os bichinhos é a coisa mais linda do enxoval do meu filho. O tecido é macio e a renda guipir é de extrema qualidade.",
    rating: 5,
  },
  {
    id: "4",
    clientName: "Rodrigo Mendonça",
    city: "Petrópolis, RJ",
    productPurchased: "Necessaire Masculina Couro Preto",
    comment: "Super estruturada e muito elegante. O zíper desliza perfeitamente e o bordado em ouro velho ficou muito discreto e sofisticado.",
    rating: 5,
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "Como funciona para personalizar o nome, cor e desenho?",
    answer: "É tudo combinado de forma simples e direta pelo WhatsApp! Você nos conta sua ideia (nome, tema, cores de toalha e linhas de preferência) ou escolhe uma peça do catálogo. Montamos a sugestão e confirmamos cada detalhe com você antes de bordar.",
  },
  {
    question: "Qual é o prazo médio de confecção e entrega?",
    answer: "Como cada peça é confeccionada individualmente com alto rigor artesanal, o prazo de produção varia geralmente de 3 a 7 dias úteis após a aprovação da arte. Para encomendas maiores ou kits de eventos, combinamos o prazo ideal diretamente com você.",
  },
  {
    question: "Vocês enviam para outras cidades e estados?",
    answer: "Sim! Enviamos para todo o Brasil via Correios (Sedex ou PAC) e transportadoras com código de rastreamento para você acompanhar cada etapa até a sua porta.",
  },
  {
    question: "Quais materiais e toalhas são utilizados nas peças?",
    answer: "Trabalhamos exclusivamente com toalhas 100% algodão de alta gramatura e toque aveludado (marcas consagradas como Döhler e Karsten), linhas trilobais que não desbotam na lavagem e couro sintético estruturado nas necessaires.",
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos PIX, transferência bancária e cartões de crédito. Geralmente trabalhamos com 50% de entrada para início da produção e o restante no envio.",
  },
  {
    question: "Como cuidar e lavar as peças bordadas para durarem anos?",
    answer: "Recomendamos lavar com sabão neutro em ciclo suave, evitar alvejantes à base de cloro e passar as toalhas pelo avesso ou com um tecido protetor sobre o bordado para manter o relevo e o brilho dos fios.",
  },
];
