import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast for immediate feedback
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default'
    });

    return newNotification.id;
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Dismiss (remove) notification
  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-dismiss notifications after 10 minutes
  useEffect(() => {
    const cleanup = setInterval(() => {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      setNotifications(prev => 
        prev.filter(notif => notif.timestamp > tenMinutesAgo)
      );
    }, 60000); // Check every minute

    return () => clearInterval(cleanup);
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    clearAll
  };
};

// Hook for simulating new lead notifications (for demo purposes)
export const useLeadNotifications = () => {
  const { addNotification } = useNotifications();

  const simulateNewLeadNotification = (leadName: string) => {
    addNotification({
      type: 'info',
      title: 'Nieuwe Lead',
      message: `${leadName} heeft een offerteverzoek ingediend`,
      actionUrl: '/dashboard',
      actionLabel: 'Bekijk Dashboard'
    });
  };

  const simulateLeadStatusChange = (leadName: string, status: string) => {
    addNotification({
      type: 'success',
      title: 'Lead Status Gewijzigd',
      message: `Status van ${leadName} is gewijzigd naar "${status}"`,
      actionUrl: '/dashboard',
      actionLabel: 'Bekijk Lead'
    });
  };

  const simulateExportComplete = (count: number, format: string) => {
    addNotification({
      type: 'success',
      title: 'Export Voltooid',
      message: `${count} leads zijn succesvol geëxporteerd als ${format.toUpperCase()}`,
    });
  };

  const simulateSystemError = (error: string) => {
    addNotification({
      type: 'error',
      title: 'Systeem Fout',
      message: error,
      actionUrl: '/contact',
      actionLabel: 'Contact Support'
    });
  };

  return {
    simulateNewLeadNotification,
    simulateLeadStatusChange,
    simulateExportComplete,
    simulateSystemError
  };
};

export default useNotifications;