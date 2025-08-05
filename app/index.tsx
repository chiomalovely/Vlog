import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      // For now, always redirect to welcome screen
      // In a real app, you'd check authentication status here
      router.replace('/welcome');
    };

    checkAuth();
  }, []);

  return null;
}