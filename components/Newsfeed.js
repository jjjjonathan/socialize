import { Card } from 'react-bootstrap';

const Newsfeed = () => (
  <>
    <Card className="glass-card">
      <Card.Header>Jonathan Horn</Card.Header>
      <Card.Body>
        Hey, my depression is a little better today! I{"'"}m feeling okay about
        myself!
        <Card.Img variant="bottom" src="https://via.placeholder.com/150" />
      </Card.Body>
      <Card.Footer>2 Likes</Card.Footer>
    </Card>
  </>
);

export default Newsfeed;
