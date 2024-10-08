import { Layers } from "lucide-react"
type NavLink = {
    href: string,
    label: string,
    icon: React.ReactNode
}

const links: NavLink[] = [
    { href: '/add-job', label: 'add job', icon: <Layers /> },
    { href: '/jobs', label: 'jobs', icon: <Layers /> },
    { href: '/status', label: 'status', icon: <Layers /> },
]

export default links