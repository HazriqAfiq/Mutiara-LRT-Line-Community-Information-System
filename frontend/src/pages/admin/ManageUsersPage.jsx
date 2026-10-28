/**
 * pages/admin/ManageUsersPage.jsx
 * Route: /admin/users
 *
 * Administrator User & Resident Account Directory.
 * Features:
 *   - Overview metric counters (Total Users, Active, Suspended, Admins)
 *   - Filter by Role & Status, search by Name, Email, Phone
 *   - Live complaints count per resident
 *   - Status toggle (Activate / Deactivate) with self-deactivation protection
 *   - Detailed user modal showing contact details, address, and complaint history
 *   - Persisted via userService and mutiara_users_store
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  Search,
  RefreshCw,
  Eye,
  Phone,
  MapPin,
  Mail,
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  X,
  Shield,
  Tag,
  Check,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUsers, updateProfile, getUserFeedbackCount, assignRole } from '../../services/userService';
import { getAllFeedback } from '../../services/feedbackService';
import { formatDate } from '../../utils/dateUtils';
import SearchBar from '../../components/common/SearchBar';
import FilterSelect from '../../components/common/FilterSelect';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'user', label: 'Resident / Community User' },
  { value: 'admin', label: 'Administrator' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active Accounts' },
  { value: 'inactive', label: 'Deactivated / Suspended' },
];

export default function ManageUsersPage() {
  const { user: currentAdmin } = useAuth();

  const [users, setUsers]                       = useState([]);
  const [feedbackCounts, setFeedbackCounts]     = useState({});
  const [allFeedbacks, setAllFeedbacks]         = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const [successBanner, setSuccessBanner]       = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [role, setRole]     = useState('');
  const [status, setStatus] = useState('');

  // Modals state
  const [selectedUser, setSelectedUser]         = useState(null);
  const [toggleTarget, setToggleTarget]         = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Role Assignment state (UML: Role.assignRole)
  const [roleTarget, setRoleTarget]             = useState(null);
  const [isUpdatingRole, setIsUpdatingRole]     = useState(false);

  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, fbRes] = await Promise.all([
        getUsers(),
        getAllFeedback(),
      ]);

      const userList = usersRes.data;
      const fbList = fbRes.data;
      setAllFeedbacks(fbList);

      // Compute feedback count per user
      const counts = {};
      userList.forEach((u) => {
        counts[u.id] = fbList.filter((f) => f.user_id === u.id).length;
      });
      setFeedbackCounts(counts);

      setUsers(userList);
    } catch (err) {
      console.error('Failed to load users:', err);
      setError('Unable to load registered user accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleResetFilters = () => {
    setSearch('');
    setRole('');
    setStatus('');
  };

  // Filter users based on search, role, status
  const filteredUsers = users.filter((u) => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const matchName  = u.name?.toLowerCase().includes(q);
      const matchEmail = u.email?.toLowerCase().includes(q);
      const matchPhone = u.phone?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone) return false;
    }

    if (role && u.role !== role) {
      return false;
    }

    if (status) {
      const isActive = u.is_active ?? true;
      if (status === 'active' && !isActive) return false;
      if (status === 'inactive' && isActive) return false;
    }

    return true;
  });

  // Handle toggling account status
  const handleConfirmToggle = async () => {
    if (!toggleTarget) return;

    // Guard: Prevent deactivating currently logged in admin account
    if (toggleTarget.id === currentAdmin?.id && toggleTarget.is_active) {
      setSuccessBanner({
        type: 'error',
        text: 'Action Prohibited: You cannot deactivate your own active administrator account.',
      });
      setToggleTarget(null);
      return;
    }

    setIsUpdatingStatus(true);
    const newStatus = !toggleTarget.is_active;

    try {
      await updateProfile(toggleTarget.id, { is_active: newStatus });
      setSuccessBanner({
        type: 'success',
        text: `Account for ${toggleTarget.name} has been ${newStatus ? 'activated' : 'suspended'}.`,
      });
      setToggleTarget(null);
      await fetchUsersData();
    } catch (err) {
      console.error('Failed to update user status:', err);
      setSuccessBanner({
        type: 'error',
        text: 'Failed to update account status. Please try again.',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle assigning/changing user role (UML: Role.assignRole)
  const handleConfirmRoleChange = async () => {
    if (!roleTarget) return;

    // Guard: Prevent removing admin role from active session user
    if (roleTarget.user.id === currentAdmin?.id && roleTarget.newRole !== 'admin') {
      setSuccessBanner({
        type: 'error',
        text: 'Action Prohibited: You cannot remove administrator privileges from your own active session.',
      });
      setRoleTarget(null);
      return;
    }

    setIsUpdatingRole(true);
    try {
      await assignRole(roleTarget.user.id, roleTarget.newRole);
      setSuccessBanner({
        type: 'success',
        text: `Role for ${roleTarget.user.name} successfully updated to "${roleTarget.newRole === 'admin' ? 'Administrator' : 'Community User'}".`,
      });
      setRoleTarget(null);
      if (selectedUser?.id === roleTarget.user.id) {
        setSelectedUser((prev) => ({ ...prev, role: roleTarget.newRole }));
      }
      await fetchUsersData();
    } catch (err) {
      console.error('Failed to assign role:', err);
      setSuccessBanner({
        type: 'error',
        text: 'Failed to assign role. Please try again.',
      });
    } finally {
      setIsUpdatingRole(false);
    }
  };

  // Metrics
  const totalUsers  = users.length;
  const activeCount = users.filter((u) => u.is_active ?? true).length;
  const suspendedCount = users.filter((u) => !(u.is_active ?? true)).length;
  const adminCount  = users.filter((u) => u.role === 'admin').length;

  const hasActiveFilters = Boolean(search || role || status);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
            User Account Management
          </h2>
          <p className="text-xs text-gray-500">
            Oversee community resident profiles, verify administrator privileges, and manage account access.
          </p>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successBanner && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 shadow-xs ${
            successBanner.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-medium">
            {successBanner.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
            )}
            <span>{successBanner.text}</span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="text-xs font-bold hover:underline opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Total Registered
            </div>
            <div className="text-lg font-bold text-gray-900 leading-tight">
              {totalUsers}
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <UserCheck size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Active Users
            </div>
            <div className="text-lg font-bold text-emerald-600 leading-tight">
              {activeCount}
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <UserX size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Suspended
            </div>
            <div className="text-lg font-bold text-red-600 leading-tight">
              {suspendedCount}
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Administrators
            </div>
            <div className="text-lg font-bold text-purple-600 leading-tight">
              {adminCount}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, email, or telephone number..."
              id="admin-users-search"
            />
          </div>

          <div className="md:col-span-3">
            <FilterSelect
              value={role}
              onChange={setRole}
              options={ROLE_OPTIONS}
              id="admin-users-role"
              label="Filter Role"
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <div className="w-full">
              <FilterSelect
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
                id="admin-users-status"
                label="Filter Status"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="btn btn-ghost btn-sm text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 flex-shrink-0"
                title="Reset filters"
              >
                <RefreshCw size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Counter */}
        {!loading && !error && (
          <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
            <span>
              Showing <strong>{filteredUsers.length}</strong> user accounts
              {hasActiveFilters && ' (filtered)'}
            </span>
            <span className="text-gray-400">
              Only Active accounts can log in and lodge feedback complaints.
            </span>
          </div>
        )}
      </div>

      {/* User Table */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner message="Loading user directory..." />
        </div>
      ) : error ? (
        <div className="card p-8 bg-white border border-red-200 text-center max-w-lg mx-auto">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button onClick={fetchUsersData} className="btn btn-outline text-xs">
            Retry
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="card p-8 bg-white border border-gray-100">
          <EmptyState
            title="No users match filters"
            message="No registered user accounts match your search and filter criteria."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
          />
        </div>
      ) : (
        <div className="card bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead
                className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-100 font-bold"
                style={{ backgroundColor: 'var(--color-gray-50)' }}
              >
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">System Role</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Complaints</th>
                  <th className="px-5 py-3.5">Account Status</th>
                  <th className="px-5 py-3.5">Joined Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredUsers.map((userItem) => {
                  const isActive = userItem.is_active ?? true;
                  const isCurrentAdmin = userItem.id === currentAdmin?.id;
                  const complaints = feedbackCounts[userItem.id] || 0;

                  return (
                    <tr
                      key={userItem.id}
                      className="hover:bg-teal-50/20 transition-colors"
                    >
                      {/* Name & Email with Avatar */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              userItem.role === 'admin'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-teal-100 text-teal-700'
                            }`}
                          >
                            {userItem.name
                              ? userItem.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join('')
                                  .toUpperCase()
                              : 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 flex items-center gap-1.5">
                              <span>{userItem.name}</span>
                              {isCurrentAdmin && (
                                <span className="text-[10px] bg-teal-100 text-teal-800 font-semibold px-1.5 py-0.2 rounded">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              {userItem.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* System Role & Stakeholder */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {userItem.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                            <Shield size={11} /> Administrator
                          </span>
                        ) : (
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                              Community User
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded">
                              {userItem.communityType === 'Pedestrian' ? 'Pedestrian' :
                               userItem.communityType === 'Commuter' ? 'Commuter' :
                               userItem.communityType === 'Business Owner' ? 'Business' :
                               'Resident'}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-3.5 whitespace-nowrap text-gray-600">
                        {userItem.phone ? (
                          <span className="flex items-center gap-1">
                            <Phone size={11} className="text-gray-400" />
                            {userItem.phone}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">Not provided</span>
                        )}
                      </td>

                      {/* Complaints count */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-xs ${
                            complaints > 0
                              ? 'bg-teal-50 text-teal-800 font-bold'
                              : 'text-gray-400 bg-gray-50'
                          }`}
                        >
                          {complaints} submitted
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Suspended
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                        {formatDate(userItem.created_at)}
                      </td>

                      {/* Action buttons */}
                      <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-1">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(userItem)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-teal-600 hover:bg-teal-50 inline-flex items-center"
                          title="View user dossier"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Assign Role action (Role.assignRole) */}
                        <button
                          type="button"
                          disabled={isCurrentAdmin}
                          onClick={() =>
                            setRoleTarget({
                              user: userItem,
                              newRole: userItem.role === 'admin' ? 'user' : 'admin',
                            })
                          }
                          className={`p-1.5 rounded-lg inline-flex items-center transition-colors ${
                            isCurrentAdmin
                              ? 'text-gray-300 cursor-not-allowed'
                              : userItem.role === 'admin'
                              ? 'text-purple-600 hover:bg-purple-50'
                              : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                          }`}
                          title={
                            isCurrentAdmin
                              ? 'Cannot modify own administrator role'
                              : userItem.role === 'admin'
                              ? 'Change role to Resident'
                              : 'Promote to Administrator'
                          }
                        >
                          <Shield size={14} />
                        </button>

                        <button
                          type="button"
                          disabled={isCurrentAdmin}
                          onClick={() => setToggleTarget(userItem)}
                          className={`p-1.5 rounded-lg inline-flex items-center transition-colors ${
                            isCurrentAdmin
                              ? 'text-gray-300 cursor-not-allowed'
                              : isActive
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={
                            isCurrentAdmin
                              ? 'Cannot deactivate active session account'
                              : isActive
                              ? 'Suspend account'
                              : 'Activate account'
                          }
                        >
                          {isActive ? <UserX size={14} /> : <UserCheck size={14} />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Role Change (Role.assignRole) */}
      <ConfirmDialog
        isOpen={Boolean(roleTarget)}
        title={roleTarget?.newRole === 'admin' ? 'Promote User to Administrator?' : 'Change User Role to Resident?'}
        message={
          roleTarget?.newRole === 'admin'
            ? `Grant administrator privileges to "${roleTarget?.user?.name}"? They will have full access to manage platform content, investigate complaints, and view all users.`
            : `Revoke administrator access for "${roleTarget?.user?.name}" and assign Community User role?`
        }
        confirmLabel={roleTarget?.newRole === 'admin' ? 'Yes, Assign Admin Role' : 'Yes, Assign Resident Role'}
        isLoading={isUpdatingRole}
        onConfirm={handleConfirmRoleChange}
        onCancel={() => setRoleTarget(null)}
      />

      {/* Confirmation Modal for Toggle Status */}
      <ConfirmDialog
        isOpen={Boolean(toggleTarget)}
        title={toggleTarget?.is_active ? 'Suspend User Account?' : 'Activate User Account?'}
        message={
          toggleTarget?.is_active
            ? `Are you sure you want to suspend the account for "${toggleTarget?.name}"? The user will be unable to log in or submit new complaints until reactivated.`
            : `Reactivate access for "${toggleTarget?.name}"? The resident will regain portal access immediately.`
        }
        confirmLabel={toggleTarget?.is_active ? 'Yes, Suspend Account' : 'Yes, Activate Account'}
        isLoading={isUpdatingStatus}
        onConfirm={handleConfirmToggle}
        onCancel={() => setToggleTarget(null)}
      />

      {/* User Dossier Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    selectedUser.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {selectedUser.name
                    ? selectedUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()
                    : 'U'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {selectedUser.name}
                  </h3>
                  <p className="text-xs text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Data Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  System Role
                </span>
                <p className="font-bold text-gray-800 capitalize">
                  {selectedUser.role === 'admin' ? 'Administrator' : 'Community User'}
                </p>
              </div>

              <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl space-y-1">
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                  Stakeholder Category
                </span>
                <p className="font-bold text-teal-900">
                  {selectedUser.communityType || (selectedUser.role === 'admin' ? 'Liaison Official' : 'Resident')}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Account Status
                </span>
                <p className="font-bold">
                  {selectedUser.is_active ?? true ? (
                    <span className="text-emerald-700 font-bold">Active & Verified</span>
                  ) : (
                    <span className="text-red-600 font-bold">Suspended</span>
                  )}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Contact Telephone
                </span>
                <p className="font-semibold text-gray-800">
                  {selectedUser.phone || 'None provided'}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Account Created
                </span>
                <p className="font-semibold text-gray-800">
                  {formatDate(selectedUser.created_at)}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="p-3.5 bg-gray-50 rounded-xl space-y-1 text-xs">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin size={11} /> Registered Residence Address
              </span>
              <p className="text-gray-700 font-medium">
                {selectedUser.address || 'No residential address recorded on file.'}
              </p>
            </div>

            {/* Role Assignment Card */}
            <div className="p-3.5 bg-purple-50/70 rounded-xl border border-purple-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                  Role Governance
                </span>
                <span className="font-semibold text-gray-900">
                  Current Role: {selectedUser.role === 'admin' ? 'Administrator' : 'Community User'}
                </span>
              </div>
              <button
                type="button"
                disabled={selectedUser.id === currentAdmin?.id}
                onClick={() => {
                  const newRole = selectedUser.role === 'admin' ? 'user' : 'admin';
                  setRoleTarget({ user: selectedUser, newRole });
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  selectedUser.id === currentAdmin?.id
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : selectedUser.role === 'admin'
                    ? 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-100'
                    : 'bg-purple-700 hover:bg-purple-800 text-white shadow-xs'
                }`}
              >
                {selectedUser.id === currentAdmin?.id
                  ? 'Your Account'
                  : selectedUser.role === 'admin'
                  ? 'Demote to Resident'
                  : 'Promote to Admin'}
              </button>
            </div>

            {/* Complaint History Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <MessageSquare size={13} className="text-teal-600" />
                Submitted Feedback History ({feedbackCounts[selectedUser.id] || 0})
              </h4>

              {feedbackCounts[selectedUser.id] === 0 ? (
                <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200">
                  This user has not lodged any feedback complaints yet.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {allFeedbacks
                    .filter((f) => f.user_id === selectedUser.id)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs hover:bg-teal-50/30 transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-gray-900 truncate">
                            {item.reference_number}: {item.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {item.category} • {formatDate(item.created_at)}
                          </p>
                        </div>
                        <Link
                          to={`/admin/feedback/${item.id}`}
                          onClick={() => setSelectedUser(null)}
                          className="btn btn-outline btn-xs text-[11px] font-semibold text-teal-700 flex-shrink-0"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="btn btn-secondary btn-sm text-xs px-4"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
