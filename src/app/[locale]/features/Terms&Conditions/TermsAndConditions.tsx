"use client";

import React from "react";
import Link from "next/link";
import LegalPageLayout from "./LegalPageLayout";

const TermsAndConditions: React.FC = () => {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Please read these legal terms carefully before using our services."
      lastUpdated="September 08, 2025"
      icon="terms"
      onBack={() => window.location.href = "/"}
    >
      <div className="prose prose-invert max-w-none">
        
        {/* Agreement Header */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            Agreement to Our Legal Terms
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              We are <strong className="text-white">Services JMK LLC</strong>, doing business as <strong className="text-white">JMK Robotics</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), a company registered in Florida, United States at <strong className="text-white">15264 SW 119TH TERRACE, Miami, FL 33196</strong>.
            </p>
            <p>
              We operate the website <Link href="http://www.jmkrobotics.com" className="text-[#ff002f] hover:text-white transition-colors">http://www.jmkrobotics.com</Link> (the &#34;Site&#34;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
            </p>
            <p>
              You can contact us by email at <Link href="mailto:info@servicesjmk.com" className="text-[#ff002f] hover:text-white transition-colors">info@servicesjmk.com</Link> or by mail to <strong className="text-white">15264 SW 119TH TERRACE, Miami, FL 33196, United States</strong>.
            </p>
            <div className="bg-[#ff002f]/10 border border-[#ff002f]/20 p-4 sm:p-6 mt-6">
              <p className="text-[#A8B2C1] text-sm sm:text-base">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&#34;you&#34;), and Services JMK LLC, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong className="text-[#ff002f]">IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
              </p>
            </div>
            <p>
              We may update these Terms and Conditions and Privacy Policy from time to time. All updates will be posted on this website, and the date of the latest revision will be clearly displayed at the top of the page. Visitors are encouraged to review the terms periodically to stay informed about any changes. Continued use of the website constitutes acceptance of the updated terms.
            </p>
            <p>
              The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
            </p>
            <p className="text-sm text-[#6E7784]">
              We recommend that you print a copy of these Legal Terms for your records.
            </p>
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
              <div>1. OUR SERVICES</div>
              <div>2. INTELLECTUAL PROPERTY RIGHTS</div>
              <div>3. USER REPRESENTATIONS</div>
              <div>4. PROHIBITED ACTIVITIES</div>
              <div>5. USER GENERATED CONTRIBUTIONS</div>
              <div>6. CONTRIBUTION LICENSE</div>
              <div>7. SERVICES MANAGEMENT</div>
              <div>8. PRIVACY POLICY</div>
              <div>9. TERM AND TERMINATION</div>
              <div>10. MODIFICATIONS AND INTERRUPTIONS</div>
            </div>
            <div className="space-y-2">
              <div>11. GOVERNING LAW</div>
              <div>12. DISPUTE RESOLUTION</div>
              <div>13. CORRECTIONS</div>
              <div>14. DISCLAIMER</div>
              <div>15. LIMITATIONS OF LIABILITY</div>
              <div>16. INDEMNIFICATION</div>
              <div>17. USER DATA</div>
              <div>18. ELECTRONIC COMMUNICATIONS</div>
              <div>19. MISCELLANEOUS</div>
              <div>20. CONTACT US</div>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            1. Our Services
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            2. Intellectual Property Rights
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
              <h3 className="text-[#ff002f] font-semibold mb-3">Our intellectual property</h3>
              <p>
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
              </p>
            </div>
            <p>
              Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties around the world.
            </p>
            <p>
              The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
            </p>
            
            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6 mt-6">
              <h3 className="text-[#ff002f] font-semibold mb-3">Your use of our Services</h3>
              <p className="mb-4">
                Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>access the Services; and</li>
                <li>download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.</li>
              </ul>
            </div>

            <p>
              Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>
            
            <p>
              If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <Link href="mailto:info@servicesjmk.com" className="text-[#ff002f] hover:text-white transition-colors">info@servicesjmk.com</Link>.
            </p>

            <div className="bg-[#ff002f]/10 border border-[#ff002f]/20 p-4 sm:p-6 mt-6">
              <h3 className="text-[#ff002f] font-semibold mb-2">Your submissions</h3>
              <p className="text-sm sm:text-base">
                By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&#34;Submissions&#34;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            3. User Representations
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>By using the Services, you represent and warrant that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>(1) you have the legal capacity and you agree to comply with these Legal Terms;</li>
              <li>(2) you are not a minor in the jurisdiction in which you reside;</li>
              <li>(3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
              <li>(4) you will not use the Services for any illegal or unauthorized purpose; and</li>
              <li>(5) your use of the Services will not violate any applicable law or regulation.</li>
            </ul>
            <p>
              If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            4. Prohibited Activities
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p>As a user of the Services, you agree not to:</p>
            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                <li>Engage in unauthorized framing of or linking to the Services.</li>
                <li>Upload or transmit viruses, Trojan horses, or other material that interferes with any party&#39;s uninterrupted use and enjoyment of the Services.</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages.</li>
                <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                <li>Copy or adapt the Services&apos; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            5. User Generated Contributions
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &quot;Contributions&quot;).
            </p>
            <p>When you create or make available any Contributions, you thereby represent and warrant that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base">
              <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights of any third party.</li>
              <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions.</li>
              <li>Your Contributions are not false, inaccurate, or misleading.</li>
              <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
              <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            6. Contribution License
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              You and Services agree that we may access, store, process, and use any information and personal data that you provide and your choices (including settings).
            </p>
            <p>
              By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
            </p>
            <p>
              We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            7. Services Management
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>We reserve the right, but not the obligation, to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>(1) monitor the Services for violations of these Legal Terms;</li>
              <li>(2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms;</li>
              <li>(3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your Contributions;</li>
              <li>(4) remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and</li>
              <li>(5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</li>
            </ul>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            8. Privacy Policy
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States.
            </p>
            <p>
              If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            9. Term and Termination
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <div className="bg-[#ff002f]/10 border border-[#ff002f]/20 p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                <strong className="text-[#ff002f]">WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS.</strong>
              </p>
            </div>
            <p>
              If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            10. Modifications and Interruptions
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services.
            </p>
            <p>
              We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors.
            </p>
          </div>
        </section>

        {/* Section 11 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            11. Governing Law
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of <strong className="text-white">the State of Florida</strong> applicable to agreements made and to be entirely performed within the State of Florida, without regard to its conflict of law principles.
            </p>
          </div>
        </section>

        {/* Section 12 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            12. Dispute Resolution
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
              <h3 className="text-[#ff002f] font-semibold mb-3">Informal Negotiations</h3>
              <p>
                To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
              </p>
            </div>
            
            <div className="bg-[#0A1220]/30 border border-[#2E3C51] p-4 sm:p-6">
              <h3 className="text-[#ff002f] font-semibold mb-3">Binding Arbitration</h3>
              <p className="mb-4">
                If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute will be finally and exclusively resolved by binding arbitration. <strong className="text-[#ff002f]">YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL.</strong>
              </p>
              <p>
                The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association (&quot;AAA&quot;). Except as otherwise provided herein, the arbitration will take place in <strong className="text-white">Miami-Dade County, Florida</strong>.
              </p>
            </div>
            
            <p>
              In no event shall any Dispute brought by either Party related in any way to the Services be commenced more than <strong className="text-white">one (1) years</strong> after the cause of action arose.
            </p>
          </div>
        </section>

        {/* Sections 13-19 (Condensed for space) */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            13. Corrections
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
            </p>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            14. Disclaimer
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <div className="bg-[#ff002f]/10 border border-[#ff002f]/20 p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                <strong className="text-[#ff002f]">THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES.</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            15. Limitations of Liability
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <div className="bg-[#ff002f]/10 border border-[#ff002f]/20 p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                <strong className="text-[#ff002f]">IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            16. Indemnification
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand made by any third party due to or arising out of your use of the Services or breach of these Legal Terms.
            </p>
          </div>
        </section>

        {/* Section 20 - Contact */}
        <section className="mb-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 
                        border-b border-[#2E3C51] pb-3">
            20. Contact Us
          </h2>
          <div className="space-y-4 text-[#A8B2C1] leading-relaxed">
            <p>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>
            <div className="bg-[#0A1220]/50 border border-[#2E3C51] p-4 sm:p-6">
              <div className="space-y-2">
                <p className="text-white font-semibold">Services JMK LLC</p>
                <p>15264 SW 119TH TERRACE</p>
                <p>Miami, FL 33196</p>
                <p>United States</p>
                <p><Link href="mailto:info@servicesjmk.com" className="text-[#ff002f] hover:text-white transition-colors">info@servicesjmk.com</Link></p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </LegalPageLayout>
  );
};

export default TermsAndConditions;