"use client";

import { useState } from "react";
import { Card, Button, InputGroup, Separator } from "@heroui/react";
import { FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import GoogleLogin from "@/components/GoogleLogin";

export default function SignInPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const handleFieldChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };
    const handleSubmit = async () => {
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await authClient.signIn.email({
                email: form.email,
                password: form.password,
                fetchOptions: {
                    onSuccess: () => {
                        setMessage({ type: "success", text: "Signed in successfully!" });

                        // Force a hard client transition to wipe out the stale Next.js cache
                        setTimeout(() => {
                            window.location.href = redirectTo;
                        }, 500);
                    }
                }
            });

            if (res?.error) {
                setMessage({ type: "error", text: res.error.message || "Sign in failed." });
            }
        } catch (err) {
            setMessage({ type: "error", text: err.message || "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md p-2 shadow-xl">

                 {/* HeroUI v3 Header */}
                <Card.Header className="text-center flex flex-col gap-1 pt-6">
                    <h2 className="text-2xl font-bold">Welcome Back</h2>
                    <p className="text-sm text-gray-500">Sign in to your account</p>
                </Card.Header>

                <GoogleLogin></GoogleLogin>
                <div className="flex justify-center items-center  gap-3">
                    <Separator className="w-[20%] md:w-30 bg-blue-700" />
                    <div className="whitespace-nowrap">  or continue with </div>
                    <Separator className="w-[20%] md:w-30 bg-blue-700" />
                </div>


                {/* HeroUI v3 Main Content */}
                <Card.Content className="flex flex-col gap-5 px-6 py-4">

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <InputGroup className="border border-gray-300 rounded-lg focus-within:border-blue-500 transition-all">
                            <InputGroup.Prefix>
                                <FiMail className="text-xl text-gray-400" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={(e) => handleFieldChange("email", e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </InputGroup>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <InputGroup className="border border-gray-300 rounded-lg focus-within:border-blue-500 transition-all">
                            <InputGroup.Prefix>
                                <FiLock className="text-xl text-gray-400" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={(e) => handleFieldChange("password", e.target.value)}
                                placeholder="Enter your Password"
                                required
                            />
                            <InputGroup.Suffix>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="focus:outline-none hover:text-gray-600 transition-colors px-1 text-xs font-medium text-gray-500"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                                </button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </div>

                    {/* Notification Alerts */}
                    {message.text && (
                        <div
                            className={`text-sm p-3 rounded-lg font-medium transition-all duration-300 ${message.type === "success"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}
                </Card.Content>

                {/* HeroUI v3 Footer Container */}
                <Card.Footer className="flex flex-col gap-4 pb-6 items-center">
                    <Button
                        color="primary"
                        isLoading={loading}
                        onPress={handleSubmit}
                        fullWidth
                        className="font-semibold w-[90%]"
                    >
                        Sign In
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Do not have an account?{" "}
                        <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-blue-600 hover:underline font-medium">
                            Go to sign up
                        </Link>
                    </p>
                </Card.Footer>
            </Card>
        </div>
    );
}