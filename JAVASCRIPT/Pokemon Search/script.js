const searchInput = document.querySelector("#search-input");
const btnInput = document.querySelector("#search-button");
const basicInfo = document.querySelector("#basic-info");
const statsInfo = document.querySelector("#info");
const pokeImg = document.querySelector("#sprite");
const pokeType = document.querySelector("#types");

const setValues = (data) => {
  basicInfo.innerHTML = `
    <p>
      <span id="pokemon-name">${data.name}</span>
      <span id="pokemon-id">#${data.id}</span>
    </p>
    <p>
      <span id="weight">Weight: ${data.weight}</span>
      <span id="height">Height: ${data.height}</span>
    </p>`;
  pokeImg.setAttribute("src", data.sprites.front_default);
  pokeImg.setAttribute("alt", "Poke Img");
  pokeType.innerHTML = data.types
    .map((obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
    .join("");

  statsInfo.innerHTML = `
    <tr>
      <th>Base</th>
      <th>Stats</th>
    </tr>
    <tr>
      <td>HP:</td>
      <td id="hp">${data.stats[0].base_stat}</td>
    </tr>
    <tr>
      <td>Attack:</td>
      <td id="attack">${data.stats[1].base_stat}</td>
    </tr>
    <tr>
      <td>Defense:</td>
      <td id="defense">${data.stats[2].base_stat}</td>
    </tr>
    <tr>
      <td>Sp. Attack:</td>
      <td id="special-attack">${data.stats[3].base_stat}</td>
    </tr>
    <tr>
      <td>Sp. Defense:</td>
      <td id="special-defense">${data.stats[4].base_stat}</td>
    </tr>
    <tr>
      <td>Speed:</td>
      <td id="speed">${data.stats[5].base_stat}</td>
    </tr>`;
};

const btnInputHandler = () => {
  if (!searchInput.value) {
    alert("Enter a Pokémon Name");
    return;
  }

  // Clear previous results and error messages
  //   basicInfo.innerHTML = "";
  //   statsInfo.innerHTML = "";

  try {
    fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Pokémon not found");
        }
        return res.json();
      })
      .then((data) => setValues(data))
      .catch((err) => {
        alert("Pokémon not found");
      });
  } catch (err) {
    console.error(err);
  }
};

btnInput.addEventListener("click", btnInputHandler);
