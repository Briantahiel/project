import Link from "next/link";

export default function Home() {
  return (
      <>
        <h3>Home Page</h3> 
        <Link href="/login">Login</Link>
        <br />
        <Link href="/product">Products</Link>

      </>
       
  );
}
