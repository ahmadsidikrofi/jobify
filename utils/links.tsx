import { Layers, LayoutDashboard, ChartBarBig } from "lucide-react"
type NavLink = {
    href: string,
    label: string,
    icon: React.ReactNode
}

const links: NavLink[] = [
    { href: '/add-job', label: 'add job', icon: <Layers /> },
    { href: '/jobs', label: 'jobs', icon: <LayoutDashboard /> },
    { href: '/stats', label: 'stats', icon: <ChartBarBig /> },
]

export default links