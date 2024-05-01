import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
    id: string;
    bio: string;
  };
  publishedDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setBlogs(response.data.response);

        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.response);
        setLoading(false);
      });
  }, [id]);
  return {
    loading,
    blog,
  };
};

export const useGetUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((response) => {
          setUser(response.data.details);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log("error101");
    }
  }, []);
  return {
    user,
  };
};

export const useGetMyBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/mine`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setBlogs(response.data.response);

        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};

export const useUserLoggedIn = () => {
  const [exists, setExists] = useState(true);
  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then(() => {
          setExists(true);
        })
        .catch((e) => {
          console.log(e);
          setExists(false);
        });
    } catch (error) {
      console.log("error101");
    }
  }, []);
  return {
    exists,
  };
};
