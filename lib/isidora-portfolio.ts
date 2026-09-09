export type IsidoraProject = {
  slug: string;
  number: string;
  title: string;
  area: string;
  statement: string;
  description: string;
  contribution: string;
  approach: string[];
  accent: 'blue' | 'red' | 'green';
};

export const isidoraProjects: IsidoraProject[] = [
  {
    slug: 'direccion-de-arte',
    number: '01',
    title: 'Una idea que se pueda ver y sentir',
    area: 'Dirección de arte',
    statement: 'Transformar conceptos en universos visuales coherentes.',
    description:
      'Una dirección creativa que parte desde una base clara y reconocible para introducir una decisión inesperada que entregue carácter, sin perder coherencia.',
    contribution:
      'Traducir conceptos a decisiones visuales concretas: materialidad, silueta, styling, fotografía y composición gráfica.',
    approach: ['Conceptualización', 'Observación', 'Contraste', 'Intención'],
    accent: 'blue',
  },
  {
    slug: 'styling',
    number: '02',
    title: 'Cuerpo, objeto y espacio',
    area: 'Styling',
    statement: 'Construir relaciones entre prendas, objetos, cuerpo e imagen.',
    description:
      'El styling se entiende como una forma de organizar relaciones. Cada elemento responde al concepto y el gesto inesperado aparece solo cuando aporta a la lectura.',
    contribution:
      'Una mirada pulcra pero no fría, creativa sin sobrecarga y sobria sin volverse plana.',
    approach: ['Relación', 'Silueta', 'Detalle', 'Jerarquía'],
    accent: 'red',
  },
  {
    slug: 'fotografia',
    number: '03',
    title: 'Traducir una idea a una imagen',
    area: 'Fotografía',
    statement: 'Fotografía limpia y editorial con interés por el detalle.',
    description:
      'Encuadres inesperados y una relación consciente entre cuerpo, objeto y espacio construyen imágenes precisas, con aire y una interrupción medida.',
    contribution:
      'Dar forma visual a una idea con intención, sin incorporar recursos que no aporten al concepto.',
    approach: ['Encuadre', 'Espacio negativo', 'Detalle', 'Intención'],
    accent: 'green',
  },
  {
    slug: 'moda',
    number: '04',
    title: 'Control + interrupción',
    area: 'Moda',
    statement: 'Primero hago un orden, después veo dónde romperlo.',
    description:
      'La composición parte desde una grilla clara. Una vez establecido el orden, una silueta, una palabra, una imagen o un color puede desplazar la lectura.',
    contribution:
      'Hacer convivir lo controlado con lo inesperado para crear propuestas claras, cuidadas y con personalidad.',
    approach: ['Materialidad', 'Silueta', 'Contraste', 'Un quiebre'],
    accent: 'blue',
  },
  {
    slug: 'identidad-visual',
    number: '05',
    title: 'Una base clara, un gesto que da carácter',
    area: 'Identidad visual',
    statement: 'Un sistema capaz de acompañar proyectos distintos.',
    description:
      'Una base limpia y tipográfica construye reconocimiento profesional. El carácter aparece mediante un pequeño desplazamiento que rompe la estructura sin perder legibilidad.',
    contribution:
      'Desarrollar un sistema flexible que pueda adaptarse al contexto sin perder una mirada reconocible.',
    approach: ['Claridad', 'Reconocimiento', 'Flexibilidad', 'Interrupción'],
    accent: 'red',
  },
  {
    slug: 'experiencias',
    number: '06',
    title: 'Mirar distinto',
    area: 'Experiencias',
    statement: 'Observar, seleccionar y transformar con intención.',
    description:
      'Una práctica interdisciplinaria que conecta dirección de arte, fotografía, styling, moda e identidad visual para convertir ideas en experiencias claras y personales.',
    contribution:
      'Detectar detalles y posibilidades que pueden pasar desapercibidas para transformar algo conocido en una experiencia diferente.',
    approach: ['Observación', 'Selección', 'Transformación', 'Carácter'],
    accent: 'green',
  },
];

export const getProject = (slug: string) =>
  isidoraProjects.find((project) => project.slug === slug);

export const getSuggestedProject = (slug: string) => {
  const current = isidoraProjects.findIndex((project) => project.slug === slug);
  const jump = 1 + (slug.length % (isidoraProjects.length - 1));
  return isidoraProjects[(current + jump) % isidoraProjects.length];
};
