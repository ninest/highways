import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-2">
      <h1 className="font-black">highway</h1>

      <p>Can you identify the location of these highway interchanges?</p>

      <section>
        <ul className="list-disc list-inside">
          <li>
            <Link className="underline" href="/game">
              start
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
