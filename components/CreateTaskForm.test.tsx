import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import CreateTaskForm from '../components/CreateTaskForm';
import * as db from '../store/db';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../store/db', () => ({
  addItem: jest.fn(),
}));

describe('CreateTaskForm', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('має інпут для назви завдання', () => {
    const { getByPlaceholderText } = render(<CreateTaskForm />);
    expect(getByPlaceholderText('Enter task title')).toBeTruthy();
  });

  it('має заголовок "Create New Task"', () => {
    const { getByText } = render(<CreateTaskForm />);
    expect(getByText('Create New Task')).toBeTruthy();
  });

  it('має кнопку для вибору дати', () => {
    const { getByText } = render(<CreateTaskForm />);
    const today = new Date().toDateString();
    expect(getByText(today)).toBeTruthy();
  });

  it('створює нове завдання після натискання Create', async () => {
    const { getByText, getByPlaceholderText } = render(<CreateTaskForm />);
    
    fireEvent.changeText(getByPlaceholderText('Enter task title'), 'Test Task');

    fireEvent.press(getByText('Create'));

    await waitFor(() => {
      expect(db.addItem).toHaveBeenCalledWith(
        'Test Task',
        expect.any(Date),
        'low',
        'in progress'
      );
      expect(mockPush).toHaveBeenCalledWith('/list');
    });
  });
});
