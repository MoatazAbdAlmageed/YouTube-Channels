import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import Layout from "../layout";

const Index = (context) => {
  console.log("context from Index");
  console.log(context);
  return (
    <Layout>
      <main>
        <Helmet title={config.siteTitle} />
        <SEO />
        <PostListing postEdges={context?.data?.allMarkdownRemark?.edges} />
      </main>
    </Layout>
  );
};

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: ASC }
      skip: 0
      limit: 16
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            youtube
            categories
          }
        }
      }
    }
  }
`;
