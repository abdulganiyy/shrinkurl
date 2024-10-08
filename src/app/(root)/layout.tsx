import Image from "next/image";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import MobileNav from "@/components/shared/MobileNav";

import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  console.log(user);
  return (
    <main className="min-h-screen text-white bg-blue-500 bg-opacity-50 font-inter">
      <Header user={user} />
      <MobileNav user={user} />
      {children}
      <div className="fixed w-full h-screen inset-0 -z-40">
        <Image
          src="/assets/images/main-bg.jpg"
          alt="Background image"
          layout="fill" // Fill the entire container
          objectFit="cover" // Ensure the image covers the container
          quality={100} // Adjust quality if needed
          // width={500}
          // height={500}
          // className="rounded-l-xl object-contain"
        />
      </div>
    </main>
  );
}
