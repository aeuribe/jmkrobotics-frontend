"use client";
import React, { useState } from "react";
import { Send, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    subject: "General",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = useTranslations("contact");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const response = await fetch("http://localhost:8080/enviar-correo-robotics", { // URL local para pruebas
      const response = await fetch(
        "https://servicesjmk-backend.onrender.com/enviar-correo-robotics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            message: formData.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(t("form.error.text"));
      }

      setIsSubmitted(true);

      // Reset form después de mostrar confirmación
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          subject: "General",
          message: "",
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
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-[#ff002f]/30 rotate-45"></div>
      </div>

      {/* Hero Header Section */}
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-left text-white">
            <p className="font-jakarta text-md tracking-wide mb-4">
              {t("hero.preTitle1")}{" "}
              <span className="text-[#ff002f]">{t("hero.preTitle2")}</span>{" "}
              {t("hero.preTitle3")}
            </p>
            <h1 className="font-jakarta font-medium text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
              {t("hero.title1")}{" "}
              <span className="text-[#ff002f]">{t("hero.title2")}</span>{" "}
              {t("hero.title3")}
            </h1>
            <p className="text-lg text-gray-300 font-satoshi max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
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
                  <div className="w-16 h-16 bg-[#ff002f]/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[#ff002f]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-jakarta font-semibold text-[#020C18] mb-2">
                    {t("form.success.title")}
                  </h3>
                  <p className="text-gray-600 font-satoshi">
                    {t("form.success.text")}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-jakarta font-semibold text-[#020C18] mb-2">
                      {t("form.title")}
                    </h2>
                    <p className="text-gray-600 font-satoshi">
                      {t("form.subtitle")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-jakarta font-medium text-[#020C18] mb-2"
                      >
                        {t("form.fields.fullName.label")}
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#ff002f] focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder={t("form.fields.fullName.placeholder")}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-jakarta font-medium text-[#020C18] mb-2"
                      >
                        {t("form.fields.email.label")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#ff002f] focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder={t("form.fields.email.placeholder")}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-jakarta font-medium text-[#020C18] mb-2"
                      >
                        {t("form.fields.subject.label")}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#ff002f] focus:border-transparent transition-all duration-200"
                      >
                        <option value="General">
                          {t("form.fields.subject.options.general")}
                        </option>
                        <option value="Product Inquiry">
                          {t("form.fields.subject.options.product")}
                        </option>
                        <option value="Support">
                          {t("form.fields.subject.options.support")}
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-jakarta font-medium text-[#020C18] mb-2"
                      >
                        {t("form.fields.message.label")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-[#020C18] font-satoshi focus:ring-2 focus:ring-[#ff002f] focus:border-transparent transition-all duration-200 placeholder:text-gray-500 resize-none"
                        placeholder={t("form.fields.message.placeholder")}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        aria-label={
                          isSubmitting
                            ? t("form.submit.loading")
                            : t("form.submit.idle")
                        }
                        className="w-full bg-[#ff002f] text-white font-jakarta font-medium py-3 px-6 hover:bg-[#c91534] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {t("form.submit.loading")}
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            {t("form.submit.idle")}
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
                  <h3 className="text-2xl font-jakarta font-semibold mb-6">
                    {t("info.title")}
                  </h3>
                  <p className="text-gray-300 font-satoshi text-lg leading-relaxed">
                    {t("info.text")}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff002f] flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-jakarta font-medium mb-1">
                        {t("info.email.label")}
                      </h4>
                      <a
                        href="mailto:info@servicesjmk.com"
                        className="text-gray-300 hover:text-[#ff002f] font-satoshi transition-colors"
                      >
                        info@servicesjmk.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff002f] flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-jakarta font-medium mb-1">
                        {t("info.phone.label")}
                      </h4>
                      <div className="space-y-1">
                        <p className="text-gray-300 font-satoshi">
                          <span className="text-gray-200 text-sm">
                            WhatsApp:
                          </span>{" "}
                          <a
                            href="https://wa.me/17862587335?text=Hello%20JMK%20Robotics%2C%20I%20would%20like%20more%20information."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            +1 (786) 258-7335
                          </a>
                        </p>
                        <p className="text-gray-400 text-xs italic">
                          Support available in English and Spanish
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-700">
                  <h4 className="font-jakarta font-medium mb-4">
                    {t("info.responseTime.title")}
                  </h4>
                  <p className="text-gray-300 font-satoshi">
                    {t("info.responseTime.text")}
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
            {t("footer.text")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
