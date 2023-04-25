// import React, { useEffect, useState } from 'react';
// import { getPokemon } from '../api/pokeData';
// import { useAuth } from '../utils/context/authContext';
// // import PokeCard from '../components/PokeCard';

function Home() {
  // // TODO: Set a state for books
  // const [pokemon, setPokemon] = useState([]);

  // // TODO: Get user ID using useAuth Hook
  // const { user } = useAuth();

  // // TODO: create a function that makes the API call to get all the books
  // const getAllThePokemon = () => {
  //   getPokemon(user.uid).then(setPokemon);
  // };

  // // TODO: make the call to the API to get all the books on component render
  // useEffect(() => {
  //   getAllThePokemon();
  // }, []);

  return (
    <div className="text-center my-4">
      <h1>Hi</h1>
    </div>
  );
}

export default Home;
