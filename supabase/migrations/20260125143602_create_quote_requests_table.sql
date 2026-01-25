/*
  # Create quote_requests table for AKR Group

  ## Overview
  This migration creates a table to store all quote requests from the AKR Group website.
  It supports three types of services: ÉNERGIE, SOLAIRE, and TÉLÉCOM.

  ## Tables Created
  1. `quote_requests`
     - `id` (uuid, primary key) - Unique identifier for each request
     - `service_type` (text) - Type of service: 'energie', 'solaire', or 'telecom'
     - `form_data` (jsonb) - Stores all form answers in JSON format
     - `contact_name` (text) - Customer's full name
     - `contact_email` (text) - Customer's email address
     - `contact_phone` (text) - Customer's phone number
     - `contact_postal_code` (text) - Customer's postal code
     - `status` (text) - Request status: 'pending', 'contacted', 'completed'
     - `created_at` (timestamptz) - Timestamp of request creation
     - `updated_at` (timestamptz) - Timestamp of last update

  ## Security
  - Enable RLS on the table
  - Allow public inserts (for form submissions)
  - Restrict reads and updates to authenticated users only

  ## Notes
  - The form_data column stores all questionnaire responses flexibly
  - Status defaults to 'pending' for new requests
  - Timestamps are automatically managed
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text NOT NULL CHECK (service_type IN ('energie', 'solaire', 'telecom')),
  form_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  contact_name text NOT NULL,
  contact_email text,
  contact_phone text NOT NULL,
  contact_postal_code text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quote requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all quote requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update quote requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_quote_requests_service_type ON quote_requests(service_type);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);