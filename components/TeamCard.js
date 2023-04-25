import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteTeamPokemon } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team_name}?`)) {
      deleteTeamPokemon(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '30rem', margin: '30px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.team_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="outline-primary" className="m-2" style={{ backgroundColor: '', margin: '20px' }}>VIEW</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="outline-info" style={{ backgroundColor: '', margin: '20px' }}>EDIT</Button>
        </Link>
        <Button variant="outline-danger" onClick={deleteThisTeam} className="m-2" style={{ backgroundColor: '', margin: '20px' }}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
