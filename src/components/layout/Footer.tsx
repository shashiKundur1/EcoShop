import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#28DF99] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ShoppingBag size={24} />
              <span className="font-bold text-xl font-['Fira_Sans']">EcoShop</span>
            </Link>
            <p className="mb-4 text-white/90 font-['Fira_Sans']">
              Your one-stop shop for all your needs. Quality products, fast delivery, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#F6F7D4] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#F6F7D4] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#F6F7D4] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#F6F7D4] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Fira_Sans']">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/?category=electronics" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/?category=clothing" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/?category=home" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/?category=beauty" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Beauty
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Fira_Sans']">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors font-['Fira_Sans']">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Fira_Sans']">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-white/90 font-['Fira_Sans']">
                  123 Commerce St, Business City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-white/90 font-['Fira_Sans']">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-white/90 font-['Fira_Sans']">
                  support@ecoshop.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/90 font-['Fira_Sans']">
            &copy; {new Date().getFullYear()} EcoShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;