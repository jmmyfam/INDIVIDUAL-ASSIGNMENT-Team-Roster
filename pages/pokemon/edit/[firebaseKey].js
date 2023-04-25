import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePokemon } from '../../../api/pokeData';
import PokeForm from '../../../components/forms/PokeForm';

export default function EditPokemon() {
  const [editPoke, setEditPoke] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePokemon(firebaseKey).then(setEditPoke);
  }, [firebaseKey]);

  return (<PokeForm obj={editPoke} />);
}
