# Lion Capital Real Estate - Luxury Property Website

A comprehensive multilingual real estate website built with Next.js 14, featuring luxury property listings, advanced search functionality, and professional presentation for the Mallorca market.

## 🌟 Features

### Core Functionality
- **Multilingual Support**: English, German, and Spanish with next-intl
- **Advanced Property Search**: Filters, price slider, location autocomplete
- **Property Listings**: Grid and list views with detailed property cards
- **Property Detail Pages**: Gallery, features, location, agent contact
- **Contact Forms**: Property inquiries, valuations, general contact
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Pages
- **Home**: Hero video, search bar, featured properties, company info
- **Properties**: Listing index with advanced filters and search
- **Property Detail**: Individual property pages with full details
- **About**: Company story, team, values, achievements
- **Contact**: Contact form, office information, map
- **Sell**: Valuation form, selling process, testimonials

### Design Features
- **Liquid Glass Effects**: Modern glassmorphism UI elements
- **Apple-inspired Animations**: Smooth transitions and hover effects
- **Professional Photography**: Property gallery with lightbox
- **Mobile Responsive**: Optimized for all device sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd property_icon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── properties/    # Properties listing & detail
│   │   └── sell/          # Sell/valuation page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── home/             # Home page components
│   ├── properties/       # Property listing components
│   ├── property/         # Property detail components
│   ├── search/           # Search & filter components
│   ├── contact/          # Contact form components
│   ├── sell/             # Sell page components
│   └── layout/           # Header, footer, navigation
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── i18n.ts              # Internationalization config
messages/                 # Translation files
├── en.json              # English translations
├── de.json              # German translations
└── es.json              # Spanish translations
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - CTA buttons, links, accents
- **Secondary**: Gray tones for text and backgrounds
- **Success**: Green for confirmations
- **Warning**: Amber for alerts

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, hierarchical sizing
- **Body**: Regular weight, optimized line-height

### Components
- **Glass Effects**: Backdrop blur with transparency
- **Buttons**: Rounded, with hover animations
- **Cards**: Subtle shadows with hover elevation
- **Forms**: Clean inputs with focus states

## 🌍 Internationalization

The website supports three languages with full translation:

- **English** (`en`): Default language
- **German** (`de`): For German-speaking clients
- **Spanish** (`es`): For Spanish-speaking clients

### Adding Translations
1. Add new keys to `messages/en.json`
2. Translate to `messages/de.json` and `messages/es.json`
3. Use in components with `useTranslations()` hook

## 🔧 Configuration

### Environment Variables
```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

### Customization
- **Colors**: Update `tailwind.config.ts`
- **Fonts**: Modify font imports in `layout.tsx`
- **Content**: Edit translation files in `messages/`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚧 TODO - Future Enhancements

- [ ] Database integration (PostgreSQL/Supabase)
- [ ] CMS integration (Strapi/Sanity)
- [ ] Property management admin panel
- [ ] Email automation (Resend/Nodemailer)
- [ ] Payment processing (Stripe)
- [ ] Advanced analytics (Google Analytics 4)
- [ ] SEO optimization (sitemap, robots.txt)
- [ ] Performance optimization (image optimization)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For support and questions:
- Email: info@lioncapitala.com
- Phone: +34 123 456 789

---

Built with ❤️ for luxury real estate in Mallorca
