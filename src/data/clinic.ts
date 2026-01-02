import type { TeamMember } from "../types/team";

export const clinic = {
  name: "Clínica FICA",
  tagline: "Fisioterapia Integrada Corpo Ativo",
  address:
    "Via Eng Belmiro Mendes de Azevedo n353, 4475-401 Castêlo da Maia, Maia",
  phoneDisplay: "914 710 359",
  phoneE164: "+351914710359",
  email: "info.gabinetefica@gmail.com",
  hours: [
    { label: "Segunda a Sexta", value: "8h - 20h (sob marcação)" },
    { label: "Sábado", value: "8h - 13h (sob marcação)" },
  ],
  services: [
    "Fisioterapia de reabilitação",
    "Terapia Manual Avançada",
    "Exercício clínico",
    "Fisioterapia e Osteopatia infantil",
    "Osteopatia",
  ],
  team: [
    {
      name: "Beatriz Marques",
      role: "Fisioterapeuta",
      license: "nº 2483",
      image: "bia_retrato.jpeg",
      qualifications: [
        "Pós-graduação em medicina e reabilitação no futebol (FMUP)",
        "Pilates clínico (APPI)",
        "Osteopatia (EOM)",
        "Nutrição avançada Ortomolecular e PNI (EMAC)",
      ],
    },
    {
      name: "Ana Gabriela Ribeiro",
      role: "Fisioterapeuta",
      image: "ana_gabriela.jpeg",
      license: "nº 2494",
      qualifications: [
        "Pós-graduação em exercício terapêutico (ISMAT / Fitness Academy)",
        "Especialização em Osteopatia (EOM)",
        "Pós-graduação em Osteopatia Infantil (ESSATLA)",
      ],
    },
    {
      name: "Ana Sofia Carvalho Marques",
      role: "Osteopata",
      image: "colaboradora_3.jpeg",
      license: "nº 0032625",
      qualifications: [
        "Massagem Desportiva pela AFP",
        "Massagem Terapêutica SIMAC",
        "Terapias Manuais SIMAC",
      ],
    },
  ] satisfies TeamMember[],
  // Google Maps link (free) — the embed API is paid; we’ll link to maps instead.
  mapsLink: "https://maps.app.goo.gl/cJ9h6ZDAdhei3QfdA",
};
