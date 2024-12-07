export default async function MoviePage({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  return <div>My Post: {id}</div>;
}
