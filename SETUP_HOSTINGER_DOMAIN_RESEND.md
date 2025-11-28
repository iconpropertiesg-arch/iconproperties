# Setup uaebazarr.com Domain with Resend (Hostinger)

## Step-by-Step Guide

### Step 1: Verify Domain in Resend

1. **Go to Resend Dashboard**: https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter your domain**: `uaebazarr.com`
4. **Click "Add"**

### Step 2: Get DNS Records from Resend

Resend will show you DNS records to add. You'll see something like:

**TXT Record (for domain verification):**
```
Type: TXT
Name: @ (or uaebazarr.com)
Value: resend-domain-verification=abc123xyz...
```

**MX Record (for email feedback):**
```
Type: MX
Name: @ (or uaebazarr.com)
Priority: 10
Value: feedback-smtp.resend.com
```

**SPF Record (optional but recommended):**
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all
```

**DKIM Records (Resend will provide 2-3 of these):**
```
Type: TXT
Name: resend._domainkey
Value: [long string from Resend]
```

### Step 3: Add DNS Records in Hostinger

1. **Log in to Hostinger**: https://www.hostinger.com
2. **Go to your domain**: `uaebazarr.com`
3. **Navigate to DNS Management**:
   - Go to **Domains** → Select `uaebazarr.com`
   - Click **DNS / Name Servers** or **DNS Zone Editor**
4. **Add the DNS records** from Resend:
   - Click **Add Record** or **+**
   - Select **TXT** type
   - Enter the **Name** (usually `@` or leave blank for root domain)
   - Enter the **Value** from Resend
   - Click **Save**
   - Repeat for all records (TXT, MX, DKIM)

### Step 4: Wait for Verification

1. **Wait 5-10 minutes** for DNS propagation
2. **Check Resend Dashboard** → Domains
3. **Status should change to "Verified"** ✅
4. You can check DNS propagation at: https://dnschecker.org

### Step 5: Update Environment Variables

#### For Localhost (`.env.local`):

```env
# Resend Email Service
RESEND_API_KEY=re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1
EMAIL_FROM=Icon Properties <noreply@uaebazarr.com>
ADMIN_EMAIL=jam752575@gmail.com
```

#### For Vercel (Environment Variables):

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to Settings** → **Environment Variables**
4. **Add/Update**:
   - `EMAIL_FROM` = `Icon Properties <noreply@uaebazarr.com>`
   - `RESEND_API_KEY` = `re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1`
   - `ADMIN_EMAIL` = `jam752575@gmail.com`
5. **Select all environments** (Production, Preview, Development)
6. **Click "Save"**

### Step 6: Restart Servers

**Localhost:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**Vercel:**
- Push changes or manually redeploy

## Alternative Email Addresses

You can use any subdomain for email:
- `noreply@uaebazarr.com` ✅
- `info@uaebazarr.com` ✅
- `contact@uaebazarr.com` ✅
- `hello@uaebazarr.com` ✅

Just update `EMAIL_FROM` accordingly.

## Troubleshooting

### Domain Not Verifying?

1. **Check DNS records** are added correctly in Hostinger
2. **Wait longer** (DNS can take up to 48 hours, usually 5-10 minutes)
3. **Verify records** at https://dnschecker.org
4. **Check Hostinger DNS** - make sure records are saved and active

### Still Getting 403 Errors?

1. **Verify domain status** in Resend dashboard (should show ✅ Verified)
2. **Check EMAIL_FROM** matches verified domain exactly
3. **Restart server** after changing environment variables
4. **Check Vercel environment variables** are set correctly

### DNS Records Not Working?

- Make sure you're adding records to the **correct domain** in Hostinger
- Check if Hostinger uses `@` or blank for root domain
- Some hosts require full domain name: `uaebazarr.com` instead of `@`
- Wait for DNS propagation (can take time)

## Benefits

✅ Send emails to **any user** (no restrictions!)  
✅ Professional email addresses (`noreply@uaebazarr.com`)  
✅ Better email deliverability  
✅ Works on both localhost and Vercel  
✅ No more 403 errors!  

## Quick Checklist

- [ ] Domain added to Resend dashboard
- [ ] DNS records added in Hostinger
- [ ] Domain verified in Resend (status shows ✅)
- [ ] `.env.local` updated with `noreply@uaebazarr.com`
- [ ] Vercel environment variables updated
- [ ] Server restarted
- [ ] Test email sent successfully

## Need Help with Hostinger DNS?

If you need help finding DNS settings in Hostinger:
1. Log in to Hostinger
2. Go to **Domains** → Select `uaebazarr.com`
3. Look for **DNS Zone Editor** or **DNS Management**
4. You should see options to add **TXT**, **MX**, **A**, **CNAME** records

Once verified, your emails will work perfectly! 🎉

