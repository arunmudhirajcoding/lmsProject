import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: "assets.homeIcon" },
    { name: "Add Course", path: "/educator/add-course", icon: "assets.addIcon" },
    { name: "My Courses", path: "/educator/my-courses", icon: "assets.myCourseIcon" },
    { name: "Student Enrolled", path: "/educator/student-enrolled", icon: "assets.personTickIcon" },
  ];

  return isEducator && (
    <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-50 py-2 flex flex-col">
      {menuItems.map(({ path, name, icon }) => (
        <NavLink
          key={name}
          to={path}
          end={path === "/educator"}
          className={({ isActive }) => `
            flex
            items-center
            md:flex-row
            flex-col
            md:justify-start
            justify-center
            py-3.5
            md:px-10
            gap-3
            ${isActive
              ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
              : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90"}
          `}
        >
          <img src={icon} alt="" className="w-6 h-6" />
          <span className="md:block hidden text-center">{name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

