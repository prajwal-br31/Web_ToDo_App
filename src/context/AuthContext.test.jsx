import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from './AuthContext';
import AuthContext from './AuthContext';

describe('AuthContext', () => {s
  const TestComponent = () => {
    const { isAuthenticated, login } = React.useContext(AuthContext);
    return (
      <div>
        <span data-testid="auth-status">{isAuthenticated.toString()}</span>
        <button onClick={() => login('user', 'pass')} data-testid="login-button">Login</button>
      </div>
    );
  };

  test('initial authStatus state is false', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const authStatus = screen.getByTestId('auth-status');
    expect(authStatus).toHaveTextContent('false');
  });

  test('authStatus state changes to true on successful login', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const authStatus = screen.getByTestId('auth-status');
    const loginButton = screen.getByTestId('login-button');
    expect(authStatus).toHaveTextContent('false');
    loginButton.click();
    expect(authStatus).toHaveTextContent('true');
  });
});
