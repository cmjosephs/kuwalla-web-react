export default function ErrorBoundary({ error }: { error: string }) {
  return <p>Error: {error}</p>;
}
