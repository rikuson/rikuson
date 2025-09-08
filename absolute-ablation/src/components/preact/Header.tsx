import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { SITE_TITLE } from '../../consts';
import SearchBox from './SearchBox';

interface HeaderProps {
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/' }) => {
  const baseUrl = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL || '';
  const pathname = currentPath.replace(baseUrl, '');
  
  return (
    <header>
      <Navbar expand="lg" bg="primary" className="navbar-dark">
        <Container fluid>
          <Navbar.Brand href="/">{SITE_TITLE}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/category/tech" className="px-3" active={pathname === '/category/tech' || pathname.startsWith('/tech/')}>tech</Nav.Link>
              <Nav.Link href="/category/fitness" className="px-3" active={pathname === '/category/fitness' || pathname.startsWith('/fitness/')}>fitness</Nav.Link>
              <Nav.Link href="/category/lifehack" className="px-3" active={pathname === '/category/lifehack' || pathname.startsWith('/lifehack/')}>lifehack</Nav.Link>
              <Nav.Link href="/category/music" className="px-3" active={pathname === '/category/music' || pathname.startsWith('/music/')}>music</Nav.Link>
            </Nav>
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
