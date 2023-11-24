// components/SigninForm.js
"use client";
import React, {useCallback} from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Box } from '@mantine/core';
import { Button } from 'tp-kit/components';
import {ProductFiltersResult} from "../../../types";
import {variant} from "@mantine/styles/lib/theme/functions/fns/variant/variant";

const schema = z.object({
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});
const SigninForm = () => {

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Box maw={340} mx="auto">
            <form  onSubmit={form.onSubmit((values) => console.log(values))} className="space-y-8 mt-16">
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
                        Se connecter
                    </Button>
                    <Button type="button" fullWidth variant="ghost">
                        Créer un compte
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default SigninForm;
