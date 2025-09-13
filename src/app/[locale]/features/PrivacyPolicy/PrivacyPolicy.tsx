"use client";   

import React from "react";
import {Link} from '@/i18n/navigation';
import LegalPageLayout from "@/app/[locale]/features/Terms&Conditions/LegalPageLayout";
import { Shield, Database, Eye, Users, Lock, Clock, FileText } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="This Privacy Notice describes how and why we might access, collect, store, use, and/or share your personal information when you use our services."
      lastUpdated="September 08, 2025"
      icon="privacy"
      onBack={() => window.location.href = "/"}
    >
      <div className="prose prose-invert max-w-none">
        
        {/* Introduction */}
        <section className="mb-8 sm:mb-12">
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              This Privacy Notice for <strong className="text-white">Services JMK LLC</strong> (&#34;we,&#34; &#34;us,&#34; or &#34;our&#34;), describes how and why we might access, collect, store, use, and/or share (&#34;process&#34;) your personal information when you use our services (&#34;Services&#34;), including when you:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Visit our website at <a href="http://www.jmkrobotics.com" className="text-[#E4173C] hover:text-white transition-colors">http://www.jmkrobotics.com</a> or any website of ours that links to this Privacy Notice</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            <div className="bg-[#E4173C]/10 border border-[#E4173C]/20 p-4 sm:p-6 mt-6">
              <h3 className="text-[#E4173C] font-semibold mb-2">Questions or concerns?</h3>
              <p className="text-[#A8B2C1] text-sm sm:text-base">
                Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:info@servicesjmk.com" className="text-[#E4173C] hover:text-white transition-colors">info@servicesjmk.com</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Summary of Key Points */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            Summary of Key Points
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
            </p>
            
            <div className="grid gap-4 mt-6">
              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">What personal information do we process?</h3>
                <p className="text-sm sm:text-base">
                  When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
                </p>
              </div>

              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">Do we process any sensitive personal information?</h3>
                <p className="text-sm sm:text-base">
                  <strong className="text-white">We do not process sensitive personal information.</strong>
                </p>
              </div>

              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">Do we collect any information from third parties?</h3>
                <p className="text-sm sm:text-base">
                  <strong className="text-white">We do not collect any information from third parties.</strong>
                </p>
              </div>

              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">How do we process your information?</h3>
                <p className="text-sm sm:text-base">
                  We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                </p>
              </div>

              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">How do we keep your information safe?</h3>
                <p className="text-sm sm:text-base">
                  We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
                </p>
              </div>

              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">How do you exercise your rights?</h3>
                <p className="text-sm sm:text-base">
                  The easiest way to exercise your rights is by visiting <a href="http://www.jmkrobotics.com/contact" className="text-[#E4173C] hover:text-white transition-colors">http://www.jmkrobotics.com/contact</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            Table of Contents
          </h2>
          <div className="grid sm:grid-cols-2 gap-2 text-[#A8B2C1] text-sm sm:text-base">
            <div className="space-y-2">
              <div>1. WHAT INFORMATION DO WE COLLECT?</div>
              <div>2. HOW DO WE PROCESS YOUR INFORMATION?</div>
              <div>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</div>
              <div>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</div>
              <div>5. HOW LONG DO WE KEEP YOUR INFORMATION?</div>
              <div>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</div>
            </div>
            <div className="space-y-2">
              <div>7. DO WE COLLECT INFORMATION FROM MINORS?</div>
              <div>8. WHAT ARE YOUR PRIVACY RIGHTS?</div>
              <div>9. CONTROLS FOR DO-NOT-TRACK FEATURES</div>
              <div>10. DO WE MAKE UPDATES TO THIS NOTICE?</div>
              <div>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</div>
              <div>12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</div>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3 flex items-center gap-3">
            <Database size={24} className="text-[#E4173C]" />
            1. What Information Do We Collect?
          </h2>
          <div className="space-y-6 text-[#A8B2C1] leading-relaxed">
            
            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
              <h3 className="text-[#E4173C] font-semibold mb-3 flex items-center gap-2">
                <Users size={16} />
                Personal information you disclose to us
              </h3>
              <p className="mb-4"><strong className="text-white">In Short:</strong> We collect personal information that you provide to us.</p>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              <div className="bg-[#E4173C]/10 border border-[#E4173C]/20 p-4 mt-4">
                <h4 className="text-white font-semibold mb-2">Personal Information Provided by You.</h4>
                <p className="mb-3">The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>names</li>
                  <li>email addresses</li>
                </ul>
              </div>
              <div className="bg-[#2E3C51]/20 border border-[#2E3C51] p-4 mt-4">
                <p><strong className="text-white">Sensitive Information.</strong> We do not process sensitive information.</p>
              </div>
              <p className="mt-4">
                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
              </p>
            </div>

            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
              <h3 className="text-[#E4173C] font-semibold mb-3 flex items-center gap-2">
                <Eye size={16} />
                Information automatically collected
              </h3>
              <p className="mb-4"><strong className="text-white">In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>
              <p className="mb-4">
                We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.
              </p>
              <p className="mb-4">
                This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
              </p>
              <p className="mb-4">
                Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: <a href="http://www.jmkrobotics.com/cookie-policy" className="text-[#E4173C] hover:text-white transition-colors">www.jmkrobotics/cookie-policy</a>.
              </p>
              
              <div className="bg-[#E4173C]/10 border border-[#E4173C]/20 p-4 mt-4">
                <h4 className="text-white font-semibold mb-2">The information we collect includes:</h4>
                <div>
                  <h5 className="text-[#E4173C] font-semibold mb-2">Location Data.</h5>
                  <p className="text-sm sm:text-base">
                    We collect location data such as information about your device&#39;s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3 flex items-center gap-3">
            <Shield size={24} className="text-[#E4173C]" />
            2. How Do We Process Your Information?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
            <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            3. When and With Whom Do We Share Your Personal Information?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</p>
            <p>We may need to share your personal information in the following situations:</p>
            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
              <h3 className="text-[#E4173C] font-semibold mb-2">Business Transfers.</h3>
              <p>
                We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            4. Do We Use Cookies and Other Tracking Technologies?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</p>
            <p>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
            </p>
            <p>
              We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
            </p>
            <p>
              Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice: <a href="http://www.jmkrobotics.com/cookie-policy" className="text-[#E4173C] hover:text-white transition-colors">www.jmkrobotics/cookie-policy</a>.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3 flex items-center gap-3">
            <Clock size={24} className="text-[#E4173C]" />
            5. How Long Do We Keep Your Information?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
            </p>
            <p>
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3 flex items-center gap-3">
            <Lock size={24} className="text-[#E4173C]" />
            6. How Do We Keep Your Information Safe?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</p>
            <div className="bg-[#E4173C]/10 border border-[#E4173C]/20 p-4 sm:p-6">
              <p>
                We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
              </p>
            </div>
            <p>
              Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            7. Do We Collect Information From Minors?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</p>
            <p>
              We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent&#39;s use of the Services.
            </p>
            <p>
              If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:info@servicesjmk.com" className="text-[#E4173C] hover:text-white transition-colors">info@servicesjmk.com</a>.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            8. What Are Your Privacy Rights?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
            
            <div className="space-y-4">
              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">Withdrawing your consent:</h3>
                <p>
                  If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section &#34;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&#34; below.
                </p>
                <p className="mt-2">
                  However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                </p>
              </div>

              <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
                <h3 className="text-[#E4173C] font-semibold mb-2">Cookies and similar technologies:</h3>
                <p>
                  Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. For further information, please see our Cookie Notice: <a href="http://www.jmkrobotics.com/cookie-policy" className="text-[#E4173C] hover:text-white transition-colors">www.jmkrobotics/cookie-policy</a>.
                </p>
              </div>
            </div>

            <p>
              If you have questions or comments about your privacy rights, you may email us at <a href="mailto:info@servicesjmk.com" className="text-[#E4173C] hover:text-white transition-colors">info@servicesjmk.com</a>.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            9. Controls for Do-Not-Track Features
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&#34;DNT&#34;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized.
            </p>
            <p>
              As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3 flex items-center gap-3">
            <FileText size={24} className="text-[#E4173C]" />
            10. Do We Make Updates to This Notice?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p><strong className="text-white">In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
            <p>
              We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &#34;Revised&#34; date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
            </p>
            <p>
              We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
            </p>
          </div>
        </section>

        {/* Section 11 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            11. How Can You Contact Us About This Notice?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              If you have questions or comments about this notice, you may email us at <a href="mailto:info@servicesjmk.com" className="text-[#E4173C] hover:text-white transition-colors">info@servicesjmk.com</a> or contact us by post at:
            </p>
            <div className="bg-[#0A1220]/50 border border-[#2E3C51] p-4 sm:p-6">
              <div className="space-y-2">
                <p className="text-white font-semibold">Services JMK LLC</p>
                <p>15264 SW 119TH TERRACE</p>
                <p>Miami, FL 33196</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12 */}
        <section className="mb-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            12. How Can You Review, Update, or Delete the Data We Collect From You?
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information.
            </p>
            <p>
              These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please visit: <a href="http://www.jmkrobotics.com/contact" className="text-[#E4173C] hover:text-white transition-colors">http://www.jmkrobotics.com/contact</a>.
            </p>
          </div>
        </section>

      </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;