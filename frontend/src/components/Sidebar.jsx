import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen }) => {
  const role = useSelector((s) => s.auth.details?.role);

  return (
    <div
      className={`bg-gray-800 text-white w-64 h-screen p-5 fixed top-0 left-0 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <ul className="space-y-4">

        {/* ADMIN ONLY */}
        {role === "Admin" && (
          <li>
            <Link to="/dashboard/user" className="hover:text-gray-300">
              User
            </Link>
          </li>
        )}

        {/* ADMIN + EDITOR */}
        {(role === "Admin" || role === "Editor") && (
          <li>
            <Link to="/dashboard/blogs" className="hover:text-gray-300">
              Blogs
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;
