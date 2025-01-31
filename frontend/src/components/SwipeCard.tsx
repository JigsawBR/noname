import { useState } from 'react';

export const SwipeCard = ({ user }: { user: any }) => {
  const [swipe, setSwipe] = useState<'left' | 'right' | null>(null);

  return (
    <div className="swipe-card">
      <img src={user.photos[0]} alt={user.name} />
      <h3>{user.name}, {user.age}</h3>
      <p>{user.bio}</p>
      <div className="buttons">
        <button onClick={() => setSwipe('left')}>❌</button>
        <button onClick={() => setSwipe('right')}>❤️</button>
      </div>
    </div>
  );
};