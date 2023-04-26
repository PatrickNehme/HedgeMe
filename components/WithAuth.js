import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

const WithAuth = (WrappedComponent, requiredRole) => {
  const WithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookie.get('token');

      if (!token) {
        router.replace('/login');
      } else {
        try {
          const decodedToken = jwt_decode(token);
          const { role } = decodedToken;

          if (requiredRole && role !== requiredRole) {
            router.replace('/login');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          router.replace('/login');
        }
      }
    }, [router, requiredRole]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default WithAuth;
