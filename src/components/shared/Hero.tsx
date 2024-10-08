import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2>The Original URL Shortener</h2>
      <h3>Create shorter URLs with URL Shortener.</h3>
      <p>
        Want more out of your link shortener? Track link analytics and manage
        your links by creating account
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="lg"
          className="bg-transparent text-white"
          asChild
        >
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button
          size="lg"
          className="bg-white text-black hover:text-white"
          asChild
        >
          <Link href="/sign-up">Create Free Account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
