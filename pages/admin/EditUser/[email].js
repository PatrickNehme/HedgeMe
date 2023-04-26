import { useRouter } from 'next/router';
import AdminDashboardLayout from '/components/admin/AdminDashboardLayout';
import axios from 'axios';

const EditUser = () => {
  const router = useRouter();
  const { email } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const newRole = e.target.newRole.value;

    try {
      await axios.put('/api/admin/users/update', {
        email,
        newPassword,
        newRole,
      });
      router.push('/admin/AllUsers');
    } catch (error) {
        console.error('Error updating user:', error);
    }
  };

  return (
    <AdminDashboardLayout>
      <h1>Edit User: {email}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="w-full px-2 py-1 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newRole" className="block mb-2">
            New Role
          </label>
          <select
            name="newRole"
            id="newRole"
            className="w-full px-2 py-1 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          style={{ backgroundColor: "#5383c7" }}
        >
          Update User
        </button>
      </form>
    </AdminDashboardLayout>
  );
};

export default EditUser;
