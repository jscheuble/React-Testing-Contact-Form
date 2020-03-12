import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

test('renders correctly', () => {
    render(<ContactForm />);
});

test('contact form adds customer info to page', () => {
    const { getByLabelText, findByTestId } = render(<ContactForm />)
    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);

    fireEvent.change(firstNameInput, {
        target: { name: 'firstName', value: 'Jana'}
    });

    findByTestId('submit').then(res => {
        fireEvent.click(res);
    })
    
});