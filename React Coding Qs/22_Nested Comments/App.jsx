import React, { useState } from "react";

const initialComments = [
  {
    id: 1,
    text: "This is the first comment",
    replies: [
      {
        id: 2,
        text: "This is a reply",
        replies: [],
      },
    ],
  },
];

function addReply(comments, parentId, newReply) {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...comment.replies, newReply],
      };
    }

    return {
      ...comment,
      replies: addReply(comment.replies, parentId, newReply),
    };
  });
}

function Comment({ comment, onReply }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  const handleReply = () => {
    if (!text.trim()) return;

    onReply(comment.id, {
      id: Date.now(),
      text,
      replies: [],
    });

    setText("");
    setShowInput(false);
  };

  return (
    <div
      style={{
        marginLeft: 20,
        marginTop: 15,
        borderLeft: "2px solid #ddd",
        paddingLeft: 15,
      }}
    >
      <p>{comment.text}</p>

      <button onClick={() => setShowInput(!showInput)}>
        Reply
      </button>

      {showInput && (
        <div style={{ marginTop: 10 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write reply..."
          />

          <button onClick={handleReply}>
            Add
          </button>
        </div>
      )}

      {comment.replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [comments, setComments] = useState(initialComments);

  const handleReply = (parentId, reply) => {
    setComments((prev) =>
      addReply(prev, parentId, reply)
    );
  };

  return (
    <div
      style={{
        width: 600,
        margin: "30px auto",
      }}
    >
      <h2>Nested Comments</h2>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={handleReply}
        />
      ))}
    </div>
  );
}