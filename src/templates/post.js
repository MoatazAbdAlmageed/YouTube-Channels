import { FaYoutube } from "react-icons/fa";

import {
  Box,
  Heading,
  Image,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { graphql, Link } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO";
import SocialLinks from "../components/SocialLinks";
import Layout from "../layout";
import styles from "./post.module.scss";
const _ = require("lodash");

const BlogTags = (props) => {
  return (
    <Box marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag margin={(0, 1)} variant="solid" colorScheme="orange" key={tag}>
            <Link key={tag} to={`/tags/${_.kebabCase(tag)}`}>
              <span>{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
            </Link>
          </Tag>
        );
      })}
    </Box>
  );
};

export default ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout maxW={"7xl"} p="12">
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />

      <Box display="flex" flex="1" position="relative">
        <Box
          width={{ base: "100%", sm: "85%" }}
          marginLeft={{ base: "0", sm: "5%" }}
          marginTop="5%"
          zIndex={1}
        >
          <Image
            margin={"auto"}
            borderRadius="lg"
            src={post.cover || "/YouTube-Icon-Gray-Box.jpg"}
            alt={post.title}
            objectFit="contain"
          />
        </Box>
        <Box width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              "radial(orange.600 1px, transparent 1px)",
              "radial(orange.300 1px, transparent 1px)"
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
        <Heading marginBottom={2}>{post.title}</Heading>
        <Text m={2}>
          {post.categories &&
            `(${post.categories.map(
              (category) => category.charAt(0).toUpperCase() + category.slice(1)
            )})`}
        </Text>
        <BlogTags tags={[...new Set(post.tags)]} />

        {post.youtube && (
          <a
            style={{ color: "orange" }}
            target="_blank"
            href={post.youtube}
            activeClassName={styles.activeNav}
          >
            <FaYoutube color="#ff0000" />
            {post.youtube}
          </a>
        )}
        <br />
        {post.linkedin && (
          <a
            style={{ color: "orange" }}
            target="_blank"
            href={post.linkedin}
            activeClassName={styles.activeNav}
          >
            {post.linkedin}
          </a>
        )}
        <br />
        {post.github && (
          <a
            style={{ color: "orange" }}
            target="_blank"
            href={post.github}
            activeClassName={styles.activeNav}
          >
            {post.github}
          </a>
        )}
        <br />
        {post.site && (
          <a
            style={{ color: "orange" }}
            target="_blank"
            href={post.site}
            activeClassName={styles.activeNav}
          >
            {post.site}
          </a>
        )}
        <br />
        {post.behance && (
          <a
            style={{ color: "orange" }}
            target="_blank"
            href={post.behance}
            activeClassName={styles.activeNav}
          >
            {post.behance}
          </a>
        )}

        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue("gray.700", "gray.200")}
          fontSize="lg"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: postNode.html.replace(/href/g, "target='_blank' href"),
            }}
          />
        </Text>

        <a
          className="admin_only"
          style={{ color: "orange", visibility: "hidden" }}
          target="_blank"
          href={`https://github.com/MoatazAbdAlmageed/YouTube-Channels/edit/main/content/${post.title
            .replace(/ /g, "-")
            .replace(/\./g, "-")}.md`}
        >
          Edit ✏
        </a>
      </Box>

      <SocialLinks postPath={slug} postNode={postNode} />
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        categories
        tags
        youtube
        site
        github
        linkedin
        behance
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
