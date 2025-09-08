import type React from 'react';
import { useEffect, useState } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
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

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState<PostData[]>([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Gradually reveal posts with animation
      posts.forEach((post, index) => {
        setTimeout(() => {
          setVisiblePosts((prev) => [...prev, post]);
        }, index * 100); // 100ms delay between each post
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [posts]);

  const breakpointColumns = {
    default: 4,
    1200: 4,
    992: 3,
    768: 2,
    576: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {isLoading
        ? // Show placeholders while loading
          Array.from({ length: Math.min(8, posts.length) }).map((_, index) => (
            <div key={`placeholder-${index}`} className="mb-4">
              <PostPlaceholder />
            </div>
          ))
        : // Show actual posts with animation
          visiblePosts.map((post) => (
            <div key={post.id} className="post-item">
              <Post
                title={post.title}
                url={post.url}
                date={post.date}
                category={post.category}
                image={post.image}
                excerpt={post.excerpt}
                tags={post.tags}
              />
            </div>
          ))}
    </Masonry>
  );
};

export default PostList;
