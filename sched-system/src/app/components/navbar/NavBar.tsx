import Link from "next/link";

interface NavBarProps {
    active:  "home" | "dashboard" | "agendamentos" 
}

export default function NavBar(props: NavBarProps) {
    const { active } = props
    const activeClass = "border-b-4 border-primary pb-2"

    const links = [
        { text: "home", href: "pages/home" },
        { text: "agendamentos", href: "components/SchedList" },
    ]

    return (
        <nav className="flex justify-between items-center bg-transparent shadow-md p-6">
            <h1 className="text-3xl font-bold">Organize.me</h1>
            <ul className="flex gap-4">
                {links.map(link =>
                    <li key={link.text} className={active === link.text ? activeClass : ""}>
                        <Link href={link.href}>{link.text}</Link>
                    </li>
                )}

            </ul>
            <img className="size-12 rounded-full" src="http://github.com/gabimmdev.png" alt="gabimmdev" />
        </nav>
    );
}