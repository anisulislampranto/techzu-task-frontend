import React, { useState } from "react";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAppSelector } from "../hooks/hooks";

export default function HomePage() {
    const { mode, toggleMode, methods, submit, loading, serverError } = useAuthForm("login");
    const { register, formState, watch } = methods;
    const { errors } = formState;
    const existingToken = useAppSelector((s) => s.auth.token);

    const [showPassword, setShowPassword] = useState(false);
    const passwordValue = watch("password");

    return (
        <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-white flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 max-w-2xl w-full">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create an account"}</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            {mode === "login" ? "Sign in to continue" : "Start collaborating and commenting"}
                        </p>
                    </div>

                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-full">
                        <button
                            type="button"
                            onClick={() => toggleMode("login")}
                            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${mode === "login" ? "bg-white shadow-sm" : "text-slate-500"}`}
                            aria-pressed={mode === "login"}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleMode("signup")}
                            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${mode === "signup" ? "bg-white shadow-sm" : "text-slate-500"}`}
                            aria-pressed={mode === "signup"}
                        >
                            Sign up
                        </button>
                    </div>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                    {mode === "signup" && (
                        <label className="block">
                            <span className="text-sm text-slate-600">Full name</span>
                            <input
                                {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
                                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                placeholder="Your name"
                                aria-label="Full name"
                            />
                            {errors?.name && <p className="text-xs text-red-600 mt-1">{(errors.name as any).message}</p>}
                        </label>
                    )}

                    <label className="block">
                        <span className="text-sm text-slate-600">Email</span>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                            })}
                            className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="you@example.com"
                            type="email"
                            aria-label="Email"
                        />
                        {errors?.email && <p className="text-xs text-red-600 mt-1">{(errors.email as any).message}</p>}
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm text-slate-600">Password</span>
                            <div className="relative mt-1">
                                <input
                                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                    className="block w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    aria-label="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute inset-y-0 right-1 top-1/2 -translate-y-1/2 px-2 rounded"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <span className="text-slate-500 text-sm">{showPassword ? "Hide" : "Show"}</span>
                                </button>
                            </div>
                            {errors?.password && <p className="text-xs text-red-600 mt-1">{(errors.password as any).message}</p>}
                        </label>

                        {mode === "signup" && (
                            <label className="block">
                                <span className="text-sm text-slate-600">Confirm</span>
                                <input
                                    {...register("confirm", {
                                        required: "Please confirm your password",
                                        validate: (val: string) => (val === (passwordValue as string) ? true : "Passwords do not match"),
                                    })}
                                    className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    placeholder="Repeat password"
                                    type="password"
                                    aria-label="Confirm password"
                                />
                                {errors?.confirm && <p className="text-xs text-red-600 mt-1">{(errors.confirm as any).message}</p>}
                            </label>
                        )}
                    </div>

                    {serverError && <div className="p-2 text-sm text-red-700 bg-red-50 rounded">{serverError}</div>}

                    <div className="flex items-center justify-between gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>{mode === "login" ? "Sign in" : "Create account"}</>
                            )}
                        </button>

                        <div className="text-sm text-slate-500">
                            {mode === "login" ? (
                                <>
                                    New here?{" "}
                                    <button type="button" onClick={() => toggleMode("signup")} className="text-indigo-600 font-medium">
                                        Create an account
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button type="button" onClick={() => toggleMode("login")} className="text-indigo-600 font-medium">
                                        Sign in
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-400">or continue with</span>
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        By continuing, you agree to our <span className="text-indigo-600">Terms</span> and <span className="text-indigo-600">Privacy Policy</span>.
                    </p>
                </div>

                {existingToken && <div className="mt-4 text-sm text-green-600">You are currently logged in.</div>}
            </div>
        </div>
    );
}
