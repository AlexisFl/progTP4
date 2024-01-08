// components/SigninForm.js
"use client";
import React, {useCallback, useEffect, useState} from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Box } from '@mantine/core';
import {Button, NoticeMessage, NoticeMessageData} from 'tp-kit/components';
import {ProductFiltersResult} from "../../../types";
import {variant} from "@mantine/styles/lib/theme/functions/fns/variant/variant";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../../../utils/supabase";

const schema = z.object({
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});
const SigninForm = () => {

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

    const handleSignIn = async () => {
        const connect = await supabase.auth.signInWithPassword({
            email: form.values.email,
            password: form.values.password,
        })
        if (connect.error === null) {
            router.push('/mon-compte');
        }
        else {
            setNotices( n => [...n, {type: "error", message: "Votre mot de passe ou votre adresse email est incorrecte, veuillez réessayer."}])
        }
    }

    const handleCreateAccount = () => {
        router.push('/inscription');
    };

    return (
        <Box maw={340} mx="auto">
            <form  onSubmit={form.onSubmit(handleSignIn)} className="space-y-8 mt-16">
                <ul>
                    {notices.map((notice, i) => <NoticeMessage
                        key={i}
                        {...notice}
                        onDismiss={() => removeNotice(i)}
                    />)}
                </ul>
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
                    <Button type="button" fullWidth variant="ghost" onClick={handleCreateAccount}>
                        Créer un compte
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default SigninForm;
