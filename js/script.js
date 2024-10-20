function generateRandomList(startIndex, iterations) {
  let resultList = [startIndex];

  for (let i = 0; i < iterations; i++) {
    // Generar aleatoriamente si suma (1) o resta (-1)
    let randomChange = Math.random() < 0.5 ? -1 : 1;

    // Actualizar el valor de startIndex
    startIndex += randomChange;

    // Guardar el nuevo valor en la lista
    resultList.push(startIndex);
  }

  return resultList;
}

// Definir la variable startIndex y las iteraciones
let startIndex = 9;
let iterations = 9;
let totalLists = 100;
let allLists = [];

// Ejecutar la función 100 veces y guardar cada lista en allLists
for (let i = 0; i < totalLists; i++) {
  let randomList = generateRandomList(startIndex, iterations);
  allLists.push(randomList);
}

// Mostrar todas las listas generadas
console.log(allLists);

let finalResult = new Array(19).fill(0);

// Recorrer todas las listas en allLists
allLists.forEach((list) => {
  // Obtener el último valor de cada lista
  let lastValue = list[list.length - 1];

  // Asegurarse de que el valor esté dentro del rango de índices válidos de finalResult
  if (lastValue >= 0 && lastValue < finalResult.length) {
    // Incrementar el valor en el índice correspondiente
    finalResult[lastValue]++;
  }
});

//**********************************************************************************************
function runSimulationAnimation(allLists) {
  for (let i = 0; i < allLists.length; i++) {
    let element = allLists[i];

    for (let j = 0; j < element.length; j++) {
      let valor = element[j];
      let childHTML = document.querySelector(
        `#simulation-board > :nth-child(${j + 1})`
      );
      let elementHTML = childHTML.querySelector(`[data-index="${valor}"]`);
      elementHTML.classList.add("simulation-cell__sphere");
      elementHTML.classList.add("ball-bounced");
    }
  }
}
runSimulationAnimation(allLists);
//********************************************************************************************

// Mostrar el resultado final
console.log(finalResult);

function getEvenIndexValues(finalResult) {
  // Definir los índices pares que queremos extraer
  const evenIndices = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];

  // Crear un nuevo arreglo con los valores de finalResult en los índices pares
  let evenValues = evenIndices.map((index) => finalResult[index]);

  return evenValues;
}

// Llamar a la función con finalResult y obtener los valores de los índices pares
let evenIndexValues = getEvenIndexValues(finalResult);
console.log(evenIndexValues);

function sumListValues(list) {
  // Usamos reduce para sumar todos los valores de la lista
  let total = list.reduce((acc, value) => acc + value, 0);

  return total;
}

function sumListValues(list) {
  // Usamos reduce para sumar todos los valores de la lista
  let total = list.reduce((acc, value) => acc + value, 0);

  return total;
}

// 1. Sumar todos los valores del arreglo
const totalSum = evenIndexValues.reduce((acc, value) => acc + value, 0);

// Seleccionar todas las barras con la clase 'bar-chart__bar'
const bars = document.querySelectorAll(".bar-chart__bar");

// Seleccionar todos los elementos de etiqueta de porcentaje
const labels = document.querySelectorAll(".bar-chart__label");

// 2. Recorrer el arreglo para calcular el porcentaje correspondiente a cada valor y actualizar la altura de cada barra y su respectivo label
evenIndexValues.forEach((value, index) => {
  // Calcular el porcentaje basado en la suma total
  const percentage = (value / totalSum) * 100;

  // 3. Actualizar el estilo 'height' de la barra con el porcentaje calculado
  bars[index].style.height = `${percentage}%`;

  // 4. Actualizar el contenido de texto del label correspondiente con el porcentaje
  labels[index].textContent = percentage.toFixed(1);
});

function saveSimulationHistory(evenIndexValues, totalLists) {
  // Obtener la fecha actual en formato dd/mm/yyyy
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  // Crear un nuevo objeto con los valores actuales
  const newEntry = {
    date: formattedDate,
    totalLists: totalLists,
    evenIndexValues: evenIndexValues,
  };

  // Verificar si "simulationHistory" ya existe en el local storage
  let simulationHistory = localStorage.getItem("simulationHistory");

  if (simulationHistory) {
    // Si ya existe, convertir la cadena JSON en un arreglo
    simulationHistory = JSON.parse(simulationHistory);
  } else {
    // Si no existe, inicializar un nuevo arreglo
    simulationHistory = [];
  }

  // Agregar la nueva entrada al arreglo
  simulationHistory.push(newEntry);

  // Guardar el nuevo arreglo actualizado en el local storage
  localStorage.setItem("simulationHistory", JSON.stringify(simulationHistory));

  console.log("Simulation history saved:", simulationHistory);
}

saveSimulationHistory(evenIndexValues, totalLists);

function renderSimulationHistory() {
  // Obtener el historial desde el localStorage
  const simulationHistory =
    JSON.parse(localStorage.getItem("simulationHistory")) || [];

  // Seleccionar el div donde se va a insertar el historial
  const historyResultsDiv = document.getElementById("history-results");

  // Limpiar el contenido actual del div
  historyResultsDiv.innerHTML = "";

  // Verificar si hay datos en simulationHistory
  if (simulationHistory.length === 0) {
    historyResultsDiv.innerHTML = `
      <div class="message-info">
        <div class="message-info__text">
          <strong>Tu historial está en blanco... por ahora</strong><br>
          Todavía no has realizado ninguna simulación. ¡Haz una para llenar este espacio con tus resultados!
        </div>
      </div>`;
    return;
  }

  // Recorrer cada objeto del historial
  simulationHistory.forEach((simulation) => {
    const { date, totalLists, evenIndexValues } = simulation;

    // Calcular la suma total de los valores
    const totalSum = evenIndexValues.reduce((acc, value) => acc + value, 0);

    // Crear una variable para almacenar el HTML generado
    let historyHTML = `
      <div class="bar-container-history">
        <div class="historical__data">
          <div class="historical-data__number">Esferas: ${totalLists}</div>
          <div class="historical-data__date">Fecha: ${date}</div>
        </div>
        <div class="historical-bar__chart">`;

    // Añadir las barras con sus porcentajes correspondientes
    evenIndexValues.forEach((value) => {
      const percentage = totalSum ? (value / totalSum) * 100 : 0;
      historyHTML += `<div class="historical-bar-chart__bar" style="height: ${percentage}%;"></div>`;
    });

    // Cerrar la sección de barras
    historyHTML += `</div><div class="historical-bar-chart__labels">`;

    // Añadir las etiquetas de porcentaje, eliminando decimales si es un número entero
    evenIndexValues.forEach((value) => {
      const percentage = totalSum ? (value / totalSum) * 100 : 0;
      const percentageText = Number.isInteger(percentage)
        ? percentage
        : percentage.toFixed(1);
      historyHTML += `<span class="historical-chart__label">${percentageText}</span>`;
    });

    // Cerrar la sección de etiquetas y el contenedor principal
    historyHTML += `</div></div>`;

    // Insertar el HTML generado en el div de resultados
    historyResultsDiv.innerHTML += historyHTML;
  });
}

// Llamar a la función para renderizar el historial
renderSimulationHistory();

const trashButton = document.querySelector(".control-trash__button");

// Función para borrar el historial
function clearHistory() {
  // 1. Borrar el historial del localStorage
  localStorage.removeItem("simulationHistory");

  // 2. Seleccionar el div con id="history-results"
  const historyResultsDiv = document.getElementById("history-results");

  // 3. Eliminar todo el contenido actual del div
  historyResultsDiv.innerHTML = "";

  // 4. Insertar el mensaje de "historial vacío" en su lugar
  historyResultsDiv.innerHTML = `
      <div class="message-info">
        <div class="message-info__text">
          <strong>Tu historial está en blanco... por ahora</strong><br>
          Todavía no has realizado ninguna simulación. ¡Haz una para llenar este espacio con tus resultados!
        </div>
      </div>`;
}

// Asociar el evento click al botón para ejecutar la función
trashButton.addEventListener("click", clearHistory);
