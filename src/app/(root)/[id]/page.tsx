import { redirect } from "next/navigation";

import { getUrl } from "@/lib/actions/url.actions";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const res = await getUrl({ id });

  if (res) {
    redirect(res.longurl);
  } else {
    redirect("https://theuselessweb.com/");
  }

  return <div>{id}</div>;
};

export default Page;
