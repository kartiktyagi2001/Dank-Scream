import { useEffect, useState } from "react";
import axios from "axios";

export default function Write({ user, setUser, setShowAuth }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in first");
        setShowAuth(true);
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:3000/user/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setUser(data.user);
          setAuthorized(true);
        } else {
          alert(data.message || "Please log in");
          setShowAuth(true);
        }
      } catch (err) {
        alert("Login required");
        setShowAuth(true);
      }
    };

    checkAuth();
  }, []);

  if (!authorized) return null;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Write a New Post</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const content = e.target.content.value;
          try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
              "http://localhost:3000/post/new",
              { content },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (data.success) {
              alert("Post created");
              e.target.reset();
            }
          } catch (err) {
            alert("Failed to create post");
          }
        }}
      >
        <textarea
          name="content"
          rows="6"
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
