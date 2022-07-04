import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="h-96 flex">
      <div className="m-auto flex flex-col items-center">
        <h2 className="text-4xl mb-4">Your cart is empty 🛒</h2>
        <Link href="/">
          <a className="underline text-purple-500">Search for products</a>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
