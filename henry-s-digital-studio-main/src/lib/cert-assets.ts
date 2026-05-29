import mummyImg from "@/assets/project-mummyj2.png";
import riseflowImg from "@/assets/project-riseflow.png";
import riseflowSchoolImg from "@/assets/riseflowschool.png";
import ebookStoreImg from "@/assets/e-book.png";
import ibaHubImg from "@/assets/mega.png";
import gpgImg from "@/assets/gpg.png";

/** Served from public/certificates/ so links work without SPA route 404s. */
export const certificateAssets: Record<string, string> = {
  "byui-degree": "/certificates/byui-degree.png",
  "aas-software-development": "/certificates/aas-software-development.png",
  "web-and-computer-programming-certificate": "/certificates/web-and-computer-programming.png",
  "web-development-certificate": "/certificates/web-development.png",
};

export const imageAssets: Record<string, string> = {
  ...certificateAssets,
  "project-mummyj2": mummyImg,
  "project-riseflow": riseflowImg,
  "riseflowschool": riseflowSchoolImg,
  "e-book": ebookStoreImg,
  mega: ibaHubImg,
  gpg: gpgImg,
};
