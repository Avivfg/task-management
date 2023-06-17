import { useState, useRef, useCallback } from "react";
import usePosts from "./hooks/usePosts";
import Post from "./components/Post";

const TaskListScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current?.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center">Error: {error.message}</p>;

  const content = results.map((post, i) => {
    if (i === results.length -1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <>
      <h1 id="top">Task Manager</h1>
      {content}
      {isLoading && <p style={styles.bottom}>Loading More Posts...</p>}
      <a style={styles.bottom} href="#top">Back to Top</a>
    </>
  );
};

const styles = {
  bottom: {
    display: "flex", 
    justifyContent: "center"
  },
}

export default TaskListScreen;
