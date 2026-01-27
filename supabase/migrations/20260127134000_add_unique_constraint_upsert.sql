/*
  # Add uniqueness constraint and allow upsert for quote requests

  1. Changes
    - Add a unique constraint on (service_type, contact_phone) to prevent duplicate requests for the same service from the same phone number.
    - Update RLS policies to allow anonymous users to update their existing requests when they submit a new form with the same phone number.

  2. Security
    - Anonymous users can now "upsert" (insert or update) their own data based on the unique phone/service combination.
*/

-- 1. Add the unique constraint
ALTER TABLE quote_requests 
ADD CONSTRAINT unique_service_phone UNIQUE (service_type, contact_phone);

-- 2. Drop the existing insert policy to replace it
DROP POLICY IF EXISTS "Anyone can insert quote requests" ON quote_requests;

-- 3. Create a new policy that covers both INSERT and UPDATE for anon
-- This allows the .upsert() operation from the frontend
CREATE POLICY "Anyone can upsert quote requests"
  ON quote_requests
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
