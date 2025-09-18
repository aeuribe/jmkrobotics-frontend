import React from 'react';
import PrivacyPolicy from '../features/PrivacyPolicy/PrivacyPolicy';
import Head from 'next/head';

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Head>
        <title>Privacy Policy – JMK Robotics</title>
        <meta
          name="description"
          content="Read the Privacy Policy of JMK Robotics to understand how we handle and protect your information."
        />
      </Head>
      <PrivacyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;
