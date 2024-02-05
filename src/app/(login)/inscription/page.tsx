// components/SignupForm.js
"use client";
import React, {useEffect} from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Box } from '@mantine/core';
import {Button, NoticeMessage, NoticeMessageData} from 'tp-kit/components';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../../../utils/supabase";

const schema = z.object({
    name: z.string().nonempty({ message: 'Le nom est requis' }),
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});


const SignupForm = () => {

    const router = useRouter()
    const supabase = createClientComponentClient()

    useEffect(() => {
        const checkConnection = async () => {
            const user = await getUser(supabase);
            if (user) {
                router.push('/');
            }
        };

        checkConnection();
    }, []);

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
            name: '',
        },
    });
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

    const handleSignUp = async () => {
        const valide = await supabase.auth.signUp({
            email: form.values.email,
            password: form.values.password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth/callback`,
                data: {
                    name: form.values.name,
                },
            },
        });
        console.log("oui")
        console.log(valide.error)
        console.log("oui")
        if(valide.error === null){
            addSuccess();
        }
        else {
            setNotices( n => [...n, {type: "error", message: "Cette adresse est déjà utilisé"}])
        }

            //router.refresh()
    }

    const handleAccessAccount = () => {
        router.push('/connexion');
    };


    return (
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit(handleSignUp)} className="space-y-8 mt-16">
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
                    <Button type="submit" fullWidth>
                        {"S'inscrire"}
                    </Button>
                    <Button type="button" fullWidth variant="ghost" onClick={handleAccessAccount}>
                        {"Déjà un compte ? Se connecter"}
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default SignupForm;
