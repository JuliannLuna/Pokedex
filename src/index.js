/// <reference types="jquery"/>

// https://pokeapi.co/api/v2/pokemon?limit=25&offset=0

const botonAtras = document.querySelector("#atras");
const botonSiguiente = document.querySelector("#siguiente");

fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0")
  .then((respuesta) => respuesta.json())
  .then((miJson) => {
    console.log(miJson);

    modificarBotonSiguiente(miJson);

    Object.keys(miJson.results).forEach((pokemon) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${miJson.results[pokemon].name}`)
        .then((res) => res.json())
        .then((jsonPokemon) => {
          $("ul").append(
            $(
              `<li><img class="h-30" src="${jsonPokemon.sprites.front_default}" alt="${miJson.results[pokemon].name}">${miJson.results[pokemon].name}</li>`,
            ),
          );
        });
    });
  })
  .catch((error) => console.error("FALLÓ", error));

//   Esta funcion se encarga de ver si el objeto donde estan los pokemones tienen
// esta en el inicio o final de la lista. En el inicio se deshabilita el boton Atras,
// mientras que al final se deshabilita el boton Siguiente
function modificarBotonSiguiente(lista) {
  if (!lista.next) {
    botonSiguiente.classList.replace(
      "bg-(--color-secundario)",
      "bg-(--color-secundario)/50",
    );
  } else {
    botonSiguiente.classList.replace(
      "bg-(--color-secundario)/50",
      "bg-(--color-secundario)",
    );
  }
}

function modificarBotonAtras(lista) {
  if (!lista.previous) {
    botonAtras.classList.replace(
      "bg-(--color-secundario)",
      "bg-(--color-secundario)/50",
    );
  } else {
    botonAtras.classList.replace(
      "bg-(--color-secundario)/50",
      "bg-(--color-secundario)",
    );
  }
}
