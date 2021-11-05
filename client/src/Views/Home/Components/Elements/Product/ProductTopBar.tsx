import * as React from "react"
import { NavLink } from "react-router-dom"

import IProduct from "./../../../../../Models/User/Product"
import getProductImage from "../../../../../Helpers/Functions/getProductImage"

export interface ProductTopBarProps {
    products: IProduct[]
}

const ProductTopBar: React.SFC<ProductTopBarProps> = ({ products }) => {
    return (
        <div className="page--header__line">
            <div className="container position-relative">
                <div className="images">
                    {products.map(product => (
                        <NavLink exact activeClassName="active" to={`/products/${product._id}`} className="image">
                            <img src={getProductImage(product.title)} alt={product.title} />
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductTopBar
