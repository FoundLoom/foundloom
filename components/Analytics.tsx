import Script from "next/script";

/**
 * Google Analytics 4, loaded only when NEXT_PUBLIC_GA_ID is set.
 *
 * With no ID configured this renders nothing: no script, no request, no
 * cookie. The script loads after the page is interactive, so it never
 * competes with first paint.
 *
 * Setting the ID is a decision with a privacy side to it. Depending on
 * where visitors are, analytics cookies may need consent first, and the
 * /cookies page should say what is collected.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
