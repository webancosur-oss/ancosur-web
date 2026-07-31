"use client";

import Script from "next/script";

export default function TawkChat() {
  return (
    <Script
      id="tawk-chat"
      strategy="afterInteractive"
    >
      {`
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();

        (function () {
          var s1 = document.createElement("script");
          var s0 = document.getElementsByTagName("script")[0];

          s1.async = true;
          s1.src = "https://embed.tawk.to/6a6cb4bf74ebe91d41e7517d/1jusa43mp";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin","*");

          s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
}