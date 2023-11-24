// components/SignupForm.js
"use client";
import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Box } from '@mantine/core';
import {Button, NoticeMessage, NoticeMessageData} from 'tp-kit/components';
import {useState} from "react";

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

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    function addError() {
        setNotices( n => [...n, {type: "error", message: "Cette adresse n'est pas disponible"}])
    }

    function addSuccess() {
        setNotices( n => [...n, {type: "success", message: "Votre Inscription a bien été prise en compte. Validez votre adresse email pour vous connecter."}])
    }

    function removeNotice (index: number){
        setNotices(n => {
            delete(n[index]);
            return Object.values(n)
        });
    }

    const handleSignup = () => {
        addError();
        addSuccess();
    };


    return (
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))} className="space-y-8 mt-16">
                <ul>
                    {notices.map((notice, i) => <NoticeMessage
                        key={i}
                        {...notice}
                        onDismiss={() => removeNotice(i)}
                    />)}
                </ul>
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
                    <Button type="submit" onClick={handleSignup} fullWidth>
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
