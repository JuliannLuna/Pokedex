/// <reference types="jquery"/>

// https://pokeapi.co/api/v2/pokemon?limit=25&offset=0

const botonAtras = document.querySelector("#atras");
const botonSiguiente = document.querySelector("#siguiente");
let siguienteURL = null;
let anteriorURL = null;

fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0")
  .then((respuesta) => respuesta.json())
  .then((miJson) => {
    // console.log(miJson);
    siguienteURL = miJson.next;
    anteriorURL = miJson.previous;

    modificarBotonSiguiente(miJson);
    modificarBotonAtras(miJson);

    Object.keys(miJson.results).forEach((pokemon) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${miJson.results[pokemon].name}`)
        .then((res) => res.json())
        .then((jsonPokemon) => {
          console.log(jsonPokemon.abilities[0].ability.name);
          $("ul").append(
            $(
              `<li>
                    <img class="h-30" src="${jsonPokemon.sprites.front_default}" alt="${miJson.results[pokemon].name}">
                    <h2 class="text-xl mb-4">${miJson.results[pokemon].name}</h2>
                    <p>Habilidad:
                    ${jsonPokemon.abilities[0].ability.name}
                    </p>
                    <p>Especie: ${jsonPokemon.species.name}</p>
                    <p>Peso: ${jsonPokemon.weight}</p>
               </li>`,
            ),
          );
        })
        .catch((error) => console.error("FALLO", error));
    });
  })
  .catch((error) => console.error("FALLÓ", error));

function botonSiguienteAtras(url) {
  if (url) {
    $("ul").html("");
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((miJson) => {
        siguienteURL = miJson.next;
        anteriorURL = miJson.previous;

        modificarBotonSiguiente(miJson);
        modificarBotonAtras(miJson);

        Object.keys(miJson.results).forEach((pokemon) => {
          fetch(
            `https://pokeapi.co/api/v2/pokemon/${miJson.results[pokemon].name}`,
          )
            .then((res) => res.json())
            .then((jsonPokemon) => {
              $("ul").append(
                $(
                  `<li>
                    <img class="h-30" src="${jsonPokemon.sprites.front_default}" alt="${miJson.results[pokemon].name}">
                    <h2 class="text-xl mb-4">${miJson.results[pokemon].name}</h2>
                    <p>Habilidad:
                    ${jsonPokemon.abilities[0].ability.name}
                    </p>
                    <p>Especie: ${jsonPokemon.species.name}</p>
                    <p>Peso: ${jsonPokemon.weight}</p>
                   </li>`,
                ),
              );
            })
            .catch((error) => console.error("FALLO", error));
        });
      })
      .catch((error) => console.error("FALLÓ", error));
  }
}

//   Cada vez que se presione el boton Atras y este cumpla con las condiciones
// la cual es que la variable anteriorURL sea diferente de null
botonAtras.onclick = () => {
  botonSiguienteAtras(anteriorURL);
};

//   Cada vez que se presione el boton Siguiente y este cumpla con las condiciones
// la cual es que la variable siguienteURL sea diferente de null
botonSiguiente.onclick = () => {
  botonSiguienteAtras(siguienteURL);
};

//   Esta funcion se encarga de ver si el objeto donde estan los pokemones tienen
// esta en el final de la lista. En el final se deshabilita el boton Siguiente
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

//   Esta funcion se encarga de ver si el objeto donde estan los pokemones tienen
// esta en el inicio. En el inicio se deshabilita el boton Atras
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
