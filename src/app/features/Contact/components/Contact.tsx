"use client"
import React, { useState } from 'react';
import { Send, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: 'General',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // const response = await fetch("http://localhost:8080/enviar-correo-robotics", { // URL local para pruebas
    const response = await fetch("https://servicesjmk-backend.onrender.com/enviar-correo-robotics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name: formData.fullName, // usamos fullName directamente                // dejamos vacío
        email: formData.email,
        message: formData.message
      })
    });

    if (!response.ok) {
      throw new Error("Hubo un error al enviar el mensaje");
    }

    setIsSubmitted(true);

    // Reset form después de mostrar confirmación
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        subject: "General",
        message: ""
      });
    }, 3000);

  } catch (error) {
    console.error(error);
    alert("No se pudo enviar el mensaje, inténtalo más tarde.");
  } finally {
    setIsSubmitting(false);
  }
};


  const isFormValid = formData.fullName && formData.email && formData.message;

  return (
    <div className="min-h-screen bg-[#020C18] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 border border-white/20 rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 border border-white/10 rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-[#E4173C]/30 rotate-45"></div>
      </div>

      {/* Hero Header Section */}
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-left text-white">
            <p className="font-jakarta text-md tracking-wide mb-4">
              Connect <span className="text-[#E4173C]">With</span> Us
            </p>
            <h1 className="font-jakarta font-medium text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
              Let&apos;s Build the{" "}
              <span className="text-[#E4173C]">Future</span> Together
            </h1>
            <p className="text-lg text-gray-300 font-satoshi max-w-2xl leading-relaxed">
              Ready to transform your operations with cutting-edge robotics? Our experts are here to help you find the perfect automation solution.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Contact Form - White Card Floating */}
            <div className="bg-white shadow-2xl p-8 lg:p-12 order-2 lg:order-1">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#E4173C]/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#E4173C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-jakarta font-semibold text-[#020C18] mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 font-satoshi">Thank you for contacting us. We&#39;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-jakarta font-semibold text-[#020C18] mb-2">Send us a message</h2>
                    <p className="text-gray-600 font-satoshi">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-jakarta font-medium text-[#020C18] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#E4173C] focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-jakarta font-medium text-[#020C18] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#E4173C] focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-jakarta font-medium text-[#020C18] mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#E4173C] focus:border-transparent transition-all duration-200"
                      >
                        <option value="General">General Inquiry</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Support">Technical Support</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-jakarta font-medium text-[#020C18] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#E4173C] focus:border-transparent transition-all duration-200 placeholder:text-gray-500 resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-[#E4173C] text-white font-jakarta font-medium py-3 px-6 hover:bg-[#c91534] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Contact Information */}
            <div className="text-white order-1 lg:order-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-jakarta font-semibold mb-6">Get in Touch</h3>
                  <p className="text-gray-300 font-satoshi text-lg leading-relaxed">
                    Whether you&apos;re looking to automate your manufacturing process, implement robotic solutions, 
                    or explore our cutting-edge technology, we&apos;re here to help you achieve your goals.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#E4173C] flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-jakarta font-medium mb-1">Email</h4>
                      <Link 
                        href="mailto:info@servicesjmk.com" 
                        className="text-gray-300 hover:text-[#E4173C] font-satoshi transition-colors"
                      >
                        info@servicesjmk.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#E4173C] flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-jakarta font-medium mb-1">Phone</h4>
                      <div className="space-y-1">
                        <p className="text-gray-300 font-satoshi">
                          <span className="text-gray-200 text-sm">English:</span> +1 (786) 806-1365
                        </p>
                        <p className="text-gray-300 font-satoshi">
                          <span className="text-gray-200 text-sm">Español:</span> +1 (786) 315-8321
                        </p>
                      </div>
                    </div>
                  </div>


                </div>

                <div className="pt-8 border-t border-gray-700">
                  <h4 className="font-jakarta font-medium mb-4">Response Time</h4>
                  <p className="text-gray-300 font-satoshi">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-700 py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 font-satoshi text-sm">
            © 2025 JMK Robotics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;