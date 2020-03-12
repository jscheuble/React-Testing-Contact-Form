import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

test('renders correctly', () => {
    render(<ContactForm />);
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
});

test('contact form submits without errors', () => {
    const { getByLabelText, findByTestId, queryAllByText } = render(<ContactForm />)
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

    const errors = queryAllByText(/error/i);
    expect(errors.length === 0);
});

test('contact form inputs rendered to screen after submit', async () => {
    const { findAllByText, findByLabelText } = render(<ContactForm />);
    const firstName = await findByLabelText(/first name/i);
    const lastName = await findByLabelText(/last name/i);
    const email = await findByLabelText(/email/i)

    fireEvent.change(firstName, {
        target: { name: 'firstName', value: 'Jana' }
    });
    fireEvent.change(lastName, {
        target: { name: 'lastName', value: 'Scheuble' }
    });
    fireEvent.change(email, {
        target: { name: 'email', value: 'jscheubs@ymail.com' }
    });

    const submit = document.getElementById('submit');
    fireEvent.click(submit);

    await findAllByText(/jana/i);
    await findAllByText(/scheuble/i);
    await findAllByText(/jscheubs/i);
})
