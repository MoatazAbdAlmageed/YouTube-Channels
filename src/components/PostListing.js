import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import uuid from "react-uuid";
import { Link } from "gatsby";

const PostListing = (data) => {
  console.log("data");
  console.log(data);
  const { postEdges, previousPagePath, nextPagePath } = data;
  const getPostList = () => {
    const postList = [];
    postEdges?.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        categories: postEdge.node.frontmatter.categories,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        youtube: postEdge.node.frontmatter.youtube,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
      });
    });
    return postList;
  };

  const postList = getPostList();
  console.log("postList");
  console.log("postList", postList);
  const emptyQuery = "";

  const [state, setState] = React.useState({
    query: emptyQuery,
    filteredData: [],
  });

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const query = event.target.value.trim();
    const filteredData = postList.filter(({ excerpt, title, tags }) => {
      const low = query.toLowerCase();
      return (
        excerpt.toLowerCase().includes(low) ||
        title.toLowerCase().includes(low) ||
        (tags &&
          tags
            .join("")
            .toLowerCase()
            .includes(low))
      );
    });

    setState({
      query,
      filteredData,
    });
  };
  const { filteredData, query } = state;
  const hasSearchResults = filteredData && query;
  const rowPosts = hasSearchResults ? filteredData : postList;
  const posts = [...new Set(rowPosts)].sort((a, b) =>
    a?.tags?.length > b?.tags?.length ? -1 : 1
  );

  return (
    <Stack>
      <Box>
        <InputGroup mt={2}>
          <InputLeftElement
            zIndex={0}
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            rounded="md"
            boxShadow="md"
            placeholder="Search by title, tags ,excerpt"
            onChange={handleInputChange}
          />
        </InputGroup>
        <Text mt={2}>
          <Badge colorScheme="red">{posts.length}</Badge> channel(s) found
        </Text>
      </Box>
      <SimpleGrid columns={{ lg: 5, sm: 1, md: 3 }} spacing="40px">
        {posts.map((post) => (
          <Box
            p={5}
            textAlign="center"
            boxShadow="md"
            rounded="lg"
            w="100%"
            key={uuid()}
            overflow="hidden"
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <a
              href={post.path}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Text>
                <b>{post.title}</b>
                <Text m={(0, 2)}>
                  {post.categories &&
                    `(${post.categories.map(
                      (category) =>
                        category.charAt(0).toUpperCase() + category.slice(1)
                    )})`}
                </Text>
              </Text>

              <Center>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={post.cover}
                  fallbackSrc="/YouTube-Icon-Gray-Box.jpg"
                  width="150px"
                />
              </Center>
            </a>
            {post.tags?.includes("pin") && (
              <Center>
                <FaStar color="orange" />
              </Center>
            )}{" "}
            {post.youtube && (
              <Center>
                <a
                  href={post.youtube}
                  target="_blank"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <FaYoutube color="#ff0000" />
                </a>
              </Center>
            )}
          </Box>
        ))}
        <div>
          {/* previousPageLink and nextPageLink were added by the plugin */}
          <Link to={previousPagePath}>Previous</Link>
          <Link to={nextPagePath}>Next</Link>
        </div>
      </SimpleGrid>
    </Stack>
  );
};

export default PostListing;
