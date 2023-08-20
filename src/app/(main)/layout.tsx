

import Layout from "@/components/layout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'GitApp',
    description: 'Github API Test App',
  }
  
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (<Layout>{children}</Layout> );
}
