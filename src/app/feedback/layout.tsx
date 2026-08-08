import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Feedback - Zain's Portfolio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
