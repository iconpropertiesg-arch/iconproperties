# How to Verify Domain in Resend (Works for Both Localhost & Vercel)

## Why This Works for Both

Once you verify your domain in Resend, it works for **both**:
- ✅ **Localhost** (development) - `http://localhost:3000`
- ✅ **Vercel** (production) - `https://yourdomain.com`

Domain verification is done at the **DNS level**, not the application level, so it works everywhere!

## Step-by-Step Guide

### Step 1: Verify Your Domain in Resend

1. **Go to Resend Dashboard**: https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter your domain**: `iconproperties.es` (or whatever domain you own)
4. **Click "Add"**

### Step 2: Add DNS Records

Resend will show you DNS records to add. You'll need to add these to your domain's DNS settings:

**Example DNS records Resend will provide:**
```
Type: TXT
Name: @ (or iconproperties.es)
Value: resend-domain-verification=abc123...

Type: MX
Name: @ (or iconproperties.es)
Priority: 10
Value: feedback-smtp.resend.com
```

**Where to add DNS records:**
- If your domain is managed by **Vercel**: Go to Vercel Dashboard → Your Project → Settings → Domains → DNS Records
- If your domain is managed by **another provider** (GoDaddy, Namecheap, etc.): Go to your domain registrar's DNS settings

### Step 3: Wait for Verification

1. **Wait 5-10 minutes** for DNS propagation
2. **Check Resend Dashboard** → Domains
3. **Status should change to "Verified"** ✅

### Step 4: Update Environment Variables

#### For Localhost (`.env.local`):

```env
# Resend Email Service
RESEND_API_KEY=re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1
EMAIL_FROM=Icon Properties <noreply@iconproperties.es>
ADMIN_EMAIL=jam752575@gmail.com
```

#### For Vercel (Environment Variables):

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to Settings** → **Environment Variables**
4. **Add/Update these variables**:
   - `RESEND_API_KEY` = `re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1`
   - `EMAIL_FROM` = `Icon Properties <noreply@iconproperties.es>`
   - `ADMIN_EMAIL` = `jam752575@gmail.com`

5. **Select environments**: Check both "Production", "Preview", and "Development"
6. **Click "Save"**

### Step 5: Restart Your Servers

**Localhost:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**Vercel:**
- Vercel will automatically redeploy when you push changes
- Or trigger a redeploy manually from the Vercel dashboard

## Alternative: Use a Subdomain (Easier for Testing)

If you want to test without affecting your main domain:

1. **Use a subdomain**: `mail.iconproperties.es` or `noreply.iconproperties.es`
2. **Verify the subdomain in Resend** (same process)
3. **Use**: `EMAIL_FROM=Icon Properties <noreply@mail.iconproperties.es>`

## Quick Setup Checklist

- [ ] Domain added to Resend dashboard
- [ ] DNS records added to domain registrar/Vercel
- [ ] Domain verified in Resend (status shows ✅)
- [ ] `.env.local` updated with verified email
- [ ] Vercel environment variables updated
- [ ] Server restarted
- [ ] Test email sent successfully

## Testing

After setup, test with:

1. **Localhost**: Submit form at `http://localhost:3000`
2. **Vercel**: Submit form at `https://yourdomain.com`

Both should work! ✅

## Troubleshooting

### Domain Not Verifying?

1. **Check DNS propagation**: Use https://dnschecker.org to see if DNS records are propagated
2. **Wait longer**: DNS can take up to 48 hours (usually 5-10 minutes)
3. **Check record format**: Make sure you copied the exact values from Resend
4. **Check domain registrar**: Some registrars have different DNS interfaces

### Still Getting 403 Error?

1. **Verify domain status** in Resend dashboard
2. **Check EMAIL_FROM** matches the verified domain exactly
3. **Restart server** after changing environment variables
4. **Check Vercel environment variables** are set correctly

### Works on Localhost but Not Vercel?

- Check Vercel environment variables are set
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy your Vercel app after setting variables

## Benefits of Domain Verification

✅ Send to any email address (not just your own)  
✅ Professional email addresses (`noreply@iconproperties.es`)  
✅ Better email deliverability  
✅ Works on both localhost and Vercel  
✅ No more 403 errors!  

## Need Help?

If you're stuck:
1. Check Resend dashboard → Domains for verification status
2. Check your DNS records match what Resend provided
3. Wait a bit longer for DNS propagation
4. Contact Resend support if domain won't verify

