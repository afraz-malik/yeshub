import React, { useEffect, useState } from "react";
import { Row, Col, Button, Jumbotron, Container, FormGroup, Input } from "reactstrap";
import productApi from "../../api/product";
import productSectionApi from "../../api/product-section";
import productToolApi from "../../api/product-recommended-tool";

import HeaderContent from "../../components/DynamicContent/HeaderContent";
import SectionItem from "../../components/DynamicContent/SectionItem";
import ToolSidebar from "../../components/DynamicContent/ToolSidebar";

import getYouTubeVideoId from "../../helper/getYoutubeVideoId";
import convertToFormData from "../../helper/convertToFormData";

import "./../../assets/css/landing__pages.css";
import SelectLanguage from "./SelectLanguage";

let lastSelectedProduct = 0;
const Products = () => {
    const [products, setProducts] = useState([]);
    const [language, setLanguage] = useState("eng");
    const [selectedProduct, setSelectedProduct] = useState({
        title: "",
        shortDescription: "",
        videoUrl: "",
        description: "",
    });
    const [sections, setSections] = useState([]);
    const [tools, setTools] = useState([]);

    useEffect(() => {
        productApi.fetch(language).then((response) => {
            if (response.data.length > 0) {
                setProducts([...response.data]);
                setSelectedProduct({ ...response.data[lastSelectedProduct] });
            }
        });
    }, [language]);

    useEffect(() => {
        if (products.length > lastSelectedProduct) {
            setSelectedProduct({ ...products[lastSelectedProduct] });
        } else {
            lastSelectedProduct = 0;
            setSelectedProduct({ ...products[lastSelectedProduct] });
        }
    }, [products]);

    useEffect(() => {
        const selectedProductIndex = products.findIndex((product) => product._id === selectedProduct._id);

        if (
            selectedProductIndex !== -1 &&
            JSON.stringify(products[selectedProductIndex].recommendedTools) !==
                JSON.stringify(selectedProduct.recommendedTools)
        ) {
            products[selectedProductIndex] = {
                ...products[selectedProductIndex],
                recommendedTools: selectedProduct.recommendedTools,
            };
            setProducts(products);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProduct.recommendedTools]);

    useEffect(() => {
        const selectedProductIndex = products.findIndex((product) => product._id === selectedProduct._id);

        if (
            selectedProductIndex !== -1 &&
            JSON.stringify(products[selectedProductIndex].sections) !== JSON.stringify(selectedProduct.sections)
        ) {
            products[selectedProductIndex] = {
                ...products[selectedProductIndex],
                sections: [...selectedProduct.sections],
            };
            setProducts(products);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProduct.sections]);

    useEffect(() => {
        setSections([...(selectedProduct.sections || [])]);
    }, [selectedProduct.sections]);

    useEffect(() => {
        setTools([...(selectedProduct.recommendedTools || [])]);
    }, [selectedProduct.recommendedTools]);

    const handleProductChange = (event) => {
        const pIndex = products.findIndex((product) => product._id === event.target.value);
        if (pIndex !== -1) {
            setSelectedProduct(products[pIndex]);
            lastSelectedProduct = pIndex;
        }
    };

    const addAnotherSection = () => {
        setSections([
            ...sections,
            {
                title: "New Section",
                body: "New Section Body",
            },
        ]);
    };

    const handleProductSubmit = (values) => {
        const data = convertToFormData(values);

        productApi.update(data, selectedProduct._id, language).then(() => {
            const prodIndex = products.findIndex((product) => product._id === selectedProduct._id);
            products[prodIndex] = { ...products[prodIndex], ...values };

            setProducts(products);
            setSelectedProduct({ ...selectedProduct, ...values });
        });
    };

    const handleSectionSubmit = (values) => {
        if (values._id) {
            productSectionApi.update(values, selectedProduct._id, values._id, language).then((response) => {
                const prodIndex = products.findIndex((product) => product._id === selectedProduct._id);
                const sectionIndex = selectedProduct.sections.findIndex((section) => section._id === values._id);
                products[prodIndex].sections[sectionIndex] = { ...response.data };
                setSelectedProduct({
                    ...selectedProduct,
                    sections: [...products[prodIndex].sections],
                });
            });
        } else {
            productSectionApi
                .add(
                    {
                        ...values,
                        productId: selectedProduct._id,
                    },
                    language
                )
                .then((response) => {
                    const prodIndex = products.findIndex((product) => product._id === selectedProduct._id);
                    products[prodIndex].sections = [...products[prodIndex].sections, response.data];
                    setProducts(products);
                });
        }
    };

    const handleToolSubmit = (values) => {
        if (values._id) {
            productToolApi.update(values, selectedProduct._id, values._id, language).then((response) => {
                const prodIndex = products.findIndex((stage) => stage._id === products._id);
                const toolIndex = tools.findIndex((tool) => tool._id === values._id);
                products[prodIndex].recommendedTools[toolIndex] = { ...response.data };
                setProducts(products);
                setSelectedProduct({ ...selectedProduct, recommendedTools: [...products[prodIndex].recommendedTools] });
            });
        } else {
            productToolApi.add({ ...values, productId: selectedProduct._id }, language).then((response) => {
                setSelectedProduct({
                    ...selectedProduct,
                    recommendedTools: [...tools, response.data],
                });
            });
        }
    };

    const deleteSectionHandler = (sid) => {
        productSectionApi.delete(selectedProduct._id, sid, language).then(() => {
            const sects = selectedProduct.sections.filter((section) => section._id !== sid);
            setSelectedProduct({ ...selectedProduct, sections: sects });
        });
    };

    const deleteToolHandler = (tid) => {
        productToolApi.delete(selectedProduct._id, tid, language).then(() => {
            const pTools = selectedProduct.recommendedTools.filter((stage) => stage._id !== tid);
            setSelectedProduct({ ...selectedProduct, recommendedTools: [...pTools] });
        });
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <React.Fragment>
            <div className="content bg-white pt-4" key={selectedProduct._id}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Input
                                    name="productDropDown"
                                    value={selectedProduct._id}
                                    onChange={handleProductChange}
                                    type="select"
                                >
                                    {products.map((product) => (
                                        <option key={product._id} value={product._id}>
                                            {product.title}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <SelectLanguage selected={language} onChange={handleLanguageChange} />
                    </Row>
                </Container>
                <section className="mb-4">
                    <Container>
                        <Row>
                            <Col>
                                <Jumbotron className="bg-light-grey">
                                    <Row>
                                        <Col md={5}>
                                            <HeaderContent handleSubmit={handleProductSubmit} {...selectedProduct} />
                                        </Col>
                                        <Col md={7} className="d-flex align-items-center mt-3 mt-md-0">
                                            <iframe
                                                className="header__video"
                                                src={getYouTubeVideoId(selectedProduct.videoUrl || "")}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={`Video of ${selectedProduct.title}`}
                                            />
                                        </Col>
                                    </Row>
                                </Jumbotron>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="my-4">
                    <Container>
                        <Row>
                            <Col md={8}>
                                {sections.map((section, index) => (
                                    <SectionItem
                                        handleSubmit={handleSectionSubmit}
                                        {...section}
                                        key={index}
                                        pid={selectedProduct._id}
                                        sectionDeleteHandler={deleteSectionHandler}
                                    />
                                ))}

                                <div className="add__another-section" onClick={addAnotherSection}>
                                    + Add Another
                                </div>
                            </Col>
                            <Col md={4} className="mt-3 mt-md-0">
                                <ToolSidebar
                                    tools={tools}
                                    handleDelete={deleteToolHandler}
                                    handleSubmit={handleToolSubmit}
                                />

                                <Button color="warning" size="lg" className="btn-block mt-3">
                                    VISIT COMMUNITY
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </React.Fragment>
    );
};

export default Products;
