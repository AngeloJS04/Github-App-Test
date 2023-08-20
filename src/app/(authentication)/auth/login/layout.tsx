


import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'GitApp - Login',
    description: 'Github API Test App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (<>{children}</>);
}
