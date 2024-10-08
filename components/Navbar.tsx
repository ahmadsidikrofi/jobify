import { UserButton } from "@clerk/nextjs";
import LinksDropdown from "./LinksDropdown";
import { ToggleTheme } from "./ToggleTheme";

const Navbar = () => {
    return ( 
        <main className="bg-muted py-4 px-4 sm:px-16 lg:px-24 flex items-center justify-between">
            <LinksDropdown />
            <div className="flex items-center gap-4">
                <ToggleTheme />
                <UserButton afterSignOutUrl="/"/>
            </div>
        </main>
     );
}
 
export default Navbar;