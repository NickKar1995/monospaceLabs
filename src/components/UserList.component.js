import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UsersList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("this is the response", res);
        setPosts(res.data);
      })
      .catch((error) => console.error("Well,this happened in get..", error));
  }, []);

  return (
    <div>
      <h1>I Work</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
