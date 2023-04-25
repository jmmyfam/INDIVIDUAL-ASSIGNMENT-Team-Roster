import { deletePokemon, getSinglePokemon } from './pokeData';
import { deleteSingleTeam, getSingleTeam, getTeamPokemon } from './teamData';

const viewPokeDetails = (pokeFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePokemon(pokeFirebaseKey)
    .then((pokeObject) => {
      getSingleTeam(pokeObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...pokeObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPokemon(teamFirebaseKey)])
    .then(([teamObject, teamPokeArray]) => {
      resolve({ ...teamObject, pokemon: teamPokeArray });
    }).catch((error) => reject(error));
});

const deleteTeamPokemon = (teamId) => new Promise((resolve, reject) => {
  getTeamPokemon(teamId).then((pokeArray) => {
    console.warn(pokeArray, 'Team Pokemon');
    const deletePokemonPromises = pokeArray.map((poke) => deletePokemon(poke.firebaseKey));

    Promise.all(deletePokemonPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPokeDetails, viewTeamDetails, deleteTeamPokemon };
