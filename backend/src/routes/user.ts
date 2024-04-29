import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { z } from "zod";
import { signinInput, signupInput } from "@ehco/blog-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }
  try {
    const response = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
      select: {
        email: true,
        id: true,
      },
    });
    const payload = { id: response.id };
    const token = await sign(payload, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    return c.status(403);
  }
});
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }
  const response = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
    select: {
      email: true,
      id: true,
    },
  });

  if (!response?.id) {
    return c.text("User not found", { status: 401 });
  }
  const payload = { id: response.id };
  const token = await sign(payload, c.env.JWT_SECRET);
  return c.json({
    jwt: token,
  });
});

userRouter.use("*", async (c, next) => {
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

userRouter.put("/bio", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const response = await prisma.user.update({
    where: {
      id: c.get("userId"),
    },
    data: {
      bio: body.bio,
    },
    select: {
      bio: true,
    },
  });
  return c.json({
    response,
  });
});

userRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (c.get("userId")) {
    const details = await prisma.user.findFirst({
      where: {
        id: c.get("userId"),
      },
      select: {
        name: true,
        id: true,
        email: true,
        bio: true,
      },
    });
    return c.json({ details });
  } else {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});
