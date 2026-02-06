# Vercel Web Analytics Integration Guide

This guide explains how Vercel Web Analytics is integrated into this project and how to use it effectively.

## 📊 What is Vercel Web Analytics?

Vercel Web Analytics provides privacy-friendly, real-time insights into your website's performance and visitor behavior without using cookies or tracking personal data. It's fully GDPR-compliant and respects user privacy.

## ✅ Current Implementation

This project **already has Vercel Web Analytics integrated** and ready to use. The implementation follows best practices for React + Vite applications.

### Integration Details

**Package Installed:**
```json
"@vercel/analytics": "^1.6.1"
```

**Implementation Location:**
```jsx
// src/App.jsx
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div>
      {/* Your app content */}
      <Analytics />
    </div>
  );
}
```

The `<Analytics />` component is placed at the root level of the application, ensuring all page views and interactions are tracked across all scenes in the presentation.

## 🚀 How to Enable Analytics on Vercel

To start collecting analytics data, follow these steps:

### 1. Enable Web Analytics in Your Vercel Project

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Analytics** tab
4. Click **Enable** to activate Web Analytics

> **Note:** After enabling, new routes will be added at `/_vercel/insights/*` on your next deployment.

### 2. Deploy Your Application

Deploy your app to Vercel using one of these methods:

**Option A: Using Git Integration (Recommended)**
- Connect your GitHub/GitLab/Bitbucket repository to Vercel
- Push changes to your main branch
- Vercel automatically deploys

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Deploy
vercel deploy --prod
```

### 3. Verify Analytics is Working

After deployment:
1. Visit your deployed site
2. Open browser DevTools (F12)
3. Go to the **Network** tab
4. Navigate between scenes
5. Look for requests to `/_vercel/insights/view`

If you see these requests, analytics is working! 🎉

## 📈 Viewing Your Analytics Data

### Access the Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Analytics** tab

### Available Metrics

Vercel Web Analytics tracks:

- **Page Views** - Total views across all scenes
- **Visitors** - Unique visitors to your presentation
- **Top Pages** - Most visited scenes/routes
- **Referrers** - Where your traffic comes from
- **Locations** - Geographic distribution of visitors
- **Devices** - Desktop vs mobile breakdown
- **Browsers** - Browser usage statistics

### Filtering Data

You can filter analytics by:
- Time range (24h, 7d, 30d, 90d, all time)
- Country/region
- Browser type
- Device type

## 🎯 Custom Events (Optional)

For advanced tracking of user interactions, you can add custom events. This is useful for tracking specific actions in your presentation.

### Example: Track Scene Navigation

```jsx
import { track } from '@vercel/analytics';

function navigateToScene(sceneId) {
  // Your navigation logic
  setCurrentScene(sceneId);
  
  // Track the scene view
  track('scene_viewed', {
    scene_id: sceneId,
    scene_title: scenes[sceneId].title
  });
}
```

### Example: Track Settings Changes

```jsx
import { track } from '@vercel/analytics';

function toggleTheme() {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  
  // Track theme change
  track('theme_changed', { theme: newTheme });
}
```

> **Note:** Custom events require a Pro or Enterprise Vercel plan.

## 🔒 Privacy & Compliance

Vercel Web Analytics is designed with privacy in mind:

✅ **No cookies** - Doesn't use cookies or local storage for tracking  
✅ **No personal data** - Doesn't collect personally identifiable information  
✅ **GDPR compliant** - Respects EU privacy regulations  
✅ **CCPA compliant** - Follows California privacy laws  
✅ **No consent banner needed** - Privacy-friendly by default  

### How It Works

- Uses a hash of IP address + User Agent (salted and rotated daily)
- No cross-site tracking
- Data is aggregated, not individual user tracking
- Visitors cannot be identified or followed across sites

## 🛠️ Development vs Production

The Analytics component automatically detects the environment:

- **Development** (`npm run dev`) - Analytics is disabled to avoid polluting production data
- **Production** (deployed on Vercel) - Analytics is active and collecting data

You can override this behavior if needed:

```jsx
<Analytics mode="production" />  // Always track
<Analytics mode="development" /> // Never track
<Analytics debug={true} />       // Show console logs
```

## 📱 Route Tracking

The `@vercel/analytics/react` package automatically tracks route changes in your React application. Since this is a single-page application with scene-based navigation, each scene transition is tracked as a page view.

## 🔧 Troubleshooting

### Analytics Not Showing Data

**Check these items:**

1. ✅ Is Web Analytics enabled in your Vercel project settings?
2. ✅ Is your app deployed to Vercel (not just running locally)?
3. ✅ Have you waited a few minutes for data to appear?
4. ✅ Are you seeing `/_vercel/insights/view` requests in Network tab?
5. ✅ Is your domain correctly configured in Vercel?

### Analytics Working Locally (Optional)

By default, analytics only works in production. To test locally:

```jsx
<Analytics mode="development" debug={true} />
```

This will log analytics events to the console during development.

### Data Delays

- **Real-time data**: Appears within 1-2 minutes
- **Aggregated data**: May take up to 1 hour to fully process
- **Historical data**: Available after 24 hours

## 📚 Additional Resources

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Analytics Package API](https://vercel.com/docs/analytics/package)
- [Custom Events Guide](https://vercel.com/docs/analytics/custom-events)
- [Privacy Policy](https://vercel.com/docs/analytics/privacy-policy)
- [Pricing & Limits](https://vercel.com/docs/analytics/limits-and-pricing)

## 💡 Best Practices

1. **Keep it simple** - The default implementation is often sufficient
2. **Monitor regularly** - Check analytics weekly to understand usage patterns
3. **Use custom events wisely** - Only track meaningful interactions
4. **Respect privacy** - Never try to circumvent the privacy features
5. **Test after deployment** - Always verify analytics is working after going live

---

## Summary

✅ **Already Integrated** - This project has Vercel Analytics ready to use  
✅ **Privacy-First** - No cookies, GDPR compliant, no consent needed  
✅ **Zero Config** - Works automatically when deployed to Vercel  
✅ **React Optimized** - Uses React-specific package for route tracking  

Simply deploy to Vercel, enable Analytics in your project settings, and start collecting insights! 🎉
