import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist — but great style does.</p>
      <Link to="/">
        <Button size="lg">Back to TrendWear</Button>
      </Link>
    </div>
  );
}
