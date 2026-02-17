import axios from "axios";
import { useEffect, useState } from "react";
import globalConstantUtil from '../globalConstantUtils';

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          globalConstantUtil.baseUrl + "/auth/get"
        );
        setUserdata(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);


  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
  try {
    const res = await axios.post(
      globalConstantUtil.baseUrl + "/auth/register",
      form
    );

    console.log("User created:", res.data);
    setUserdata((prev) => [...prev, res.data.user]); 
    // setUserdata(res.data)

    setShowModal(false);

    // form reset
    setForm({
      username: "",
      email: "",
      password: "",
      role: "",
    });

  } catch (error) {
    console.log("Error creating user:", error.response?.data || error.message);
  }
};

  return (
     <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add New User
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-scale">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                name="role"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-5 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Role</option>
                <option>Admin</option>
                <option>Editor</option>

              </select>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search user..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-hidden border rounded-xl">
          <table className="w-full">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {userdata.map((u) => (
                <tr
                  key={u.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-slate-600">{u.email}</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-slate-600">
          <span>Showing 3 users</span>
          <div className="space-x-2">
            <button className="px-3 py-1 border rounded">Prev</button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;