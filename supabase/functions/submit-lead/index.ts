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
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const leadData = await req.json();
    console.log('Received lead submission:', leadData);

    // Validate required fields
    if (!leadData.name || !leadData.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || null,
        company: leadData.company || null,
        project_type: leadData.projectType || null,
        budget_range: leadData.budgetRange || null,
        timeline: leadData.timeline || null,
        location: leadData.location || null,
        description: leadData.description || null,
        project_details: leadData.projectDetails || null,
        preferred_contact_method: leadData.preferredContactMethod || null,
        preferred_contact_time: leadData.preferredContactTime || null,
        special_requirements: leadData.specialRequirements || null,
        status: 'nieuw'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Lead saved successfully:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Lead submitted successfully',
      leadId: data.id 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in submit-lead function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});