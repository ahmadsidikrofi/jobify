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
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-20 grid md:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-semibold">Job <span className="text-purple-600">tracking</span> app</h1>
          <p className="leading-loose max-w-md mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis minima itaque enim aliquid dolor quibusdam iste. 
            Quam doloribus assumenda molestiae! Nihil, accusamus laborum minus maxime eaque 
            sapiente explicabo dolorum saepe?
          </p>
          <Button className="mt-4">
            <Link href={"/add-job"}>Get Job Started</Link>
          </Button>
        </div>
        <Image src={LandingImage} alt="Main image" className="hidden lg:block"/>
      </section>
    </main>
  );
}
