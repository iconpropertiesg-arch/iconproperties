image.png# Vercel Environment Variables Setup

## Why Emails Work on Localhost But Not Vercel

**Localhost** uses `.env.local` file (which you have configured)  
**Vercel** needs environment variables set in the Vercel Dashboard

## Required Environment Variables for Vercel

You need to add these in Vercel Dashboard:

### 1. Database Variables
```
DATABASE_URL=postgresql://postgres.zgxjuueedtcfwlkyzrvw:SakhawatALi252@@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.zgxjuueedtcfwlkyzrvw:SakhawatALi252@@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

### 2. Email Service (Resend)
```
RESEND_API_KEY=re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1
EMAIL_FROM=Icon Properties <noreply@uaebazarr.com>
ADMIN_EMAIL=jam752575@gmail.com
```

### 3. Supabase (if needed)
```
NEXT_PUBLIC_SUPABASE_URL=https://zgxjuueedtcfwlkyzrvw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. JWT Secret
```
JWT_SECRET=your-secret-key-change-in-production
```

### 5. Admin Credentials
```
ADMIN_PASSWORD=admin123
```

## Step-by-Step: Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. **Select your project** (`property_website` or similar)

### Step 2: Navigate to Environment Variables
1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)

### Step 3: Add Each Variable

For **each variable**, click **Add New** and enter:

**Variable 1:**
- **Key**: `DATABASE_URL`
- **Value**: `postgresql://postgres.zgxjuueedtcfwlkyzrvw:SakhawatALi252@@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 2:**
- **Key**: `DIRECT_URL`
- **Value**: `postgresql://postgres.zgxjuueedtcfwlkyzrvw:SakhawatALi252@@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 3:**
- **Key**: `RESEND_API_KEY`
- **Value**: `re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 4:**
- **Key**: `EMAIL_FROM`
- **Value**: `Icon Properties <noreply@uaebazarr.com>`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 5:**
- **Key**: `ADMIN_EMAIL`
- **Value**: `jam752575@gmail.com`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 6:**
- **Key**: `JWT_SECRET`
- **Value**: `your-secret-key-change-in-production` (or generate a secure one)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 7:**
- **Key**: `ADMIN_PASSWORD`
- **Value**: `admin123`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

### Step 4: Redeploy

After adding all variables:

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeploy

## Important Notes

### ✅ Select All Environments
Make sure to check **all three**:
- ✅ Production
- ✅ Preview  
- ✅ Development

This ensures variables work in all environments.

### 🔒 Security
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Vercel environment variables are encrypted and secure
- Use strong values for `JWT_SECRET` in production

### 📧 Email Configuration
The most critical variables for email are:
- `RESEND_API_KEY` - Your Resend API key
- `EMAIL_FROM` - Must match your verified domain: `noreply@uaebazarr.com`
- `ADMIN_EMAIL` - Where admin notifications go

## Quick Checklist

- [ ] `DATABASE_URL` added
- [ ] `DIRECT_URL` added
- [ ] `RESEND_API_KEY` added
- [ ] `EMAIL_FROM` = `Icon Properties <noreply@uaebazarr.com>`
- [ ] `ADMIN_EMAIL` added
- [ ] `JWT_SECRET` added
- [ ] `ADMIN_PASSWORD` added
- [ ] All variables set for Production, Preview, Development
- [ ] Redeployed after adding variables

## Testing After Setup

1. **Wait for redeploy** to complete
2. **Submit portfolio form** on your Vercel site
3. **Check emails** - both user and admin should receive emails
4. **Check Vercel logs** if emails don't work:
   - Go to Deployment → Functions → View Function Logs
   - Look for email-related errors

## Troubleshooting

### Still Not Working?

1. **Check variable names** - must match exactly (case-sensitive)
2. **Check environments** - make sure all are selected
3. **Redeploy** - variables only apply to new deployments
4. **Check logs** - Vercel function logs will show errors
5. **Verify domain** - make sure `uaebazarr.com` is verified in Resend

### Common Issues

**"RESEND_API_KEY not set"**
- Variable not added or wrong name
- Not selected for the right environment

**"Email sending forbidden"**
- `EMAIL_FROM` doesn't match verified domain
- Domain not verified in Resend

**"Database connection failed"**
- `DATABASE_URL` not set correctly
- Connection string has errors

## After Setup

Once all variables are set and you redeploy:
- ✅ Emails will work on Vercel
- ✅ Database will work on Vercel
- ✅ Everything will match localhost behavior

