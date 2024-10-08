"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Copy from "./Copy";
import ShareButton from "./ShareButton";

import { useLocalStorageArray } from "@/useLocalStorageArray";

type Props = { user: Object };

import { logoutAccount } from "@/lib/actions/user.actions";

const Header = ({ user }: Props) => {
  const router = useRouter();

  const { storedArray, clearAll } = useLocalStorageArray("urls");

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };

  return (
    <Sheet>
      <div className="hidden lg:flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">
          <Link href={"/"} className="text-24 cursor-pointer">
            URL SHORTENER
          </Link>
        </h1>
        <ul className="flex gap-2 items-center">
          <SheetTrigger>
            <li className="bg-lightBlue rounded-sm p-2">
              My URLs
              {/* <Link href="/my-urls">My URLs</Link> */}
            </li>
          </SheetTrigger>
          {user ? (
            <Button onClick={handleLogOut}>Logout</Button>
          ) : (
            <>
              <li>
                <Link href="/sign-up">Sign Up</Link>
              </li>
              <li>
                <Link href="/sign-up">Sign In</Link>
              </li>
            </>
          )}
        </ul>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Recently Opened Urls</SheetTitle>
            {/* <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription> */}
          </SheetHeader>
          <div className="flex flex-col gap-4">
            {storedArray.length !== 0 &&
              storedArray.map((item: any) => (
                <div key={item.id} className="flex flex-col gap-2">
                  {/* <div className="text-black">Your Long Url</div> */}
                  {/* <div className="text-green overflow-x-hidden border-[1px] p-2 rounded-sm border-black h-10">
                    {item.longurl}
                  </div> */}
                  {/* <div className="text-black">Your Short Url</div> */}
                  <div className="text-green overflow-x-hidden border-[1px] p-2 rounded-sm h-10">
                    {item.shorturl}
                  </div>
                  <div className="flex gap-2">
                    <Copy title={item.shorturl} />
                    <ShareButton link={item.shorturl} />
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-end py-2">
            <Button onClick={() => clearAll("urls")}>Clear History</Button>
          </div>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default Header;
