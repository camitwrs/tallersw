export const data = [
  {
    1: "Jan Houter Hube", //nombre
    2: 160, //sexo
    3: 24, //edad
    4: 228, //pais
    5: 5, //Institución a la que pertenece
    6: 18, //Años en el cargo o de experiencia en cargos similares
    7: 7, // ¿Cuál de las siguientes descripciones describe mejor tu rol o tu función?
    8: [13, 18],
    10: 21,
    11: 23,
    12: 25,
    13: 30,
    14: 31,
    15: 35,
    16: 38,
    17: 41,
    18: 44,
    19: 46,
    20: 50,
    21: 56,
    22: 60,
    24: "1",
    25: "blablablabalbal",
    26: 35,
    27: "Napoleon",
    28: "otro",
    30: 78,
    31: 80,
    32: 82,
    33: 86,
    34: 88,
    35: 92,
    36: 94,
    37: 98,
    38: 100,
    39: 104,
    40: 106,
    41: 110,
    42: 112,
    43: 116,
    44: 118,
    45: 126, // Buscar idAlternativa 126
    46: 131,
    47: 135,
    49: 141,
    50: 147,
    51: 152,
    53: 155,
    54: 155,
  },
];

export function elegirCategoria(resultados) {
  let a =
    parseInt(resultados.find((item) => item.clave === "30")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "31")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "32")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "33")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "34")?.valor || 0);

  let b =
    parseInt(resultados.find((item) => item.clave === "35")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "36")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "37")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "38")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "39")?.valor || 0);

  let c =
    parseInt(resultados.find((item) => item.clave === "40")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "41")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "42")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "43")?.valor || 0) +
    parseInt(resultados.find((item) => item.clave === "44")?.valor || 0);

  // Calcula los promedios
  const promedioA = a / 5;
  const promedioB = b / 5;
  const promedioC = c / 5;

  // Crea un array con los promedios y etiquetas
  const categorias = [
    { nombre: "CAZADOR", promedio: promedioA },
    { nombre: "ESTIVADOR", promedio: promedioB },
    { nombre: "MIGRAR", promedio: promedioC },
  ];

  // Ordena las categorías de mayor a menor
  const categoriasOrdenadas = categorias.sort(
    (cat1, cat2) => cat2.promedio - cat1.promedio
  );

  // Retorna las dos categorías con mayor promedio
  return `${categoriasOrdenadas[0].nombre}`;
}

export function textoFinal(resultados, cuadroB4 = "x") {
  const professorName = resultados.find((item) => item.clave === "1")?.valor;
  const species = elegirCategoria(resultados);
  const depth = resultados.find((item) => item.clave === "47")?.valor;
  const speed = resultados.find((item) => item.clave === "49")?.valor;
  const distance = resultados.find((item) => item.clave === "50")?.valor;
  const morphology = resultados.find((item) => item.clave === "7")?.valor;
  const color = resultados.find((item) => item.clave === "8")?.valor;
  const size = resultados.find((item) => item.clave === "20")?.valor;
  const eyes = resultados.find((item) => item.clave === "22")?.valor;
  const habitat1 = resultados.find((item) => item.clave === "10")?.valor;
  const habitat2 = resultados.find((item) => item.clave === "11")?.valor;
  const habitat3 = resultados.find((item) => item.clave === "12")?.valor;
  const habitat4 = resultados.find((item) => item.clave === "13")?.valor;
  const habitat5 = resultados.find((item) => item.clave === "14")?.valor;
  const habitat6 = resultados.find((item) => item.clave === "15")?.valor;
  const habitat7 = resultados.find((item) => item.clave === "16")?.valor;
  const habitat8 = resultados.find((item) => item.clave === "17")?.valor;
  const habitat9 = resultados.find((item) => item.clave === "18")?.valor;
  const professorName2 = resultados.find((item) => item.clave === "27")?.valor;
  const pais = resultados.find((item) => item.clave === "4")?.valor;

  const texto = [
    `El profesor ${professorName}.`,
    `Su especie animal es ${species} + ${professorName2} + de ${pais} .`,
    `Su capacidad de sumergirse en las profundidades alcanza hasta los ${depth}.`,
    `Su velocidad de nado es de ${speed}`,
    `La distancia que puede recorrer al salir del agua es de ${distance}.`,
    "",
    "Descripción visual:",
    `Su morfología es de un ${morphology}`,
    `Tiene rayas o lunares de color ${color}`,
    `Su tamaño es de ${size}`,
    `Sus ojos son ${eyes} .`,
    `Su hábitat está compuesto por: ${habitat1};${habitat2};${habitat3};${habitat4};${habitat5};${habitat6};${habitat7};${habitat8};${habitat9} .`,
    "",
    "Información adicional para diseñador:",
    `Cuadro B.4 completo: ${cuadroB4}`,
    `Nombre del profesor: ${professorName}`,
  ];

  // Return the original text as a plain string
  const originalText = texto.join("\n");

  function buscargenero() {
    if (morphology == "Ballenas") return "Cetaceus";
    if (morphology == "Focas") return "Phocidae";
    if (morphology == "Tortugas marinas") return "Chelonioidea";
    if (morphology == "Orcas") return "Orcinus orca";
    if (morphology == "Pingüinos") return "Spheniscidae";
    if (morphology == "Nutrias") return "Mustelidae";
    else return 0;
  }

  const genero = buscargenero();
  // Create a fantasy-style version of the text
  const fantasyText = `
  ${genero} ${professorName.split(" ")[1]}is ${pais}nsis

  ${
    professorName.split(" ")[0]
  } es del género ${genero}. Presenta un tamaño de ${size}. Tiene una particular mezcla de ${color} que son rasgos muy característicos de esta especie. Tiene ${eyes}. Destaca la variedad de su hábitat, el cual se forma de ${habitat1}, ${habitat2}, ${habitat3}, ${habitat4}, ${habitat5}, ${habitat6}, ${habitat7}, ${habitat8}, ${habitat9}.
`;

  // Return both versions as an object
  return { originalText, fantasyText };
}
