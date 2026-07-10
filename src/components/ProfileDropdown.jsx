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

    const role = user?.role || "user"


    const DropdownItems = {
        user: [
            { label: "My Favorites", src: "/dashboard/user/favourite" },
            { label: "My Recipe", src: "/dashboard/user/my-recipe" },
           

        ],
        admin: [
            { label: "Manage User", src: "/dashboard/admin/manage-users" },
            { label: "Manage Recipe", src: "/dashboard/admin/manage-recipe" },
            
        ]
    };

    const menuItems = DropdownItems[role]


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
                        <Link href={menuItems[0].src}> <Label>{menuItems[0].label}</Label></Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="copy-link" textValue="Copy link">
                        <Link href={menuItems[1].src}> <Label>{menuItems[1].label}</Label></Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="edit-file" textValue="Edit file">
                        <Link href='/dashboard/profile'><Label>Profile</Label></Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" textValue="logout" variant="danger">
                        <Label>Logout</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}