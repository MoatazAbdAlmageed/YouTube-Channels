import React from "react";
import Helmet from "react-helmet";
import { siteTitle } from "../../data/SiteConfig";
import Layout from "../layout/index";

const NotFoundPage = () => (
  <Layout>
    <main>
      <Helmet title={`404: Not Found | ${siteTitle}`} />
      <h1>404 Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </main>
  </Layout>
);

export default NotFoundPage;
