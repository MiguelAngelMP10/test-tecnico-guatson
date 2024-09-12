import Link from 'next/link'

const Menu = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/" className="hover:text-gray-400">
                        Home
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/profile" className="hover:text-gray-400">
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
