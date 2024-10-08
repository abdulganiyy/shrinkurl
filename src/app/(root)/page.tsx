import ShortenerForm from "@/components/shared/ShortenerForm";
import Hero from "@/components/shared/Hero";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="px-6 flex flex-col gap-3 lg:flex-row">
      <div className="w-full max-w-lg">
        <ShortenerForm />
      </div>
      <div>
        <Hero />
      </div>
    </div>
  );
};

export default Home;
