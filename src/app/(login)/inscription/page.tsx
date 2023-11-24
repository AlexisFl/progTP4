// components/SignupForm.js
"use client";
import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Box } from '@mantine/core';
import { Button } from 'tp-kit/components';

const schema = z.object({
    name: z.string().nonempty({ message: 'Le nom est requis' }),
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});

const SignupForm = () => {
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
            name: '',
        },
    });



    return (
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))} className="space-y-8 mt-16">
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
                <div>
                    <Button type="submit" fullWidth>
                        S'inscrire
                    </Button>
                    <Button type="button" fullWidth variant="ghost">
                        Déjà un compte ? Se connecter
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default SignupForm;
