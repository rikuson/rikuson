import type React from 'react';
import { useState } from 'react';
import { Button, Form, InputGroup, ListGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaSpinner, FaTimes } from 'react-icons/fa';
import './SearchBox.css';

interface SearchBoxProps {
  posts?: Array<{
    url: string;
    title: string;
    category?: string;
  }>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ posts = [] }) => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, _setIsSearching] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSearchTerm('');
  };

  const handleShow = () => setShow(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?keyword=${encodeURIComponent(searchTerm)}`;
    }
  };

  const filteredPosts = searchTerm.trim()
    ? posts
        .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 10)
    : [];

  return (
    <>
      <div className="d-grid">
        <Button variant="outline-secondary" onClick={handleShow}>
          Search...
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} size="xl" backdropClassName="search-modal-backdrop">
        <Form onSubmit={handleSearch}>
          <Modal.Header className="p-1">
            <InputGroup className="w-100">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                autoComplete="off"
              />
              <Button
                variant="link"
                className="text-secondary border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-2"
                style={{ zIndex: 10 }}
                onClick={() => (searchTerm ? setSearchTerm('') : handleClose())}
              >
                {isSearching ? (
                  <FaSpinner className="fa-spin" />
                ) : searchTerm ? (
                  <FaTimes />
                ) : (
                  <FaSearch />
                )}
              </Button>
            </InputGroup>
          </Modal.Header>

          {filteredPosts.length > 0 && (
            <>
              <ListGroup>
                {filteredPosts.map((post, _index) => (
                  <ListGroup.Item key={post.url} action href={post.url} as="a">
                    {post.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  See more
                </Button>
              </Modal.Footer>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default SearchBox;
