// components/SigninForm.js
"use client";
import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Button } from '@mantine/core';

const schema = z.object({
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});

const SigninForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log('Données du formulaire de connexion:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput label="Email" {...register('email')} error={errors.email?.message} />
            <PasswordInput label="Mot de passe" {...register('password')} error={errors.password?.message} />
            <Button type="submit" color="blue" style={{ marginTop: '16px' }}>
                Se connecter
            </Button>
        </form>
    );
};

export default SigninForm;
