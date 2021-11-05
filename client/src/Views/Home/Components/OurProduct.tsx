// @ts-nocheck
import React, { FC, ReactElement, useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

import SectionText, { tabs } from "./Elements/Product/Json/SectionText"
import { ProductInterface } from "../../../Interface/Landing/ProductInterface"
import { HomeApis } from "../../../Helpers/Request/Services/Home/Home"
import { ProductContentSchemaSingle, ProductJsonSchema } from "./Elements/Product/Json/ProductsJsonSchema"
import { ArrowRight, ArrowLeft } from "../../../Shared/Arrows"
import { GroupPhoto } from "../../../Shared/Images/Images"

import productJson from "../../../Constants/ProductsJSON"

import assetUrl from "../../../Helpers/Functions/assetUrl"

const OurProduct: FC = (): ReactElement => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [activeTab, setActive] = useState<string>("YES!NTEL")
    const [allProducts, setAllProducts] = useState<ProductInterface[]>([])
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface>()

    const onChangeTab = (id: string, index: number) => {
        setActive(id)
        setCurrentIndex(index)
    }

    const [content, setContent] = useState<ProductJsonSchema>(SectionText[activeTab])

    useEffect(() => {
        HomeApis.getAllProducts().then(response => {
            if (response) {
                setAllProducts(response.data.data)
                setSelectedProduct(response.data.data[0])
                // setAllProducts(productJson.data)
                // setSelectedProduct(productJson.data[0])
            }
        })
    }, [])

    useEffect(() => {
        const filtered = allProducts.filter((item: ProductInterface) => item?.title === activeTab).slice(0, 1)
        if (filtered.length !== 0) {
            setSelectedProduct(filtered[0])
        } else {
            setSelectedProduct(allProducts[0])
        }

        setContent(SectionText[activeTab])
    }, [activeTab, allProducts])

    const onLeftClick = () => {
        if (currentIndex !== 0) {
            setActive(tabs[currentIndex - 1].text)
            setCurrentIndex(currentIndex - 1)
        } else {
            setActive(tabs[tabs.length - 1].text)
            setCurrentIndex(tabs.length - 1)
        }
    }

    const onRightClick = () => {
        if (currentIndex === tabs.length - 1) {
            setActive(tabs[0].text)
            setCurrentIndex(0)
        } else {
            setActive(tabs[currentIndex + 1].text)
            setCurrentIndex(currentIndex + 1)
        }
    }

    return (
        <section className="pt-5 pb-5">
            <div className="container">
                <div className="section__heading">
                    <h3 className="title">
                        The YES! Digital Ecosystem:
                        <br /> For your youth employment and entrepreneurship projects
                    </h3>
                    <div className="description">
                        This suite of digital tools will help you scale, continuously improve, and capture the impact of
                        your work in a cost-effective manner.
                    </div>
                </div>

                <div className="d-flex tabs flex-column flex-md-row align-items-center position-relative">
                    {tabs.map((tab, index) => (
                        <div className="tab__item" key={tab.text}>
                            <NavLink
                                to="#"
                                activeClassName={`${activeTab === tab.text && "active"}`}
                                onClick={() => onChangeTab(tab.text, index)}
                            >
                                <img src={tab.img} alt={tab.text} className="product-image img-fluid" />
                            </NavLink>
                        </div>
                    ))}
                </div>

                <div className="content__slider mt-3 position-relative">
                    <div className="product__arrows">
                        <div className="arrow arrow__left" onClick={onLeftClick}>
                            {ArrowLeft}
                        </div>
                        <div className="arrow arrow__right" onClick={onRightClick}>
                            {ArrowRight}
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-5 mb-3">
                            {content.content.map((item, idx) => (
                                <ContentItem productContent={item} key={idx} />
                            ))}

                            <div className="">
                                <Link
                                    to={`/products/${selectedProduct?._id}`}
                                    className="btn btn-warning d-block text-uppercase mt-3 mr-2"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="product__img">
                                <img
                                    src={
                                        selectedProduct?.animationFile
                                            ? assetUrl(selectedProduct?.animationFile)
                                            : GroupPhoto
                                    }
                                    alt={selectedProduct?.title}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const ContentItem: FC<ProductContentSchemaSingle> = ({ productContent }) => (
    <div className="side__item">
        <div className="icon">{productContent.icon}</div>
        <div className="text">
            <h6 className="keyword">{productContent.heading}</h6>
            <p className="description">{productContent.text}</p>
        </div>
    </div>
)

export default OurProduct
