
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Trash, Check, X } from 'lucide-react';

// Mock data for users
const initialUsers = [
  { id: 1, name: "Maria Garcia", email: "maria.garcia@example.com", location: "Bronx, NY", type: "individual", status: "active", joined: "2023-05-12" },
  { id: 2, name: "Robert Thompson", email: "robert.thompson@example.com", location: "Queens, NY", type: "individual", status: "active", joined: "2023-06-24" },
  { id: 3, name: "Aisha Kwame", email: "aisha.kwame@example.com", location: "Brooklyn, NY", type: "individual", status: "inactive", joined: "2023-04-18" },
  { id: 4, name: "James Wilson", email: "james.wilson@example.com", location: "Manhattan, NY", type: "individual", status: "active", joined: "2023-07-03" },
  { id: 5, name: "Elena Marquez", email: "elena.marquez@example.com", location: "Staten Island, NY", type: "individual", status: "pending", joined: "2023-07-15" }
];

// Mock data for organizations
const initialOrganizations = [
  { id: 1, name: "Urban Relief Initiative", email: "contact@uri.org", location: "Manhattan, NY", type: "nonprofit", status: "active", joined: "2023-02-24" },
  { id: 2, name: "Global Poverty Action", email: "info@gpa.org", location: "Brooklyn, NY", type: "nonprofit", status: "active", joined: "2023-04-10" },
  { id: 3, name: "Community Health Network", email: "support@chn.org", location: "Bronx, NY", type: "healthcare", status: "pending", joined: "2023-07-11" },
  { id: 4, name: "Educational Access Alliance", email: "admin@eaa.org", location: "Queens, NY", type: "education", status: "active", joined: "2023-03-15" },
  { id: 5, name: "Housing First Coalition", email: "info@hfc.org", location: "Brooklyn, NY", type: "advocacy", status: "rejected", joined: "2023-06-05" }
];

// Mock data for recent reports/posts that need moderation
const initialReports = [
  { 
    id: 1, 
    content: "We need immediate help with flooding in our building. The landlord is not responding and water is leaking into multiple apartments.",
    author: "Maria Garcia", 
    authorType: "individual", 
    reportedBy: "System Flag", 
    reason: "Urgent Safety Issue",
    date: "2023-07-15"
  },
  { 
    id: 2, 
    content: "This organization is NOT providing the services they claim. I went there twice and was turned away without help.",
    author: "James Wilson", 
    authorType: "individual", 
    reportedBy: "Urban Relief Initiative", 
    reason: "Misinformation",
    date: "2023-07-14"
  },
  { 
    id: 3, 
    content: "Looking to connect with other community members about starting a mutual aid network in Brownsville.",
    author: "Elena Marquez", 
    authorType: "individual", 
    reportedBy: "System Flag", 
    reason: "Potential Solicitation",
    date: "2023-07-12"
  },
];

// User/Org Status options
type StatusType = 'active' | 'inactive' | 'pending' | 'rejected';

const AdminDashboard: React.FC = () => {
  // Main state
  const [activeTab, setActiveTab] = useState<'users' | 'organizations' | 'reports'>('users');
  const [users, setUsers] = useState(initialUsers);
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [reports, setReports] = useState(initialReports);
  
  // Search states
  const [userSearch, setUserSearch] = useState('');
  const [orgSearch, setOrgSearch] = useState('');
  const [reportSearch, setReportSearch] = useState('');
  
  // Status filter states
  const [userStatusFilter, setUserStatusFilter] = useState<StatusType | 'all'>('all');
  const [orgStatusFilter, setOrgStatusFilter] = useState<StatusType | 'all'>('all');
  
  // Action dropdown states
  const [actionDropdown, setActionDropdown] = useState<number | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<'user' | 'org' | 'report' | null>(null);
  
  // Toggle action dropdown
  const toggleActionDropdown = (id: number, type: 'user' | 'org' | 'report') => {
    if (actionDropdown === id && selectedItemType === type) {
      setActionDropdown(null);
      setSelectedItemType(null);
    } else {
      setActionDropdown(id);
      setSelectedItemType(type);
    }
  };

  // Handle status change
  const changeStatus = (id: number, type: 'user' | 'org', newStatus: StatusType) => {
    if (type === 'user') {
      setUsers(users.map(user => 
        user.id === id ? { ...user, status: newStatus } : user
      ));
    } else {
      setOrganizations(organizations.map(org => 
        org.id === id ? { ...org, status: newStatus } : org
      ));
    }
    
    setActionDropdown(null);
    setSelectedItemType(null);
  };
  
  // Handle report moderation
  const handleReport = (id: number, action: 'approve' | 'delete') => {
    if (action === 'delete') {
      setReports(reports.filter(report => report.id !== id));
    } else {
      // In a real app, you'd mark the report as approved
      setReports(reports.filter(report => report.id !== id));
    }
  };
  
  // Filter users
  const filteredUsers = users.filter(user => {
    return (
      (userStatusFilter === 'all' || user.status === userStatusFilter) &&
      (user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
       user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
       user.location.toLowerCase().includes(userSearch.toLowerCase()))
    );
  });
  
  // Filter organizations
  const filteredOrgs = organizations.filter(org => {
    return (
      (orgStatusFilter === 'all' || org.status === orgStatusFilter) &&
      (org.name.toLowerCase().includes(orgSearch.toLowerCase()) ||
       org.email.toLowerCase().includes(orgSearch.toLowerCase()) ||
       org.location.toLowerCase().includes(orgSearch.toLowerCase()))
    );
  });
  
  // Filter reports
  const filteredReports = reports.filter(report => {
    return (
      report.author.toLowerCase().includes(reportSearch.toLowerCase()) ||
      report.content.toLowerCase().includes(reportSearch.toLowerCase()) ||
      report.reason.toLowerCase().includes(reportSearch.toLowerCase())
    );
  });
  
  // Status badge component
  const StatusBadge = ({ status }: { status: StatusType }) => {
    let classes;
    let icon;
    
    switch (status) {
      case 'active':
        classes = "bg-green-100 text-green-800";
        icon = <CheckCircle size={14} className="mr-1" />;
        break;
      case 'inactive':
        classes = "bg-gray-100 text-gray-800";
        icon = <AlertCircle size={14} className="mr-1" />;
        break;
      case 'pending':
        classes = "bg-blue-100 text-blue-800";
        icon = <AlertCircle size={14} className="mr-1" />;
        break;
      case 'rejected':
        classes = "bg-red-100 text-red-800";
        icon = <XCircle size={14} className="mr-1" />;
        break;
      default:
        classes = "bg-gray-100 text-gray-800";
        icon = <AlertCircle size={14} className="mr-1" />;
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage users, organizations, and content moderation.</p>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button 
            onClick={() => setActiveTab('users')} 
            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Individual Users
          </button>
          <button 
            onClick={() => setActiveTab('organizations')} 
            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'organizations'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Organizations
          </button>
          <button 
            onClick={() => setActiveTab('reports')} 
            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Content Moderation
          </button>
        </nav>
      </div>
      
      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Individual Users</h2>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="input-field pl-10 py-2 w-full sm:w-64"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Status filter */}
                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value as StatusType | 'all')}
                  className="input-field py-2"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(user.joined).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.status as StatusType} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button 
                          className="text-gray-500 hover:text-gray-800"
                          onClick={() => toggleActionDropdown(user.id, 'user')}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        
                        {actionDropdown === user.id && selectedItemType === 'user' && (
                          <div className="absolute right-6 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => changeStatus(user.id, 'user', 'active')}
                            >
                              Activate Account
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => changeStatus(user.id, 'user', 'inactive')}
                            >
                              Deactivate Account
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              Reset Credentials
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {filteredUsers.length > 0 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
                  <span className="font-medium">{users.length}</span> users
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Organizations Tab */}
      {activeTab === 'organizations' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Organizations</h2>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search organizations..."
                    className="input-field pl-10 py-2 w-full sm:w-64"
                    value={orgSearch}
                    onChange={(e) => setOrgSearch(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Status filter */}
                <select
                  value={orgStatusFilter}
                  onChange={(e) => setOrgStatusFilter(e.target.value as StatusType | 'all')}
                  className="input-field py-2"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Organizations Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type / Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrgs.length > 0 ? (
                  filteredOrgs.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{org.name}</div>
                            <div className="text-sm text-gray-500">{org.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{org.type}</div>
                        <div className="text-sm text-gray-500">{org.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(org.joined).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={org.status as StatusType} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button 
                          className="text-gray-500 hover:text-gray-800"
                          onClick={() => toggleActionDropdown(org.id, 'org')}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        
                        {actionDropdown === org.id && selectedItemType === 'org' && (
                          <div className="absolute right-6 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {org.status === 'pending' && (
                              <>
                                <button
                                  className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full text-left"
                                  onClick={() => changeStatus(org.id, 'org', 'active')}
                                >
                                  Approve Organization
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                  onClick={() => changeStatus(org.id, 'org', 'rejected')}
                                >
                                  Reject Organization
                                </button>
                              </>
                            )}
                            
                            {org.status !== 'pending' && (
                              <>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  onClick={() => changeStatus(org.id, 'org', 'active')}
                                >
                                  Activate Account
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  onClick={() => changeStatus(org.id, 'org', 'inactive')}
                                >
                                  Deactivate Account
                                </button>
                              </>
                            )}
                            
                            <button
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              Reset Credentials
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No organizations found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {filteredOrgs.length > 0 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredOrgs.length}</span> of{" "}
                  <span className="font-medium">{organizations.length}</span> organizations
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Content Moderation Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Content Moderation</h2>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="input-field pl-10 py-2 w-full sm:w-64"
                  value={reportSearch}
                  onChange={(e) => setReportSearch(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Reports List */}
          <div className="divide-y divide-gray-200">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            report.authorType === 'individual' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            <span className="font-medium text-sm">
                              {report.author.split(' ').map(word => word[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <span className="font-medium">{report.author}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{new Date(report.date).toLocaleDateString()}</span>
                          </div>
                          <p className="mt-1 text-gray-900 whitespace-pre-wrap">{report.content}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 ml-11">
                        <div className="bg-red-50 border border-red-100 rounded-md p-3">
                          <div className="flex items-start">
                            <AlertCircle size={16} className="text-red-500 mt-0.5 mr-2" />
                            <div>
                              <span className="text-sm font-medium text-red-800">Reported by: {report.reportedBy}</span>
                              <p className="text-sm text-red-700 mt-1">Reason: {report.reason}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex ml-4 space-x-2">
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        onClick={() => handleReport(report.id, 'approve')}
                        title="Approve Content"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        onClick={() => handleReport(report.id, 'delete')}
                        title="Delete Content"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No reports found matching your criteria.
              </div>
            )}
          </div>
          
          {filteredReports.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredReports.length}</span> of{" "}
                <span className="font-medium">{reports.length}</span> reported content items
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
