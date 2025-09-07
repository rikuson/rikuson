import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Post from './Post';

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
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
}

export const PostList: React.FC<PostListProps> = ({ 
  posts, 
  columns = { md: 6, lg: 4, xl: 3 } 
}) => {
  return (
    <Container fluid className="py-4">
      <Row>
        {posts.map((post) => (
          <Col key={post.id} {...columns} className="mb-4">
            <Post
              title={post.title}
              url={post.url}
              date={post.date}
              category={post.category}
              image={post.image}
              excerpt={post.excerpt}
              tags={post.tags}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostList;