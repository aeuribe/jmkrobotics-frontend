import React from 'react';
import TermsAndConditions from '../features/Terms&Conditions/TermsAndConditions';
import Head from 'next/head';

const TermsPage = () => {
  return (
    <div>
      <Head>
        <title>Terms and Conditions – JMK Robotics</title>
        <meta
          name="description"
          content="Read the Terms and Conditions of JMK Robotics to understand the rules and guidelines for using our website and services."
        />
      </Head>
      <TermsAndConditions />
    </div>
  );
};

export default TermsPage;
