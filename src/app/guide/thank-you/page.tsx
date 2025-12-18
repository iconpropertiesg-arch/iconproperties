import { Metadata } from 'next';
import { Download, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You - Your Guide is Ready - ICON PROPERTIES',
  description: 'Download your free Mallorca Luxury Property Buyer Guide',
};

export default function ThankYouPage() {
  // In a real implementation, you would get the download link from the API or query params
  const downloadLink = '/downloads/mallorca-luxury-property-buyer-guide.pdf'; // Placeholder

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your guide is ready to download.
          </p>

          {/* Download Button */}
          <a
            href={downloadLink}
            download
            className="group inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 mb-6"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Your Guide (PDF)
          </a>

          {/* Additional Info */}
          <div className="text-gray-400 text-sm space-y-2">
            <p>
              We've also sent a copy to your email address.
            </p>
            <p>
              Check your inbox (and spam folder) for the download link.
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}





