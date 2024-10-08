"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";

import { shortenerFormSchema } from "@/schema";

import { createUrl } from "@/lib/actions/url.actions";

import Copy from "./Copy";
import ShareButton from "./ShareButton";

import { useLocalStorageArray } from "@/useLocalStorageArray";

type Props = {};

const ShortenerForm = (props: Props) => {
  const [url, setUrl] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { addObject, storedArray, clearAll } = useLocalStorageArray("urls");

  const form = useForm<z.infer<typeof shortenerFormSchema>>({
    resolver: zodResolver(shortenerFormSchema),
  });

  async function onSubmit(values: z.infer<typeof shortenerFormSchema>) {
    console.log(values);
    setIsLoading(true);

    try {
      const result = await createUrl(values);
      console.log(result);
      addObject(result);
      setUrl(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet>
      <div className="bg-white p-4 rounded-md">
        {url ? (
          <div className="flex flex-col gap-2">
            <h1>Shortened Url</h1>
            <div className="text-black">Your Long Url</div>
            <div className="text-green overflow-x-hidden border-[1px] p-2 rounded-sm border-black h-10">
              {url.longurl}
            </div>
            <div className="text-black">Your Short Url</div>
            <div className="text-green overflow-x-hidden border-[1px] p-2 rounded-sm border-black h-10">
              {url.shorturl}
            </div>
            <div className="flex gap-2">
              <Copy title={url.shorturl} />
              <ShareButton link={url.shorturl} />
            </div>
            <div className="flex gap-2">
              <SheetTrigger className="bg-white text-green w-full h-11 border-gray-300 border-[1px]">
                My Urls
              </SheetTrigger>

              <Button
                onClick={() => setUrl(null)}
                className="bg-green w-full h-11"
              >
                Shorten Url
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="longurl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Your Long Url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter long link here"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Your Alias</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Enter alias here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-green w-full h-11">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" color="white" />
                    &nbsp; Loading...
                  </>
                ) : (
                  "Shorten Url"
                )}
              </Button>
            </form>
          </Form>
        )}
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

export default ShortenerForm;
