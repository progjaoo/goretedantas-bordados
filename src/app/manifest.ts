import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ateliê Gorete Bordados | Peças Personalizadas",
    short_name: "Gorete Bordados",
    description:
      "Catálogo de bordados computadorizados e artesanais de alta precisão. Toalhas bordadas, necessaires estruturadas e enxovais infantis.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f1e9",
    theme_color: "#8d7966",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
