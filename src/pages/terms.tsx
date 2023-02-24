import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Terms = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-grow flex-col gap-6 overflow-y-auto bg-slate-100 p-16 dark:bg-slate-900">
      <p className="">
        <h1 className="text-xl font-bold">Terms and Conditions</h1>
        <br />
        <p>
          Please read these Terms and Conditions ("Terms") carefully before
          using our service ("Service"). By using the Service, you agree to be
          bound by these Terms.
        </p>
        <br />
        <p className="pb-2">1. Use of Service</p>
        <ul className="ml-8 list-disc">
          <li>
            You may use the Service only for lawful purposes and in accordance
            with these Terms. You may not use the Service in any manner that
            could damage, disable, overburden, or impair the Service or
            interfere with any other party's use of the Service.
          </li>
        </ul>
        <br />

        <p className="pb-2">2. Intellectual Property</p>
        <ul className="ml-8 list-disc">
          <li>
            All content included in or made available through the Service,
            including text, graphics, logos, images, and software, is the
            property of our company or our licensors and is protected by
            intellectual property laws.
          </li>
        </ul>
        <br />
        <p className="pb-2">3. Disclaimer of Warranties</p>
        <ul className="ml-8 list-disc">
          <li>
            The Service is provided "as is" and without warranty of any kind,
            either express or implied, including, but not limited to, the
            implied warranties of merchantability and fitness for a particular
            purpose. We do not warrant that the Service will be uninterrupted or
            error-free, or that defects will be corrected.
          </li>
        </ul>
        <br />
        <p className="pb-2">4. Limitation of Liability</p>
        <ul className="ml-8 list-disc">
          <li>
            In no event shall we be liable for any indirect, special,
            incidental, consequential, or punitive damages arising out of or
            related to the use of the Service, even if we have been advised of
            the possibility of such damages.
          </li>
        </ul>
        <br />
        <p className="pb-2">5. Termination</p>
        <ul className="ml-8 list-disc">
          <li>
            We may terminate your access to the Service at any time, with or
            without cause, without notice, and without liability.
          </li>
        </ul>
        <br />
        <p className="pb-2">6. Changes to Terms and Service</p>
        <ul className="ml-8 list-disc">
          <li>
            We may update these Terms or the Service from time to time. If we
            make material changes, we will notify you by posting a notice on our
            website or by other means.
          </li>
        </ul>
        <br />
        <p className="pb-2">7. Governing Law and Jurisdiction</p>
        <ul className="ml-8 list-disc">
          <li>
            These Terms and your use of the Service shall be governed by and
            construed in accordance with the laws of The United States of
            America.
          </li>
        </ul>
        <br />
        <p className="pb-2">8. Contact Us</p>
        <ul className="ml-8 list-disc">
          <li>
            If you have any questions or concerns about these Terms or the
            Service, please reach out!
          </li>
        </ul>
        <br />
      </p>
    </div>
  );
};

export default Terms;
