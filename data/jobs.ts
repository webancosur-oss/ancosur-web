export type JobArea =
  | "Comercial"
  | "Marketing"
  | "Proyectos y Obra"
  | "Administración"
  | "Tecnología"
  | "Talento Humano";

export type Job = {
  id: number;
  title: string;
  area: JobArea;
  location: string;
  modality: string;
  type: string;
  summary: string;
  requirements: string[];
  functions: string[];
  active: boolean;
  applyEmail: string;
  applyPhone?: string;
};

export const jobs: Job[] = [
  {
    
  id: 1,
  title: "Supervisor de Acabados",
  area: "Proyectos y Obra",
  location: "Huancayo",
  modality: "Presencial",
  type: "Tiempo completo",
  summary:
    "Buscamos un profesional para supervisar y controlar actividades de acabados en edificios multifamiliares, asegurando el cumplimiento de metas, reportes y calidad en obra.",
  requirements: [
    "Estudios universitarios de Arquitectura.",
    "Titulado con 2 años de experiencia.",
    "Experiencia como residente de obra en edificios multifamiliares.",
    "Experiencia en especialidades de acabados: albañilería, tarrajeo y acabados.",
    "Experiencia en control y supervisión de contratistas a nivel de acabados.",
    "Experiencia en edificios multifamiliares mayores de 15 pisos.",
  ],
  functions: [
    "Supervisión y control de actividades.",
    "Reporte de avance diario y/o semanal.",
    "Elaboración de valorizaciones.",
    "Elaboración de informes.",
    "Cumplimiento de metas.",
  ],
  active: true,
  applyEmail: "talento.humano@ancosur.com",
  applyPhone: "950 892 184",
},
];

export const jobAreas: JobArea[] = [
  "Comercial",
  "Marketing",
  "Proyectos y Obra",
  "Administración",
  "Tecnología",
  "Talento Humano",
];