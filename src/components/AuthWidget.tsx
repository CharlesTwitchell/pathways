import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

export function AuthWidget() {
  const { session, profile, loading, signInWithGoogle } = useAuth();

  if (loading) return null;

  if (!session) {
    return (
      <button type="button" className="sign-in-button" onClick={() => signInWithGoogle()}>
        Sign in with Google
      </button>
    );
  }

  const initial = (profile?.display_name || session.user.email || '?').charAt(0).toUpperCase();

  return (
    <Link to="/profile" className="avatar-link" aria-label="Your profile">
      {profile?.avatar_url ? (
        <img className="avatar-img" src={profile.avatar_url} alt="" />
      ) : (
        <div className="avatar-fallback">{initial}</div>
      )}
    </Link>
  );
}
