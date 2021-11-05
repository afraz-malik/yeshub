import React, { Component } from "react"
import { Container as Grid, Row, Col } from "react-bootstrap"
import PropTypes from "prop-types"
import Modal from "./Modal"

class Images extends Component {
    static defaultProps = {
        countFrom: 5,
        hideOverlay: false,
        images: [],
        onClickEach: null,
        overlayBackgroundColor: "#222222",
        renderOverlay: () => "Preview Image",
        width: 100,
    }

    constructor(props) {
        super(props)

        this.state = {
            countFrom: props.countFrom > 0 && props.countFrom < 5 ? props.countFrom : 5,
            // countFrom:props.countFrom,

            modal: false,
        }

        this.openModal = this.openModal.bind(this)
        this.onClose = this.onClose.bind(this)

        if (props.countFrom <= 0 || props.countFrom > 5) {
            console.warn("countFrom is limited to 5!")
        }
    }

    onClose() {
        this.setState({ modal: false })
    }

    openModal(index) {
        const { onClickEach, images } = this.props

        if (onClickEach) {
            return onClickEach({ index, src: images[index] })
        }

        this.setState({ index, modal: true })
    }

    renderOne(length) {
        const { width, images } = this.props
        const { countFrom } = this.state
        const height = length > 2 ? 200 : 400
        const overlay =
            images.length > countFrom && countFrom === 1 ? this.renderCountOverlay(true) : this.renderOverlay()

        return (
            <Grid
                style={{ width: `${width}%` }}
                className={`height-${images.length === 1 || countFrom === 1 ? "one" : "two"}`}
            >
                <Row style={{ width: "100%" }} key={Math.random()}>
                    <Col
                        key={Math.random()}
                        xs={12}
                        md={12}
                        className="background"
                        onClick={this.openModal.bind(this, 0)}
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            background: `url(${images[0]})`,
                            height: height,
                        }}
                    >
                        <img style={{ opacity: 0 }} src={images[0]} />
                        <ImageOverlay />
                    </Col>
                </Row>
            </Grid>
        )
    }

    renderTwo(length) {
        const { images } = this.props
        const { countFrom } = this.state
        const height = length > 2 ? 200 : 400
        const overlay =
            images.length > countFrom && [2, 3].includes(+countFrom)
                ? this.renderCountOverlay(true)
                : this.renderOverlay()
        // const height = images.length === 2 ? "100%" : 200
        const conditionalRender =
            [3, 4].includes(images.length) || (images.length > +countFrom && [3, 4].includes(+countFrom))

        return (
            <Grid style={{ width: "100%", height }}>
                <Row style={{ width: "100%", height: height }} key={Math.random()}>
                    <Col
                        key={Math.random()}
                        xs={6}
                        md={6}
                        onClick={this.openModal.bind(this, conditionalRender ? 1 : 0)}
                        className="fb-image-grid-div"
                        style={{
                            backgroundImage: `url(${conditionalRender ? images[1] : images[0]})`,
                            height: height,
                        }}
                    >
                        <img style={{ opacity: 0 }} src={`${conditionalRender ? images[1] : images[0]}`} />
                        {/* {this.renderOverlay()} */}
                        <ImageOverlay />
                    </Col>
                    <Col
                        key={Math.random()}
                        xs={6}
                        md={6}
                        onClick={this.openModal.bind(this, conditionalRender ? 2 : 1)}
                        className="fb-image-grid-div"
                        style={{
                            backgroundImage: `url(${conditionalRender ? images[2] : images[1]})`,
                            height: height,
                        }}
                    >
                        <img
                            style={{ opacity: 0, border: "2px solid red" }}
                            src={`${conditionalRender ? images[2] : images[1]}`}
                        />
                        <ImageOverlay />
                        {/* {overlay} */}
                    </Col>
                </Row>
            </Grid>
        )
    }

    renderThree(length) {
        const { images } = this.props
        const { countFrom } = this.state
        const height = length > 2 ? 200 : 400
        const overlay =
            !countFrom || countFrom > 5 || (images.length > countFrom && [4, 5].includes(+countFrom))
                ? this.renderCountOverlay(true)
                : this.renderOverlay()
        // const height = `${33 * (width / 100)}%`
        const conditionalRender = images.length === 4 || (images.length > +countFrom && +countFrom === 4)

        const m = length > 4 ? true : false
        return (
            <Grid style={{ width: "100%", height: "500px" }}>
                <Row style={{ width: "100%", height: height + "px" }} key={Math.random()}>
                    <Col
                        key={Math.random()}
                        xs={6}
                        md={4}
                        onClick={this.openModal.bind(this, conditionalRender ? 1 : 2)}
                        className="fb-image-grid-div"
                        style={{
                            backgroundImage: `url(${conditionalRender ? images[1] : images[2]})`,
                            height: height,
                        }}
                    >
                        <img style={{ opacity: 0 }} src={conditionalRender ? images[1] : images[2]} />
                        {/* {this.renderOverlay()} */}
                        <ImageOverlay />
                    </Col>
                    <Col
                        key={Math.random()}
                        xs={6}
                        md={4}
                        onClick={this.openModal.bind(this, conditionalRender ? 2 : 3)}
                        className="fb-image-grid-div"
                        style={{
                            backgroundImage: `url(${conditionalRender ? images[2] : images[3]})`,
                            height: height,
                        }}
                    >
                        <img style={{ opacity: 0 }} src={conditionalRender ? images[2] : images[3]} />
                        <ImageOverlay />
                    </Col>
                    <Col
                        key={Math.random()}
                        xs={6}
                        md={4}
                        onClick={this.openModal.bind(this, conditionalRender ? 3 : 4)}
                        className="fb-image-grid-div"
                        style={{
                            backgroundImage: `url(${conditionalRender ? images[3] : images[4]})`,
                            height: height,
                        }}
                    >
                        <img style={{ opacity: 0 }} src={conditionalRender ? images[3] : images[4]} />
                        {overlay}
                    </Col>
                </Row>
            </Grid>
        )
    }

    renderOverlay() {
        const { hideOverlay, renderOverlay, overlayBackgroundColor, width } = this.props
        const fontSize = `${3 * (width / 100)}%`

        if (hideOverlay) {
            return false
        }

        return [
            <div key={Math.random()} className="cover slide" style={{ backgroundColor: overlayBackgroundColor }} />,
            <div key={Math.random()} className="cover-text slide animate-text" style={{ fontSize }}>
                {renderOverlay()}
            </div>,
        ]
    }

    renderCountOverlay(more) {
        const { images, width } = this.props
        const { countFrom } = this.state
        const extra = images.length - (countFrom && countFrom > 4 ? 4 : countFrom)
        const fontSize = `${7 * (width / 100)}%`

        return [
            more && <div key={Math.random()} className="cover" />,
            more && (
                <div key={Math.random()} className="cover-text" style={{ fontSize: fontSize, display: "block" }}>
                    <p>+{extra}</p>
                </div>
            ),
        ]
    }

    render() {
        const { modal, index, countFrom } = this.state
        const { images, width } = this.props
        const imagesToShow = [...images]

        if (countFrom && images.length > countFrom) {
            imagesToShow.length = countFrom
        }

        return (
            <div
                className="react-fb-image-grid"
                style={{
                    width: `${width}%`,
                    height: `${width}%`,
                }}
            >
                {[1, 3, 4].includes(imagesToShow.length) && this.renderOne(imagesToShow.length)}
                {imagesToShow.length >= 2 && imagesToShow.length !== 4 && this.renderTwo(imagesToShow.length)}
                {imagesToShow.length >= 4 && this.renderThree(imagesToShow.length)}

                {modal && <Modal onClose={this.onClose} index={index} images={images} />}
            </div>
        )
    }
}

Images.propTypes = {
    countFrom: PropTypes.number,
    hideOverlay: PropTypes.bool,
    onClickEach: PropTypes.func,
    overlayBackgroundColor: PropTypes.string,
    renderOverlay: PropTypes.func,
    width: PropTypes.number,
}

export default Images
export const ImageOverlay = ({}) => {
    return <div className="fb-image-grid-overlay"></div>
}
