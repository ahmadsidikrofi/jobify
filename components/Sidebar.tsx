'use client'
import Image from "next/image";
import Logo from "@/assets/logo.svg"
import { Button } from "./ui/button";
import links from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname()
    return ( 
        <main className="py-8 px-8 bg-muted h-[95%] shadow-component mx-4 mt-3 mb-10 rounded-xl">
            <Image alt="logo" src={Logo}/>
            <div className="flex flex-col mt-20 gap-y-4">
                {links.map((link) => (
                    <Button key={link.href} asChild variant={pathname === link.href ? 'default' : 'link'} className="flex items-center gap-2">
                        <Link className="capitalize" href={link.href}>{link.icon} {link.label}</Link>
                    </Button>
                ))}
            </div>
        </main>
     );
}
 
export default Sidebar;