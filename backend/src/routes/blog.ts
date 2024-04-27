import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
blogRouter.use("*", async (c, next) => {
  const header = c.req.header("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    c.status(403);
    return c.json({
      error: "Unauthorized or no token detected",
    });
  }
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);

  if (response.id) {
    c.set("userId", response.id);
    await next();
  } else {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const response = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
      published: body.published,
    },
    select: {
      id: true,
      title: true,
    },
  });

  return c.json({
    response,
  });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const response = await prisma.post.update({
    where: {
      id: body.id,
      authorId: c.get("userId"),
    },
    data: {
      title: body.title,
      content: body.content,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return c.json({
    response,
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    response,
  });
});

blogRouter.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const deleteId = await c.req.param("id");
  const response = await prisma.post.delete({
    where: {
      id: deleteId,
    },
  });
  return c.json({
    response,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const postId = await c.req.param("id");
  const response = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({
    response,
  });
});
