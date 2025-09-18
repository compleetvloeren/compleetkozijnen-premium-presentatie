import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Get JWT token from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization header required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Client with user JWT
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Admin client (bypasses RLS) - used only after explicit admin check
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Verify user is authenticated and is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const leadId = url.searchParams.get('id');
    
    // For write requests, also check body for leadId
    let bodyData: any = null;
    if (req.method === 'DELETE' || req.method === 'PUT' || req.method === 'POST') {
      try {
        bodyData = await req.json();
        if (!leadId && bodyData?.leadId) {
          url.searchParams.set('id', bodyData.leadId);
        }
      } catch (e) {
        // Body parsing can fail for GET requests without body; ignore
      }
    }

    switch (req.method) {
      case 'GET':
        if (leadId) {
          // Get single lead
          const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', leadId)
            .single();

          if (error) {
            console.error('Database error:', error);
            return new Response(JSON.stringify({ error: 'Lead not found' }), {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all leads with optional filtering
          const status = url.searchParams.get('status');
          const limit = parseInt(url.searchParams.get('limit') || '50');
          const offset = parseInt(url.searchParams.get('offset') || '0');

          let query = supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

          if (status) {
            query = query.eq('status', status);
          }

          const { data, error } = await query;

          if (error) {
            console.error('Database error:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch leads' }), {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'PUT':
        if (!leadId) {
          return new Response(JSON.stringify({ error: 'Lead ID required for update' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const updateData = bodyData || await req.json();
        console.log('Updating lead:', leadId, updateData);

        const { data: updatedLead, error: updateError } = await supabase
          .from('leads')
          .update({
            status: updateData.status,
            notes: updateData.notes,
            assigned_to: updateData.assigned_to || null
          })
          .eq('id', leadId)
          .select()
          .single();

        if (updateError) {
          console.error('Database error:', updateError);
          return new Response(JSON.stringify({ error: 'Failed to update lead' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify(updatedLead), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        const finalLeadId = leadId || url.searchParams.get('id');
        if (!finalLeadId) {
          return new Response(JSON.stringify({ error: 'Lead ID required for deletion' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Verify delete password
        const deleteData = bodyData || await req.json();
        const ALLOWED_PASSWORDS = ['Slavenvoedsel', 'Slavenvoedsel.071'];
        
        if (!deleteData.password || !ALLOWED_PASSWORDS.includes(deleteData.password)) {
          return new Response(JSON.stringify({ error: 'Invalid delete password' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        console.log('Delete password verified for lead:', finalLeadId);

        const { error: deleteError } = await adminClient
          .from('leads')
          .delete()
          .eq('id', finalLeadId);

        if (deleteError) {
          console.error('Database error:', deleteError);
          return new Response(JSON.stringify({ error: 'Failed to delete lead' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        console.log('Lead deleted successfully via DELETE:', finalLeadId);
        return new Response(JSON.stringify({ success: true, message: 'Lead deleted successfully' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'POST':
        // Support deletion via POST (functions.invoke uses POST)
        const postData = bodyData || {};
        
        if (postData.action === 'delete') {
          // Delete lead
          const postLeadId = postData.leadId || leadId;
          if (!postLeadId) {
            return new Response(JSON.stringify({ error: 'Lead ID required for deletion' }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          const ALLOWED_PASSWORDS_POST = ['Slavenvoedsel', 'Slavenvoedsel.071'];
          if (!postData.password || !ALLOWED_PASSWORDS_POST.includes(postData.password)) {
            return new Response(JSON.stringify({ error: 'Invalid delete password' }), {
              status: 403,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          const { error: delErr } = await adminClient
            .from('leads')
            .delete()
            .eq('id', postLeadId);
          if (delErr) {
            console.error('Database error:', delErr);
            return new Response(JSON.stringify({ error: 'Failed to delete lead' }), {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          console.log('Lead deleted successfully via POST:', postLeadId);
          return new Response(JSON.stringify({ success: true, message: 'Lead deleted successfully' }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (postData.action === 'delete-contact') {
          // Delete contact submission
          const contactId = postData.contactId;
          if (!contactId) {
            return new Response(JSON.stringify({ error: 'Contact ID required for deletion' }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          const ALLOWED_PASSWORDS_CONTACT = ['Slavenvoedsel', 'Slavenvoedsel.071'];
          if (!postData.password || !ALLOWED_PASSWORDS_CONTACT.includes(postData.password)) {
            return new Response(JSON.stringify({ error: 'Invalid delete password' }), {
              status: 403,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          const { error: contactDelErr } = await adminClient
            .from('contact_submissions')
            .delete()
            .eq('id', contactId);
          if (contactDelErr) {
            console.error('Database error:', contactDelErr);
            return new Response(JSON.stringify({ error: 'Failed to delete contact submission' }), {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          console.log('Contact submission deleted successfully via POST:', contactId);
          return new Response(JSON.stringify({ success: true, message: 'Contact submission deleted successfully' }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        // Support deletion via POST (functions.invoke uses POST)
        const postData = bodyData || {};
        const postLeadId = postData.leadId || leadId;
        if (!postLeadId) {
          return new Response(JSON.stringify({ error: 'Lead ID required for deletion' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        // If no specific action, return error
        return new Response(JSON.stringify({ error: 'Missing or invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error) {
    console.error('Error in leads-crud function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});