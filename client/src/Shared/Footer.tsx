// @ts-nocheck
import * as React from "react"
import { Link } from "react-router-dom"
import IProduct, { ILink } from "../Models/User/Product"

import { HomeApis } from "../Helpers/Request/Services/Home/Home"
import productJson from "../Constants/ProductsJSON"

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    const [products, setProducts] = React.useState<IProduct[]>([])
    const [links, setLinks] = React.useState<ILink[]>([])

    React.useEffect(() => {
        HomeApis.getAllProducts().then(response => {
            setProducts(response.data.data)
            // setProducts(productJson.data)
        })

        HomeApis.getLinks.then(response => {
            setLinks(response.data.data)
        })
    }, [])

    //

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <h5 className="heading">ABOUT</h5>
                        <ul className="footer__menu-list">
                            {links.map(link => (
                                <li key={link._id}>
                                    <a
                                        className="footer__link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={link.link}
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-12 col-md-6">
                        <h5 className="heading">DIGITAL ECOSYSTEM</h5>
                        <ul className="footer__menu-list">
                            {products.map((product, index) => (
                                <li key={index}>
                                    <Link
                                        className="footer__link text-uppercase"
                                        to={`/products/${product?._id || ""}`}
                                    >
                                        {product?.title || ""}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-12 col-md-3">
                        <h5 className="heading font-weight-bold">CONTACT US</h5>
                        <ul className="footer__menu-list">
                            <li>
                                <a className="footer__link text-white" href="mailto:yeshub@plan-international.org">
                                    yeshub@plan-international.org
                                </a>
                            </li>
                            <li>
                                <Link className="footer__link text-white" to="/">
                                    Dukes Court, Block A, Duke Street, Woking, Surrey GU21 5BH , United Kingdom
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* <div className="row mt-4">
                    <div className="col-12">
                        <div className="text-center">
                            <h6 className="heading">
                                Copyright © Plan International Inc.
                            </h6>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="text-center">
                            <h6 className="heading">ALL RIGHTS RESERVED.</h6>
                        </div>
                    </div>
                </div> */}
            </div>
            <div id="google_translate_element"></div>
        </footer>
    )
}

export default Footer
