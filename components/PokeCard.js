import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePokemon } from '../api/pokeData';

function PokeCard({ pokeObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisPokemon = () => {
    if (window.confirm(`Delete ${pokeObj.name}?`)) {
      deletePokemon(pokeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '16rem', height: '27rem', margin: '25px', border: 'none',
    }}
    >
      <Card.Img variant="top" src={pokeObj.image} alt={pokeObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{pokeObj.name}</Card.Title>
        <p className="card-text bold">{pokeObj.team}</p>
        <p className="card-text bold">{pokeObj.favorite && <span>⭐<br /></span> } {pokeObj.favorite}</p>
        <Link href={`/pokemon/${pokeObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2" style={{ backgroundColor: '#023e8a', fontSize: '10px' }}>VIEW</Button>
        </Link>
        <Link href={`/pokemon/edit/${pokeObj.firebaseKey}`} passHref>
          <Button variant="info" style={{ backgroundColor: '#00b4d8', fontSize: '10px' }}>EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPokemon} className="m-2" style={{ backgroundColor: '#f77f00', fontSize: '10px' }}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PokeCard.propTypes = {
  pokeObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    team: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PokeCard;
