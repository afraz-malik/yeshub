// @ts-nocheck
import React, { FC, ReactElement, useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ProductFAQ from "./Sections/ProductFAQ"
import ProductStories from "./Sections/ProductStories"
import VideoSection from "./Sections/VIdeoSection"
import { HomeApis } from "../../../../../Helpers/Request/Services/Home/Home"
import ProductTopBar from "./ProductTopBar"
import Footer from "../../../../../Shared/Footer"
import SelectLanguage from "./Sections/SelectLanguage"
import productJson from "../../../../../Constants/ProductsJSON"
import SolutionMainContainer from "../SolutionMainContainer"

const ProductPage: FC = (): ReactElement => {
    const [selectedProducts, setSelectedProducts] = useState<any>()
    const [lang, setLang] = useState("eng")
    const [products, setProducts] = useState([])
    const { id } = useParams()

    const [stories] = useState([
        {
            _id: "sasdasd",
            title: "This is a custom snippet that describes the story",
            description: "roseamongthorns",
        },
        { _id: "sasdas2", title: "This is a custom snippet that describes the story", description: "roseamongthorns" },
        { _id: "sasdas3", title: "This is a custom snippet that describes the story", description: "roseamongthorns" },
        { _id: "sasdas4", title: "This is a custom snippet that describes the story", description: "roseamongthorns" },
    ])

    useEffect(() => {
        HomeApis.getAllProducts(lang).then(response => {
            const sP = response.data.data.find((item: any) => item._id === id)
            setProducts(response.data.data)
            setSelectedProducts(sP)
        })
        // const sP = productJson.data.find((item: any) => item._id === id)
        // setProducts(productJson.data)
        // setSelectedProducts(sP)
    }, [id, lang])

    const onChangeLang = (lang: string) => setLang(lang)

    return (
        <SolutionMainContainer
            languareBar={<SelectLanguage lang={lang} onChange={onChangeLang} />}
            topbar={<ProductTopBar products={products} />}
        >
            {/* <div className="container products__container"> */}
            {/* <div className="row"> */}
            {/* <div className="col-2"></div> */}
            {/* <div className="col-12"> */}
            <div className="mc-border mt-4 mb-4">
                <VideoSection product={selectedProducts} />
            </div>
            <div className="mc-border py-2 mt-4 mb-4">
                <ProductFAQ
                    faqs={selectedProducts?.sections || []}
                    sidebar={selectedProducts?.recommendedTools || []}
                />
            </div>
            {/* </div> */}
            {/* <div className="col-2"></div> */}
            {/* </div> */}
            {/* </div> */}
        </SolutionMainContainer>
    )

    // return (
    //     <React.Fragment>
    //         <SelectLanguage lang={lang} onChange={onChangeLang} />
    //         <ProductTopBar products={products} />
    //         <div className="container products__container">
    //             <div className="row">
    //                 <div className="col-2"></div>
    //                 <div className="col-8">
    //                     <div className="mc-border mt-5 mb-4">
    //                         <VideoSection product={selectedProducts} />
    //                     </div>
    //                     <div className="mc-border py-2 mt-4 mb-4">
    //                         <ProductFAQ
    //                             faqs={selectedProducts?.sections || []}
    //                             sidebar={selectedProducts?.recommendedTools || []}
    //                         />
    //                     </div>
    //                 </div>
    //                 <div className="col-2"></div>
    //             </div>
    //         </div>
    //         {/* <ProductStories stories={stories} /> */}
    //         <Footer />
    //     </React.Fragment>
    // )
}

export default ProductPage
