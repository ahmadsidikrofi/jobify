'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import links from "@/utils/links";
import Link from "next/link";


const LinksDropdown = () => {
    return (
        <main>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="icon">
                        <span><AlignLeft /></span>
                        <span className="sr-only">Toggle link</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 lg:hidden" align="start" sideOffset={25}>
                    <DropdownMenuLabel>Jobify Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {links.map((link, i) => (
                        <DropdownMenuItem key={i}>
                            <Link href={link.href} className="capitalize flex items-center gap-2">
                                <span>{link.icon}</span> <span>{link.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </main>
    );
}

export default LinksDropdown;