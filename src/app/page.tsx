import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={"text-white bg-dark " + styles.main}>
      <section className="flex items-center w-full intro">
        <div className="w-1/2 pl-12 left">
          <div className="flex items-center mb-2 font-head">
            <span className="text-big text-primary">Hey</span>
            <h1 className="ml-4 text-xl">
              {" "}
              My name is <br /> Shailash Bhati
            </h1>
          </div>
          <div className="max-w-md desc">
            I’m actually 25 years old and i’m a french web developer based at
            Tours in France.
          </div>
        </div>
        <div className="flex-col items-center w-1/2 pl-12 right">
          <h2 className="mb-2 text-xxl font-head">Say hello</h2>
          <div>
            <p>shailash.bhati@gmail.com</p>
            <p>instagram</p>
          </div>
        </div>
      </section>
    </main>
  );
}
