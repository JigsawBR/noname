import { useEffect, useState } from 'react';
import { SwipeCard } from '../components/SwipeCard';

export const Home = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Buscar usuários próximos da API
    fetch('/api/users/nearby')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="home">
      {users.map((user) => (
        <SwipeCard key={user._id} user={user} />
      ))}
    </div>
  );
};