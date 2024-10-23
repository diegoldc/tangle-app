import {Link} from "react-router-dom";
import { Footer } from "flowbite-react";

function FooterBar() {
  return (
    <Footer Container className="bg-trasparent flex justify-around gap-3 border-none shadow-none">
      <Footer.Copyright by="TANGLE" year={2024} />
      <Footer.LinkGroup className="flex justify-around gap-0">

      <Footer.Link href="/about" >About us</Footer.Link>
      <Footer.Link href="https://github.com/diegoldc/tangle-server" >Server Repo</Footer.Link>
      <Footer.Link href="https://github.com/diegoldc/tangle-app" >Client Repo</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}

export default FooterBar