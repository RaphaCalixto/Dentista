export type SpecialtyCategory = 'todas' | 'estetica' | 'reabilitacao' | 'ortodontia';

export type CardShapeVariant = 'arch' | 'chamfer' | 'leaf' | 'capsule-cut';

export interface SpecialtyItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: Exclude<SpecialtyCategory, 'todas'>;
  categoryLabel: string;
  shape: CardShapeVariant;
  duration: string;
  precisionMetric: string;
  summary: string;
  clinicalProtocol: string[];
  idealFor: string;
  image: string;
  imageAlt: string;
  surfaceTheme: 'porcelain' | 'cobalt' | 'abyssal' | 'frost';
}

export interface TechnologyStage {
  id: string;
  tag: string;
  title: string;
  description: string;
  detailMetric: string;
  shape: 'arch' | 'chamfer' | 'leaf' | 'pill';
  image: string;
}

export interface DentistMember {
  id: string;
  name: string;
  role: string;
  cro: string;
  bio: string;
  focus: string[];
  image: string;
  cardShape: 'arch' | 'leaf';
}

export interface PatientDeckCard {
  id: string;
  patient: string;
  age: string;
  treatment: string;
  quote: string;
  resultNote: string;
  shadeTone: string;
}

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'lentes-porcelana',
    code: 'ESP.01',
    title: 'Lentes em Porcelana Ultrafina',
    subtitle: 'Design facial e estratificação artesanal',
    category: 'estetica',
    categoryLabel: 'Estética',
    shape: 'arch',
    duration: '2 sessões clínicas',
    precisionMetric: '0,2 mm de espessura',
    summary:
      'Lâminas cerâmicas translúcidas esculpidas sob medida para devolver textura, luminosidade natural e proporção áurea sem desgaste invasivo.',
    clinicalProtocol: [
      'Fotografia facial dinâmica em estúdio e análise de linha do sorriso.',
      'Mockup físico em boca (Test Drive) antes de qualquer preparo dental.',
      'Cimentação adesiva sob isolamento absoluto e microscopia óptica.',
    ],
    idealFor: 'Harmonização de forma, cor, diastemas e bordas desgastadas com aspecto genuinamente natural.',
    image: '/images/craft-porcelain.jpg',
    imageAlt: 'Lentes de contato em porcelana translúcida sobre pedestal azul cobalto',
    surfaceTheme: 'porcelain',
  },
  {
    id: 'implantodontia-guiada',
    code: 'ESP.02',
    title: 'Implantodontia Guiada 3D',
    subtitle: 'Cirurgia sem cortes amplos por navegação digital',
    category: 'reabilitacao',
    categoryLabel: 'Reabilitação',
    shape: 'chamfer',
    duration: 'Planejamento em 48h',
    precisionMetric: 'Guia cirúrgico CAD/CAM',
    summary:
      'Integração entre tomografia Cone Beam e escaneamento intraoral para posicionar implantes suíços com precisão submilimétrica e recuperação serena.',
    clinicalProtocol: [
      'Sobreposição digital 3D entre anatomia óssea e futura coroa protética.',
      'Impressão de guia cirúrgico personalizado em resina biocompatível.',
      'Carga imediata estética sempre que a estabilidade primária permite.',
    ],
    idealFor: 'Reposição unitária ou total com mínimo trauma tecidual e previsibilidade funcional.',
    image: '/images/hero-studio.jpg',
    imageAlt: 'Ambiente clínico cirúrgico em tons de azul safira e porcelana',
    surfaceTheme: 'abyssal',
  },
  {
    id: 'ortodontia-invisivel',
    code: 'ESP.03',
    title: 'Alinhadores Invisíveis de Alta Força',
    subtitle: 'Movimentação ortodôntica silenciosa e previsível',
    category: 'ortodontia',
    categoryLabel: 'Ortodontia',
    shape: 'leaf',
    duration: '6 a 14 meses',
    precisionMetric: 'Polímero multicamada',
    summary:
      'Placas transparentes projetadas por biomecânica digital para alinhar arcos dentários e equilibrar a mordida sem bráquetes metálicos.',
    clinicalProtocol: [
      'Escaneamento 3D sem moldagens desconfortáveis com massa.',
      'Simulação etapa por etapa da movimentação radicular e coronal.',
      'Controles espaçados e acompanhamento remoto inteligente.',
    ],
    idealFor: 'Pacientes que buscam correção funcional e estética discreta no cotidiano profissional.',
    image: '/images/tech-aligner.jpg',
    imageAlt: 'Alinhador ortodôntico transparente sobre vidro azulado',
    surfaceTheme: 'frost',
  },
  {
    id: 'reabilitacao-biomimetica',
    code: 'ESP.04',
    title: 'Odontologia Biomimética & Oclusão',
    subtitle: 'Preservação estrutural e longevidade dental',
    category: 'reabilitacao',
    categoryLabel: 'Reabilitação',
    shape: 'capsule-cut',
    duration: 'Protocolo personalizado',
    precisionMetric: 'Adesão de alta energia',
    summary:
      'Restaurações e onlays que mimetizam a elasticidade natural da dentina e do esmalte, protegendo dentes fraturados contra tratamentos de canal evitáveis.',
    clinicalProtocol: [
      'Mapeamento oclusal digital de contatos e forças mastigatórias.',
      'Remoção seletiva guiada por fluorescência preservando estrutura sadia.',
      'Reconstrução em camadas com resinas nano-híbridas ou cerâmicas.',
    ],
    idealFor: 'Casos de bruxismo, desgastes severos e substituição segura de restaurações antigas.',
    image: '/images/hero-portrait.jpg',
    imageAlt: 'Sorriso natural equilibrado sob iluminação azul safira',
    surfaceTheme: 'cobalt',
  },
];

export const TECHNOLOGY_STAGES: TechnologyStage[] = [
  {
    id: 'scan-3d',
    tag: 'ETAPA I · CAPTURA',
    title: 'Escaneamento Intraoral Óptico',
    description:
      'Mapeamos cada milímetro da arcada em menos de três minutos, capturando cor, translucidez e textura em nuvem 3D de alta definição.',
    detailMetric: '20 mícrons de fidelidade',
    shape: 'arch',
    image: '/images/tech-aligner.jpg',
  },
  {
    id: 'smile-architecture',
    tag: 'ETAPA II · PROJETO',
    title: 'Arquitetura Facial do Sorriso',
    description:
      'Cruzamos proporções labiais, fonética e linhas faciais para desenhar dentes que pertencem ao seu rosto, nunca um molde padronizado.',
    detailMetric: 'Simulação em boca (Test Drive)',
    shape: 'chamfer',
    image: '/images/hero-portrait.jpg',
  },
  {
    id: 'ceramic-studio',
    tag: 'ETAPA III · ATELIER',
    title: 'Estratificação em Cerâmica Pura',
    description:
      'Nosso laboratório parceiro aplica camadas de porcelana feldspática e dissilicato para replicar opalescência e halos naturais.',
    detailMetric: 'Acabamento sob microscópio',
    shape: 'leaf',
    image: '/images/craft-porcelain.jpg',
  },
  {
    id: 'calm-suite',
    tag: 'ETAPA IV · ACOLHIMENTO',
    title: 'Suítes Acústicas & Sedação Consciente',
    description:
      'Ambientes em azul safira com controle acústico, iluminação circadiana e anestesia computadorizada sem pressão.',
    detailMetric: 'Protocolo conforto zero-ansiedade',
    shape: 'pill',
    image: '/images/hero-studio.jpg',
  },
];

export const TEAM_MEMBERS: DentistMember[] = [
  {
    id: 'dr-henrique',
    name: 'Dr. Henrique Vasconcelos',
    role: 'Diretor Clínico · Prótese & Estética Dental',
    cro: 'CRO-SP 114.820',
    bio: 'Mestre em Reabilitação Oral pela USP, dedica 14 anos à odontologia biomimética e às lentes cerâmicas ultrafinas com foco em naturalidade absoluta.',
    focus: ['Lentes em Porcelana', 'Reabilitação Complexa', 'Microscopia Clínica'],
    image: '/images/dr-henrique.jpg',
    cardShape: 'arch',
  },
  {
    id: 'dra-clara',
    name: 'Dra. Clara Mendonça',
    role: 'Especialista em Ortodontia Digital & Implantodontia',
    cro: 'CRO-SP 128.405',
    bio: 'Pós-graduada em Ortodontia Digital e Cirurgia Guiada, conduz planejamentos que integram alinhamento invisível e harmonia oclusal sem procedimentos invasivos.',
    focus: ['Alinhadores Invisíveis', 'Implantodontia 3D', 'Planejamento Facial'],
    image: '/images/dra-clara.jpg',
    cardShape: 'leaf',
  },
];

export const PATIENT_DECK: PatientDeckCard[] = [
  {
    id: 'relato-1',
    patient: 'Mariana Albuquerque',
    age: '34 anos · Arquiteta',
    treatment: '8 Lentes em Porcelana Ultrafina',
    quote:
      'Eu tinha receio de ficar com aquele sorriso artificial e opaco. Quando fiz o test drive em boca e vi a transparência das bordas, chorei de alívio.',
    resultNote: 'Concluído em 12 dias · Zero desgaste sensível',
    shadeTone: 'BL3 Natural Translúcido',
  },
  {
    id: 'relato-2',
    patient: 'Rafael Coutinho',
    age: '41 anos · Empresário',
    treatment: 'Alinhadores Invisíveis + Reabilitação Oclusal',
    quote:
      'Nenhuma dor nas trocas e ninguém no escritório percebeu que eu estava usando aparelho. A clínica parece uma galeria silenciosa em azul.',
    resultNote: '8 meses de acompanhamento · Mordida equilibrada',
    shadeTone: 'Clareamento Híbrido Suave',
  },
  {
    id: 'relato-3',
    patient: 'Beatriz Monteiro',
    age: '52 anos · Editora de Arte',
    treatment: 'Implantodontia Guiada 3D',
    quote:
      'Sempre tive pavor de dentista. A anestesia eletrônica e a cirurgia sem pontos amplos mudaram completamente minha relação com o cuidado bucal.',
    resultNote: 'Guia cirúrgico digital · Recuperação em 48h',
    shadeTone: 'Coroa em Zircônia Estratificada',
  },
  {
    id: 'relato-4',
    patient: 'Lucas Ferraz',
    age: '29 anos · Violoncelista',
    treatment: 'Odontologia Biomimética & Placa de Proteção',
    quote:
      'Meu bruxismo estava encurtando meus dentes frontais. O Dr. Henrique devolveu minha altura facial respeitando até a minha embocadura.',
    resultNote: 'Preservação 100% vital · Controle semestral',
    shadeTone: 'Esmalte Bio-mimético A1',
  },
];
