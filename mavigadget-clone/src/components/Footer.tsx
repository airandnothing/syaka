'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  const footerSections = [
    {
      title: 'Style Your Home',
      links: [
        { label: 'Home Decors', href: '/categories/home-decors' },
        { label: 'Home Gadgets', href: '/categories/home-gadgets' },
        { label: 'Ornaments', href: '/categories/ornaments' },
        { label: 'Kitchen Storage', href: '/categories/kitchen-storage' },
        { label: 'Kitchen Organizers', href: '/categories/kitchen-organizers' },
        { label: 'Kitchen Gadgets', href: '/categories/kitchen-gadgets' },
        { label: 'Bed & Bath', href: '/categories/bed-bath' },
        { label: 'Bath Organizers', href: '/categories/bath-organizers' },
        { label: 'Winter Must Haves!', href: '/categories/winter-must-haves' },
        { label: 'Summer Must Haves', href: '/categories/summer-must-haves' },
        { label: 'Halloween', href: '/categories/halloween' }
      ]
    },
    {
      title: 'Gifts & Goodies',
      links: [
        { label: 'Gift Ideas', href: '/categories/gift-ideas' },
        { label: 'Gift for Him', href: '/categories/gift-for-him' },
        { label: 'Gift for Her', href: '/categories/gift-for-her' },
        { label: 'Pet Toys', href: '/categories/pet-toys' },
        { label: 'Pet Beds', href: '/categories/pet-beds' },
        { label: 'Pet Accessories', href: '/categories/pet-accessories' },
        { label: 'Fun Parent', href: '/categories/fun-parent' },
        { label: 'Toys & Gifts for Kids', href: '/categories/toys-gifts-kids' },
        { label: 'Educational Toys & Gifts', href: '/categories/educational-toys-gifts' }
      ]
    },
    {
      title: 'On the Go',
      links: [
        { label: 'Car Accessories', href: '/categories/car-accessories' },
        { label: 'Car Gadgets', href: '/categories/car-gadgets' },
        { label: 'Bike Accessories', href: '/categories/bike-accessories' },
        { label: 'Camping Finds', href: '/categories/camping-finds' },
        { label: 'Digital Nomad', href: '/categories/digital-nomad' },
        { label: 'Travel Bags & Luggages', href: '/categories/travel-bags-luggages' },
        { label: 'Bags & Backpacks', href: '/categories/bags-backpacks' },
        { label: 'Casual Unique Bags', href: '/categories/casual-unique-bags' }
      ]
    },
    {
      title: 'Outdoor Fun',
      links: [
        { label: 'Outdoor Tools', href: '/categories/outdoor-tools' },
        { label: 'Outdoor Stuff', href: '/categories/outdoor-stuff' },
        { label: 'Outdoor Gadget', href: '/categories/outdoor-gadget' },
        { label: 'Anti Stress Toys & Fun Stuff', href: '/categories/anti-stress-toys' },
        { label: 'Fun Toys & Games', href: '/categories/fun-toys-games' },
        { label: 'Gaming Tech', href: '/categories/gaming-tech' },
        { label: 'Fitness Finds', href: '/categories/fitness-finds' },
        { label: 'Home Fitness', href: '/categories/home-fitness' },
        { label: 'Massage Products', href: '/categories/massage-products' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t">
      {/* Newsletter section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DON'T MISS OUT</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to get exclusive deals sent directly to your inbox. Sign up now and get up 10% off.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-gray-800 hover:bg-gray-900">
              SUBSCRIBE
            </Button>
          </form>
        </div>
      </section>

      {/* Footer links */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Log in</Button>
              <Badge variant="outline">$ USD - EN</Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>© 2025 Mavigadget</span>
              <span>Copyright 2025 ©, All rights reserved.</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/search" className="text-sm text-gray-600 hover:text-gray-900">
                Search
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Your privacy choices
              </Link>
            </div>
          </div>

          {/* Payment methods */}
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {['American Express', 'Apple Pay', 'Diners Club', 'Discover', 'Google Pay', 'Mastercard', 'PayPal', 'Shop Pay', 'Venmo', 'Visa'].map((method) => (
              <Badge key={method} variant="outline" className="text-xs">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
