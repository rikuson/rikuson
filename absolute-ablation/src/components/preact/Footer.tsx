import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaYoutube, FaPodcast } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary p-4 text-white" style={{ marginTop: 'auto' }}>
      <Container>
        <Row className="mb-2">
          <Col sm={2}>
            <img
              className="img-fluid"
              src="https://avatars.githubusercontent.com/u/11563968?s=200"
              alt="profile"
            />
          </Col>
          <Col sm={10}>
            <dl>
              <dt className="h3 text-white">Riku Takeuchi</dt>
              <dd>Software Engineer</dd>
            </dl>
            <div>
              <a
                className="text-white me-2"
                style={{ fontSize: '1rem' }}
                href="https://github.com/rikuson"
              >
                <FaGithub />
              </a>
              <a
                className="text-white me-2"
                style={{ fontSize: '1rem' }}
                href="https://x.com/rikson_en"
              >
                <FaTwitter />
              </a>
              <a
                className="text-white me-2"
                style={{ fontSize: '1rem' }}
                href="https://www.youtube.com/@rikson_en"
              >
                <FaYoutube />
              </a>
              <a
                className="text-white me-2"
                style={{ fontSize: '1rem' }}
                href="https://podcasters.spotify.com/pod/show/waotw"
              >
                <FaPodcast />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <small>&copy; 2016 Riku Takeuchi</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
