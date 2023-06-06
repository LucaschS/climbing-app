import { Gym } from "../models/interface-models";

interface PageContentProps {
  gym?: Gym;
  title: string;
  children: JSX.Element;
}

function PageContent({ title, children }: PageContentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
