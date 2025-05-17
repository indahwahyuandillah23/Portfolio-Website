'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Login Failed");
                return;
            }

            toast.success("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/admin/dashboard";
            }, 1500); // kasih delay supaya toast bisa muncul dulu
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
                <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded shadow-xl w-full max-w-md space-y-6">
                    <h1 className="text-2xl font-bold text-center">Admin Login</h1>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-semibold">
                        Login
                    </button>
                </form>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </>
    );
}
