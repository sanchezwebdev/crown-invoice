import Layout from "../components/Layout";
import InvoiceTemplate from "../components/InvoiceTemplate";

export default function Home() {
  return (
    <>
      <Layout>
        <InvoiceTemplate/>
      </Layout>    
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {      
    },    
  };
}