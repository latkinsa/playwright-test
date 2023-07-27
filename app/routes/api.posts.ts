import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

export const loader = async () => {
  const title = "Hello World";
  const slug = "hello-world";
  const markdown = "This is my first post!";
  return json({ posts: [{title, slug, markdown}] });
};

export const action = async ({ request }: ActionArgs) => {
  const {title, slug, markdown} = await request.json();

  const errors = {
    title:
      title && typeof title === "string"
        ? null
        : "Title string is required",
    slug:
      slug && typeof slug === "string"
        ? null
        : "Slug string is required",
    markdown:
      markdown && typeof markdown === "string"
        ? null
        : "Markdown string is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) throw json({error: "Bad Request", cause: errors}, 400);

  return json({post: {title, slug, markdown}});
};
