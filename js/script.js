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

// Definir la lista resultado final (finalResult) con suficientes posiciones, por ejemplo, 20 elementos inicializados en 0
let finalResult = new Array(19).fill(0);

// Recorrer todas las listas en allLists
allLists.forEach(list => {
  // Obtener el último valor de cada lista
  let lastValue = list[list.length - 1];

  // Asegurarse de que el valor esté dentro del rango de índices válidos de finalResult
  if (lastValue >= 0 && lastValue < finalResult.length) {
      // Incrementar el valor en el índice correspondiente
      finalResult[lastValue]++;
  }
});

// Mostrar el resultado final
console.log(finalResult);

function getEvenIndexValues(finalResult) {
  // Definir los índices pares que queremos extraer
  const evenIndices = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];

  // Crear un nuevo arreglo con los valores de finalResult en los índices pares
  let evenValues = evenIndices.map(index => finalResult[index]);

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

let totalSum = sumListValues(evenIndexValues);
console.log(totalSum);


