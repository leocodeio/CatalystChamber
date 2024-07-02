import React, { useEffect, useRef } from "react";

const RenderArea = ({ messages }) => {
  const lastMessageRef = useRef();
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} ref={lastMessageRef}>{message}</div>
        ))
      ) : (
        <p>No messages yet</p>
      )}
      <br/>
      <br/>
      <br/>
    </>
  );
};

export default RenderArea;
