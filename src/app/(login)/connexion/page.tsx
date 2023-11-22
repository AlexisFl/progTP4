// components/SigninForm.js
"use client";
import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Button, Box } from '@mantine/core';

const SigninForm = () => {

    const form = useForm({
        initialValues: {
            email: '',
            password: '',

        },
    })

    return (
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Adresse email"
                    placeholder="lin.guini@barilla.it..."
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    withAsterisk
                    label="Mot de passe"
                    placeholder="Ke$$a..."
                    {...form.getInputProps('password')}
                />
                <Button type="submit" color="green">
                    Se connecter
                </Button>
            </form>
        </Box>
    );
};

export default SigninForm;
