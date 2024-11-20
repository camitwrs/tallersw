import React, { useEffect, useState } from "react";

function Pruebas() {
  const [resultados, setResultados] = useState([]);
  const { originalText, fantasyText } = textoFinal();
  const data = [
    {
      1: "Jan Houter Hube",
      2: 160,
      3: 24,
      4: 227,
      5: 5,
      6: 18,
      7: 8,
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

  useEffect(() => {
    const fetchAlternativas = async () => {
      try {
        // Fetch alternativas data
        const response = await fetch("http://localhost:4000/alternativas");
        const alternativas = await response.json();

        // Assuming jsonData is available or fetched from another source
        const jsonData = data[0]; // Replace with your actual JSON data source if needed

        // Iterate through each key-value pair in jsonData
        const resultadosProcesados = Object.entries(jsonData).map(
          ([key, value]) => {
            // Check if value exists in alternativas as idAlternativa
            const alternativa = alternativas.find(
              (alt) => alt.idAlternativa === value
            );

            if (alternativa) {
              // If alternativa is found and caracteristica is null, use textoAlternativa
              const valor =
                alternativa.caracteristica === null
                  ? alternativa.textoAlternativa
                  : alternativa.caracteristica;

              return { clave: key, valor: valor }; // Use the correct valor
            }

            // If no match is found, return the original value
            return { clave: key, valor: value };
          }
        );

        setResultados(resultadosProcesados); // Update the state with processed results
      } catch (error) {
        console.error("Error al obtener alternativas:", error); // Handle errors
      }
    };

    fetchAlternativas(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    console.log(resultados);
  }, [resultados]);

  function elegirCategoria() {
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

  function textoFinal(
    professorName = resultados.find((item) => item.clave === "1")?.valor,
    species = elegirCategoria(),
    depth = resultados.find((item) => item.clave === "47")?.valor,
    speed = resultados.find((item) => item.clave === "49")?.valor,
    distance = resultados.find((item) => item.clave === "50")?.valor,
    morphology = resultados.find((item) => item.clave === "7")?.valor,
    color = resultados.find((item) => item.clave === "6")?.valor,
    size = resultados.find((item) => item.clave === "20")?.valor,
    eyes = resultados.find((item) => item.clave === "22")?.valor,
    habitat1 = resultados.find((item) => item.clave === "10")?.valor,
    habitat2 = resultados.find((item) => item.clave === "11")?.valor,
    habitat3 = resultados.find((item) => item.clave === "12")?.valor,
    habitat4 = resultados.find((item) => item.clave === "13")?.valor,
    habitat5 = resultados.find((item) => item.clave === "14")?.valor,
    habitat6 = resultados.find((item) => item.clave === "15")?.valor,
    habitat7 = resultados.find((item) => item.clave === "16")?.valor,
    habitat8 = resultados.find((item) => item.clave === "17")?.valor,
    habitat9 = resultados.find((item) => item.clave === "18")?.valor,
    cuadroB4 = "x",
    professorName2 = resultados.find((item) => item.clave === "27")?.valor,
    pais = resultados.find((item) => item.clave === "4")?.valor
  ) {
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
    const fantasyText = `
    En el reino de ${pais}, un misterioso ser conocido como ${professorName} se alza con un poder ancestral. Su especie, el mítico ${species}, ha dominado las aguas y las profundidades más oscuras, alcanzando las temibles profundidades de ${depth}.

    El ${professorName} es conocido por su velocidad extraordinaria, surcando las aguas con la rapidez de ${speed} y recorriendo vastas distancias de ${distance} fuera del agua, como un guerrero sin igual.

    En su forma, se puede ver la morfología única de un ${morphology}, sus rayas o lunares de color ${color} brillan como estrellas en el firmamento. Su tamaño es impresionante, alcanzando la magnitud de ${size}, y sus ojos ${eyes} guardan secretos de mundos perdidos.

    Su hogar está compuesto por varios reinos de naturaleza: ${habitat1}, ${habitat2}, ${habitat3}, ${habitat4}, ${habitat5}, ${habitat6}, ${habitat7}, ${habitat8}, ${habitat9}. Un lugar donde los vientos soplan y las olas cantan.

    En los pergaminos olvidados, se menciona un cuadro sagrado, el legendario Cuadro B.4, cuya información se considera clave en los misterios del reino. ${professorName} es también conocido como el guardián de ese saber oculto.

    Así se relata la historia de ${professorName}, el protector de ${species} y explorador de las profundidades, cuyas aventuras quedan grabadas en la memoria de todos los que habitan en ${pais}.
    `;

    // Return both versions as an object
    return { originalText, fantasyText };
  }

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h1>Resultados Procesados</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <tr key={index}>
                <td>{resultado.clave}</td>
                <td>{resultado.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {elegirCategoria()}
      </div>

      <div className="w-1/2 p-4">
        <h2>Descripción escrita:</h2>

        <h3>Texto Original:</h3>
        <pre className="whitespace-pre-wrap break-words overflow-auto">
          {originalText}
        </pre>

        <h3>Texto de Fantasía:</h3>
        <pre className="whitespace-pre-wrap break-words overflow-auto">
          {fantasyText}
        </pre>
      </div>
    </div>
  );
}

export default Pruebas;
