/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { render, screen, fireEvent, describe, test, expect } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext, UserContextProvider } from './UserContext'; // Adjust the import path as needed

// A mock component to test the context
const TestComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <div>
      <span data-testid="user">{currentUser ? currentUser.name : 'No user'}</span>
      <button onClick={() => setCurrentUser({ name: 'Test User' })}>Set User</button>
    </div>
  );
};

describe('UserContextProvider', () => {
  test('provides the expected context value', () => {
    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    // Initially, there should be no user
    expect(screen.getByTestId('user')).toHaveTextContent('No user');

    // Simulate setting a user
    fireEvent.click(screen.getByText('Set User'));

    // After setting a user, the user's name should be displayed
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });

  test('updates context value when setCurrentUser is called', () => {
    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {({ currentUser, setCurrentUser }) => (
            <div>
              <span data-testid="user">{currentUser ? currentUser.name : 'No user'}</span>
              <button onClick={() => setCurrentUser({ name: 'New User' })}>Set New User</button>
            </div>
          )}
        </UserContext.Consumer>
      </UserContextProvider>
    );

    // Initially, there should be no user
    expect(screen.getByTestId('user')).toHaveTextContent('No user');

    // Simulate setting a new user
    fireEvent.click(screen.getByText('Set New User'));

    // After setting a new user, the new user's name should be displayed
    expect(screen.getByTestId('user')).toHaveTextContent('New User');
  });
});