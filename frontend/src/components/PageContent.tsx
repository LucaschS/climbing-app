function PageContent({ id, children }: any) {
  return (
    <div>
      <h1>{id}</h1>
      {children}
    </div>
  );
}

export default PageContent;
