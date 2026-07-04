import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Input } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { sanitizeText } from '../utils/security';
import { profileSchema } from '../utils/validators';

export function AccountPage() {
  const { user, logout, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccess(false);

    const result = profileSchema.safeParse({ name });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Invalid name');
      return;
    }

    updateProfile({ name: sanitizeText(result.data.name, 80) });
    setError('');
    setSuccess(true);
  }

  return (
    <div className="account-page">
      <h1>My Account</h1>

      <div className="account-grid">
        <Card title="Profile">
          {success && <Alert variant="success">Profile updated successfully</Alert>}
          <form onSubmit={handleSubmit}>
            <Input
              label="Full name"
              name="name"
              value={name}
              error={error}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="field__hint">Email: {user?.email}</p>
            <Button type="submit">Save Changes</Button>
          </form>
        </Card>

        <Card title="Orders">
          <p className="empty-orders">No orders yet. Start shopping to see your history here.</p>
          <Link to="/shop">
            <Button variant="secondary">Browse Collection</Button>
          </Link>
        </Card>

        <Card title="Account">
          <Button variant="danger" onClick={logout}>
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );
}
