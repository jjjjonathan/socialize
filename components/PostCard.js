import { Card } from 'react-bootstrap';

const PostCard = ({ post }) => (
  <Card className="glass-card">
    <Card.Header>{post.user.name}</Card.Header>
    <Card.Body>
      {post.body}
      {/* <Card.Img variant="bottom" src="https://via.placeholder.com/150" /> */}
    </Card.Body>
    <Card.Footer>{post.likes.length} Likes</Card.Footer>
  </Card>
);

export default PostCard;
