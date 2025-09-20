import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LeadEvent {
  lead_id: string;
  event_type: 'created' | 'status_changed' | 'assigned' | 'note_added' | 'converted';
  old_value?: string;
  new_value?: string;
  created_by?: string;
  metadata?: any;
}

interface ContactEvent {
  contact_id: string;
  event_type: 'created' | 'status_changed' | 'assigned' | 'responded';
  old_value?: string;
  new_value?: string;
  created_by?: string;
  metadata?: any;
}

export const useLeadTracking = () => {
  // Set up real-time tracking for lead changes
  useEffect(() => {
    const leadsChannel = supabase
      .channel('leads_tracking')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'leads' 
        }, 
        async (payload) => {
          console.log('New lead created:', payload.new);
          await trackLeadEvent({
            lead_id: payload.new.id,
            event_type: 'created',
            new_value: payload.new.status,
            metadata: {
              name: payload.new.name,
              email: payload.new.email,
              project_type: payload.new.project_type,
              budget_range: payload.new.budget_range
            }
          });
        })
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'leads' 
        }, 
        async (payload) => {
          console.log('Lead updated:', payload.new);
          
          // Track status changes
          if (payload.old.status !== payload.new.status) {
            await trackLeadEvent({
              lead_id: payload.new.id,
              event_type: 'status_changed',
              old_value: payload.old.status,
              new_value: payload.new.status,
              metadata: {
                name: payload.new.name,
                previous_status: payload.old.status,
                new_status: payload.new.status
              }
            });

            // Track conversions
            if (payload.new.status === 'gewonnen') {
              await trackLeadEvent({
                lead_id: payload.new.id,
                event_type: 'converted',
                old_value: payload.old.status,
                new_value: payload.new.status,
                metadata: {
                  conversion_date: new Date().toISOString(),
                  project_type: payload.new.project_type,
                  budget_range: payload.new.budget_range
                }
              });
            }
          }

          // Track assignment changes
          if (payload.old.assigned_to !== payload.new.assigned_to) {
            await trackLeadEvent({
              lead_id: payload.new.id,
              event_type: 'assigned',
              old_value: payload.old.assigned_to,
              new_value: payload.new.assigned_to,
              metadata: {
                assigned_to: payload.new.assigned_to,
                assigned_by: payload.new.updated_by || 'system'
              }
            });
          }
        })
      .subscribe();

    const contactsChannel = supabase
      .channel('contacts_tracking')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'contact_submissions' 
        }, 
        async (payload) => {
          console.log('New contact created:', payload.new);
          await trackContactEvent({
            contact_id: payload.new.id,
            event_type: 'created',
            new_value: payload.new.status,
            metadata: {
              name: payload.new.name,
              email: payload.new.email,
              subject: payload.new.subject
            }
          });
        })
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'contact_submissions' 
        }, 
        async (payload) => {
          console.log('Contact updated:', payload.new);
          
          // Track status changes
          if (payload.old.status !== payload.new.status) {
            await trackContactEvent({
              contact_id: payload.new.id,
              event_type: 'status_changed',
              old_value: payload.old.status,
              new_value: payload.new.status,
              metadata: {
                name: payload.new.name,
                previous_status: payload.old.status,
                new_status: payload.new.status
              }
            });

            // Track responses
            if (payload.new.status === 'beantwoord' && payload.old.status !== 'beantwoord') {
              await trackContactEvent({
                contact_id: payload.new.id,
                event_type: 'responded',
                old_value: payload.old.status,
                new_value: payload.new.status,
                metadata: {
                  response_date: new Date().toISOString(),
                  responded_by: payload.new.responded_by || 'system'
                }
              });
            }
          }
        })
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(contactsChannel);
    };
  }, []);

  const trackLeadEvent = async (event: LeadEvent) => {
    try {
      const { error } = await supabase
        .from('lead_events')
        .insert({
          lead_id: event.lead_id,
          event_type: event.event_type,
          old_value: event.old_value,
          new_value: event.new_value,
          created_by: event.created_by,
          metadata: event.metadata
        });

      if (error) {
        console.error('Error tracking lead event:', error);
      }
    } catch (error) {
      console.error('Failed to track lead event:', error);
    }
  };

  const trackContactEvent = async (event: ContactEvent) => {
    try {
      const { error } = await supabase
        .from('contact_events')
        .insert({
          contact_id: event.contact_id,
          event_type: event.event_type,
          old_value: event.old_value,
          new_value: event.new_value,
          created_by: event.created_by,
          metadata: event.metadata
        });

      if (error) {
        console.error('Error tracking contact event:', error);
      }
    } catch (error) {
      console.error('Failed to track contact event:', error);
    }
  };

  return {
    trackLeadEvent,
    trackContactEvent
  };
};