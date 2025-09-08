import { Card, Badge, Stack } from 'react-bootstrap';
import { FaCalendarAlt, FaFolderOpen, FaArrowRight } from 'react-icons/fa';

interface PostProps {
  title: string;
  url: string;
  date: Date | string;
  category?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
}

export const Post: React.FC<PostProps> = ({ title, url, date, category, image, excerpt, tags }) => {
  const formatDate = (d: Date | string) => 
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const imageUrl = image || `https://rikson.imgix.net/placeholder.png?txt=${encodeURIComponent(title)}&txt-size=48&txt-pad=36&txt-shad=5&txt-fit=max&txt-align=center,middle&blur=30&w=600&txt-color=fff`;

  return (
    <Card className="shadow h-100">
      <Card.Link href={url} className="ratio ratio-16x9">
        <Card.Img src={imageUrl} alt={title} className="object-fit-cover" />
      </Card.Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="h4">
          <Card.Link href={url} className="text-decoration-none text-dark">{title}</Card.Link>
        </Card.Title>
        
        <Stack direction="horizontal" gap={2} className="small text-muted mb-2 flex-wrap">
          <div><FaCalendarAlt size={14} className="me-1" />{formatDate(date)}</div>
          {category && (
            <div>
              <FaFolderOpen size={14} className="me-1" />
              <Card.Link href={`/category/${category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</Card.Link>
            </div>
          )}
        </Stack>
        
        {tags?.length > 0 && (
          <Stack direction="horizontal" gap={1} className="mb-2">
            {tags.map(tag => <Badge bg="secondary" key={tag}>{tag}</Badge>)}
          </Stack>
        )}
        
        {excerpt && <Card.Text className="flex-grow-1">{excerpt}</Card.Text>}
        
        <Card.Link href={url} className="ms-auto">
          Read more <FaArrowRight size={12} />
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Post;