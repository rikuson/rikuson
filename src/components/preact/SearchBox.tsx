import type React from 'react';
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, ListGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaSpinner, FaTimes } from 'react-icons/fa';
import Feed, { type SearchResult } from '../../utils/feed';
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
  const [isSearching, setIsSearching] = useState(false);
  const [feed, setFeed] = useState<Feed | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Initialize Feed when component mounts
    const initFeed = async () => {
      try {
        const feedInstance = await Feed.init();
        setFeed(feedInstance);
      } catch (error) {
        console.error('Failed to initialize TinySearch:', error);
      }
    };
    initFeed();
  }, []);

  useEffect(() => {
    // Perform search when searchTerm changes
    const performSearch = async () => {
      if (!feed || !searchTerm.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = feed.search(searchTerm);
        setSearchResults(results.slice(0, 10));
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(performSearch, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchTerm, feed]);

  const handleClose = () => {
    setShow(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleShow = () => setShow(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?keyword=${encodeURIComponent(searchTerm)}`;
    }
  };

  // Use TinySearch results if available, otherwise fallback to title filtering
  const displayResults =
    searchResults.length > 0
      ? searchResults
      : searchTerm.trim()
        ? posts
            .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 10)
            .map((post) => ({ ...post, body: '' }))
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
                ref={(e) => e?.focus()}
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

          {displayResults.length > 0 && (
            <>
              <ListGroup>
                {displayResults.map(([title, url], _index) => (
                  <ListGroup.Item key={url} action href={url} as="a">
                    {title}
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
