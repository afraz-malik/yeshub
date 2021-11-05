
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

const Products = () => {
    const [products, setProducts] = useState([]);
    const [language, setLanguage] = useState("eng");


    return null;
};

export default Products;
