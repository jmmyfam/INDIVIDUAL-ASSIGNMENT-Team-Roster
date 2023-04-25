/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Image, Navbar, Container, Nav, Button,
} from 'react-bootstrap';
// import SearchBar from './SearchBar';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image
              src="https://static1.textcraft.net/data1/a/5/a5a196ffb40e438422f2ca512c623d3b5f8308e0da39a3ee5e6b4b0d3255bfef95601890afd80709da39a3ee5e6b4b0d3255bfef95601890afd80709e997837b44e4cf02f63ab47b56cf530e.png"
              width="250"
              height="50"
              className="d-inline-block align-top"
              alt="PokéRoster"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/pokemon">
              <Nav.Link>See All Pokémon</Nav.Link>
            </Link>
            <Link passHref href="/pokemon/new">
              <Nav.Link>Register To Pokedex</Nav.Link>
            </Link>
            <Link passHref href="/teams">
              <Nav.Link>Teams</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link>Create A Team</Nav.Link>
            </Link>
            <Button variant="outline-danger" onClick={signOut} style={{ backgroundColor: '', marginLeft: '300px' }}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
