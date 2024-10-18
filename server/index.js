import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "bg-blue-600 text-white py-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 flex justify-between items-center", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "text-2xl font-bold", children: "r-hashimoto Tech Blog" }),
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { className: "flex space-x-4", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:underline", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:underline", children: "About" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/profile", className: "hover:underline", children: "Profile" }) })
    ] }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-800 text-white py-4 mt-8", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsx("p", { children: "© 2023 r-hashimoto Tech Blog. All rights reserved." }) }) });
}
function links() {
  return [{ rel: "stylesheet", href: "/styles/tailwind.css" }];
}
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "ja", className: "h-full", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "flex flex-col min-h-full bg-background text-primary", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const postsDirectory = path.join(process.cwd(), "content", "blog");
function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}
function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: realSlug,
      frontmatter: {
        title: data.title || "",
        date: data.date || "",
        description: data.description || ""
      },
      content
    };
  } catch (error) {
    console.error(`Error reading file: ${fullPath}`, error);
    return {
      slug: realSlug,
      frontmatter: {
        title: "",
        date: "",
        description: ""
      },
      content: ""
    };
  }
}
function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug)).sort(
    (post1, post2) => post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
  );
  return posts;
}
function Sidebar({ recentPosts }) {
  return /* @__PURE__ */ jsxs("aside", { className: "ml-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "最近の投稿" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: recentPosts.map((post) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      Link,
      {
        to: `/posts/${post.slug}`,
        className: "text-blue-600 hover:underline",
        children: post.frontmatter.title
      }
    ) }, post.slug)) })
  ] });
}
function Layout({ children, recentPosts }) {
  return /* @__PURE__ */ jsx("div", { className: "flex-grow container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [
    /* @__PURE__ */ jsx("main", { className: "flex-grow md:w-3/4", children }),
    recentPosts && /* @__PURE__ */ jsx("aside", { className: "md:w-1/4", children: /* @__PURE__ */ jsx(Sidebar, { recentPosts }) })
  ] }) });
}
const loader$2 = async ({ params }) => {
  const slug = params.slug;
  if (!slug) throw new Error("Slug is required");
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  return json({ post, recentPosts: allPosts.slice(0, 5) });
};
function Post() {
  const { post, recentPosts } = useLoaderData();
  return /* @__PURE__ */ jsx(Layout, { recentPosts, children: /* @__PURE__ */ jsxs("article", { className: "prose lg:prose-xl", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold mb-4", children: post.frontmatter.title }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: post.frontmatter.date }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none", children: /* @__PURE__ */ jsx(
      ReactMarkdown,
      {
        components: {
          h1: ({ children, ...props }) => /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mt-6 mb-4", ...props, children }),
          h2: ({ children, ...props }) => /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mt-5 mb-3", ...props, children }),
          h3: ({ children, ...props }) => /* @__PURE__ */ jsx("h4", { className: "text-xl font-medium mt-4 mb-2", ...props, children })
        },
        children: post.content
      }
    ) })
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Post,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const careerDirectory = path.join(process.cwd(), "content", "career");
function getCareerInfo() {
  const fullPath = path.join(careerDirectory, "career.md");
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content } = matter(fileContents);
    return content;
  } catch (error) {
    console.error(`Error reading career file: ${fullPath}`, error);
    return "";
  }
}
const loader$1 = async () => {
  const careerInfo = getCareerInfo();
  const recentPosts = getAllPosts().slice(0, 5);
  return { careerInfo, recentPosts };
};
function Profile() {
  const { careerInfo, recentPosts } = useLoaderData();
  return /* @__PURE__ */ jsx(Layout, { recentPosts, children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "プロフィール" }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-sm lg:prose-base", children: /* @__PURE__ */ jsx(
      ReactMarkdown,
      {
        components: {
          h1: ({ children, ...props }) => /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mt-6 mb-4", ...props, children }),
          h2: ({ children, ...props }) => /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mt-4 mb-2", ...props, children }),
          h3: ({ children, ...props }) => /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium mt-3 mb-2", ...props, children }),
          p: ({ children, ...props }) => /* @__PURE__ */ jsx("p", { className: "mb-3", ...props, children }),
          ul: ({ children, ...props }) => /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 mb-3", ...props, children }),
          ol: ({ children, ...props }) => /* @__PURE__ */ jsx("ol", { className: "list-decimal pl-5 mb-3", ...props, children }),
          li: ({ children, ...props }) => /* @__PURE__ */ jsx("li", { className: "mb-1", ...props, children })
        },
        children: careerInfo
      }
    ) })
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async () => {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 5);
  return json({ posts, recentPosts });
};
function Index() {
  const { posts, recentPosts } = useLoaderData();
  return /* @__PURE__ */ jsxs(Layout, { recentPosts, children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8", children: "r-hashimoto Tech Blogへようこそ" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: posts.map((post) => /* @__PURE__ */ jsxs("li", { className: "bg-white shadow rounded-lg p-6", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `/posts/${post.slug}`,
          className: "text-xl font-semibold text-blue-600 hover:underline",
          children: post.frontmatter.title
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: post.frontmatter.description }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-500", children: [
        "投稿日: ",
        post.frontmatter.date
      ] })
    ] }, post.slug)) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "r-hashimoto Tech Blogについて" }),
    /* @__PURE__ */ jsxs("div", { className: "prose lg:prose-xl", children: [
      /* @__PURE__ */ jsx("p", { children: "r-hashimoto Tech Blogへようこそ。ここは、Web開発、プログラミング言語、ソフトウェアエンジニアリングに関する最新の洞察とチュートリアルを提供する場所です。" }),
      /* @__PURE__ */ jsx("p", { children: "基礎を学びたい初心者の方も、高度なテクニックを求める経験豊富な開発者の方も、当ブログでカバーしています。ハッピーコーディング！" })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DgGkrLK4.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/components-CFHM6Iak.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DYwKfmcJ.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/components-CFHM6Iak.js"], "css": [] }, "routes/posts.$slug": { "id": "routes/posts.$slug", "parentId": "root", "path": "posts/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/posts._slug-BBclZE0u.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/Layout-DcIpuHZG.js", "/assets/components-CFHM6Iak.js", "/assets/react-markdown-CgPrfx9w.js"], "css": [] }, "routes/profile": { "id": "routes/profile", "parentId": "root", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile-Dsv4odJy.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/Layout-DcIpuHZG.js", "/assets/components-CFHM6Iak.js", "/assets/react-markdown-CgPrfx9w.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BPxs8_IP.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js", "/assets/Layout-DcIpuHZG.js", "/assets/components-CFHM6Iak.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-C_uxaXUp.js", "imports": ["/assets/jsx-runtime-BMrMXMSG.js"], "css": [] } }, "url": "/assets/manifest-7d7850a1.js", "version": "7d7850a1" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/posts.$slug": {
    id: "routes/posts.$slug",
    parentId: "root",
    path: "posts/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
