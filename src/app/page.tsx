import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={"text-white bg-dark " + styles.main}>
      <section className="relative z-0 flex w-full h-screen intro">
        <div className="absolute top-0 left-0 w-px h-full stroke bg-light opacity-10"></div>
        <div className="absolute top-0 w-px h-full left-1/2 stroke bg-light opacity-10"></div>
        <div className="absolute top-0 right-0 w-px h-full stroke bg-light opacity-10"></div>
        <div className="flex flex-col justify-center flex-1 w-1/2 px-12 py-vmain left">
          <div className="flex items-center mb-4 font-head">
            <span className="relative leading-none before:block before:absolute before:-left-12 before:top-0 before:w-2 before:h-full before:bg-primary text-big text-primary">
              Hey
            </span>
            <h1 className="ml-4 text-3xl">
              {" "}
              My name is <br /> Shailash Bhati
            </h1>
          </div>
          <div className="max-w-md desc text-lightbody">
            I’m actually 25 years old and i’m a french web developer based at
            Tours in France.
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 w-1/2 px-12 py-vmain right">
          <h2 className="relative mb-4 text-xxl font-head before:block before:absolute before:-left-12 before:top-0 before:w-2 before:h-full before:bg-primary">
            Say hello
          </h2>
          <div className="text-lightbody">
            <p className="mb-1">shailash.bhati@gmail.com</p>
            <p>linkedin</p>
          </div>
        </div>
      </section>
    </main>
  );
}
