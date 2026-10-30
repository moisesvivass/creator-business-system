// Spanish copy, same shape as `en.ts`. What the creator publishes (captions, titles, product
// names) stays in English, as it does on her accounts; table names stay as they are in the code.
import type { Copy } from "./index";

export const es: Copy = {
  ui: {
    pageTitle: "Creator Business System",
    brand: "Creator Business System",
    nav: {
      story: "Historia",
      system: "Sistema",
      stores: "Tiendas",
      mediaKit: "Media kit",
    },
    hero: {
      kicker: "Un sistema real, con números ficticios",
      titleBefore: "El sistema",
      titleEm: "detrás",
      titleAfter: "del negocio de una creadora",
      lede: "Una creadora de contenido graba. Un sistema se encarga de todo lo que rodea al video: mide cómo le va, encuentra los productos, arma los links de afiliado, prepara las respuestas y me avisa cuando algo necesita una decisión.",
      aside:
        "Lo construí con Claude Code, a partir de un dashboard que terminó mutando en un sistema con sus propias reglas. Cada número de esta página es inventado.",
      signature: "— Moises Vivas, Toronto",
    },
    footer: {
      note: "El sistema y sus reglas son reales; cada número es ficticio. Hecho con",
    },
    story: {
      kicker: "La historia",
      title: "Cómo llegué aquí",
      intro: "En mis palabras, como quien lo construyó.",
    },
    system: {
      kicker: "El sistema",
      title: "Una base de datos para todo el negocio",
      intro:
        "Cada video se guarda una vez, junto con cada plataforma donde salió y cada producto que muestra. Las plataformas mandan sus números solas; jobs pequeños mantienen todo al día y me avisan cuando hace falta una persona.",
      journeyTitle: "Desde que se publica un video",
      phoneScreens: "Pantallas del teléfono, desliza para ver cada paso",
      prev: "Paso anterior",
      next: "Paso siguiente",
      screens: {
        alertTime: "Alerta, 6:42 pm",
        saved: "Video nuevo guardado",
        updates: "Vistas, guardados y compartidos se actualizan cada día.",
        found: "Encontrado en el video",
        sources: [
          "API de Sephora: precio en Canadá",
          "API de Amazon: vendido por Amazon.ca",
          "API de Amazon: vendido por la marca",
        ],
        written: "Escrito para cada plataforma",
        messageTime: "Mensaje para mí, 7:05 pm",
        ready: "El flujo de BLUSH está listo",
        summary: [
          "3 productos encontrados",
          "Cada link de afiliado abierto y revisado",
          "DM redactado, palabra clave BLUSH",
          "Short y 2 pins en borrador",
        ],
        waiting: "Guardado como borrador. Te espera a ti.",
        decision: "Tu decisión",
        start: "Start",
        igMessage: "Mensaje de Instagram",
      },
    },
    actors: { system: "Solo", agent: "Agente de AI", human: "Yo" },
    data: {
      kicker: "La base de datos",
      title: "Un lugar al que le pregunto todo",
      intro:
        "Cada video se guarda una vez, ligado a cada plataforma donde salió y a cada producto que muestra. Así, en vez de abrir un dashboard, le pregunto a Claude y responde desde la base de datos. Y puedo preguntar desde cualquier lugar: Remote Control conecta mi teléfono a la sesión que corre el sistema, así que respondo desde la calle y el trabajo sigue.",
      checking: "Revisando",
      placeholder: "Pregunta sobre la cuenta",
      caption: "Toca una pregunta. Respuestas ficticias",
      memoryTitle: "Lo que recuerda",
      memoryIntro:
        "Cuatro tipos de memoria, una base de datos. Las partes que Claude revisa se iluminan. Toca cualquiera para preguntar por ella.",
      underHood:
        "Por dentro: 13 tablas en PostgreSQL en Railway, con respaldo cada semana. Los nombres grises son los reales.",
      and: "y",
    },
    stores: {
      kicker: "Las tiendas",
      title: "Cómo cada producto encuentra su tienda",
      intro:
        "Cada producto de un video termina en un lugar donde una seguidora lo compra con un toque. Sigue uno: cómo decide el sistema adónde va, las revisiones antes de salir y cómo le llega el link a la gente.",
      follow: "Sigue un producto",
      step: "Paso",
      landsIn: "Termina en",
      beforeOut: "Antes de salir",
      groups: {
        store: "Donde la gente compra",
        channel: "Cómo le llega el link",
      },
    },
    jobs: {
      kicker: "Corre solo",
      title: "Trabaja todo el día, y solo escribe cuando importa",
      intro:
        "Jobs pequeños corren con horario de la mañana a la noche. Casi siempre no encuentran nada y se quedan callados. Cuando uno encuentra algo que una persona debe ver, me llega un mensaje corto al teléfono.",
      dayLabel: "Un lunes, acelerado. Cada marca es un job corriendo",
      day: "Lunes",
      nothingYet: "Nada todavía. Solo escribe cuando algo me necesita.",
    },
    kit: {
      kicker: "En vivo",
      title: "Un media kit que se actualiza solo",
      intro:
        "La página que ven las marcas cuando quieren trabajar con la cuenta. Cada número viene de las APIs de las plataformas a través de la base de datos, así que siempre está al día y nadie escribe una cifra. Aquí va una copia ficticia, en vivo.",
      howTitle: "Cómo funciona cada parte",
      footnote:
        "Creadora y números ficticios. La página y sus reglas son reales.",
    },
  },

  story: {
    paragraphs: [
      "Siempre fui quien lee los insights: el alcance, los guardados, el post que despegó y el que no. Trabajando con una creadora de belleza, me di cuenta de que la app te muestra los números de a un post, pero no te deja guardarlos, compararlos ni cruzarlos con nada más. La API de Instagram sí. Así que saqué los datos y armé mi propio dashboard con Claude Code. En parte para entender la cuenta. En parte para ver hasta dónde podía llegar.",
      "Llegó más lejos de lo que esperaba. Comparando post tras post, el análisis apuntaba siempre a los mismos pocos formatos. La cuenta se apoyó en ellos, los números se movieron y algunos videos llegaron a millones de vistas.",
      "Ahí el dashboard se volvió un sistema. No estaba fallando; se había quedado chico. Hoy una base de datos guarda cada video, cada plataforma donde salió, cada producto que muestra y cada link de afiliado, Amazon incluido, y mantiene el media kit al día sola. Abro el proyecto con Claude y pregunto: qué funcionó esta semana, a qué video le faltan los links, cómo va Pinterest contra Instagram. La respuesta llega en vivo, y la siguiente pregunta parte de ahí.",
    ],
  },

  stages: [
    {
      actor: "system",
      title: "Se publica un video",
      detail:
        "El sistema lo detecta en menos de 15 minutos y lo guarda. Sus vistas, guardados y compartidos se actualizan cada día.",
    },
    {
      actor: "agent",
      title: "La AI encuentra sus productos",
      detail:
        "Lo arranco con un comando. Un agente de AI lee el video y su caption y nombra cada producto; las APIs de Amazon y Sephora agregan el precio.",
    },
    {
      actor: "agent",
      title: "Borradores para otras plataformas",
      detail:
        "El mismo video queda en borrador como Short de YouTube y pins de Pinterest, cada uno reescrito para cómo se busca ahí.",
    },
    {
      actor: "human",
      title: "Se detiene por mi decisión",
      detail:
        "Los links de afiliado quedan armados y revisados, y el mensaje redactado. Recibo un resumen, lo reviso y presiono Start. Nada sale sin mí.",
    },
    {
      actor: "system",
      title: "Las seguidoras reciben los links",
      detail:
        "Quien comenta la palabra clave recibe los productos por mensaje, con un botón por tienda.",
    },
  ],

  drawers: [
    {
      name: "Los videos",
      answers: "¿Cómo va un video, y adónde llegó?",
      parts: [
        {
          name: "Posts",
          tech: "posts",
          holds: "Alcance, guardados, compartidos y tiempo de visionado",
        },
        {
          name: "Historial de posts",
          tech: "post_metric_snapshots",
          holds: "Los números de cada post, día a día",
        },
        {
          name: "Videos",
          tech: "content_pieces",
          holds: "El formato y el tema de cada video",
        },
        {
          name: "Plataformas",
          tech: "publications",
          holds: "Adónde llegó cada video",
        },
      ],
    },
    {
      name: "Los productos",
      answers: "¿Qué hay en este video, y dónde se compra?",
      parts: [
        {
          name: "Productos",
          tech: "affiliate_catalog",
          holds: "Cada producto y su link de afiliado",
        },
        {
          name: "Listas de la AI",
          tech: "muse_reports",
          holds: "La lista de una segunda AI para cada video",
        },
      ],
    },
    {
      name: "Pinterest",
      answers: "¿Qué pins están funcionando?",
      parts: [
        {
          name: "Pins",
          tech: "pinterest_pins",
          holds: "Cada pin de la cuenta",
        },
        {
          name: "Métricas de pins",
          tech: "pinterest_pin_days",
          holds: "Vistas, guardados y clics, por día",
        },
      ],
    },
    {
      name: "La cuenta",
      answers: "¿Cómo crece la cuenta, y quién quiere trabajar con ella?",
      parts: [
        {
          name: "Historial de la cuenta",
          tech: "instagram_snapshots",
          holds: "Seguidores y audiencia, cada día",
        },
        {
          name: "Consultas de marcas",
          tech: "brand_contacts",
          holds: "Cada marca que escribió",
        },
      ],
    },
  ],

  stores: [
    {
      name: "Amazon Canada",
      kind: "store",
      role: "Una lista por video en el storefront de la creadora",
      howWeConnect:
        "Producto, precio y vendedor vienen de la API de Amazon. El DM usa el link corto de Amazon, el único que abre la app de Amazon desde Instagram.",
    },
    {
      name: "ShopMy (Sephora y más)",
      kind: "store",
      role: "Una colección por video, con la tienda ordenada por formato",
      howWeConnect:
        "Los precios de Sephora vienen de la API de su sitio. ShopMy no tiene, así que los links y las colecciones se arman en el navegador, y el video se ve dentro de la tienda.",
    },
    {
      name: "DM de Instagram",
      kind: "channel",
      role: "Comenta una palabra clave y recibe un mensaje con un botón por tienda",
      howWeConnect:
        "El flujo se redacta en la herramienta de automatización. Yo lo reviso y presiono Start.",
    },
    {
      name: "Pinterest",
      kind: "channel",
      role: "Pins que la gente busca como en Google, hechos con videos que ya existen",
      howWeConnect:
        "Los pins salen después de que los apruebo. La API guarda sus números en la base cada día.",
    },
  ],

  productPaths: [
    {
      product: "Cream blush",
      steps: [
        {
          label: "¿Ya está en el catálogo?",
          result: "Sí, de un video anterior",
          outcome: "yes",
        },
        { label: "Buscarlo", result: "No hace falta", outcome: "skip" },
        {
          label: "Probar que es el producto",
          result: "El link sigue llegando al mismo rubor, mismo tono",
          outcome: "yes",
        },
        {
          label: "Elegir la tienda",
          result: "Sephora lo tiene, así que Sephora primero",
          outcome: "yes",
        },
      ],
      landsIn: "Sephora, a través de ShopMy",
    },
    {
      product: "Drugstore cheek tint",
      steps: [
        {
          label: "¿Ya está en el catálogo?",
          result: "No, primera vez en un video",
          outcome: "no",
        },
        {
          label: "Buscarlo",
          result: "API de Amazon: vendido por Amazon.ca, $14",
          outcome: "yes",
        },
        {
          label: "Probar que es el producto",
          result: "La página nombra el tinte y el tono exactos",
          outcome: "yes",
        },
        {
          label: "Elegir la tienda",
          result: "No está en Sephora; amazon.ca tiene el producto exacto",
          outcome: "yes",
        },
      ],
      landsIn: "Amazon Canada",
    },
    {
      product: "Body glow oil",
      steps: [
        {
          label: "¿Ya está en el catálogo?",
          result: "No, primera vez en un video",
          outcome: "no",
        },
        {
          label: "Buscarlo",
          result: "No está en Sephora ni en amazon.ca",
          outcome: "no",
        },
        {
          label: "Probar que es el producto",
          result: "La página de la marca, cargada y revisada",
          outcome: "yes",
        },
        {
          label: "Elegir la tienda",
          result: "Otra tienda de ShopMy que envía a Canadá y Estados Unidos",
          outcome: "yes",
        },
      ],
      landsIn: "La tienda de la marca, a través de ShopMy",
    },
  ],

  checks: [
    { stamp: "El agente contó cada producto" },
    { stamp: "Un script probó cada link" },
    { stamp: "Un segundo agente lo revisó" },
    { stamp: "Esperándome: Start", waits: true },
  ],

  jobs: [
    {
      name: "Revisión de videos nuevos",
      when: "Cada 15 min",
      does: "Detecta un video nuevo y lo guarda",
      at: [],
      everyMinutes: 15,
    },
    {
      name: "Actualización diaria",
      when: "8:00",
      does: "Números de la cuenta, audiencia y cada post",
      at: [8],
    },
    {
      name: "Actualización de Pinterest",
      when: "8:30",
      does: "Vistas, guardados y clics de cada pin",
      at: [8.5],
    },
    {
      name: "Revisión de datos",
      when: "Cada 6 h",
      does: "Se asegura de que los números sigan llegando",
      at: [2, 8, 14, 20],
    },
    {
      name: "Revisiones del lunes",
      when: "Lun 5:00",
      does: "Accesos a plataformas y el formulario",
      at: [5],
    },
    {
      name: "Reporte semanal",
      when: "Lun 9:00",
      does: "Qué salió y qué falta",
      at: [9],
    },
    {
      name: "Cuando algo pasa",
      when: "Cualquier hora",
      does: "Escribe una marca, hay un borrador listo",
      at: [14.25, 19.25],
      onEvent: true,
    },
  ],

  alerts: [
    {
      at: 9,
      title: "Reporte semanal",
      body: "Salieron 5 videos. A 2 les falta un pin y a 1 su mensaje de productos.",
    },
    {
      at: 14.25,
      title: "Escribió una marca",
      body: "Una marca de skincare pidió el media kit. Está guardada y en tu correo.",
    },
    {
      at: 18.75,
      title: "Video nuevo detectado",
      body: '"Cream blush vs a drugstore alternative" está publicado. Todavía no tiene mensaje de productos.',
    },
    {
      at: 19.25,
      title: "El flujo de BLUSH está listo",
      body: "3 productos, cada link revisado. Te espera: Start.",
    },
  ],

  kitNotes: [
    {
      block: "hero",
      title: "Dos números arriba",
      how: "Seguidores en Instagram, TikTok y YouTube, leídos de la API de cada plataforma y sumados. Nadie los escribe.",
    },
    {
      block: "reels",
      title: "Los cinco mejores videos",
      how: "Los cinco Reels con más alcance, directo de la base de datos. Cuando un video nuevo supera a uno, toma su lugar solo. Incluye los guardados, un número que casi ningún media kit muestra.",
    },
    {
      block: "platforms",
      title: "Cada plataforma, un total",
      how: "Cada fila lleva al perfil, para que una marca lo compruebe. Un número que deja de llegar se oculta, nunca se muestra en cero.",
    },
    {
      block: "audience",
      title: "Quién está mirando",
      how: "Género, edad y países de los datos de audiencia de Instagram, guardados cada día. La interacción es por Reel, como la mide la industria.",
    },
    {
      block: "contact",
      title: "Un formulario que me llega",
      how: "El mensaje de una marca se guarda en la base de datos, se reenvía al correo y me llega al teléfono.",
    },
    {
      block: "design",
      title: "Tuya para darle forma",
      how: "Es nuestra propia página en nuestro propio dominio, no una plantilla. El diseño, el orden y las palabras cambian cuando queramos. Solo los números no se tocan: siempre vienen de las APIs.",
    },
  ],

  askExamples: [
    {
      chip: "Video del rubor",
      question: "¿Cómo va el video del rubor en crema?",
      answer:
        "Muy bien. Lo vieron 18.4K personas, más o menos el doble de lo que suele tener un video, y la mayoría de los guardados llegaron el primer día.",
      readFrom: ["posts", "post_metric_snapshots"],
      trend: {
        label: "Personas alcanzadas, primeros 7 días",
        values: [2.1, 7.8, 11.9, 14.6, 16.5, 17.6, 18.4],
      },
      facts: [
        ["Video habitual", "9.1K"],
        ["Guardados", "1,120"],
      ],
    },
    {
      chip: "¿Falta algo?",
      question: "¿Le falta algo a los videos de esta semana?",
      answer: "Solo dos cosas. Todo lo demás ya salió en todas partes.",
      readFrom: ["content_pieces", "publications"],
      facts: [
        ["Brow trick", "Le falta su pin"],
        ["Fall lip combos", "Le falta un Short"],
      ],
    },
    {
      chip: "Pins",
      question: "¿Cómo van los pins?",
      answer:
        "El pin del rubor es el mejor del mes. Sigue llevando gente a los productos días después de publicado el video.",
      readFrom: ["pinterest_pin_days"],
      facts: [
        ["Vistas desde el viernes", "1,240"],
        ["Guardados", "86"],
        ["Clics a productos", "41"],
      ],
    },
    {
      chip: "Qué grabar",
      question: "¿Qué grabamos ahora?",
      answer:
        "Otro look ID. Cuatro de los últimos cinco superaron el alcance habitual, y los rubores en crema aparecen en seis de los diez videos más vistos.",
      readFrom: ["posts", "affiliate_catalog"],
    },
    {
      chip: "Marcas",
      question: "¿Escribió alguna marca?",
      answer:
        "Sí, una esta semana. Una marca de skincare pidió el media kit. Está guardada y el correo está en tu bandeja.",
      readFrom: ["brand_contacts"],
    },
    {
      chip: "Revisión de AI",
      question: "¿La segunda AI encontró algo que se me pasó?",
      answer:
        "Una cosa. Vio un setting spray en los últimos segundos del video que todavía no está en el mensaje.",
      readFrom: ["muse_reports", "affiliate_catalog"],
    },
    {
      chip: "Pins nuevos",
      question: "¿Qué pins salieron esta semana?",
      answer:
        "Tres: un collage de los fall lip combos, el video del rubor como pin de video y un pin de foto del brow trick.",
      readFrom: ["pinterest_pins"],
    },
    {
      chip: "Seguidores",
      question: "¿Cuántos seguidores ganamos este mes?",
      answer: "Unos 2,300, la mayoría la semana del look de la alfombra roja.",
      readFrom: ["instagram_snapshots", "posts"],
      trend: {
        label: "Seguidores nuevos por semana",
        values: [310, 1240, 450, 300],
      },
    },
  ],
};
