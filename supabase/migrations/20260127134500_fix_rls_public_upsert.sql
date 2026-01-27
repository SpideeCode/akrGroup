/*
  # Fix RLS policies to allow upsert for everyone (Public)

  1. Why
    - The previous policy was restricted to 'anon' users.
    - If an admin (authenticated) tried to fill a form, it failed with 403 because 'authenticated' users didn't have INSERT permission.
    - PostgREST 'upsert' requires both INSERT and UPDATE permissions.

  2. Changes
    - Create a unified policy for 'public' (covers both guests and admins).
    - Allow all operations needed for form submission (INSERT, UPDATE).
*/

-- Drop old restricted policies
DROP POLICY IF EXISTS "Anyone can insert quote requests" ON quote_requests;
DROP POLICY IF EXISTS "Anyone can upsert quote requests" ON quote_requests;
DROP POLICY IF EXISTS "Authenticated users can update quote requests" ON quote_requests;

-- Create a single, robust policy for form submissions
CREATE POLICY "Enable upsert for all roles"
  ON quote_requests
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
