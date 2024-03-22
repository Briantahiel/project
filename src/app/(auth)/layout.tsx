"use client";
import Link from "next/link";
import {  usePathname } from "next/navigation";
import "../styles/module.css";

const navLinks = [
    { name: 'Register', href: '/register'},
    { name: 'Login', href: '/login'},
    { name: 'Forgot-password', href: 'forgot-password'}
];

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <div>
            {/* {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                console.log(isActive)
                return (
                    <Link href={link.href} key={link.name}
                    className={isActive ? "font-bold mr-4" : "text-red-400 mr-4"}>
                        {link.name}
                    </Link>
                )
            })} */}
            {children}
        </div>
    )
}