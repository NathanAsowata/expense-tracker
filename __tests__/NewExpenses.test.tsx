import { render, screen, fireEvent } from '@testing-library/react';
import NewExpenses from '@/pages/expenses/new';
import { db } from '@/firebase/Config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';


// mock next router hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// mock firebase config details
jest.mock('../src/firebase/Config', () => ({
  db: {},
}));

// mock firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe('NewExpenses', () => {
  let pushMock: jest.Mock;
  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('renders the form correctly', () => {
    render(<NewExpenses />);
    expect(screen.getByText('Add a New Expense')).toBeInTheDocument;
    expect(screen.getByLabelText('Select a category')).toBeInTheDocument;
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument;
  });

  it('adds a new expense to the database and redirects to the dashboard', async () => {
    (addDoc as jest.Mock).mockResolvedValueOnce({});
    render(<NewExpenses />);
    fireEvent.change(screen.getByLabelText('Select a category'), {
      target: { value: 'miscellaneous' },
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test description' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(addDoc).toHaveBeenCalledWith(collection(db, 'expenses'), {
      amount: '100',
      category: 'miscellaneous',
      date: serverTimestamp(),
      description: 'Test description',
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });

  it('logs an error if adding a new expense fails', async () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementationOnce(() => {});
    (addDoc as jest.Mock).mockRejectedValueOnce(new Error('Test error'));
    render(<NewExpenses />);
    fireEvent.change(screen.getByLabelText('Select a category'), {
      target: { value: 'miscellaneous' },
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test description' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error adding document: ',
      new Error('Test error')
    );
  });
});
