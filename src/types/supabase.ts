
import { Database } from '@/integrations/supabase/types';

// Define user-related types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Proposal = Database['public']['Tables']['proposals']['Row'];
export type Wallet = Database['public']['Tables']['wallets']['Row'];
export type Transaction = Database['public']['Tables']['transactions']['Row'];

// Define enum types
export type UserRole = Database['public']['Enums']['user_role'];
export type ProjectStatus = Database['public']['Enums']['project_status'];
export type ProposalStatus = Database['public']['Enums']['proposal_status'];
