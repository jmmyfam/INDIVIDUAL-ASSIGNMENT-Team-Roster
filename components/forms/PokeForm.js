import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPokemon, updatePokemon } from '../../api/pokeData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  description: '',
  team: '',
  favorite: false,
};

function PokeForm({ obj }) {
  const [pokeInput, setPokeInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setPokeInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokeInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePokemon(pokeInput)
        .then(() => router.push(`/pokemon/${obj.firebaseKey}`));
    } else {
      const payload = { ...pokeInput, uid: user.uid };
      createPokemon(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePokemon(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Pokemon</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Pokemon Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={pokeInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Pokemon Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={pokeInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Pokemon Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter description"
          name="description"
          value={pokeInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEAM NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Team Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter team"
          name="team"
          value={pokeInput.team}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* TEAM SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.team_id}
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-grey mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={pokeInput.adoptable}
        onChange={(e) => {
          setPokeInput((prevState) => ({
            ...prevState,
            adoptable: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Pokemon</Button>
    </Form>
  );
}

PokeForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    adoptable: PropTypes.bool,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PokeForm.defaultProps = {
  obj: initialState,
};

export default PokeForm;
