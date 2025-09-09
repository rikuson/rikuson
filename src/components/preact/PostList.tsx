import type React from 'react';
import { useEffect, useState } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import Feed from '../../utils/feed';
import Post from './Post';
import './PostList.css';

interface PostData {
  id: string;
  title: string;
  url: string;
  date: Date | string;
  category?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
}

interface PostListProps {
  posts: PostData[];
  searchKeyword?: string;
}

const PostPlaceholder: React.FC = () => (
  <Card className="shadow h-100">
    <div style={{ aspectRatio: '7 / 4', background: '#e9ecef' }} />
    <Card.Body>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={9} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={6} /> <Placeholder xs={8} />
      </Placeholder>
    </Card.Body>
  </Card>
);

export const PostList: React.FC<PostListProps> = ({ posts, searchKeyword }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(posts);
  const [feed, setFeed] = useState<Feed | null>(null);

  // Initialize TinySearch
  useEffect(() => {
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

  // Perform search when searchKeyword changes
  useEffect(() => {
    const performSearch = async () => {
      if (!searchKeyword || !searchKeyword.trim()) {
        setFilteredPosts(posts);
        return;
      }

      if (feed) {
        try {
          // Use TinySearch for searching
          const searchResults = feed.search(searchKeyword);

          // Convert TinySearch results back to PostData format
          const searchedPosts = searchResults
            .map(([title, url]) => {
              // Find the matching post from our posts array
              return (
                posts.find((post) => post.url === url) || {
                  id: url,
                  title: title,
                  url: url,
                  date: new Date().toISOString(),
                  category: 'search',
                  excerpt: 'Search result',
                }
              );
            })
            .filter(Boolean) as PostData[];

          setFilteredPosts(searchedPosts);
        } catch (error) {
          console.error('TinySearch failed, using fallback search:', error);
          // Fallback to simple text search
          const filtered = posts.filter(
            (post) =>
              post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              post.excerpt?.toLowerCase().includes(searchKeyword.toLowerCase())
          );
          setFilteredPosts(filtered);
        }
      } else {
        // Fallback to simple text search when TinySearch is not available
        const filtered = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    };

    performSearch();
  }, [searchKeyword, feed, posts]);

  // Handle loading and animation
  useEffect(() => {
    setIsLoading(true);
    setVisiblePosts([]);

    const timer = setTimeout(() => {
      setIsLoading(false);
      filteredPosts.forEach((post, index) => {
        setTimeout(() => setVisiblePosts((prev) => [...prev, post]), index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [filteredPosts]);

  const breakpointColumns = {
    default: 4,
    1200: 4,
    992: 3,
    768: 2,
    576: 1,
  };

  // Show search message
  if (searchKeyword && filteredPosts.length === 0 && !isLoading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <h3 className="mt-3">No results found</h3>
          <p className="text-muted">
            No posts found for "{searchKeyword}". Try different keywords.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {isLoading
          ? Array.from(
              { length: Math.min(8, filteredPosts.length || posts.length) },
              (_, index) => (
                <div key={`placeholder-${index}`} className="mb-4">
                  <PostPlaceholder />
                </div>
              )
            )
          : visiblePosts.map((post) => (
              <div key={post.id} className="post-item">
                <Post {...post} />
              </div>
            ))}
      </Masonry>
    </>
  );
};

export default PostList;
