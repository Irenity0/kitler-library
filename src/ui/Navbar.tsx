import { useState, useEffect, useRef } from "react";
import { Link, NavLink, type NavLinkProps } from "react-router";
import { ModeToggle } from "./ThemeToggle";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeClass: NavLinkProps["className"] = ({ isActive }) =>
    `nav-link relative block py-2 px-3 font-semibold text-neutral-300 transition-all duration-500 ease-in-out ${
      isActive ? "active" : ""
    }`;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/books", label: "Books" },
    { to: "/create-book", label: "Add Book" },
    { to: "/borrow-summary", label: "Borrow Summary" },
    { to: "/events", label: "Events" },
    { to: "/add-event", label: "Add Event" },
    { to: "/my-events", label: "My Events" },
  ];

  return (
    <div className="w-full">
      <nav className="w-full relative">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex gap-4">
            <ModeToggle />
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-3xl font-semibold whitespace-nowrap font-open-sans">
                Kitler Library
              </span>
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            ref={menuRef}
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:flex lg:justify-end absolute lg:static top-full z-50 p-4 lg:border-0 right-0 left-0 lg:py-0 lg:px-0 lg:bg-transparent`}
          >
            <ul
              className="font-medium flex flex-col lg:flex-row p-4 mt-4 border rounded-lg lg:border-0 text-center lg:space-x-2"
              onClick={toggleMenu}
            >
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={activeClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
