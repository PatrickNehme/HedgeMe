import { useState, useEffect } from 'react';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import WithAuth from '../../components/WithAuth';



function AllUsers() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/api/admin/users/all-users');
    setUsers(response.data);
  };

  const deleteUser = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users/delete?email=${encodeURIComponent(email)}`);
        setUsers(users.filter((user) => user.email !== email));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  

  const editUser = (email) => {
    router.push(`/admin/EditUser/${encodeURIComponent(email)}`);
  };
  

  return (
    <AdminDashboardLayout>
      <h1 className="text-center mb-4">All Users</h1>
      {users && users.length > 0 ? (
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <button
                    onClick={() => editUser(user.email)}
                    className="mr-2 text-blue-600"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => deleteUser(user.email)}
                    className="text-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No users found.</p>
      )}
    </AdminDashboardLayout>
  );
  
}
export default WithAuth(AllUsers, 'admin');

