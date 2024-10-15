import { UserButton } from "@clerk/nextjs";
import LinksDropdown from "./LinksDropdown";
import { ToggleTheme } from "./ToggleTheme";

const Navbar = () => {
    return ( 
        <main className="bg-muted py-4 px-4 sm:px-16 lg:px-24 mx-8 mt-3 rounded-xl flex items-center justify-between shadow-component">
            <LinksDropdown />
            <div className="flex items-center gap-4">
                <ToggleTheme />
                <UserButton afterSignOutUrl="/"/>
            </div>
        </main>
     );
}
 
export default Navbar;