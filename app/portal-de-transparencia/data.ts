export type LegalDocument = {
  label: string;
  href: string;
};

export type TransparencyProject = {
  slug: string;
  name: string;
  projectRoute: string;
  companyName: string;
  ruc: string;
  fiscalAddress: string;
  contactPhone: string;
  projectAddress: string;
  description: string[];
  documents: LegalDocument[];
};

/*
  Esta ruta supone que tus documentos se encuentran en:

  public/
  └── assets/
      └── portal-transparencia/
          └── documents/

  Si la carpeta "portal-transparencia" está directamente dentro de public,
  cambia el valor por:

  const DOCUMENTS_BASE_PATH = "/portal-transparencia/documents";
*/

const DOCUMENTS_BASE_PATH =
  "/assets/portal-transparencia/documents";

const documentPath = (
  folder: string,
  filename: string
) => `${DOCUMENTS_BASE_PATH}/${folder}/${filename}`;

const createDocument = (
  folder: string,
  label: string,
  filename: string
): LegalDocument => ({
  label,
  href: documentPath(folder, filename),
});

export const transparencyProjects: TransparencyProject[] = [
  /* ======================================================
     NEO BALTO
  ====================================================== */

  {
    slug: "neo-balto",
    name: "Neo Balto",
    projectRoute: "/neo-balto",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Jr. San Agustín N.° 416, Parque Grau, Huancayo, Junín",

    description: [
      "Neo Balto es un proyecto inmobiliario ubicado en Jr. San Agustín N.° 416, Parque Grau, Huancayo, Junín, concebido como un edificio multifamiliar de departamentos bajo un enfoque pet-centric, donde las mascotas forman parte central de la propuesta de valor y del estilo de vida del proyecto.",

      "Consta de una edificación multifamiliar de 7 pisos más azotea, con ascensor, lobby sensorial, área comercial en el primer nivel y amenidades pensadas para una convivencia moderna y funcional.",

      "Entre sus principales espacios comunes destacan 01 Lobby Sensorial, 01 Spa Eco Pet Wash y 01 Rooftop Terraza, integrados a una propuesta residencial orientada al bienestar, la comodidad y la vida en familia.",

      "El proyecto contempla tipologías Luz e Impulso, con áreas aproximadas desde 43.60 m² hasta 61.30 m², incluyendo configuraciones de 2 dormitorios y alternativas compactas con 1 dormitorio más estudio, según la tipología elegida.",

      "Tipología Luz: áreas aproximadas de 53.10 m² y 53.60 m².",

      "Tipología Impulso: áreas aproximadas desde 43.60 m² hasta 61.30 m², según distribución y área libre.",

      "La propuesta conceptual de Neo Balto prioriza una arquitectura pensada para la convivencia con mascotas, incorporando lineamientos de diseño orientados a la funcionalidad, practicidad y confort, con una identidad diferenciadora dentro del mercado inmobiliario local.",

      "Las imágenes, distribución y acabados del proyecto son referenciales y se encuentran sujetos a cambios según el diseño y desarrollo de la obra. Asimismo, los planos pueden presentar modificaciones de carácter técnico. Las dimensiones mostradas son aproximadas y las definitivas serán las que resulten de la ejecución final del proyecto.",

      "NOTA IMPORTANTE: La entrega de la obra se realiza únicamente con muebles empotrados, sin incluir electrodomésticos ni mobiliario adicional. La disposición de los aparatos sanitarios puede presentar ligeras variaciones en función del montaje definitivo.",

      "ANTECEDENTES Y COMPORTAMIENTO DEL PROVEEDOR: Ancosur es una empresa con más de 10 años de experiencia en el sector inmobiliario, especializada en el desarrollo de proyectos innovadores y sostenibles, enfocados en brindar seguridad, rentabilidad y calidad de vida a familias e inversionistas.",

      "Para consultas, puede comunicarse mediante los canales oficiales de ANCOSUR Inmobiliaria o recibir atención presencial en Av. San Carlos 1481, cuadra 14, San Carlos, Huancayo.",
    ],

    documents: [
      createDocument(
        "neo-balto",
        "Inscripción compra-venta",
        "inscripcion-compra-venta.pdf"
      ),
      createDocument(
        "neo-balto",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
    ],
  },

  /* ======================================================
     NEO XPORT
  ====================================================== */

  {
    slug: "neo-xport",
    name: "Neo Xport",
    projectRoute: "/neo-xport",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Esquina de Jr. Nación Wanka y Paseo de la Colina, urbanización San Carlos, Huancayo, Junín",

    description: [
      "Neo Xport es un proyecto inmobiliario ubicado en la esquina de Jr. Nación Wanka y Paseo de la Colina, urbanización San Carlos, distrito de Huancayo, provincia y departamento de Junín.",

      "Consta de una edificación multifamiliar moderna de 9 pisos más azotea. El proyecto ofrece departamentos tipo Flat, locales comerciales en el primer y segundo nivel, una zona de estacionamientos vehiculares en el primer piso y ascensor.",

      "Como áreas comunes, el proyecto cuenta con espacios diseñados para un estilo de vida activo: 01 Lobby de recepción, 01 Sala de Recuperación, 01 Zona de Reuniones, 01 Zona de Futbolín, 01 Bar y la Terraza Xport ubicada en el nivel superior.",

      "El proyecto consta de departamentos de 2 y 3 dormitorios, con áreas aproximadas desde 60.90 m² hasta 77.47 m².",

      "Modelo 1: 71.88 m², con 3 dormitorios.",

      "Modelo 2: 71.88 m², con 3 dormitorios.",

      "Modelo 3: 60.90 m², con 2 dormitorios.",

      "Modelo 4: 77.47 m², con 3 dormitorios.",

      "Todas las unidades inmobiliarias del proyecto son bienes futuros, es decir, no tendrán existencia física hasta que sean construidas y entregadas a cada cliente.",

      "Las áreas y medidas perimétricas de las unidades inmobiliarias y las consignadas en los planos de distribución tienen carácter referencial. Luego de finalizada la construcción y obtenido el Certificado de Conformidad de Obra, las áreas y medidas finales serán establecidas en la Declaratoria de Fábrica, Reglamento Interno e Independización e inscritas en los Registros Públicos correspondientes.",

      "Las áreas específicas de las unidades inmobiliarias varían según la tipología. La información detallada puede solicitarse gratuitamente en las salas de ventas o mediante los canales oficiales de ANCOSUR.",

      "El cliente puede solicitar gratuitamente una copia de la lista de acabados o la vigencia de poder del representante en la sala de ventas.",

      "NOTA IMPORTANTE: La obra se entrega únicamente con muebles empotrados, sin incluir electrodomésticos ni mobiliario adicional mostrado en las imágenes decorativas.",

      "ACABADOS DEL INMUEBLE: Los materiales considerados son de marcas reconocidas y priorizan la practicidad, la calidad y el diseño moderno acorde con el concepto Xport. La disposición de los aparatos sanitarios puede presentar ligeras variaciones en función del montaje definitivo.",

      "SISTEMA ESTRUCTURAL: El sistema sismorresistente cumple con la normativa vigente de edificaciones.",

      "ANTECEDENTES Y COMPORTAMIENTO DEL PROVEEDOR: Ancosur es una empresa inmobiliaria con más de 10 años de experiencia en el desarrollo de proyectos innovadores y sostenibles en la región central del país, con un historial sólido de entregas y compromiso con la calidad.",

      "Se informa al consumidor sobre la existencia de la Central de Información de Promotores Inmobiliarios y Empresas Constructoras de Unidades Inmobiliarias, el Registro de Infracciones y Sanciones y el portal Mira a Quién le Compras de Indecopi.",

      "Para consultas adicionales, puede comunicarse mediante los canales oficiales de ANCOSUR.",
    ],

    documents: [
      createDocument(
        "neo-xport",
        "Anteproyecto aprobado",
        "anteproyecto-aprobado.pdf"
      ),
      createDocument(
        "neo-xport",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "neo-xport",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "neo-xport",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
      createDocument(
        "neo-xport",
        "PU y HR",
        "pu-hr.pdf"
      ),
      createDocument(
        "neo-xport",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     NEO ETERNA
  ====================================================== */

  {
    slug: "neo-eterna",
    name: "Neo Eterna",
    projectRoute: "/neo-eterna",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Av. San Carlos, urbanización San Antonio, Huancayo, Junín",

    description: [
      "Neo Eterna es un proyecto inmobiliario ubicado estratégicamente en la avenida San Carlos, urbanización San Antonio, distrito de Huancayo, provincia y departamento de Junín. Su ubicación privilegiada lo sitúa en el corazón del Hub Universitario, cerca de la Universidad Continental y la UPLA.",

      "Consta de una moderna edificación multifamiliar de 14 pisos más azotea, con departamentos tipo Flat y Dúplex, además de 2 niveles de sótanos destinados a estacionamientos vehiculares y depósitos. El edificio está equipado con 2 ascensores.",

      "En el primer nivel cuenta con Lobby de ingreso, zona de control y Bici Parking para fomentar la movilidad sostenible.",

      "En el nivel de azotea dispone de un club social que incluye Zona de Fogata, Zona Fitness y Zona de Parrillas integradas para reuniones sociales con vistas panorámicas de la ciudad.",

      "El proyecto ofrece tipologías Impulso, Luz, Espacio, Tiempo y Equilibrio, con departamentos de 1, 2 y 3 dormitorios.",

      "Departamentos de 1 dormitorio más estudio, Tipología Impulso: áreas aproximadas desde 41.39 m².",

      "Departamentos de 2 y 3 dormitorios: opciones desde 60.98 m² hasta 78.90 m² aproximadamente.",

      "Unidades con terrazas o áreas libres: departamentos seleccionados cuentan con áreas libres privadas de hasta 19.00 m² y opciones especiales con áreas totales de hasta 91.50 m².",

      "INFORMACIÓN LEGAL: El terreno sobre el cual se desarrolla el proyecto se encuentra inscrito en la Partida Electrónica N.° 02044070 del Registro de Predios de la Oficina Registral de Huancayo.",

      "Todas las unidades inmobiliarias del proyecto son bienes futuros y no tendrán existencia física hasta ser construidas y entregadas.",

      "Las áreas y medidas perimétricas consignadas en los planos tienen carácter referencial. Las áreas finales serán establecidas en la Declaratoria de Fábrica, Reglamento Interno e Independización inscritos en los Registros Públicos.",

      "Las áreas específicas varían según tipología y ubicación dentro de la torre. La información detallada de cada unidad puede solicitarse gratuitamente en las salas de ventas o canales digitales.",

      "ACABADOS DEL INMUEBLE: Se consideran materiales de alta durabilidad y diseño contemporáneo, con pisos laminados de alto tránsito o similares en áreas sociales y dormitorios, cerámicos o porcelanatos en baños y cocinas, grifería y sanitarios de marcas reconocidas.",

      "SISTEMA ESTRUCTURAL: El sistema sismorresistente contempla muros de concreto armado y albañilería confinada, cumpliendo con la Norma Técnica de Edificación E.030 de Diseño Sismorresistente.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur es una empresa inmobiliaria con trayectoria en la región central, especializada en el desarrollo de proyectos de alta valorización y con múltiples proyectos entregados.",

      "Para consultas adicionales o verificar vigencias de poder y listas de acabados actualizadas, puede comunicarse mediante los canales oficiales de ANCOSUR.",
    ],

    documents: [
      createDocument(
        "neo-eterna",
        "Certificado registral inmobiliario",
        "cri.pdf"
      ),
      createDocument(
        "neo-eterna",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "neo-eterna",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
      createDocument(
        "neo-eterna",
        "PU y HR",
        "pu-hr.pdf"
      ),
      createDocument(
        "neo-eterna",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     DISTRITO SAN CARLOS
  ====================================================== */

  {
    slug: "distrito-san-carlos",
    name: "Distrito San Carlos",
    projectRoute: "/distrito-san-carlos",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Calle Chacabuco S/N, paraje Hualmita, Huancayo, Junín",

    description: [
      "Distrito San Carlos es un proyecto inmobiliario ubicado en la calle Chacabuco S/N, paraje Hualmita, distrito de Huancayo, provincia de Huancayo y departamento de Junín. Su ubicación estratégica lo posiciona como el primer proyecto urbano autosuficiente de la ciudad.",

      "Consta de una edificación multifamiliar de 11 pisos más azotea, con departamentos tipo Flat y Triplex, además de 3 niveles de sótanos destinados a estacionamientos vehiculares, depósitos y cuartos técnicos.",

      "El proyecto integra servicios diseñados para la autosuficiencia y el bienestar bajo el concepto La ciudad a tus pies.",

      "Cuenta con Lobby de Ingreso con control de accesos, Zona Fitness, Zona Spa y Cuidado Personal, Zona Bazar y Servicios Múltiples, y Central de Administración y Monitoreo.",

      "El proyecto ofrece departamentos de 1, 2 y 3 dormitorios, clasificados bajo las tipologías Impulso, Equilibrio y Espacio.",

      "Tipología Impulso, 1 dormitorio más estudio: departamentos desde 54.24 m² hasta 58.65 m² aproximadamente.",

      "Tipología Equilibrio, 2 dormitorios más estudio: departamentos desde 73.78 m² hasta 74.20 m² aproximadamente.",

      "Tipología Espacio, 3 dormitorios más estudio: departamentos Flat desde 75.98 m² hasta 80.60 m² aproximadamente.",

      "Penthouses Triplex: unidades exclusivas en los últimos niveles, con áreas techadas desde 118.20 m² y terrazas privadas que pueden alcanzar un área total ocupada de hasta 306.74 m².",

      "INFORMACIÓN LEGAL: El terreno se encuentra inscrito en la Partida Electrónica N.° 02043987 del Registro de Predios de la Oficina Registral de Huancayo. El titular registral es ANCOSUR S.A.C.",

      "Todas las unidades inmobiliarias son bienes futuros. Las áreas y medidas indicadas en los planos tienen carácter referencial y las definitivas serán establecidas en la Declaratoria de Fábrica, Reglamento Interno e Independización.",

      "ACABADOS DEL INMUEBLE: Se consideran materiales de marcas reconocidas, pisos laminados o similares en áreas secas, cerámicos o porcelanatos en cocinas y baños, tableros de granito o similar y grifería de bajo consumo.",

      "SISTEMA ESTRUCTURAL: El sistema sismorresistente contempla muros de concreto armado y albañilería, cumpliendo con la normativa vigente de edificaciones.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur cuenta con más de 10 años de experiencia en el desarrollo de proyectos verticales en Huancayo y la región central.",

      "Se informa al consumidor sobre la existencia de la Central de Información de Promotores Inmobiliarios y el portal Mira a Quién le Compras de Indecopi.",

      "Para consultas adicionales, puede comunicarse mediante los canales oficiales de ANCOSUR.",
    ],

    documents: [
      createDocument(
        "distrito-sancarlos",
        "Certificado registral inmobiliario",
        "cri.pdf"
      ),
      createDocument(
        "distrito-sancarlos",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "distrito-sancarlos",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
      createDocument(
        "distrito-sancarlos",
        "PU y HR",
        "pu-hr.pdf"
      ),
      createDocument(
        "distrito-sancarlos",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     CAMINO REAL
  ====================================================== */

  {
    slug: "camino-real",
    name: "Camino Real",
    projectRoute: "/camino-real",
    companyName:
      "ANCOSUR S.A.C. / INMOBILIARIA Y CONGLOMERADO INKA HOUSE S.A.",
    ruc:
      "ANCOSUR: 20601146682 / INKA HOUSE: 20609015251",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Sector Potrero Inay, distrito de El Tambo, Huancayo, Junín",

    description: [
      "Camino Real Residencial es un proyecto de habilitación urbana de tipo residencial ubicado en el sector Potrero Inay, distrito de El Tambo, provincia de Huancayo, departamento de Junín.",

      "El proyecto destaca por su concepto de conexión entre la tradición y la modernidad, integrando áreas verdes y servicios diseñados para el bienestar familiar.",

      "Se desarrolla con frente a la calle Camino Real y cercanía a la avenida Arterial, Vía A14, y la avenida 28 de Julio, permitiendo conexión con importantes ejes de la ciudad.",

      "Como áreas comunes y equipamiento urbano, Camino Real contempla Pórtico de Ingreso, parques temáticos, senderos inspirados en antiguos caminos de piedra, Zona Pet-Friendly, ciclovías internas, gimnasio al aire libre, juegos infantiles y zonas de parrillas.",

      "INFORMACIÓN LEGAL: El predio matriz se encuentra inscrito en el Registro de Predios de la Oficina Registral de Huancayo.",

      "Los titulares registrales son ANCOSUR S.A.C., con RUC N.° 20601146682, e INMOBILIARIA Y CONGLOMERADO INKA HOUSE S.A., con RUC N.° 20609015251, según consta en el asiento C00003 de la partida correspondiente.",

      "El proyecto se encuentra en etapa de habilitación urbana y preventa de lotes. Las áreas, medidas perimétricas y ubicaciones consignadas en los planos son referenciales y pueden estar sujetas a variaciones técnicas durante la ejecución y recepción de obras.",

      "Las áreas definitivas serán las establecidas en la memoria descriptiva e inscripción de la subdivisión o independización definitiva en los Registros Públicos.",

      "ACABADOS Y URBANIZACIÓN: El proyecto contempla redes de agua potable, alcantarillado, electrificación, alumbrado público y tratamiento de vías, pistas y veredas, de acuerdo con la normativa vigente.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur, en alianza con Inka House, respalda el proyecto con experiencia en el sector inmobiliario de la región central y múltiples proyectos desarrollados.",

      "Se informa al consumidor que puede verificar el historial de los proveedores mediante el portal Mira a Quién le Compras de Indecopi y la Central de Información de Promotores Inmobiliarios.",

      "Para recibir asesoría sobre financiamiento directo, precios y disponibilidad, puede visitar las oficinas o comunicarse con un asesor autorizado.",
    ],

    documents: [
      createDocument(
        "camino-real",
        "Resolución de habilitación urbana",
        "resolucion-hu.pdf"
      ),
      createDocument(
        "camino-real",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "camino-real",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "camino-real",
        "Ficha RUC - ANCOSUR",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "camino-real",
        "Impuesto predial - ANCOSUR",
        "impuesto-predial.pdf"
      ),
      createDocument(
        "camino-real",
        "PR y HR - ANCOSUR",
        "pr-hr.pdf"
      ),
      createDocument(
        "camino-real",
        "Ficha RUC - Inka House",
        "ficha-ruc-inka-house.pdf"
      ),
      createDocument(
        "camino-real",
        "Impuesto predial - Inka House",
        "impuesto-predial-inka-house.pdf"
      ),
      createDocument(
        "camino-real",
        "PR y HR - Inka House",
        "pr-hr-inka-house.pdf"
      ),
    ],
  },

  /* ======================================================
     NEO ORIGEN
  ====================================================== */

  {
    slug: "neo-origen",
    name: "Origen",
    projectRoute: "/neo-origen",
    companyName: "STRATON S.A.C.",
    ruc: "20607754358",
    fiscalAddress: "Av. Huancayo N.° 585",
    contactPhone: "971 069 763",
    projectAddress:
      "Esquina de Jr. Libertad N.° 1197 y Pasaje Mariscal Cáceres N.° 301-303, El Tambo, Huancayo, Junín",

    description: [
      "Edificio Origen es un proyecto inmobiliario ubicado en la esquina de Jr. Libertad N.° 1197 y Pasaje Mariscal Cáceres N.° 301-303, distrito de El Tambo, provincia de Huancayo, departamento de Junín.",

      "Consta de una edificación multifamiliar de 10 pisos más azotea y un semisótano destinado a estacionamientos vehiculares y cuartos técnicos. El proyecto cuenta con ascensor.",

      "Como áreas comunes dispone de Lobby de Ingreso con recepción, gimnasio equipado, zona de Biciparking, hall de distribución y áreas de circulación común.",

      "El proyecto ofrece departamentos de 1, 2 y 3 dormitorios, incluyendo tipologías Flat, Dúplex y Triplex, con áreas aproximadas desde 33.00 m² hasta 306.74 m² en unidades especiales.",

      "Departamentos compactos de 1 y 2 dormitorios: unidades desde 33.00 m² y 53.00 m² aproximadamente.",

      "Penthouses Triplex: unidades en los últimos niveles con áreas techadas desde 118.20 m² y terrazas privadas, alcanzando áreas totales ocupadas de hasta 306.74 m².",

      "INFORMACIÓN LEGAL: El terreno se encuentra inscrito en la Partida Electrónica N.° 11007512 del Registro de Predios de la Oficina Registral de Huancayo.",

      "El proyecto cuenta con Licencia de Edificación, Modalidad C, aprobada mediante Resolución N.° 081-2025-MDT/GDT y su ampliación o modificación correspondiente.",

      "Todas las unidades son bienes futuros. Las áreas y distribuciones de los planos son referenciales y las definitivas serán establecidas mediante la Declaratoria de Fábrica, Reglamento Interno e Independización.",

      "ACABADOS DEL INMUEBLE: Se consideran pisos laminados o similares en dormitorios y áreas sociales, cerámicos o porcelanatos en baños y cocinas, muebles bajos en cocina y aparatos sanitarios de marcas reconocidas.",

      "SISTEMA ESTRUCTURAL: El sistema sismorresistente contempla muros de concreto armado y albañilería conforme con la normativa vigente.",

      "ANTECEDENTES DEL PROVEEDOR: El proyecto está a cargo de Straton S.A.C., empresa constructora del ecosistema ANCOSUR con experiencia en proyectos inmobiliarios de la región.",

      "Para consultas adicionales, puede comunicarse mediante los canales oficiales de atención.",
    ],

    documents: [
      createDocument(
        "neo-origen",
        "Licencia de edificación",
        "licencia-edificacion.pdf"
      ),
      createDocument(
        "neo-origen",
        "Licencia de ampliación",
        "licencia-ampliacion.pdf"
      ),
      createDocument(
        "neo-origen",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "neo-origen",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "neo-origen",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "neo-origen",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
      createDocument(
        "neo-origen",
        "HR",
        "hr.pdf"
      ),
      createDocument(
        "neo-origen",
        "PU",
        "pu.pdf"
      ),
    ],
  },

  /* ======================================================
     ALTALUZ
  ====================================================== */

  {
    slug: "altaluz",
    name: "Altaluz",
    projectRoute: "/altaluz",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Calle Los Robles S/N, urbanización Alto La Merced, Huancayo, Junín",

    description: [
      "Altaluz es un proyecto inmobiliario ubicado en la calle Los Robles S/N, urbanización Alto La Merced, distrito de Huancayo, provincia de Huancayo, departamento de Junín.",

      "El edificio consta de una estructura multifamiliar de 5 pisos más azotea, diseñada para ofrecer privacidad y baja densidad habitacional.",

      "La edificación alcanza una altura aproximada de 12.60 metros lineales y cuenta con un área techada total aproximada de 800.37 m².",

      "Como áreas comunes dispone de Área Social, Sala de Juegos, Bar Privado y Zona de Parrillas.",

      "El proyecto ofrece departamentos de 2 y 3 dormitorios, con áreas aproximadas desde 61.00 m² hasta 77.00 m².",

      "Tipo 1, 61 m² aproximadamente: 2 dormitorios, 2 baños completos, sala, cocina y lavandería.",

      "Tipo 2, 77 m² aproximadamente: 3 dormitorios, 2 baños completos, sala, comedor y cocina.",

      "INFORMACIÓN LEGAL: El proyecto cuenta con Licencia de Edificación Nueva aprobada mediante Resolución N.° 121-2024-MPH/GDU, emitida por la Municipalidad Provincial de Huancayo con fecha 23 de mayo de 2024, expediente N.° 420036-2024.",

      "El administrado y titular consignado en la licencia del proyecto es STRATON S.A.C.",

      "Todas las unidades inmobiliarias son bienes futuros. Las áreas y medidas consignadas en los planos son referenciales y pueden variar durante el proceso constructivo.",

      "ACABADOS DEL INMUEBLE: Los departamentos contemplan cocina amoblada, dormitorios con closet y baños completos con revestimientos de calidad.",

      "ANTECEDENTES DEL PROVEEDOR: El desarrollo está a cargo de Straton S.A.C., empresa que forma parte del ecosistema ANCOSUR y cuenta con experiencia en la ejecución de viviendas unifamiliares y multifamiliares.",

      "Para consultas sobre disponibilidad y precios, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "altaluz",
        "Licencia de edificación",
        "licencia.pdf"
      ),
      createDocument(
        "altaluz",
        "Certificado registral inmobiliario",
        "cri.pdf"
      ),
      createDocument(
        "altaluz",
        "PU y HR",
        "pu-hr.pdf"
      ),
      createDocument(
        "altaluz",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "altaluz",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "altaluz",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
    ],
  },

  /* ======================================================
     SERENA
  ====================================================== */

  {
    slug: "serena",
    name: "Serena",
    projectRoute: "/serena",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Zona Corona del Fraile, Huancayo, Junín",

    description: [
      "Serena es un proyecto inmobiliario residencial ubicado en la zona de Corona del Fraile, distrito de Huancayo, provincia de Huancayo, departamento de Junín.",

      "Su ubicación, cerca de la Universidad Continental, busca ofrecer equilibrio entre conectividad urbana y un entorno residencial rodeado de naturaleza.",

      "El proyecto consta de una edificación multifamiliar de 5 pisos, diseñada con arquitectura de doble frontis para mejorar la iluminación natural, la ventilación y las vistas hacia jardines naturales.",

      "Como propuesta de valor destaca el entorno paisajístico, el diseño bioclimático, la iluminación natural de las cocinas, la ventilación cruzada y la cercanía a instituciones educativas y deportivas.",

      "El proyecto ofrece departamentos con áreas aproximadas desde 70.00 m² hasta 105.00 m².",

      "Tipología típica de 70 m² aproximadamente: 3 dormitorios, 3 baños completos, sala-comedor con vista exterior, cocina amoblada con barra y lavandería privada.",

      "INFORMACIÓN LEGAL: El desarrollo está a cargo de Straton S.A.C., empresa constructora del grupo inmobiliario, con respaldo comercial de Ancosur y Moro Capital.",

      "Todas las unidades son bienes futuros. Las áreas, distribuciones y medidas indicadas en los planos comerciales son referenciales y pueden presentar variaciones técnicas.",

      "ACABADOS DEL INMUEBLE: Los departamentos contemplan acabados de estilo minimalista, closets en dormitorios, muebles de cocina y revestimientos seleccionados para facilitar el mantenimiento.",

      "ANTECEDENTES DEL PROVEEDOR: Straton es una empresa especializada en Lean Construction y cuenta con experiencia en viviendas unifamiliares y proyectos multifamiliares.",

      "Para consultas sobre financiamiento y disponibilidad, puede comunicarse con los asesores autorizados.",
    ],

    documents: [
      createDocument(
        "serena",
        "Anteproyecto aprobado",
        "anteproyecto-aprobado.pdf"
      ),
      createDocument(
        "serena",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "serena",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "serena",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
      createDocument(
        "serena",
        "PU y HR",
        "pu-hr.pdf"
      ),
      createDocument(
        "serena",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     NEO EMPERATRIZ
  ====================================================== */

  {
    slug: "neo-emperatriz",
    name: "Neo Emperatriz",
    projectRoute: "/neo-emperatriz",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Av. San Carlos N.° 1481, Huancayo, Junín",

    description: [
      "Neo Emperatriz es un proyecto inmobiliario residencial ubicado en la Av. San Carlos 1481, distrito de Huancayo, provincia de Huancayo, departamento de Junín.",

      "El edificio consta de una estructura multifamiliar de 12 pisos más azotea y 1 nivel de sótano destinado a estacionamientos vehiculares y cuartos técnicos.",

      "La edificación dispone de ascensor y montacargas para facilitar el desplazamiento vertical de los residentes.",

      "Como áreas comunes y servicios dispone de Lobby de Ingreso, Oficina de Administración, Patio, Vestíbulo y Biciparking.",

      "El proyecto ofrece departamentos de 1, 2 y 3 dormitorios, con áreas aproximadas desde 47.00 m² hasta 116.00 m², incluyendo áreas libres en unidades seleccionadas.",

      "Las unidades típicas cuentan con sala-comedor, cocina, lavandería y dormitorios con iluminación natural.",

      "Algunos departamentos cuentan con terrazas privadas y áreas libres de hasta 62.00 m² aproximadamente.",

      "INFORMACIÓN LEGAL: El proyecto cuenta con Licencia de Edificación Nueva, Modalidad C, aprobada mediante Resolución N.° 0223-2024-MPH-GDU, emitida el 29 de agosto de 2024, expediente N.° 367439-2023.",

      "El administrado y titular del proyecto es ANCOSUR S.A.C.",

      "Todas las unidades son bienes futuros. Las áreas y distribuciones consignadas en los planos son referenciales y pueden variar durante el proceso constructivo.",

      "ACABADOS DEL INMUEBLE: Se consideran pisos de alto tránsito, revestimientos cerámicos en baños y cocinas y aparatos sanitarios de marcas reconocidas.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur S.A.C. cuenta con experiencia en el desarrollo de edificios multifamiliares y proyectos inmobiliarios en la región central.",

      "Para consultas sobre precios, financiamiento y disponibilidad, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "neo-emperatriz",
        "Licencia de regularización",
        "licencia-regulacion.pdf"
      ),
      createDocument(
        "neo-emperatriz",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "neo-emperatriz",
        "HR",
        "hr.pdf"
      ),
      createDocument(
        "neo-emperatriz",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "neo-emperatriz",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "neo-emperatriz",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
    ],
  },

  /* ======================================================
     MORO 416
  ====================================================== */

  {
    slug: "moro-416",
    name: "Moro 416",
    projectRoute: "/moro-416",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Intersección de Av. Ferrocarril N.° 787 y Av. Giráldez, Huancayo, Junín",

    description: [
      "Moro 416 es un proyecto inmobiliario de uso mixto, comercial, oficinas y residencial, ubicado en la intersección de la Av. Ferrocarril N.° 787 y la Av. Giráldez, Huancayo, Junín.",

      "El edificio proyecta una estructura de 19 pisos más azotea y 3 niveles de sótanos destinados a estacionamientos vehiculares y áreas técnicas.",

      "En el primer nivel contempla locales comerciales con frente a la Av. Giráldez y un paseo comercial.",

      "Los niveles de oficinas han sido diseñados para espacios corporativos modulares, con oficinas desde aproximadamente 41 m².",

      "Los niveles residenciales contemplan departamentos orientados a vivienda tradicional y renta corta.",

      "El proyecto dispone de un núcleo de circulación vertical con 2 ascensores.",

      "INFORMACIÓN LEGAL: El proyecto cuenta con Licencia de Edificación Nueva aprobada mediante Resolución N.° 108-2025-MPH/GDU, emitida el 14 de agosto de 2025, expediente N.° 570655-2025.",

      "El terreno se encuentra inscrito en la Partida Electrónica N.° 02017614 del Registro de Predios de la Oficina Registral de Huancayo. El titular registral es ANCOSUR S.A.C.",

      "TRANSPARENCIA FINANCIERA: El inmueble matriz cuenta con una primera hipoteca inscrita a favor del Banco de Crédito del Perú, conforme consta en el asiento D00008 de la partida registral.",

      "Todas las unidades son bienes futuros. Las áreas y medidas consignadas en los planos son referenciales y las finales serán establecidas en la Declaratoria de Fábrica e Independización.",

      "ACABADOS DEL INMUEBLE: El proyecto contempla materiales de alto tránsito y durabilidad, ventanería acústica y equipamiento sanitario moderno.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur S.A.C. es la empresa desarrolladora y cuenta con trayectoria en proyectos inmobiliarios de la región.",

      "Para consultas sobre oficinas, locales comerciales o departamentos, puede comunicarse con los asesores corporativos.",
    ],

    documents: [
      createDocument(
        "moro-416",
        "Anteproyecto aprobado",
        "anteproyecto-aprobado.pdf"
      ),
      createDocument(
        "moro-416",
        "Certificado registral inmobiliario",
        "cri.pdf"
      ),
      createDocument(
        "moro-416",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "moro-416",
        "HR y PU",
        "hr-pu.pdf"
      ),
      createDocument(
        "moro-416",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
      createDocument(
        "moro-416",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     ZENDA
  ====================================================== */

  {
    slug: "zenda",
    name: "Zenda",
    projectRoute: "/zenda",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Ubicación pendiente de actualización",

    description: [
      "La información descriptiva, técnica, comercial y legal de Zenda se encuentra pendiente de actualización.",

      "Para solicitar información vigente sobre el proyecto, puede comunicarse mediante los canales oficiales de ANCOSUR.",
    ],

    documents: [
      createDocument(
        "zenda",
        "Licencia de edificación",
        "licencia.pdf"
      ),
      createDocument(
        "zenda",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "zenda",
        "HR y PU",
        "hr-pu.pdf"
      ),
      createDocument(
        "zenda",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "zenda",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "zenda",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
    ],
  },

  /* ======================================================
     ZÁGARI
  ====================================================== */

  {
    slug: "zagari",
    name: "Zágari Resort Club",
    projectRoute: "https://zagari.pe/",
    companyName: "MORO CAPITAL S.A.C.",
    ruc: "20606690526",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Sector San Jacinto y Chincana, parcela 27, San Ramón, Chanchamayo, Junín",

    description: [
      "Zágari Resort Club es un proyecto de habilitación urbana de tipo vacacional ubicado en el sector San Jacinto y Chincana, parcela 27, distrito de San Ramón, provincia de Chanchamayo, departamento de Junín.",

      "El desarrollo consta de una parcelación de lotes de campo distribuidos en diferentes manzanas y diseñados para integrar la vivienda vacacional con el entorno natural.",

      "El diseño urbanístico ha sido elaborado para preservar la topografía y vegetación de la zona.",

      "INFORMACIÓN LEGAL: El terreno matriz se encuentra inscrito en la Partida Electrónica N.° 11027911 del Registro de Predios de la Oficina Registral de Selva Central, La Merced.",

      "El titular registral es MORO CAPITAL SOCIEDAD ANÓNIMA CERRADA.",

      "La partida matriz no presenta cargas ni gravámenes vigentes, de acuerdo con la información proporcionada, habiéndose levantado hipotecas anteriores.",

      "El proyecto se encuentra en etapa de venta de lotes o parcelas. Las áreas y medidas de los planos comerciales son referenciales y pueden estar sujetas a ajustes topográficos.",

      "URBANISMO Y ENTORNO: El proyecto está concebido bajo el concepto Resort Club, con terrenos para casas de campo o bungalows y una planificación orientada a maximizar las vistas y el acceso.",

      "ANTECEDENTES DEL PROVEEDOR: El desarrollo es promovido por Moro Capital S.A.C., empresa dedicada a la inversión y desarrollo inmobiliario.",

      "Para consultas sobre lotización, precios y financiamiento, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "zagari",
        "Anteproyecto",
        "anteproyecto.pdf"
      ),
      createDocument(
        "zagari",
        "Certificado registral inmobiliario",
        "cri.pdf"
      ),
      createDocument(
        "zagari",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "zagari",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     NEO 18
  ====================================================== */

  {
    slug: "neo-18",
    name: "Neo 18",
    projectRoute: "/neo-18",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Urb. San Juan de Chorrillos, Mz. A, lote 02, calle Mártires del Periodismo S/N, Huancayo, Junín",

    description: [
      "Neo 18 es un proyecto inmobiliario ubicado en la Urb. San Juan de Chorrillos, Mz. A, lote 02, calle Mártires del Periodismo S/N, con frente comercial a la Av. Calmell del Solar, cuadra 18, Huancayo, Junín.",

      "El edificio consta de una estructura multifamiliar de 13 pisos más azotea y 2 niveles de sótanos destinados a estacionamientos vehiculares y cuartos de máquinas.",

      "El proyecto cuenta con ascensor y montacoches para el acceso vehicular a los niveles inferiores.",

      "Como áreas comunes dispone de Lobby de Ingreso, Zona de Fogata, Zona de Parrillas, gimnasio equipado, Sala de Juegos y Sala de Reuniones o Coworking.",

      "El proyecto ofrece departamentos de 1, 2 y 3 dormitorios, con áreas aproximadas desde 56.00 m² hasta 68.00 m².",

      "Tipología de 2 dormitorios, aproximadamente 56.00 m²: sala-comedor, cocina, lavandería, dormitorio principal con baño, dormitorio secundario y baño compartido.",

      "Tipología de 3 dormitorios, aproximadamente 68.00 m²: sala-comedor con balcón, cocina cerrada, 3 dormitorios y 2 baños completos.",

      "INFORMACIÓN LEGAL: El proyecto cuenta con Licencia de Edificación Nueva aprobada mediante Resolución N.° 0165-2022-MPH-GDU y ampliación aprobada mediante Resolución N.° 0242-2022-MPH-GDU.",

      "La documentación proporcionada señala como administrado y titular del proyecto a ANCOSUR E.I.R.L.",

      "Todas las unidades son bienes futuros. Las áreas y medidas consignadas en los planos son referenciales y las definitivas serán establecidas en la Declaratoria de Fábrica e Independización.",

      "ACABADOS DEL INMUEBLE: Los departamentos contemplan acabados de piso a techo y muebles de cocina y closets según tipología.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur es una desarrolladora inmobiliaria con trayectoria en edificios de altura y proyectos residenciales.",

      "Para consultas sobre unidades disponibles y precios, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "neo-18",
        "Licencia de edificación",
        "licencia.pdf"
      ),
      createDocument(
        "neo-18",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "neo-18",
        "HR y PU",
        "hr-pu.pdf"
      ),
      createDocument(
        "neo-18",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "neo-18",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "neo-18",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
    ],
  },

  /* ======================================================
     LAS COLINAS DE MORO
  ====================================================== */

  {
    slug: "las-colinas-de-moro",
    name: "Las Colinas de Moro",
    projectRoute: "/colinas-de-moro",
    companyName: "MORO CAPITAL S.A.C.",
    ruc: "20606690526",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Paraje Añascancha, distrito de Mito, Concepción, Junín",

    description: [
      "Las Colinas de Moro es un proyecto de habilitación urbana residencial ubicado en el paraje Añascancha, distrito de Mito, provincia de Concepción, departamento de Junín.",

      "El desarrollo comprende una parcelación ordenada con lotes distribuidos en manzanas y articulados por vías proyectadas, incluyendo un eje vial principal con un ancho proyectado de 30 metros.",

      "INFORMACIÓN LEGAL: El terreno matriz, denominado registralmente Residencial Añascancha, se encuentra inscrito en la Partida Electrónica N.° 11021789 del Registro de Predios de la Oficina Registral de Huancayo.",

      "El titular registral es MORO CAPITAL SOCIEDAD ANÓNIMA CERRADA.",

      "La información proporcionada señala que la partida matriz se encuentra saneada y que se han levantado hipotecas anteriores.",

      "El proyecto se encuentra en etapa de preventa y habilitación. Las áreas, medidas y ubicaciones consignadas en los planos comerciales son referenciales y pueden presentar ajustes técnicos.",

      "URBANISMO Y ENTORNO: El proyecto aprovecha la topografía de la zona para ofrecer vistas despejadas y un entorno campestre con planificación de vías, áreas de aporte y zonificación residencial.",

      "ANTECEDENTES DEL PROVEEDOR: El desarrollo es promovido por Moro Capital S.A.C., empresa dedicada a la inversión y desarrollo inmobiliario.",

      "Para solicitar el plano de lotización, precios y opciones de financiamiento, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "colinas-de-moro",
        "Anteproyecto",
        "anteproyecto.pdf"
      ),
      createDocument(
        "colinas-de-moro",
        "Certificado registral inmobiliario",
        "cri.pdf"
      ),
      createDocument(
        "colinas-de-moro",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "colinas-de-moro",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     VITA
  ====================================================== */

  {
    slug: "vita",
    name: "Vita",
    projectRoute: "/vita",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Jr. Las Orquídeas N.° 207, urbanización San Carlos, Huancayo, Junín",

    description: [
      "Vita es un proyecto inmobiliario ubicado en el Jr. Las Orquídeas N.° 207, urbanización San Carlos, a la altura de la cuadra 13 de la Av. Calmell del Solar, Huancayo, Junín.",

      "El edificio consta de una estructura multifamiliar de 7 pisos más azotea y destaca por su baja densidad y exclusividad.",

      "El proyecto cuenta con ascensor, espacios para estacionamientos y almacenes privados en el primer nivel.",

      "Como áreas comunes dispone de Sky Garden, gimnasio y zona de parrillas.",

      "El proyecto ofrece departamentos con espacios amplios, iluminación natural y distribuciones orientadas a la privacidad y convivencia familiar.",

      "INFORMACIÓN LEGAL: El desarrollo es promovido por ANCOSUR y construido por STRATON bajo metodología Lean Construction, con respaldo de MORO CAPITAL.",

      "Todas las unidades son bienes futuros. Las áreas, medidas y distribuciones de los planos comerciales son referenciales y pueden presentar variaciones técnicas.",

      "ACABADOS DEL INMUEBLE: Los departamentos contemplan una propuesta de diseño enfocada en la personalización, el confort y la estética moderna.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur cuenta con experiencia en el desarrollo de proyectos inmobiliarios en zonas consolidadas como San Carlos y El Tambo.",

      "Para consultas sobre disponibilidad, precios y visitas, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "vita",
        "Licencia de edificación",
        "licencia.pdf"
      ),
      createDocument(
        "vita",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "vita",
        "HR y PU",
        "hr-pu.pdf"
      ),
      createDocument(
        "vita",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "vita",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "vita",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
    ],
  },

  /* ======================================================
     LAS TERRAZAS DE CONCEPCIÓN
  ====================================================== */

  {
    slug: "las-terrazas-de-concepcion",
    name: "Las Terrazas de Concepción",
    projectRoute: "/terrazas-concepcion",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20606690526",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Provincia de Concepción, Junín",

    description: [
      "Las Terrazas de Concepción es un proyecto de habilitación de lotes de campo ubicado en la provincia de Concepción, departamento de Junín.",

      "El proyecto aprovecha la topografía natural de colinas y terrazas para ofrecer vistas panorámicas del valle, cerca del cruce de Concepción y La Huaycha y de la Plaza Principal de Concepción.",

      "El desarrollo abarca un área aproximada de 8,173 m² y consta de 57 lotes de terreno rural acondicionado para casas de campo o viviendas vacacionales.",

      "La distribución contempla aproximadamente 2,514 m² de áreas comunes y zonas verdes.",

      "Como propuesta de valor dispone de Mirador del Valle, Parque Zonal, áreas verdes e instalaciones de agua y electricidad.",

      "El proyecto ofrece lotes con metrajes aproximados desde 90.00 m² hasta 174.00 m².",

      "INFORMACIÓN LEGAL: El terreno matriz se encuentra independizado y la modalidad de adquisición indicada es mediante Contrato de Compra-Venta Notarial.",

      "Las áreas y medidas consignadas en los planos comerciales son referenciales y las definitivas serán las que consten en la partida registral individualizada de cada predio.",

      "URBANISMO Y ENTORNO: El proyecto ha sido diseñado para respetar el entorno ecológico y promover un estilo de vida tranquilo y conectado con la naturaleza.",

      "ANTECEDENTES DEL PROVEEDOR: El proyecto cuenta con respaldo técnico y comercial del grupo inmobiliario para la ejecución de las obras de acondicionamiento y entrega de lotes.",

      "Para consultas sobre disponibilidad, precios de contado o financiamiento, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "terrazas-de-concepcion",
        "Contrato de compra-venta",
        "compra-venta.pdf"
      ),
      createDocument(
        "terrazas-de-concepcion",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "terrazas-de-concepcion",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },

  /* ======================================================
     ADAMANT
  ====================================================== */

  {
    slug: "adamant",
    name: "Adamant",
    projectRoute: "/adamant",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Urbanización San Carlos, Huancayo, Junín",

    description: [
      "Adamant es un proyecto inmobiliario ubicado en la urbanización San Carlos, distrito de Huancayo, provincia de Huancayo, departamento de Junín.",

      "Su concepto arquitectónico se inspira en la raíz etimológica del diamante, asociado con la solidez, diferenciación y permanencia.",

      "El edificio se proyecta como una estructura multifamiliar moderna desarrollada bajo estándares de construcción sismorresistente.",

      "Como propuesta de valor contempla diseño diferenciado, áreas de bienestar y espacios sociales dedicados a la convivencia familiar.",

      "El proyecto ofrece departamentos con distribuciones funcionales y una propuesta orientada a un producto residencial de alta gama.",

      "INFORMACIÓN LEGAL: El desarrollo es promovido por ANCOSUR y la construcción está a cargo de STRATON, bajo metodología Lean Construction, con respaldo de MORO CAPITAL.",

      "Todas las unidades son bienes futuros. Las áreas, medidas y detalles de diseño indicados en el material comercial son referenciales y pueden presentar variaciones técnicas.",

      "ACABADOS DEL INMUEBLE: Los departamentos contemplan acabados seleccionados para ofrecer durabilidad, iluminación y optimización de espacios.",

      "ANTECEDENTES DEL PROVEEDOR: Ancosur cuenta con experiencia en el desarrollo de viviendas unifamiliares y multifamiliares en zonas consolidadas de Huancayo.",

      "Para consultas sobre disponibilidad, reventa o alquileres, puede comunicarse con los asesores comerciales.",
    ],

    documents: [
      createDocument(
        "adamant",
        "Licencia de edificación",
        "licencia.pdf"
      ),
      createDocument(
        "adamant",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "adamant",
        "HR y PU",
        "hr-pu.pdf"
      ),
      createDocument(
        "adamant",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "adamant",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "adamant",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
    ],
  },

  /* ======================================================
     DOVLE
  ====================================================== */

  {
    slug: "dovle",
    name: "Dovle",
    projectRoute: "/dovle",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Ubicación pendiente de actualización",

    description: [
      "La información descriptiva, técnica, comercial y legal del proyecto Dovle se encuentra pendiente de actualización.",

      "Para solicitar información vigente sobre el proyecto, puede comunicarse mediante los canales oficiales de ANCOSUR.",
    ],

    documents: [
      createDocument(
        "dovle",
        "Licencia de edificación",
        "licencia.pdf"
      ),
      createDocument(
        "dovle",
        "HR y PU",
        "hr-pu.pdf"
      ),
      createDocument(
        "dovle",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "dovle",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
      createDocument(
        "dovle",
        "Impuesto predial",
        "impuesto-predial.pdf"
      ),
    ],
  },

  /* ======================================================
     CASA ALBAR
  ====================================================== */

  {
    slug: "casa-albar",
    name: "Casa Albar",
    projectRoute: "/casa-albar",
    companyName: "ANCOSUR S.A.C.",
    ruc: "20601146682",
    fiscalAddress: "Av. San Carlos N.° 1481",
    contactPhone: "971 069 763",
    projectAddress:
      "Ubicación pendiente de actualización",

    description: [
      "La información descriptiva, técnica y comercial del proyecto Casa Albar se encuentra pendiente de actualización.",

      "Los documentos legales disponibles del proyecto pueden consultarse en esta sección.",

      "Para solicitar información vigente, puede comunicarse mediante los canales oficiales de ANCOSUR.",
    ],

    documents: [
      createDocument(
        "casa-albar",
        "Licencia de edificación",
        "licencia.pdf"
      ),
      createDocument(
        "casa-albar",
        "Copia literal",
        "copia-literal.pdf"
      ),
      createDocument(
        "casa-albar",
        "Ficha RUC",
        "ficha-ruc.pdf"
      ),
      createDocument(
        "casa-albar",
        "Vigencia de poder",
        "vigencia-poder.pdf"
      ),
    ],
  },
];

export const getTransparencyProject = (
  slug: string
) =>
  transparencyProjects.find(
    (project) => project.slug === slug
  );