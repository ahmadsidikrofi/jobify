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
        <main className="py-8 px-8 bg-muted h-full">
            <Image alt="logo" src={Logo}/>
            <div className="flex flex-col mt-20 gap-y-4">
                {links.map((link) => (
                    <Button key={link.href} asChild variant={pathname === link.href ? 'default' : 'link'} className="flex items-center gap-2">
                        <Link className="capitalized" href={link.href}>{link.icon} {link.label}</Link>
                    </Button>
                ))}
            </div>
        </main>
     );
}
 
export default Sidebar;