import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.svg"
import LandingImage from "@/assets/main.svg"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto py-6 px-4 sm:px-8">
        <Image src={Logo} alt="Logo"/>
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-20 grid grid-cols-1 lg:grid-cols-[1fr,400px] md:justify-center items-center">
        <div className="mx-auto lg:mx-0 text-center lg:text-left max-sm:mb-10">
          <h1 className="capitalize text-5xl md:text-7xl font-semibold">Job <span className="text-primary">tracking</span> app</h1>
          <p className="leading-loose max-w-xl mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis minima itaque enim aliquid dolor quibusdam iste. 
            Quam doloribus assumenda molestiae! Nihil, accusamus laborum minus maxime eaque 
            sapiente explicabo dolorum saepe?
          </p>
          <Button className="mt-4 btn" size="lg">
            <Link href={"/add-job"} className="capitalize">lets apply some</Link>
          </Button>
        </div>
        <div className="max-sm:mx-auto">
          <Image src={LandingImage} alt="Main image" className="max-sm:w-60 sm:hidden lg:block object-fit"/>
        </div>
      </section>
    </main>
  );
}
