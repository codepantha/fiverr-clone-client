import { useEffect, useState } from 'react';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser)
      setCurrentUser(JSON.parse(storedUser))
  }, [])

  return currentUser;
};

export default useCurrentUser;
