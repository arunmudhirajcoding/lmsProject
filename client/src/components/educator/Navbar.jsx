import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        <img alt="Logo" className="w-28 lg:w-32" src="logo" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500">
        <p className="mr-4">
          Hi! {user ? user.fullName : 'Developers '}
        </p>
        {user ? (
          <UserButton />
        ) : (
          <img
            className="max-w-8"
            src="profile"
            alt="Profile"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

