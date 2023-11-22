// components/SignupForm.js
"use client";
import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Button, Box } from '@mantine/core';

const schema = z.object({
    name: z.string().nonempty({ message: 'Le nom est requis' }),
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});

const SignupForm = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            name: '',
        },
    });



    return (
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Nom"
                    description = "Le nom qui sera utilisé pour vos commandes"
                    placeholder="Lin Guini..."
                    {...form.getInputProps('name')}
                />
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
                <Button type="submit" color="blue" style={{ marginTop: '16px' }}>
                    S'inscrire
                </Button>
                <Button type="button" variant="link" style={{ marginTop: '16px' }}>
                    Déjà inscrit ? Se connecter
                </Button>
            </form>
        </Box>
    );
};

export default SignupForm;
