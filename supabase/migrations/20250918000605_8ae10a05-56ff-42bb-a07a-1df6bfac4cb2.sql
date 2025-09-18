-- Allow admin users to delete contact submissions
CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (is_admin_user());