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
        target: { name: 'firstName', value: 'Jana' }
    });
    fireEvent.change(lastNameInput, {
        target: { name: 'lastName', value: 'Scheuble' }
    });
    fireEvent.change(emailInput, {
        target: { name: 'email', value: 'jscheubs@ymail.com' }
    });
    fireEvent.change(messageInput, {
        target: { name: 'message', value: 'hello world' }
    });

    findByTestId('submit').then(res => {
        fireEvent.click(res);
    });
});

test('contact form has first and last name inputs', () => {
    const { findAllByText } = render(<ContactForm />);
    const names = findAllByText(/name/i);
    expect(names.length === 2);
});

test('contact form has email input', () => {
    const { getByLabelText } = render(<ContactForm />);
    const emailInput = getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
});

test('contact form has message input', () => {
    const { getByLabelText } = render(<ContactForm />);
    const messageInput = getByLabelText(/message/i);
    expect(messageInput).toBeInTheDocument();
})