"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  UserPlusIcon,
  TrashIcon,
  EnvelopeIcon,
  UserIcon,
  ArrowPathIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar: string;
  status: "active" | "pending";
  lastActive?: string;
}

interface TeamAccessProps {
  isLocked?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock team members data
const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "David Mitchell",
    email: "david@example.com",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "active",
    lastActive: "Just now"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "editor",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "active",
    lastActive: "2 hours ago"
  },
  {
    id: "3",
    name: "Michael Wong",
    email: "michael@example.com",
    role: "viewer",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    status: "active",
    lastActive: "3 days ago"
  }
];

export default function TeamAccess({
  isLocked = false,
  isPremium = false,
  className = ""
}: TeamAccessProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isInviting, setIsInviting] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: "",
    role: "viewer" as "admin" | "editor" | "viewer"
  });
  const [inviteSuccess, setInviteSuccess] = useState(false);
  
  // Handle submit invitation
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new mock team member
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newInvite.email.split('@')[0], // Use part of email as name
      email: newInvite.email,
      role: newInvite.role,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`, // Random avatar
      status: "pending"
    };
    
    setTeamMembers([...teamMembers, newMember]);
    setNewInvite({ email: "", role: "viewer" });
    setInviteSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setInviteSuccess(false);
      setIsInviting(false);
    }, 3000);
  };

  // Handle removing a team member
  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  // Get role badge style
  const getRoleBadge = (role: string) => {
    switch(role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "editor": return "bg-blue-100 text-blue-800";
      case "viewer": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get descriptive role name
  const getRoleName = (role: string) => {
    switch(role) {
      case "admin": return "Administrator";
      case "editor": return "Editor";
      case "viewer": return "Viewer";
      default: return role;
    }
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Team Access Management</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Agency Feature</h3>
                <p className="text-gray-600 mb-4">Unlock team management with our Agency plan</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => window.location.href = "/pricing"}
                >
                  View Agency Plan
                </motion.button>
              </div>
            </div>
            
            {/* Blurred preview content */}
            <div className="h-48 w-full rounded-lg bg-gradient-to-r from-purple-100 to-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Team Access Management</h2>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-3 py-1.5 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={() => setIsInviting(true)}
          >
            <UserPlusIcon className="h-4 w-4 mr-1" />
            Invite Team Member
          </motion.button>
        </div>

        {/* Invite Form */}
        <AnimatePresence>
          {isInviting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Invite New Team Member</h3>
                  {inviteSuccess && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Invitation sent successfully!
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleInvite}>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    <div className="md:col-span-3">
                      <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          required
                          className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          value={newInvite.email}
                          onChange={(e) => setNewInvite({...newInvite, email: e.target.value})}
                          placeholder="colleague@example.com"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="role" className="block text-xs font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        id="role"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={newInvite.role}
                        onChange={(e) => setNewInvite({...newInvite, role: e.target.value as "admin" | "editor" | "viewer"})}
                      >
                        <option value="viewer">Viewer (Read-only)</option>
                        <option value="editor">Editor (Can edit)</option>
                        <option value="admin">Administrator (Full access)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => setIsInviting(false)}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <UserPlusIcon className="h-4 w-4 mr-1" />
                      Send Invitation
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Team Members List */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 relative">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(member.role)}`}>
                      {getRoleName(member.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      } mr-1.5`}></span>
                      {member.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {member.lastActive || "Never"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove {member.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {teamMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                    <UserIcon className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p>No team members yet.</p>
                    <button
                      className="mt-2 text-purple-600 hover:text-purple-800 font-medium"
                      onClick={() => setIsInviting(true)}
                    >
                      Invite your first team member
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Info and Help */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800">About team roles</h3>
              <div className="mt-1 text-sm text-blue-700">
                <p className="mb-1"><strong>Administrator:</strong> Can manage team members, billing, and has full access to all features.</p>
                <p className="mb-1"><strong>Editor:</strong> Can create and edit audits, but cannot manage team members or billing.</p>
                <p><strong>Viewer:</strong> Can only view reports and dashboards, but cannot create or edit any data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Check icon component
function CheckIcon({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
} 