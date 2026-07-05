"use client";

import { useSession } from "@/lib/auth-client";
import { Bell, Book, Envelope, Gear, Heart, House, LayoutCellsLarge, LayoutSideContentLeft, Magnifier, Person, ShoppingCart, SquarePlus } from "@gravity-ui/icons";
import { Button, Drawer, Avatar, AvatarImage, AvatarFallback, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


export function DashboardSideBar() {
    const { data: session, isPending } = useSession();
    if (isPending) {
        return <div>Loading...</div>;
    }
    const user = session?.user;
    const role = user?.role || "user"
  
    // Check if user is premium
    const isPremium = user?.plan === "premium";

    const dashboardItems = {
        user: [
            { icon: LayoutCellsLarge, label: "Overview", src: "/dashboard/user" },
            { icon: SquarePlus, label: "Add Recipe", src: "/dashboard/user/add-recipe" },
            { icon: Book, label: "My Recipe", src: "/dashboard/user/my-recipe" },
            { icon: ShoppingCart, label: "My Purchased Recipe", src: "/dashboard/user/purchased-recipe" },
            { icon: Heart, label: "My Favorites", src: "/dashboard/user/favourite" },
            { icon: Person, label: "Profile", src: "/dashboard/profile" },

        ],
        admin: [
            { icon: LayoutCellsLarge, label: "Overview", src: "/dashboard/admin" },
            { icon: SquarePlus, label: "Manage Users", src: "/dashboard/user/manage-users" },
            { icon: Book, label: "Manage Recipe", src: "/dashboard/user/manage-recipe" },
            { icon: Heart, label: "Recipe Reports", src: "/dashboard/user/reports" },
            { icon: ShoppingCart, label: "Transaction", src: "/dashboard/user/transaction" },
            { icon: Person, label: "Profile", src: "/dashboard/profile" },
        ]
    };

    const navItems = dashboardItems[role]
   

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (

                <Link href={item.src} key={item.label}>
                    <button
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                        type="button"
                    >
                        <item.icon className="size-5 text-muted" />
                        {item.label}
                    </button>
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            <aside className="hidden lg:block w-64 shrink-0 border-r border-default p-4">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logo1.png" alt="recipe-room Logo" width={30} height={30} />
                    <div className="hidden leading-none sm:block">
                        <h1 className="text-lg font-bold">
                            RecipeRoom
                        </h1>
                    </div>
                </Link>

                {/* Divider */}
                <div className="my-4 border-t border-default/90" />

                {/* User Image, Name, and Badge */}
                {user && (
                    <div className="flex flex-col items-center text-center p-4 mb-6 bg-default-50/50 rounded-2xl border border-default/40">
                        <Avatar className="w-20 h-20 text-xl font-bold mb-3">
                            <AvatarImage src={user?.image} referrerPolicy="no-referrer" />
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <h2 className="text-base font-bold text-foreground leading-tight truncate w-full">
                            {user?.name}
                        </h2>
                        <p className="text-xs text-default-500 mb-3 truncate w-full">
                            {user?.email}
                        </p>

                        {/* Membership Badge */}
                        <Chip
                            size="sm"
                            variant="flat"
                            color={isPremium ? "warning" : "default"}
                            className="font-medium px-3 capitalize"
                        >
                            {isPremium ? "Premium" : "Free"}
                        </Chip>
                    </div>
                )}
                {/* Divider */}
                <div className="my-4 border-t border-default" />
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}