import React from 'react';
import AuthForm from '~/features/auth/components/authForm';

function LoginPage() {
  return (
    <div>
      <AuthForm mode = "login"/>
    </div>
  );
}

export default LoginPage;