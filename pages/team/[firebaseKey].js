/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import PokeCard from '../../components/PokeCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getAllTeamPokemon = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getAllTeamPokemon();
  }, []);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap" style={{ marginTop: '100px' }}>
        <div className="d-flex flex-column">
          <img src={teamDetails.image} alt={teamDetails.team_name} style={{ width: '500px' }} />
        </div>
        <div className="text-white ms-5 details" style={{ color: 'black' }}>
          <h5>
            {teamDetails.team_name}
            {teamDetails.favorite ? ' ⭐' : ''}
          </h5>
          <h6> Creator: { teamDetails.creator } </h6>
          <hr />
        </div>
      </div>
      <div className="d-flex flex-wrap text-center" style={{ marginTop: '50px' }}>
        {teamDetails.pokemon?.map((poke) => (
          <PokeCard key={poke.firebaseKey} pokeObj={poke} onUpdate={getAllTeamPokemon} />
        ))};
      </div>
    </div>
  );
}
