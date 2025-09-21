export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_events: {
        Row: {
          contact_id: string | null
          created_at: string
          created_by: string | null
          event_type: string
          id: string
          metadata: Json | null
          new_value: string | null
          old_value: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_events_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          status: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_submissions_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      form_conversions: {
        Row: {
          abandonment_step: string | null
          conversion_funnel: Json | null
          created_at: string
          form_type: string
          id: string
          page_path: string
          session_id: string
          time_to_convert: number | null
        }
        Insert: {
          abandonment_step?: string | null
          conversion_funnel?: Json | null
          created_at?: string
          form_type: string
          id?: string
          page_path: string
          session_id: string
          time_to_convert?: number | null
        }
        Update: {
          abandonment_step?: string | null
          conversion_funnel?: Json | null
          created_at?: string
          form_type?: string
          id?: string
          page_path?: string
          session_id?: string
          time_to_convert?: number | null
        }
        Relationships: []
      }
      lead_events: {
        Row: {
          created_at: string
          created_by: string | null
          event_type: string
          id: string
          lead_id: string | null
          metadata: Json | null
          new_value: string | null
          old_value: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          event_type: string
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          event_type?: string
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          budget_range: Database["public"]["Enums"]["budget_range"] | null
          company: string | null
          created_at: string
          description: string | null
          email: string
          id: string
          location: string | null
          name: string
          notes: string | null
          phone: string | null
          preferred_contact_method: string | null
          preferred_contact_time: string | null
          project_details: string | null
          project_type: Database["public"]["Enums"]["project_type"] | null
          special_requirements: string | null
          status: Database["public"]["Enums"]["lead_status"] | null
          timeline: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          budget_range?: Database["public"]["Enums"]["budget_range"] | null
          company?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_contact_time?: string | null
          project_details?: string | null
          project_type?: Database["public"]["Enums"]["project_type"] | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          budget_range?: Database["public"]["Enums"]["budget_range"] | null
          company?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_contact_time?: string | null
          project_details?: string | null
          project_type?: Database["public"]["Enums"]["project_type"] | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          timeline?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      page_performance: {
        Row: {
          created_at: string
          cumulative_layout_shift: number | null
          dom_content_loaded: number | null
          first_contentful_paint: number | null
          first_input_delay: number | null
          id: string
          largest_contentful_paint: number | null
          load_time: number | null
          page_path: string
          session_id: string
          total_blocking_time: number | null
        }
        Insert: {
          created_at?: string
          cumulative_layout_shift?: number | null
          dom_content_loaded?: number | null
          first_contentful_paint?: number | null
          first_input_delay?: number | null
          id?: string
          largest_contentful_paint?: number | null
          load_time?: number | null
          page_path: string
          session_id: string
          total_blocking_time?: number | null
        }
        Update: {
          created_at?: string
          cumulative_layout_shift?: number | null
          dom_content_loaded?: number | null
          first_contentful_paint?: number | null
          first_input_delay?: number | null
          id?: string
          largest_contentful_paint?: number | null
          load_time?: number | null
          page_path?: string
          session_id?: string
          total_blocking_time?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      visitor_sessions: {
        Row: {
          asn: string | null
          browser: string | null
          city: string | null
          country_code: string | null
          country_name: string | null
          created_at: string
          device_type: string | null
          first_visit_at: string
          id: string
          ip_address: unknown
          is_bounce: boolean | null
          isp: string | null
          last_activity_at: string
          latitude: number | null
          longitude: number | null
          organization: string | null
          os: string | null
          page_views: number | null
          postal_code: string | null
          region: string | null
          region_code: string | null
          screen_resolution: string | null
          session_duration: number | null
          session_id: string
          timezone: string | null
          updated_at: string
          user_agent: string | null
          viewport_size: string | null
          visitor_id: string
        }
        Insert: {
          asn?: string | null
          browser?: string | null
          city?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string
          device_type?: string | null
          first_visit_at?: string
          id?: string
          ip_address: unknown
          is_bounce?: boolean | null
          isp?: string | null
          last_activity_at?: string
          latitude?: number | null
          longitude?: number | null
          organization?: string | null
          os?: string | null
          page_views?: number | null
          postal_code?: string | null
          region?: string | null
          region_code?: string | null
          screen_resolution?: string | null
          session_duration?: number | null
          session_id: string
          timezone?: string | null
          updated_at?: string
          user_agent?: string | null
          viewport_size?: string | null
          visitor_id: string
        }
        Update: {
          asn?: string | null
          browser?: string | null
          city?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string
          device_type?: string | null
          first_visit_at?: string
          id?: string
          ip_address?: unknown
          is_bounce?: boolean | null
          isp?: string | null
          last_activity_at?: string
          latitude?: number | null
          longitude?: number | null
          organization?: string | null
          os?: string | null
          page_views?: number | null
          postal_code?: string | null
          region?: string | null
          region_code?: string | null
          screen_resolution?: string | null
          session_duration?: number | null
          session_id?: string
          timezone?: string | null
          updated_at?: string
          user_agent?: string | null
          viewport_size?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      website_analytics: {
        Row: {
          browser: string | null
          city: string | null
          country_code: string | null
          created_at: string
          device_type: string | null
          entry_page: boolean | null
          exit_page: boolean | null
          id: string
          ip_address: unknown | null
          is_bounce: boolean | null
          is_desktop: boolean | null
          is_mobile: boolean | null
          is_tablet: boolean | null
          os: string | null
          page_path: string
          page_title: string | null
          page_views_in_session: number | null
          referrer: string | null
          screen_resolution: string | null
          session_duration: number | null
          session_id: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          viewport_size: string | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country_code?: string | null
          created_at?: string
          device_type?: string | null
          entry_page?: boolean | null
          exit_page?: boolean | null
          id?: string
          ip_address?: unknown | null
          is_bounce?: boolean | null
          is_desktop?: boolean | null
          is_mobile?: boolean | null
          is_tablet?: boolean | null
          os?: string | null
          page_path: string
          page_title?: string | null
          page_views_in_session?: number | null
          referrer?: string | null
          screen_resolution?: string | null
          session_duration?: number | null
          session_id: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewport_size?: string | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          city?: string | null
          country_code?: string | null
          created_at?: string
          device_type?: string | null
          entry_page?: boolean | null
          exit_page?: boolean | null
          id?: string
          ip_address?: unknown | null
          is_bounce?: boolean | null
          is_desktop?: boolean | null
          is_mobile?: boolean | null
          is_tablet?: boolean | null
          os?: string | null
          page_path?: string
          page_title?: string | null
          page_views_in_session?: number | null
          referrer?: string | null
          screen_resolution?: string | null
          session_duration?: number | null
          session_id?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewport_size?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      budget_range:
        | "5000-10000"
        | "10000-25000"
        | "25000-50000"
        | "50000+"
        | "onbekend"
      lead_status:
        | "nieuw"
        | "in_behandeling"
        | "offerte_verstuurd"
        | "gewonnen"
        | "verloren"
      project_type:
        | "ramen"
        | "deuren"
        | "schuifdeuren"
        | "kozijnen"
        | "renovatie"
        | "nieuwbouw"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      budget_range: [
        "5000-10000",
        "10000-25000",
        "25000-50000",
        "50000+",
        "onbekend",
      ],
      lead_status: [
        "nieuw",
        "in_behandeling",
        "offerte_verstuurd",
        "gewonnen",
        "verloren",
      ],
      project_type: [
        "ramen",
        "deuren",
        "schuifdeuren",
        "kozijnen",
        "renovatie",
        "nieuwbouw",
      ],
    },
  },
} as const
