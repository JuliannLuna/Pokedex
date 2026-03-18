/// <reference types="jquery"/>

// https://pokeapi.co/api/v2/pokemon?limit=25&offset=0

const botonAtras = document.querySelector("#atras");
const botonSiguiente = document.querySelector("#siguiente");
const inicialURL = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0";
let siguienteURL = null;
let anteriorURL = null;

function mostrarPokemonesDeAPI(url) {
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
                  `<li class="h-96 content-center">
                    <img class="h-40" src="${jsonPokemon.sprites.other.home.front_default}" alt="${miJson.results[pokemon].name}">
                    <h2 class="text-3xl uppercase mb-4">${miJson.results[pokemon].name}</h2>
                    <div class="grid grid-cols-[140px_1fr] gap-2 items-center text-lg">
  
                      <span class="p-1/2 rounded-full text-center text-(--color-principal) bg-(--color-secundario)">Habilidad</span>
                      <span class="capitalize text-left font-bold text-(--color-secundario)">${jsonPokemon.abilities[0].ability.name}</span>

                      <span class="p-1/2 rounded-full text-center text-(--color-principal) bg-(--color-secundario)">Especie</span>
                      <span class="capitalize text-left font-bold text-(--color-secundario)">${jsonPokemon.species.name}</span>

                      <span class="p-1/2 rounded-full text-center text-(--color-principal) bg-(--color-secundario)">Peso</span>
                      <span class="text-left font-bold text-(--color-secundario)">${Number(jsonPokemon.weight) / 10} kg.</span>

                    </div>
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

// Al ingresar a la pagina web, se cargará los primeros 25
// pokemones del API
mostrarPokemonesDeAPI(inicialURL);

//   Cada vez que se presione el boton Atras y este cumpla con las condiciones
// la cual es que la variable anteriorURL sea diferente de null
botonAtras.onclick = () => {
  mostrarPokemonesDeAPI(anteriorURL);
};

//   Cada vez que se presione el boton Siguiente y este cumpla con las condiciones
// la cual es que la variable siguienteURL sea diferente de null
botonSiguiente.onclick = () => {
  mostrarPokemonesDeAPI(siguienteURL);
};

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
    botonSiguiente.classList.replace("cursor-pointer", "cursor-default");
  } else {
    botonSiguiente.classList.replace(
      "bg-(--color-secundario)/50",
      "bg-(--color-secundario)",
    );
    botonSiguiente.classList.replace("cursor-default", "cursor-pointer");
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
    botonAtras.classList.replace("cursor-pointer", "cursor-default");
  } else {
    botonAtras.classList.replace(
      "bg-(--color-secundario)/50",
      "bg-(--color-secundario)",
    );
    botonAtras.classList.replace("cursor-default", "cursor-pointer");
  }
}
