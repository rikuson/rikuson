import type React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaGithub, FaPodcast, FaTwitter, FaYoutube } from 'react-icons/fa';

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
              {[
                { href: 'https://github.com/rikuson', icon: FaGithub },
                { href: 'https://x.com/rikson_en', icon: FaTwitter },
                { href: 'https://www.youtube.com/@rikson_en', icon: FaYoutube },
                { href: 'https://podcasters.spotify.com/pod/show/waotw', icon: FaPodcast },
              ].map(({ href, icon: Icon }) => (
                <a key={href} className="text-white me-2" style={{ fontSize: '1rem' }} href={href}>
                  <Icon />
                </a>
              ))}
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
