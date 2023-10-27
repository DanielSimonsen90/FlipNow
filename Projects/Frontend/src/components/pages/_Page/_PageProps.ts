import { PropsWithChildren } from "react";

type PageProps = PropsWithChildren & {
  description: string;
  
  title?: string;
  thumbnail?: string;
};

export default PageProps;