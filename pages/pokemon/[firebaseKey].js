/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewPokeDetails } from '../../api/mergedData';

export default function ViewPokemon() {
  const [pokeDetails, setPokeDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewPokeDetails(firebaseKey).then(setPokeDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" style={{ width: '30rem' }}>
        <img src={pokeDetails.image} alt={pokeDetails.name} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {pokeDetails.name} - {pokeDetails.teamObject?.team_name}
          {pokeDetails.favorite ? ' ⭐' : ''}
        </h5>
        <p>{pokeDetails.description || ''}</p>
      </div>
    </div>
  );
}
