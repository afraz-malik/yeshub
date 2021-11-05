import React, { FC, ReactElement } from "react"

type Stories = {
    stories: any[]
}

export interface ProductStoriesItemProps {
    item: any
}

const ProductStories: FC<Stories> = ({ stories }): ReactElement => {
    return (
        <section className="py-5 bg-light-grey">
            <div className="container">
                <div className="section__heading">
                    <h3 className="stories__heading text-left"> Stories from the Community </h3>
                </div>

                <div className="row position-relative">
                    <div className="arrows">
                        <span className="arrow-left">
                            <i className="fa fa-angle-left"></i>
                        </span>
                        <span className="arrow-right">
                            <i className="fa fa-angle-right"></i>
                        </span>
                    </div>

                    {stories.map((item: any, idx) => (
                        <ProductStoriesItem item={item} key={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const ProductStoriesItem: FC<ProductStoriesItemProps> = ({ item }): ReactElement => {
    return (
        <div className="col-sm-6 col-md-3 mb-3">
            <div className="card article__item">
                {/* <img className="card-img-top" src={item.image} alt={item.title} /> */}
                <div className="placeholder__color"></div>
				<div className="card-body justify-content-start">
                    <span className="card-title title">{item.title}</span> | {" "}
                    <span className="author">{item.description}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductStories
