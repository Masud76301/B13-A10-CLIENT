"use client";

import { authClient, signOut } from "@/lib/auth-client";
// import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage, Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfileDropdown({ user }) {
    const router = useRouter();
    const handleSingOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.refresh();
                    router.push("/");
                },
            },
        });
    };
    return (
        <Dropdown>
            <Button aria-label="Menu" variant="Ghost" className="flex  pl-1 py-5 border rounded-3xl">
                <Link href="/">
                    <Avatar size="sm">
                        <AvatarImage src={user?.image} referrerPolicy='no-referrer' />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>
                {user?.name}
            </Button>
            <Dropdown.Popover className="">
                <Dropdown.Menu onAction={(key) => {
                    if (key === "logout") handleSingOut();
                }}>
                    <Dropdown.Item id="new-file" textValue="New file">
                        <Link href="/dashboard/user/my-favorites"> <Label>My Favorites</Label></Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="copy-link" textValue="Copy link">
                        <Link href="/dashboard/user/my-recipe"><Label>My Recipe</Label></Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="edit-file" textValue="Edit file">
                        <Link href='/dashboard/user/profile'><Label>Profile</Label></Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" textValue="logout" variant="danger">
                        <Label>Logout</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}