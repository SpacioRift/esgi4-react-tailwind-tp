import { NavLink, Outlet } from 'react-router';
import { Home } from 'lucide-react';

export default function Layout() {
    return (
        <>
            <nav className='bg-neutral-700 flex text-white h-10'>
                <NavLink to="/" className="p-2 hover:bg-blue-500"><Home /></NavLink>
                <NavLink to="/Recipe" className="p-2 hover:bg-blue-500">Recipe</NavLink>
            </nav>
                <Outlet />
        </>
    )
}