'use client';

import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, TextInput, PasswordInput, Flex } from '@mantine/core';
import classnames from './Home.module.css';

export const LoginModal: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [formState, setFormState] = useState({ username: '', password: '' });

  const login = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const { token } = await response.json();
        document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (type: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [type]: event.target.value });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Login">
        <form onSubmit={login}>
          <Flex className={classnames.auth_container}>
            <TextInput
              label="Username"
              placeholder="Username"
              onChange={onInputChange('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              onChange={onInputChange('password')}
            />
            <Button type="submit">Login</Button>
          </Flex>
        </form>
      </Modal>

      <Button onClick={open}>Login</Button>
    </>
  );
};

export const RegisterModal: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [formState, setFormState] = useState({ username: '', password: '', email: '' });

  const register = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const { token } = await response.json();
        document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (type: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [type]: event.target.value });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Sign up">
        <form onSubmit={register}>
          <Flex className={classnames.auth_container}>
            <TextInput
              label="Username"
              placeholder="Username"
              onChange={onInputChange('username')}
            />
            <TextInput label="E-mail" placeholder="E-mail" onChange={onInputChange('email')} />
            <PasswordInput
              label="Password"
              placeholder="Password"
              onChange={onInputChange('password')}
            />
            <Button type="submit">Register</Button>
          </Flex>
        </form>
      </Modal>

      <Button onClick={open}>Sign up</Button>
    </>
  );
};
