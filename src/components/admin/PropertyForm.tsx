'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface PropertyFormProps {
  propertyId?: string;
}

interface TranslationData {
  title: string;
  description: string;
  subtitle?: string;
  features: string[];
}

export default function PropertyForm({ propertyId }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!propertyId);
  const [locales] = useState(['en', 'de', 'es']);
  
  // Basic property data
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('available');
  const [type, setType] = useState('residential');
  const [purpose, setPurpose] = useState('buy');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<string[]>(['']);
  const [uploading, setUploading] = useState<Record<number, boolean>>({});
  const multipleFileInputRef = useRef<HTMLInputElement>(null);

  // Translations
  const [translations, setTranslations] = useState<Record<string, TranslationData>>({
    en: { title: '', description: '', subtitle: '', features: [''] },
    de: { title: '', description: '', subtitle: '', features: [''] },
    es: { title: '', description: '', subtitle: '', features: [''] },
  });

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${propertyId}?allTranslations=true`);
      if (response.ok) {
        const data = await response.json();
        const property = data.property;

        // Set basic data
        setSlug(property.slug || '');
        setStatus(property.status || 'available');
        setType(property.type || 'residential');
        setPurpose(property.purpose || 'buy');
        setYear(property.year?.toString() || '');
        setPrice(property.price?.toString() || '');
        setBedrooms(property.bedrooms?.toString() || '');
        setBathrooms(property.bathrooms?.toString() || '');
        setArea(property.area?.toString() || '');
        setLocation(property.location || '');
        setCoordinates(property.coordinates || '');
        setFeatured(property.featured || false);
        setImages(property.images && property.images.length > 0 ? property.images : ['']);

        // Set translations
        const translationsData: Record<string, TranslationData> = {
          en: { title: '', description: '', subtitle: '', features: [''] },
          de: { title: '', description: '', subtitle: '', features: [''] },
          es: { title: '', description: '', subtitle: '', features: [''] },
        };

        property.translations?.forEach((t: any) => {
          translationsData[t.locale] = {
            title: t.title || '',
            description: t.description || '',
            subtitle: t.subtitle || '',
            features: t.features && t.features.length > 0 ? t.features : [''],
          };
        });

        setTranslations(translationsData);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        slug,
        status,
        type,
        purpose,
        year: year || null,
        price: parseFloat(price),
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: area ? parseFloat(area) : null,
        location,
        coordinates: coordinates || null,
        featured,
        images: images.filter((img) => img.trim() !== ''),
        translations,
      };

      const url = propertyId ? `/api/properties/${propertyId}` : '/api/properties';
      const method = propertyId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        router.push('/admin/properties');
        router.refresh();
      } else {
        const data = await response.json();
        const errorMessage = data.error || data.message || 'Failed to save property';
        // If error is an object, stringify it for display
        const displayError = typeof errorMessage === 'object' 
          ? JSON.stringify(errorMessage, null, 2) 
          : errorMessage;
        alert(`Error: ${displayError}`);
      }
    } catch (error: any) {
      console.error('Error saving property:', error);
      const errorMessage = error?.message || 'An error occurred while saving';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const updateTranslation = (locale: string, field: keyof TranslationData, value: string | string[]) => {
    setTranslations({
      ...translations,
      [locale]: {
        ...translations[locale],
        [field]: value,
      },
    });
  };

  const addFeature = (locale: string) => {
    const currentFeatures = translations[locale].features || [''];
    updateTranslation(locale, 'features', [...currentFeatures, '']);
  };

  const removeFeature = (locale: string, index: number) => {
    const currentFeatures = translations[locale].features || [''];
    updateTranslation(locale, 'features', currentFeatures.filter((_, i) => i !== index));
  };

  const updateFeature = (locale: string, index: number, value: string) => {
    const currentFeatures = [...(translations[locale].features || [''])];
    currentFeatures[index] = value;
    updateTranslation(locale, 'features', currentFeatures);
  };

  // Generate slug from title
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Auto-generate slug from English title if slug is empty
  useEffect(() => {
    if (!propertyId && !slug && translations.en.title) {
      const autoSlug = generateSlug(translations.en.title);
      if (autoSlug) {
        setSlug(autoSlug);
      }
    }
  }, [translations.en.title, propertyId, slug]);

  // Validate and sanitize slug
  const handleSlugChange = (value: string) => {
    // Remove any URLs or full paths
    let sanitized = value.trim();
    
    // If it looks like a URL, extract just the last part
    if (sanitized.includes('://') || sanitized.includes('localhost') || sanitized.startsWith('http')) {
      // Extract the last segment after the last slash
      const parts = sanitized.split('/').filter((p: string) => p);
      sanitized = parts[parts.length - 1] || '';
    }
    
    // Remove any remaining URL-like patterns
    sanitized = sanitized.replace(/^https?:\/\//, '').replace(/^www\./, '');
    
    // Generate a clean slug
    sanitized = generateSlug(sanitized);
    
    setSlug(sanitized);
  };

  const addImage = () => {
    setImages([...images, '']);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setUploading((prev) => {
      const newUploading = { ...prev };
      delete newUploading[index];
      return newUploading;
    });
  };

  const updateImage = (index: number, value: string) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      // Ensure the array is long enough
      while (newImages.length <= index) {
        newImages.push('');
      }
      newImages[index] = value;
      return newImages;
    });
  };

  const handleFileUpload = async (index: number, file: File) => {
    setUploading((prev) => ({ ...prev, [index]: true }));

    try {
      // Validate file size (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        alert('File size too large. Maximum size is 50MB.');
        setUploading((prev) => ({ ...prev, [index]: false }));
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Only images are allowed.');
        setUploading((prev) => ({ ...prev, [index]: false }));
        return;
      }

      const vercelLimit = 4.5 * 1024 * 1024; // 4.5MB
      const isLargeFile = file.size > vercelLimit;

      // For files > 4.5MB, use direct client-side upload to Supabase (bypasses Vercel limit)
      // For smaller files, use server-side upload (more secure, uses service role key)
      if (isLargeFile) {
        // Direct client-side upload for large files
        await uploadDirectToSupabase(index, file);
      } else {
        // Server-side upload for smaller files
        await uploadViaServer(index, file);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error.message || 'An error occurred while uploading the image');
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const uploadDirectToSupabase = async (index: number, file: File) => {
    try {
      // Step 1: Get authenticated upload path from API
      const initResponse = await fetch('/api/upload/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      const initData = await initResponse.json();

      if (!initResponse.ok || !initData.path) {
        throw new Error(initData.error || 'Failed to initialize upload');
      }

      // Step 2: Upload directly to Supabase Storage (bypasses Vercel 4.5MB limit)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('property_images')
        .upload(initData.path, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        throw new Error(uploadError.message || 'Failed to upload image to storage. Make sure RLS policies are configured.');
      }

      // Step 3: Get public URL
      const { data: urlData } = supabase.storage
        .from('property_images')
        .getPublicUrl(initData.path);

      if (urlData?.publicUrl) {
        updateImage(index, urlData.publicUrl);
      } else {
        throw new Error('Failed to get image URL');
      }
    } catch (error: any) {
      console.error('Direct upload error:', error);
      throw error;
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const uploadViaServer = async (index: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/init', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        updateImage(index, data.url);
      } else {
        throw new Error(data.error || 'Failed to upload image');
      }
    } catch (error: any) {
      console.error('Server upload error:', error);
      throw error;
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(index, file);
    }
  };

  const handleMultipleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate all files first
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    
    const invalidFiles: string[] = [];
    files.forEach((file) => {
      if (file.size > maxSize) {
        invalidFiles.push(`${file.name} (too large)`);
      }
      if (!allowedTypes.includes(file.type)) {
        invalidFiles.push(`${file.name} (invalid type)`);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`Some files are invalid:\n${invalidFiles.join('\n')}`);
      e.target.value = '';
      return;
    }

    // Capture current length before state updates
    const currentLength = images.length;
    
    // Add empty slots for new images
    const newImages = [...images];
    files.forEach(() => {
      newImages.push('');
    });
    setImages(newImages);

    // Set uploading state for all new images
    const newUploading: Record<number, boolean> = { ...uploading };
    files.forEach((_, fileIndex) => {
      newUploading[currentLength + fileIndex] = true;
    });
    setUploading(newUploading);

    // Upload all files in parallel
    const uploadPromises = files.map(async (file, fileIndex) => {
      const imageIndex = currentLength + fileIndex;
      
      try {
        const vercelLimit = 4.5 * 1024 * 1024; // 4.5MB
        const isLargeFile = file.size > vercelLimit;

        if (isLargeFile) {
          await uploadDirectToSupabase(imageIndex, file);
        } else {
          await uploadViaServer(imageIndex, file);
        }
      } catch (error: any) {
        console.error(`Error uploading ${file.name}:`, error);
        alert(`Failed to upload ${file.name}: ${error.message || 'Unknown error'}`);
      } finally {
        setUploading((prev) => {
          const updated = { ...prev };
          delete updated[imageIndex];
          return updated;
        });
      }
    });

    await Promise.allSettled(uploadPromises);

    // Reset the input to allow selecting the same files again if needed
    if (multipleFileInputRef.current) {
      multipleFileInputRef.current.value = '';
    }
  };

  const localeNames: Record<string, string> = {
    en: 'English',
    de: 'German (Deutsch)',
    es: 'Spanish (Español)',
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-xl">Loading property...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          {propertyId ? 'Edit Property' : 'Add New Property'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Slug (URL) <span className="text-red-400">*</span>
                <span className="text-xs text-gray-500 ml-2">(Auto-generated from title if empty)</span>
              </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder="luxury-villa-son-vida"
                  pattern="[-a-z0-9]+"
                  title="Slug must contain only lowercase letters, numbers, and hyphens"
                />
              {slug && (
                <p className="mt-1 text-xs text-gray-400">
                  Preview: <span className="text-gray-400">/en/properties/{slug}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status <span className="text-red-400">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="leased">Leased</option>
                <option value="under-management">Under Management</option>
                <option value="in-development">In Development</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type <span className="text-red-400">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="hospitality">Hospitality</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rent or Buy <span className="text-red-400">*</span>
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price (€) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="8500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bathrooms</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Area (m²)</label>
              <input
                type="number"
                step="0.01"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Son Vida, Mallorca"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Coordinates (JSON)
              </label>
              <input
                type="text"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder='{"lat": 39.5696, "lng": 2.6502}'
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 text-gray-600 bg-gray-900 border-gray-700 rounded focus:ring-gray-600"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                Featured Property
              </label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Images</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => multipleFileInputRef.current?.click()}
                disabled={Object.values(uploading).some((isUploading) => isUploading)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg cursor-pointer transition-colors text-sm font-medium"
              >
                <Upload size={16} />
                <span>Select Multiple Images</span>
              </button>
              <input
                ref={multipleFileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                multiple
                onChange={handleMultipleFileSelect}
                className="hidden"
                disabled={Object.values(uploading).some((isUploading) => isUploading)}
                title="Select multiple images"
              />
              <button
                type="button"
                onClick={addImage}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300 text-sm"
              >
                <Plus size={16} />
                Add Single Image
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={index} className="space-y-3">
                <div className="flex gap-4 items-start">
                  {/* File Upload Input */}
                  <div className="flex-1">
                    <label className="block mb-2">
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                        <Upload size={20} className="text-gray-400" />
                        <span className="text-gray-300">
                          {uploading[index] ? 'Uploading...' : image ? 'Change Image' : 'Upload Image'}
                        </span>
                        {uploading[index] && (
                          <Loader2 className="ml-auto animate-spin text-gray-400" size={18} />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e)}
                        className="hidden"
                        disabled={uploading[index]}
                      />
                    </label>
                  </div>

                  {/* Remove Button */}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-3 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded transition-colors"
                      disabled={uploading[index]}
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                {/* Image Preview */}
                {image && image.trim() !== '' && !uploading[index] && (
                  <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    {image.startsWith('http') || image.startsWith('/') || image.startsWith('data:') ? (
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <ImageIcon size={48} />
                        <span className="ml-2 text-sm">Invalid image URL</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Translations */}
        {locales.map((locale) => (
          <div key={locale} className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">
              {localeNames[locale]} Content
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={translations[locale].title}
                  onChange={(e) => updateTranslation(locale, 'title', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder="Luxury Villa in Son Vida"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={translations[locale].subtitle || ''}
                  onChange={(e) => updateTranslation(locale, 'subtitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder="Exclusive 6-bedroom villa with panoramic views"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={translations[locale].description}
                  onChange={(e) => updateTranslation(locale, 'description', e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder="Detailed property description..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">Features</label>
                  <button
                    type="button"
                    onClick={() => addFeature(locale)}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-300 text-sm"
                  >
                    <Plus size={16} />
                    Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {translations[locale].features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(locale, index, e.target.value)}
                        placeholder="Feature description"
                        className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      />
                      {translations[locale].features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(locale, index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded transition-colors"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Save Property</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

