export const Privacy = () => {
  return (
    <div className="flex h-screen flex-grow flex-col gap-6 overflow-y-auto bg-slate-100 p-16 dark:bg-slate-900">
      <p className="">
        <h1 className="text-xl font-bold">Privacy Policy</h1>
        <br />
        <p>
          This Privacy Policy describes how we collect, use, and disclose your
          personal information when you use our website/application (Service).
          By using the Service, you consent to the collection, use, and
          disclosure of your personal information in accordance with this
          Privacy Policy.
        </p>
        <br />

        <p className="pb-2">
          1. We may collect the following personal information from you when you
          use the Service:
        </p>
        <ul className="ml-8 list-disc">
          <li>
            Information related to your use of the Service, such as IP address,
            browser type, and device type.
          </li>
        </ul>
        <br />
        <p className="pb-2">2. How We May Use Your Personal Information</p>
        <ul className="ml-8 list-disc">
          <li>To provide and improve the Service.</li>
          <li>Monitor and analyze trends and usage of the Service.</li>
          <li>Diagnose technical problems and maintain security.</li>
        </ul>
        <br />
        <p className="pb-2">3. How We Share Your Information</p>
        <ul className="ml-8 list-disc">
          <li>
            We do not share your information with third parties, except as
            required by law or to protect our legal rights.
          </li>
        </ul>
        <br />
        <p className="pb-2">4. Security of Your Information</p>
        <ul className="ml-8 list-disc">
          <li>
            We take reasonable steps to protect your information from
            unauthorized access, use, or disclosure. However, no method of
            transmission over the internet or method of electronic storage is
            100% secure, and we cannot guarantee absolute security.
          </li>
        </ul>
        <br />
        <p className="pb-2">5. Your Choices and Rights</p>
        <ul className="ml-8 list-disc">
          <li>
            You do not have any choices or rights with respect to the
            information we collect, as we do not collect any information other
            than information related to your use of the Service.
          </li>
        </ul>
        <br />
        <p className="pb-2">6. Changes to this Privacy Policy</p>
        <ul className="ml-8 list-disc">
          <li>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will notify you by posting a notice on our
            website or by other means.
          </li>
        </ul>
        <br />
        <p className="pb-2">7. Contact Us</p>
        <ul className="ml-8 list-disc">
          <li>
            If you have any questions or concerns about this Privacy Policy or
            our privacy practices, please reach out!.
          </li>
        </ul>
        <br />
      </p>
    </div>
  );
};
export default Privacy;
