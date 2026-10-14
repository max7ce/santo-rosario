/* =========================================================
   Santo Rosario · UCB — Contenido
   Textos litúrgicos y devocionales. Las citas bíblicas son
   fragmentos breves; verificar con la traducción que adopte
   la Pastoral Universitaria antes de la publicación oficial.
   ========================================================= */

const ORACIONES = {
  senal: {
    titulo: "Señal de la Cruz",
    guia: "Por la señal de la Santa Cruz, de nuestros enemigos líbranos, Señor, Dios nuestro.",
    todos: "En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."
  },
  senalFinal: {
    titulo: "Señal de la Cruz",
    todos: "En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."
  },
  contricion: {
    titulo: "Acto de contrición",
    todos: "Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Tú quien eres, bondad infinita, y porque te amo sobre todas las cosas, me pesa de todo corazón haberte ofendido; también me pesa porque puedes castigarme con las penas del infierno. Ayudado de tu divina gracia, propongo firmemente nunca más pecar, confesarme y cumplir la penitencia que me fuere impuesta. Amén."
  },
  ofrecimiento: {
    titulo: "Ofrecimiento",
    guia: "Señor Jesús, te ofrecemos este Santo Rosario que vamos a rezar contemplando contigo los misterios de nuestra redención. Concédenos, por la intercesión de María, tu Madre y nuestra Madre, las virtudes que necesitamos para rezarlo bien y la gracia de vivir como verdaderos discípulos tuyos.",
    todos: "Lo ofrecemos por la Iglesia, por el Santo Padre, por nuestra patria Bolivia, por toda la comunidad de la Universidad Católica Boliviana —estudiantes, docentes y administrativos— y por las intenciones que cada uno lleva en su corazón. Amén.",
    nota: "Momento de silencio: presenta al Señor tus intenciones personales."
  },
  credo: {
    titulo: "Credo",
    todos: "Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén."
  },
  padreNuestro: {
    titulo: "Padre Nuestro",
    guia: "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.",
    todos: "Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén."
  },
  aveMaria: {
    titulo: "Ave María",
    guia: "Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.",
    todos: "Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén."
  },
  gloria: {
    titulo: "Gloria",
    guia: "Gloria al Padre, y al Hijo, y al Espíritu Santo.",
    todos: "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén."
  },
  jaculatoriaMaria: {
    titulo: "Jaculatoria",
    guia: "María, Madre de gracia, Madre de misericordia,",
    todos: "en la vida y en la muerte ampáranos, oh gran Señora."
  },
  jaculatoriaFatima: {
    titulo: "Oración de Fátima",
    guia: "Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno,",
    todos: "lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia."
  },
  salve: {
    titulo: "Salve",
    todos: "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María!"
  },
  ruega: {
    guia: "Ruega por nosotros, santa Madre de Dios.",
    todos: "Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén."
  },
  oremosLetanias: {
    titulo: "Oremos",
    guia: "Te pedimos, Señor, que nosotros, tus siervos, gocemos siempre de salud de alma y cuerpo; y por la gloriosa intercesión de la bienaventurada siempre Virgen María, seamos librados de las tristezas presentes y gocemos de las alegrías eternas.",
    todos: "Por Cristo nuestro Señor. Amén."
  },
  oracionFinal: {
    titulo: "Oración conclusiva",
    guia: "Oh Dios, cuyo Hijo unigénito, con su vida, muerte y resurrección, nos alcanzó el premio de la vida eterna; concédenos, a los que recordamos estos misterios en el santo Rosario de la bienaventurada Virgen María, imitar lo que contienen y alcanzar lo que prometen.",
    todos: "Por Jesucristo nuestro Señor. Amén."
  },
  bajoTuAmparo: {
    titulo: "Bajo tu amparo",
    todos: "Bajo tu amparo nos acogemos, santa Madre de Dios; no deseches las súplicas que te dirigimos en nuestras necesidades, antes bien, líbranos de todo peligro, oh Virgen gloriosa y bendita. Amén."
  }
};

const ADVOCACIONES = {
  chaguaya: {
    titulo: "A Nuestra Señora de Chaguaya",
    subtitulo: "Santuario de Chaguaya · Tarija",
    todos: "Virgen de Chaguaya, Madre y Señora de Tarija: a tu santuario peregrinan, año tras año, los hijos de esta tierra con fe sencilla y corazón agradecido. Mira con amor a nuestras familias, a nuestros campos y a nuestra ciudad. Acompaña a los estudiantes, docentes y trabajadores de nuestra Universidad, para que busquemos la verdad en la caridad y pongamos nuestros talentos al servicio de los demás. Consuela a los que sufren, fortalece a los que dudan y guíanos siempre hacia tu Hijo Jesús. Amén."
  },
  copacabana: {
    titulo: "A Nuestra Señora de Copacabana",
    subtitulo: "Reina de Bolivia",
    todos: "Virgen de Copacabana, Reina de Bolivia, Madre morena junto al lago: bajo tu manto ponemos a nuestra patria entera, con sus pueblos, sus culturas y sus esperanzas. Alcánzanos el don de la paz, la unidad y la justicia; protege a los pobres, a los enfermos y a los que están lejos de su hogar. Haz que, como tú, sepamos acoger la Palabra de Dios y llevarla a nuestros hermanos. Amén."
  }
};

const INTENCIONES_INICIALES = [
  "Por el aumento de la fe",
  "Por el aumento de la esperanza",
  "Por el aumento de la caridad"
];

const MISTERIOS = {
  gozosos: {
    nombre: "Gozosos",
    dias: "Lunes y sábado",
    lista: [
      {
        titulo: "La Anunciación del Ángel a María",
        cita: "Lc 1, 30-31.38",
        lectura: "«No temas, María, porque Dios te ha favorecido. Concebirás y darás a luz un hijo, y le pondrás por nombre Jesús». María dijo entonces: «Yo soy la servidora del Señor, que se cumpla en mí lo que has dicho».",
        fruto: "La humildad",
        meditacion: "María escucha, pregunta y confía. Pidamos un corazón disponible para decir «sí» a lo que Dios nos pide hoy."
      },
      {
        titulo: "La Visitación de María a su prima Isabel",
        cita: "Lc 1, 39.41-42",
        lectura: "María partió y fue sin demora a un pueblo de la montaña de Judá. Cuando Isabel oyó el saludo de María, el niño saltó de alegría en su seno, e Isabel, llena del Espíritu Santo, exclamó: «¡Tú eres bendita entre todas las mujeres y bendito es el fruto de tu vientre!».",
        fruto: "La caridad con el prójimo",
        meditacion: "María se pone en camino para servir. Pidamos la gracia de salir al encuentro de quien nos necesita."
      },
      {
        titulo: "El Nacimiento del Hijo de Dios en Belén",
        cita: "Lc 2, 6-7",
        lectura: "Mientras se encontraban en Belén, le llegó el tiempo de ser madre; y María dio a luz a su Hijo primogénito, lo envolvió en pañales y lo acostó en un pesebre, porque no había lugar para ellos en el albergue.",
        fruto: "El desprendimiento y la pobreza de espíritu",
        meditacion: "Dios se hace pequeño y cercano. Pidamos un corazón sencillo, libre de lo que nos aleja de Él."
      },
      {
        titulo: "La Presentación de Jesús en el Templo",
        cita: "Lc 2, 22.34-35",
        lectura: "Llevaron al niño a Jerusalén para presentarlo al Señor. Simeón los bendijo y dijo a María: «Este niño será causa de caída y de elevación para muchos en Israel; será signo de contradicción, y a ti misma una espada te atravesará el corazón».",
        fruto: "La obediencia y la pureza",
        meditacion: "María y José cumplen la Ley con fidelidad. Pidamos ofrecer a Dios nuestra vida entera, también lo que nos cuesta."
      },
      {
        titulo: "El Niño Jesús perdido y hallado en el Templo",
        cita: "Lc 2, 46.49",
        lectura: "Al tercer día, lo hallaron en el Templo, sentado en medio de los doctores de la Ley, escuchándolos y haciéndoles preguntas. Jesús les respondió: «¿No sabían que yo debo ocuparme de los asuntos de mi Padre?».",
        fruto: "Buscar a Dios en todas las cosas",
        meditacion: "Jesús escucha y pregunta entre los maestros. Pidamos que nuestro estudio y trabajo sean también búsqueda de Dios."
      }
    ]
  },
  luminosos: {
    nombre: "Luminosos",
    dias: "Jueves",
    lista: [
      {
        titulo: "El Bautismo de Jesús en el Jordán",
        cita: "Mt 3, 16-17",
        lectura: "Apenas fue bautizado, Jesús salió del agua. En ese momento se abrieron los cielos, y vio al Espíritu de Dios descender como una paloma y dirigirse hacia él. Y se oyó una voz del cielo que decía: «Este es mi Hijo muy querido, en quien tengo puesta toda mi predilección».",
        fruto: "La fidelidad a las promesas del Bautismo",
        meditacion: "También nosotros somos hijos amados del Padre. Pidamos vivir con coherencia la vida nueva del Bautismo."
      },
      {
        titulo: "La autorrevelación de Jesús en las bodas de Caná",
        cita: "Jn 2, 3.5",
        lectura: "Como faltaba vino, la madre de Jesús le dijo: «No tienen vino». Su madre dijo a los sirvientes: «Hagan todo lo que él les diga».",
        fruto: "La confianza en Jesús por medio de María",
        meditacion: "María advierte la necesidad antes que nadie. Pidamos escuchar su consejo: hacer lo que Jesús nos diga."
      },
      {
        titulo: "El anuncio del Reino de Dios invitando a la conversión",
        cita: "Mc 1, 14-15",
        lectura: "Jesús fue a Galilea. Allí proclamaba la Buena Noticia de Dios, diciendo: «El tiempo se ha cumplido: el Reino de Dios está cerca. Conviértanse y crean en la Buena Noticia».",
        fruto: "La conversión del corazón",
        meditacion: "El Reino está cerca. Pidamos la gracia de cambiar lo que en nosotros no es según el Evangelio."
      },
      {
        titulo: "La Transfiguración de Jesús",
        cita: "Mt 17, 1-2.5",
        lectura: "Jesús tomó a Pedro, Santiago y Juan, y los llevó aparte a un monte elevado. Allí se transfiguró en presencia de ellos: su rostro resplandecía como el sol. Y una voz desde la nube decía: «Este es mi Hijo muy querido, en quien tengo puesta toda mi predilección: escúchenlo».",
        fruto: "El deseo de santidad",
        meditacion: "La gloria de Jesús ilumina el camino. Pidamos escucharlo y dejarnos transformar por su luz."
      },
      {
        titulo: "La institución de la Eucaristía",
        cita: "Lc 22, 19-20",
        lectura: "Jesús tomó el pan, dio gracias, lo partió y lo dio a sus discípulos, diciendo: «Esto es mi Cuerpo, que se entrega por ustedes. Hagan esto en memoria mía». Después de la cena hizo lo mismo con la copa, diciendo: «Esta copa es la Nueva Alianza sellada con mi Sangre».",
        fruto: "El amor a la Eucaristía",
        meditacion: "Jesús se queda con nosotros como alimento. Pidamos vivir la Misa como el centro de nuestra semana."
      }
    ]
  },
  dolorosos: {
    nombre: "Dolorosos",
    dias: "Martes y viernes",
    lista: [
      {
        titulo: "La oración de Jesús en el Huerto de los Olivos",
        cita: "Mt 26, 38-39",
        lectura: "Jesús les dijo: «Mi alma siente una tristeza de muerte. Quédense aquí velando conmigo». Y adelantándose un poco, cayó con el rostro en tierra, orando así: «Padre mío, si es posible, que pase lejos de mí este cáliz, pero no se haga mi voluntad, sino la tuya».",
        fruto: "La conformidad con la voluntad de Dios",
        meditacion: "En la angustia, Jesús ora. Pidamos acudir a Dios en nuestras horas difíciles y confiar en su voluntad."
      },
      {
        titulo: "La flagelación de Jesús atado a la columna",
        cita: "Jn 19, 1; Is 53, 5",
        lectura: "Pilato mandó azotar a Jesús. Él fue traspasado por nuestras rebeldías y triturado por nuestras iniquidades. El castigo que nos da la paz recayó sobre él, y por sus heridas fuimos sanados.",
        fruto: "La pureza y el dominio de sí",
        meditacion: "Jesús carga en su cuerpo nuestro pecado. Pidamos respeto por nuestro cuerpo y por la dignidad de cada persona."
      },
      {
        titulo: "La coronación de espinas",
        cita: "Mt 27, 28-29",
        lectura: "Lo desvistieron y le pusieron un manto rojo. Luego tejieron una corona de espinas y la colocaron sobre su cabeza, pusieron una caña en su mano derecha y, doblando la rodilla delante de él, se burlaban diciendo: «Salud, rey de los judíos».",
        fruto: "La humildad ante las humillaciones",
        meditacion: "El Rey del universo soporta la burla en silencio. Pidamos fortaleza para no responder al mal con mal."
      },
      {
        titulo: "Jesús con la cruz a cuestas camino del Calvario",
        cita: "Jn 19, 17; Lc 9, 23",
        lectura: "Jesús, cargando sobre sí la cruz, salió de la ciudad para dirigirse al lugar llamado «del Cráneo». Él había dicho: «El que quiera venir detrás de mí, que renuncie a sí mismo, que cargue con su cruz cada día y me siga».",
        fruto: "La paciencia en las pruebas",
        meditacion: "Jesús no carga la cruz solo: el Cireneo y las mujeres lo acompañan. Pidamos ayudar a llevar la cruz de los demás."
      },
      {
        titulo: "La crucifixión y muerte de Jesús",
        cita: "Lc 23, 33-34.46",
        lectura: "Cuando llegaron al lugar llamado «del Cráneo», lo crucificaron. Jesús decía: «Padre, perdónalos, porque no saben lo que hacen». Y con un grito exclamó: «Padre, en tus manos encomiendo mi espíritu». Y diciendo esto, expiró.",
        fruto: "El perdón y el amor a Cristo crucificado",
        meditacion: "Desde la cruz, Jesús perdona y nos entrega a su Madre. Pidamos la gracia de perdonar de corazón."
      }
    ]
  },
  gloriosos: {
    nombre: "Gloriosos",
    dias: "Miércoles y domingo",
    lista: [
      {
        titulo: "La Resurrección del Señor",
        cita: "Lc 24, 1.5-6",
        lectura: "El primer día de la semana, al amanecer, las mujeres fueron al sepulcro. Los dos hombres con vestiduras deslumbrantes les dijeron: «¿Por qué buscan entre los muertos al que está vivo? No está aquí, ha resucitado».",
        fruto: "La fe",
        meditacion: "Cristo vive y la muerte no tiene la última palabra. Pidamos ser testigos alegres de la Resurrección."
      },
      {
        titulo: "La Ascensión del Señor al cielo",
        cita: "Mt 28, 19-20",
        lectura: "«Vayan, y hagan que todos los pueblos sean mis discípulos, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo, y enseñándoles a cumplir todo lo que yo les he mandado. Y yo estoy con ustedes todos los días hasta el fin del mundo».",
        fruto: "La esperanza y el deseo del cielo",
        meditacion: "Jesús sube al Padre y nos confía su misión. Pidamos ser discípulos misioneros en nuestro entorno."
      },
      {
        titulo: "La venida del Espíritu Santo",
        cita: "Hch 2, 1-4",
        lectura: "Al llegar el día de Pentecostés, estaban todos reunidos en el mismo lugar. De pronto vino del cielo un ruido, semejante a una fuerte ráfaga de viento. Entonces vieron aparecer unas lenguas como de fuego, que descendieron sobre cada uno de ellos. Todos quedaron llenos del Espíritu Santo.",
        fruto: "La docilidad al Espíritu Santo",
        meditacion: "María ora con los apóstoles y los acompaña. Pidamos los dones del Espíritu, en especial la sabiduría."
      },
      {
        titulo: "La Asunción de María al cielo",
        cita: "Lc 1, 46.48-49",
        lectura: "María dijo: «Mi alma canta la grandeza del Señor. En adelante todas las generaciones me llamarán feliz, porque el Todopoderoso ha hecho en mí grandes cosas: ¡su Nombre es santo!».",
        fruto: "La gracia de una buena muerte",
        meditacion: "María, en cuerpo y alma, participa ya de la gloria de su Hijo. Pidamos vivir con la mirada puesta en el cielo."
      },
      {
        titulo: "La coronación de María como Reina de cielos y tierra",
        cita: "Ap 12, 1",
        lectura: "Apareció en el cielo un gran signo: una Mujer revestida del sol, con la luna bajo sus pies y una corona de doce estrellas en su cabeza.",
        fruto: "La perseverancia y la confianza en María",
        meditacion: "María reina sirviendo, como su Hijo. Pidamos confiarle nuestra vida y perseverar hasta el final."
      }
    ]
  }
};

/* Letanías Lauretanas (incluye las invocaciones añadidas por el papa Francisco en 2020:
   Madre de misericordia, Madre de la esperanza y Consuelo de los migrantes). */
const LETANIAS = [
  {
    titulo: "Letanías Lauretanas",
    parte: "I",
    respuesta: null,
    items: [
      ["Señor, ten piedad.", "Señor, ten piedad."],
      ["Cristo, ten piedad.", "Cristo, ten piedad."],
      ["Señor, ten piedad.", "Señor, ten piedad."],
      ["Cristo, óyenos.", "Cristo, óyenos."],
      ["Cristo, escúchanos.", "Cristo, escúchanos."],
      ["Dios, Padre celestial,", "ten piedad de nosotros."],
      ["Dios Hijo, Redentor del mundo,", "ten piedad de nosotros."],
      ["Dios Espíritu Santo,", "ten piedad de nosotros."],
      ["Santísima Trinidad, un solo Dios,", "ten piedad de nosotros."]
    ]
  },
  {
    titulo: "Letanías Lauretanas",
    parte: "II",
    respuesta: "ruega por nosotros.",
    items: [
      "Santa María,", "Santa Madre de Dios,", "Santa Virgen de las vírgenes,",
      "Madre de Cristo,", "Madre de la Iglesia,", "Madre de misericordia,",
      "Madre de la divina gracia,", "Madre de la esperanza,", "Madre purísima,",
      "Madre castísima,", "Madre siempre virgen,", "Madre inmaculada,",
      "Madre amable,", "Madre admirable,", "Madre del buen consejo,",
      "Madre del Creador,", "Madre del Salvador,"
    ],
    nuevas: ["Madre de misericordia,", "Madre de la esperanza,"]
  },
  {
    titulo: "Letanías Lauretanas",
    parte: "III",
    respuesta: "ruega por nosotros.",
    items: [
      "Virgen prudentísima,", "Virgen digna de veneración,", "Virgen digna de alabanza,",
      "Virgen poderosa,", "Virgen clemente,", "Virgen fiel,",
      "Espejo de justicia,", "Trono de la sabiduría,", "Causa de nuestra alegría,",
      "Vaso espiritual,", "Vaso digno de honor,", "Vaso de insigne devoción,",
      "Rosa mística,", "Torre de David,", "Torre de marfil,", "Casa de oro,",
      "Arca de la alianza,", "Puerta del cielo,", "Estrella de la mañana,",
      "Salud de los enfermos,", "Refugio de los pecadores,", "Consuelo de los migrantes,",
      "Consuelo de los afligidos,", "Auxilio de los cristianos,"
    ],
    nuevas: ["Consuelo de los migrantes,"]
  },
  {
    titulo: "Letanías Lauretanas",
    parte: "IV",
    respuesta: "ruega por nosotros.",
    items: [
      "Reina de los ángeles,", "Reina de los patriarcas,", "Reina de los profetas,",
      "Reina de los apóstoles,", "Reina de los mártires,", "Reina de los confesores,",
      "Reina de las vírgenes,", "Reina de todos los santos,",
      "Reina concebida sin pecado original,", "Reina asunta a los cielos,",
      "Reina del santísimo Rosario,", "Reina de la familia,", "Reina de la paz,"
    ]
  },
  {
    titulo: "Letanías Lauretanas",
    parte: "V",
    respuesta: null,
    items: [
      ["Cordero de Dios, que quitas el pecado del mundo,", "perdónanos, Señor."],
      ["Cordero de Dios, que quitas el pecado del mundo,", "escúchanos, Señor."],
      ["Cordero de Dios, que quitas el pecado del mundo,", "ten misericordia de nosotros."]
    ]
  }
];
