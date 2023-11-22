// components/SignupForm.js
"use client";
import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Button } from '@mantine/core';

const schema = z.object({
    name: z.string().nonempty({ message: 'Le nom est requis' }),
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});

const SignupForm = () => {
    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema),
    });

    // Assurez-vous que formState est défini avant d'accéder à la propriété errors
    const errors = formState?.errors || {};

    const onSubmitHandler = (data) => {
        console.log('Données du formulaire d\'inscription:', data);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <TextInput label="Nom" {...register('name')} error={errors.name?.message} />
            <TextInput label="Email" {...register('email')} error={errors.email?.message} />
            <PasswordInput label="Mot de passe" {...register('password')} error={errors.password?.message} />
            <Button type="submit" color="blue" style={{ marginTop: '16px' }}>
                S'inscrire
            </Button>
        </form>
    );
};

export default SignupForm;
