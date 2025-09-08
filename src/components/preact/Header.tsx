import type React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { SITE_TITLE } from '../../consts';
import SearchBox from './SearchBox';

interface HeaderProps {
  currentPath?: string;
  categories?: string[];
}

export const Header: React.FC<HeaderProps> = ({
  currentPath = '/',
  categories = ['fitness', 'lifehack', 'music', 'tech'],
}) => {
  const baseUrl = import.meta?.env?.BASE_URL || '';
  const pathname = currentPath.replace(baseUrl, '');

  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">{SITE_TITLE}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {categories.map((category) => (
                <Nav.Link
                  key={category}
                  href={`/${category}`}
                  className="px-3"
                  active={pathname === `/${category}` || pathname.startsWith(`/${category}/`)}
                >
                  {category}
                </Nav.Link>
              ))}
            </Nav>
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
