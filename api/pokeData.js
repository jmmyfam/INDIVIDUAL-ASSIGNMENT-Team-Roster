import { clientCredentials } from '../utils/client';
// API CALLS FOR POKEMON

const endpoint = clientCredentials.databaseURL;

const getPokemon = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deletePokemon = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSinglePokemon = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createPokemon = (pokeObj) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokeObj),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updatePokemon = (pokeObj) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon/${pokeObj.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokeObj),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getFavPokemon = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favPokemon = Object.values(data).filter((item) => item.favorite);
      resolve(favPokemon);
    })
    .catch(reject);
});

export {
  getPokemon,
  createPokemon,
  deletePokemon,
  getSinglePokemon,
  updatePokemon,
  getFavPokemon,
};
