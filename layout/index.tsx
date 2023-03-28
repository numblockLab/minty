import Footer from "./footer";
import Header from "./header";

export default function DefaultLayout(props: { children: JSX.Element | string | undefined | null | any }) {
  const { children } = props;
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
