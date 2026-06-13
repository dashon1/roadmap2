import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Clock, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [filter, setFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads', filter],
    queryFn: async () => {
      if (filter === 'all') {
        return await base44.entities.Lead.list('-created_date');
      }
      return await base44.entities.Lead.filter({ status: filter }, '-created_date');
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['leadStats'],
    queryFn: async () => {
      const allLeads = await base44.entities.Lead.list();
      return {
        total: allLeads.length,
        new: allLeads.filter(l => l.status === 'new').length,
        contacted: allLeads.filter(l => l.status === 'contacted').length,
        converted: allLeads.filter(l => l.status === 'converted').length
      };
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Lead.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leadStats'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Lead.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leadStats'] });
    }
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-400">Admin access required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Lead Dashboard</h1>
          <p className="text-slate-400">Manage and track your leads</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-sky-400" />
              <span className="text-3xl font-bold text-white">{stats?.total || 0}</span>
            </div>
            <p className="text-slate-400 text-sm">Total Leads</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-white">{stats?.new || 0}</span>
            </div>
            <p className="text-slate-400 text-sm">New Leads</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">{stats?.contacted || 0}</span>
            </div>
            <p className="text-slate-400 text-sm">Contacted</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">{stats?.converted || 0}</span>
            </div>
            <p className="text-slate-400 text-sm">Converted</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'new', 'contacted', 'qualified', 'converted'].map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              variant={filter === status ? 'default' : 'outline'}
              className={filter === status ? 'bg-sky-500' : ''}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400">Loading...</div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No leads found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/50">
                      <td className="px-6 py-4 text-sm text-white">
                        {lead.first_name} {lead.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{lead.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-400 max-w-xs truncate">
                        {lead.message}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatusMutation.mutate({ id: lead.id, status: e.target.value })}
                          className="bg-slate-800 text-white rounded px-2 py-1 border border-slate-700"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="converted">Converted</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(lead.created_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          onClick={() => deleteMutation.mutate(lead.id)}
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}