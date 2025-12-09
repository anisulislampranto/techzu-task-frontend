import { useCallback, useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import api from "../api/api";
import { useAppDispatch } from "../hooks/hooks";
import { setCredentials } from "../store/slices/authSlice";

export type Mode = "login" | "signup";

type LoginForm = {
    email: string;
    password: string;
};

type SignupForm = {
    name: string;
    email: string;
    password: string;
    confirm: string;
};

type FormValues = LoginForm | SignupForm;

export function useAuthForm(initialMode: Mode = "login") {
    const dispatch = useAppDispatch();

    const [mode, setMode] = useState<Mode>(initialMode);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const methods = useForm<FormValues>({
        defaultValues:
            mode === "login"
                ? ({ email: "", password: "" } as LoginForm)
                : ({ name: "", email: "", password: "", confirm: "" } as SignupForm),
        mode: "onBlur",
    }) as UseFormReturn<FormValues, any>;

    const { reset, setError } = methods;

    const toggleMode = useCallback(
        (m: Mode) => {
            setServerError(null);
            setMode(m);
            if (m === "login") reset({ email: "", password: "" } as LoginForm);
            else reset({ name: "", email: "", password: "", confirm: "" } as SignupForm);
        },
        [reset]
    );

    const submit = useCallback(
        methods.handleSubmit(async (values: FormValues) => {
            setServerError(null);
            setLoading(true);
            try {
                if (mode === "login") {
                    const payload = values as LoginForm;
                    const res = await api.post("/auth/signin", payload);
                    const user = res?.data?.data?.user;
                    const token = res?.data?.data?.token;
                    dispatch(setCredentials({ user, token }));
                } else {
                    const payload = values as SignupForm;
                    if (payload.password !== payload.confirm) {
                        setError("confirm" as any, { type: "manual", message: "Passwords do not match" });
                        setLoading(false);
                        return;
                    }
                    const res = await api.post("/auth/signup", {
                        name: payload.name,
                        email: payload.email,
                        password: payload.password,
                    });
                    const user = res?.data?.data?.user;
                    const token = res?.data?.data?.token;
                    dispatch(setCredentials({ user, token }));
                }
            } catch (err: any) {
                const respMsg = err?.response?.data?.message;
                const respErrors = err?.response?.data?.errors;
                if (respErrors && typeof respErrors === "object") {
                    for (const key of Object.keys(respErrors)) {
                        setError(key as any, { type: "server", message: (respErrors as any)[key] });
                    }
                } else if (respMsg) {
                    setServerError(respMsg);
                } else {
                    setServerError(err?.message || "Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        }),
        [mode, dispatch, setError, methods]
    );

    return {
        mode,
        toggleMode,
        methods,
        submit,
        loading,
        serverError,
    } as const;
}
