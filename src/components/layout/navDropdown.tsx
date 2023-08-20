import { useGetMeQuery } from '@/redux/rtk/me';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useCookies } from 'react-cookie';
import Icon from '../app/icons/icons';

const NavDropdown = () => {
    const router = useRouter();
    const { data: UserLogged } = useGetMeQuery({});
    const [cookies, setCookie, removeCookie] = useCookies(["auth-token"]);


    // function to handle logout and remove the cookie
    const handleLogout = () => {
        removeCookie("auth-token");
        localStorage.removeItem('token');
        router.push('/auth/login')
    }

    return (
        <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src={UserLogged?.avatar_url || "https://avatars.githubusercontent.com/u/22059313?v=4"}
                    />
                </div>
            </label>
            <ul tabIndex={0} className="menu bg-gray-700 menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
                <li>
                    <Link href={`/${UserLogged?.login}`}>
                        <Icon icon="account_circle" className="mr-1" />
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <a onClick={handleLogout}>
                        <Icon icon="logout" className="mr-1" />
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default NavDropdown