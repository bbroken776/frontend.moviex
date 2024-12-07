const scrollTo = (document: Document, elementID: string) => {
  const element = document.getElementById(elementID);
  if (element != null && element != undefined) element.scrollIntoView({ behavior: 'smooth' });
};

export default scrollTo;
