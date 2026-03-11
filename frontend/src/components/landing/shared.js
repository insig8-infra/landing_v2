import React from 'react';
import {
  Mail, Hash, Cloud, CheckSquare, MessageSquare,
  AlertTriangle, Ticket, ListTodo, Calendar, Bell, BarChart3,
  GitPullRequest
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const MouseContext = React.createContext({ x: 0.5, y: 0.5 });

export const floatingBadges = [
  { icon: Mail, label: '142 unread', color: 'text-blue-400' },
  { icon: Hash, label: '#customer-success', color: 'text-purple-400' },
  { icon: GitPullRequest, label: 'Feature request', color: 'text-teal-400' },
  { icon: ListTodo, label: 'Review tasks', color: 'text-emerald-400' },
  { icon: Cloud, label: 'Deal at risk', color: 'text-cyan-400' },
  { icon: CheckSquare, label: '5 tasks pending', color: 'text-green-400' },
  { icon: Ticket, label: '3 new tickets', color: 'text-orange-400' },
  { icon: Bell, label: '12 notifications', color: 'text-yellow-400' },
  { icon: BarChart3, label: 'Usage drop', color: 'text-rose-400' },
  { icon: MessageSquare, label: 'Meeting notes', color: 'text-pink-400' },
  { icon: AlertTriangle, label: 'Escalation', color: 'text-red-400' },
  { icon: Calendar, label: 'QBR tomorrow', color: 'text-indigo-400' },
];

export const convergenceHandoffCopy = Object.freeze({
  prefix: 'Intelligence that',
  emphasis: 'compounds',
});
