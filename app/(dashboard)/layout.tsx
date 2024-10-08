import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
    const angka = 12
    console.log(angka)
    return (
        <main className="grid lg:grid-cols-5">
            {/* first-col hidden ketika ukuran layar mengecil */}
            <div className="hidden lg:block lg:min-h-screen lg:col-span-1">
                <Sidebar />
            </div>

            {/* second-col hidden dropdown ketika berada diukuran layar besar */}
            <div className="lg:col-span-4">
                <Navbar />
                <div className="py-16 px-4 sm:px-8 lg:px-16">
                    { children }
                </div>
            </div>
        </main>
    )
}
export default Layout