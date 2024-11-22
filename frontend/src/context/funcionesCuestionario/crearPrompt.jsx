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
  const color = resultados.find((item) => item.clave === "6")?.valor;
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

  // Create a fantasy-style version of the text
  // const fantasyText = `
  //   En el reino de ${pais}, un misterioso ser conocido como ${professorName} se alza con un poder ancestral. Su especie, el mítico ${species}, ha dominado las aguas y las profundidades más oscuras, alcanzando las temibles profundidades de ${depth}.

  //   El ${professorName} es conocido por su velocidad extraordinaria, surcando las aguas con la rapidez de ${speed} y recorriendo vastas distancias de ${distance} fuera del agua, como un guerrero sin igual.

  //   En su forma, se puede ver la morfología única de un ${morphology}, sus rayas o lunares de color ${color} brillan como estrellas en el firmamento. Su tamaño es impresionante, alcanzando la magnitud de ${size}, y sus ojos ${eyes} guardan secretos de mundos perdidos.

  //   Su hogar está compuesto por varios reinos de naturaleza: ${habitat1}, ${habitat2}, ${habitat3}, ${habitat4}, ${habitat5}, ${habitat6}, ${habitat7}, ${habitat8}, ${habitat9}. Un lugar donde los vientos soplan y las olas cantan.

  //   En los pergaminos olvidados, se menciona un cuadro sagrado, el legendario Cuadro B.4, cuya información se considera clave en los misterios del reino. ${professorName} es también conocido como el guardián de ese saber oculto.

  //   Así se relata la historia de ${professorName}, el protector de ${species} y explorador de las profundidades, cuyas aventuras quedan grabadas en la memoria de todos los que habitan en ${pais}.
  //   `;

  // Return both versions as an object
  return { originalText };
}
