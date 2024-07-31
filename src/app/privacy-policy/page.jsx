import Footer from "@/components/shared/Footer";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import HeadingH1 from "@/components/shared/HeadingH1";
import Logo from "@/components/shared/Logo";
import React from "react";

const page = () => {
  return (
    <>
    <div className="dashboard_sidebar_bg px-40 pb-20">
      <div className="bg-white pb-20 pt-10 px-28 shadow-[0px_3px_16px_#00000029]">
        <Logo />
        <p
          className="text-custom-dark-blue-2 text-4xl font-bold uppercase  pb-2 pt-10 " >
          AMPLIFY RESEARCH PRIVACY POLICY
        </p>
        
        <p className="pb-10">Last updated: December 12, 2022</p>
        <HeadingBlue25px children="WHAT PERSONAL DATA DO WE RECEIVE?" />
        <p className="py-4 text-custom-dark-blue-2">
          Personal data is any information from or about an identified or
          identifiable person, including information that Zoom can associate
          with an individual person. We may collect, or process on behalf of our
          customers, the following categories of personal data when you use or
          interact with Zoom products and services:
        </p>
        <ul className="pl-16 space-y-5 list-disc list-inside custom-bullets pb-16 text-custom-dark-blue-2">
          <li>
            <span className="font-medium">Account Information:</span> Information associated with an account that
            licenses Zoom products and services, which may include administrator
            name, contact information, account ID, billing and transaction
            information, and account plan information.
          </li>

          <li>
          <span className="font-medium"><span className="font-medium">Profile and Participant Information:</span></span> Information associated with the
            Zoom profile of a user who uses Zoom products and services under a
            licensed account or that is provided by an unlicensed participant
            joining a meeting, which may include name, display name, picture,
            email address, phone number, job information, stated locale, user
            ID, or other information provided by the user and/or their account
            owner.{" "}
          </li>
          <li>
          <span className="font-medium">Contact Information:</span> Contact information added by accounts and/or
            their users to create contact lists on Zoom products and services,
            which may include contact information a user integrates from a
            third-party app, or provided by users to process referral
            invitations.{" "}
          </li>
          <li>
          <span className="font-medium">Settings: </span>Information associated with the preferences and settings
            on a Zoom account or user profile, which may include audio and video
            settings, recording file location, screen sharing settings, and
            other settings and configuration information.
          </li>
          <li>
          <span className="font-medium">Registration Information: </span> Information provided when registering for
            a Zoom meeting, webinar, Zoom Room, or recording, which may include
            name and contact information, responses to registration questions,
            and other registration information requested by the host.{" "}
          </li>
          <li>
          <span className="font-medium"> Device Information:</span> Information about the computers, phones, and
            other devices used when interacting with Zoom products and services,
            which may include information about the speakers, microphone,
            camera, OS version, hard disk ID, PC name, MAC address, IP address
            (which may be used to infer general location at a city or country
            level), device attributes (like operating system version and battery
            level), WiFi information, and other device information (like
            Bluetooth signals).
          </li>
          <li>
          <span className="font-medium">Content and Context from Meetings, Webinars, Messaging, and Other
          Collaborative Features:</span> Content generated in meetings, webinars, or
            messages that are hosted on Zoom products and services, which may
            include audio, video, in-meeting messages, in-meeting and
            out-of-meeting whiteboards, chat messaging content, transcriptions,
            transcript edits and recommendations, written feedback, responses to
            polls and Q&A, and files, as well as related context, such as
            invitation details, meeting or chat name, or meeting agenda. Content
            may contain your voice and image, depending on the account owner’s
            settings, what you choose to share, your settings, and what you do
            on Zoom products and services.
          </li>
          <li>
          <span className="font-medium">Usage Information Regarding Meetings, Webinars, Messaging, Collaborative Features and the Website:</span> Information about how people
            and their devices interact with Zoom products and services, such as:
            when participants join and leave a meeting; whether participants
            sent messages and who they message with; performance data; mouse
            movements, clicks, keystrokes or actions (such as mute/unmute or
            video on/off), edits to transcript text, where authorized by the
            account owner and other inputs that help Zoom to understand feature
            usage, improve product design, and suggest features; which
            third-party apps are added to a meeting or other product or service
            and what information and actions the app is authorized to access and
            perform; use of third-party apps and the Zoom App Marketplace;
            features used (such as screen sharing, emojis, or filters); and
            other usage information and metrics. This also includes information
            about when and how people visit and interact with Zoom’s websites,
            including what pages are accessed, interaction with website
            features, and whether or not the person signed up for a Zoom product
            or service.
          </li>
          <li>
          <span className="font-medium">Limited Information from Zoom Email and Calendar Services:</span> “Zoom
            Email” refers to Zoom’s native email service and emails sent from
            Zoom’s native email service. Zoom Email is designed to be end-to-end
            encrypted by Zoom by default for emails sent and received directly
            between active Zoom Email users. Support for end-to-end encryption
            requires Zoom Email users to have added a device to their Zoom Email
            account with the associated email address and to use a supported
            Zoom client. When an email is end-to-end encrypted, only the users,
            and, depending on their settings, account owners, or designated
            account administrators control the encryption key and therefore
            access to the email content, including body text, subject line,
            attachments and custom labels applied to messages by users in their
            inboxes. Emails sent to or received from non-Zoom Email users are
            encrypted after the email is sent or received from Zoom’s servers,
            if the Zoom Email user chooses to send them with encryption. In all
            cases, Zoom does have access to email metadata used for basic email
            delivery—specifically, email addresses in the from, to, cc, and bcc
            fields, time, mimeID, and the number and size of attachments. From
            use of Zoom’s native calendar service, Zoom receives information
            regarding meeting invitations, body text, sender and recipients, and
            other calendar information.
          </li>
          <li>
          <span className="font-medium">Content from Third-Party Integrations:</span> Users can access email and
            calendars from third-party services through their Zoom client, if
            they choose to integrate them. This information is not end-to-end
            encrypted by Zoom, but Zoom employees do not access this content,
            unless directed to, or required for legal, safety, or security
            reasons. If account owners and/or their users integrate their
            third-party emails with products and services offered or powered by
            Zoom, such as business analytics tools like Zoom IQ, Zoom may
            collect or process email information, including email content,
            headers and metadata, from such third-party services in order to
            provide services requested by the account and to improve the
            product.{" "}
          </li>
          <li>
          <span className="font-medium">Communications with Zoom:</span> Information about your communications with
            Zoom, including relating to support questions, your account, and
            other inquiries.
          </li>
          <li>
          <span className="font-medium">Information from Partners:</span> Zoom obtains information about account
            owners and their users from third-party companies, such as market
            data enrichment services, including information about an account
            owner’s company size or industry, contact information, or activity
            of certain enterprise domains. Zoom may also obtain information from
            third-party advertising partners who deliver ads displayed on Zoom
            products and services, such as whether you clicked on an ad they
            showed you.
          </li>
        </ul>
        <HeadingBlue25px children="HOW DO WE USE PERSONAL DATA?" />
        <div className="space-y-5 text-custom-dark-blue-2 pt-10">
          <p>
            Zoom employees do not access meeting, webinar, messaging or email
            content (specifically, audio, video, files, in-meeting whiteboards,
            messaging or email contents), or any content generated or shared as
            part of other collaborative features (such as out-of-meeting
            whiteboards), unless authorized by an account owner, or as required
            for legal, safety, or security reasons, as discussed below, and
            where technically feasible. Zoom uses personal data to conduct the
            following activities:{" "}
          </p>

          <p>
            <span className="font-medium">
              Provide Zoom Products and Services:
            </span>
            To provide products and services to account owners, their users, and
            those they invite to join meetings and webinars hosted on their
            accounts, including to customize Zoom products and services and
            recommendations for accounts or their users. Zoom also uses personal
            data, including contact information, to route invitations, messages,
            or Zoom Emails to recipients when users send or receive invitations,
            messages, or Zoom Emails using Zoom products and services. This may
            also include using personal data for customer support, which may
            include accessing audio, video, files, messages, and other content
            or context, at the direction of the account owner or their users. We
            also use personal data to manage our relationship and contracts with
            account owners and others, including billing, compliance with
            contractual obligations, facilitating payment to third-party
            developers in relation to purchases made through the Zoom App
            Marketplace, and related administration.
          </p>
          <p>
            <span className="font-medium">
              Advanced Voice and Video Features:
            </span>
            If you elect to use certain video features, such as filters,
            avatars, and gestures, information about your movements or the
            positioning of your face or hands may be processed on your device to
            apply the selected features. Such data does not leave your device,
            is not retained, and cannot be used to identify you. If certain
            features are enabled, such as transcription generation for
            recordings, Zoom may use technology that analyzes the meeting’s
            audio recording to distinguish one speaker from another in order to
            create an accurate transcript. The audio analysis is not retained
            after the transcript is generated. Product Research and Development:
            To develop, test, and improve Zoom products and services, including,
            for example, content-related features (such as background and other
            filters), and to troubleshoot products and services.
          </p>
          <p>
            <span className="font-medium">
              Marketing, Promotions, and Third-Party Advertising:
            </span>
            To permit Zoom and/or its third party marketing partners to market,
            advertise, and promote Zoom products and services, including based
            on your product usage, information we receive from third-party
            partners, information you provide to process referral invitations,
            or if you visit our websites, information about how and when you
            visit, and your interactions with them. We may also use this
            information to provide advertisements to you relating to Zoom
            products and services or to engage third party partners to analyze
            your interactions on our website or app or to deliver advertising to
            you. Zoom does not use meeting, webinar, or messaging content
            (specifically, audio, video, files shared, in-meeting whiteboards,
            and messages), or any content generated or shared as part of other
            collaborative features (such as out-of-meeting whiteboards) for any
            marketing or promotions.
          </p>
          <p>
            <span className="font-medium">
              Authentication, Integrity, Security, and Safety:
            </span>
            To authenticate accounts and activity, detect, investigate, and
            prevent malicious conduct or unsafe experiences, address security
            threats, protect public safety, and secure Zoom products and
            services.
          </p>
          <p>
            <span className="font-medium ">Communicate with You:</span>
            We use personal data (including contact information) to communicate
            with you about Zoom products and services, including product
            updates, your account, and changes to our policies and terms. We
            also use your information to respond to you when you contact us.
          </p>
          <p>
            <span className="font-medium">Legal Reasons:</span> To comply with
            applicable law or respond to valid legal process, including from law
            enforcement or government agencies, to investigate or participate in
            civil discovery, litigation, or other adversarial legal proceedings,
            and to enforce or investigate potential violations of our Terms of
            Service or policies.{" "}
          </p>

          <p>
            {" "}
            Zoom uses advanced tools to automatically scan content such as
            virtual backgrounds, profile images, incoming emails to Zoom’s
            native email service from someone who is not a Zoom Email user, and
            files uploaded or exchanged through chat, for the purpose of
            detecting and preventing violations of our terms or policies and
            illegal or other harmful activity, and its employees may investigate
            such content where required for legal, safety, or security reasons.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default page;
