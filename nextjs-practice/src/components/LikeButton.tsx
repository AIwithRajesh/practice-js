"use client";
import React from "react";

export default function LikeButton() {
  const [likes, setLikes] = React.useState(0);
  return <button onClick={() => setLikes(likes + 1)}>Likes: {likes}</button>;
}
