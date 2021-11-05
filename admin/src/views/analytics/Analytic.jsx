import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Input, FormGroup, Form, Label, Button } from "reactstrap";
import analytics from '../../api/analytic';

let lastSelectedCommunity = 0;

const _filters = [
    { id: 9000, value: "All Time" },
    { id: 1, value: 'Today' },
    { id: 7, value: "Last 7 days" },
    { id: 30, value: "Last Month" }
];

const AnalyticItem = ({ community }) => {

    return (
        <>
            <h3>{community.name}</h3>
            <Row>
                <Col md="3">
                    <Card>
                        <CardBody>
                            <div className="md-pd">
                                <p className="text-center zero-mg">No. Of Members</p>
                                <p className="text-center lg-fonts zero-mg"><strong>{community.joined}</strong></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                

                <Col md="3">
                    <Card>
                        <CardBody>
                            <div className="md-pd">
                                <p className="text-center zero-mg">No. Of Post</p>
                                <p className="text-center lg-fonts zero-mg"><strong>{community.posts}</strong></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="3">
                    <Card>
                        <CardBody>
                            <div className="md-pd">
                                <p className="text-center zero-mg">No. Of Comments</p>
                                <p className="text-center lg-fonts zero-mg"><strong>{community.comments}</strong></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="3">
                    <Card>
                        <CardBody>
                            <div className="md-pd">
                                <p className="text-center zero-mg">No. Of Helpfull Votes in posts</p>
                                <p className="text-center lg-fonts zero-mg"><strong>{community.votes}</strong></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="3">
                    <Card>
                        <CardBody>
                            <div className="md-pd">
                                <p className="text-center zero-mg">No. Of Helpfull Votes in comments</p>
                                <p className="text-center lg-fonts zero-mg"><strong>{community.votesInComments}</strong></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="3">
                    <Card>
                        <CardBody>
                            <div className="md-pd">
                                <p className="text-center zero-mg">No. Of Award</p>
                                <p className="text-center lg-fonts zero-mg"><strong>0</strong></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="3">
                    <Card>
                        <CardBody>
                            <div className="md-pd">
                                <p className="text-center zero-mg">No. Of Reports</p>
                                <p className="text-center lg-fonts zero-mg"><strong>{community.reports}</strong></p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
            <br />
        </>

    )
}
function Analytic() {
    const [communities, setCommunities] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(_filters[0]);
    const [filters, setFilters] = useState(_filters);
    // // const [, set] = useState(initialState)
    const [filter, setFilter] = useState({
        from: "",
        to: ""
    })

    useEffect(() => {
        console.log('use effect called')
        analytics.getCommunities().then((res) => {
            console.log(res);
            setCommunities(res);
            setSelectedCommunity(res[0])
        }, error => console.log(error))

    }, [])


    const handleChange = (event) => {
        const { type, checked, name, value } = event.target;

        setFilter({
            ...filter,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const handleCommunityChange = (e) => {
        e.preventDefault();
        console.log('event change ', e);
        const sIndex = communities.findIndex((product) => product._id === e.target.value);
        if (sIndex !== -1) {
            lastSelectedCommunity = sIndex;
            setSelectedCommunity(communities[sIndex]);
        }
    }

    const handleFilterChange = (e) => {
        filters.forEach(filter => {
            if (filter.id == e.target.value) {
                setSelectedFilter(filter);
                // break;
            }
        })
        let date = new Date();
        date.setDate(date.getDate() - Number(e.target.value))
        analytics.getCommunities(date).then(res => {
            console.log(res);
            setCommunities(res);
            let selected = selectedCommunity;
            for(let i = 0; i<res.length; i++) {
                if(res[i]._id == selected._id) {
                    console.log('found', res[i]);
                    setSelectedCommunity(res[i]);
                    break;
                }   
            }
        })
    }


    const onFilterSubmit = () => {
        analytics.getCommunities(filter.from, filter.to).then(res => {
            console.log(res);
            setCommunities(res);
            let selected = selectedCommunity;
            for(let i = 0; i<res.length; i++) {
                if(res[i]._id == selected._id) {
                    setSelectedCommunity(res[i]);
                    break;
                }   
            }
        })
    }
    return (
        <React.Fragment>

            <div className="content">
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Input
                                name="filter"
                                value={selectedCommunity._id}
                                onChange={handleCommunityChange}
                                type="select"
                            >
                                {communities.map((stage) => (
                                    <option key={stage._id} value={stage._id}>
                                        ({stage.name})
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <Form inline onSubmit={onFilterSubmit}>
                            <FormGroup>
                                <Label for="from" hidden>From</Label>
                                <Input type="date" name="from" id="from" value={filter.from} onChange={handleChange} />
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Label for="to" hidden>To</Label>
                                <Input type="date" name="to" id="to" value={filter.to} onChange={handleChange}/>
                            </FormGroup>
                            {' '}

                            <FormGroup>
                                <Button className="btn btn-primary" onClick={onFilterSubmit}>Filter</Button>
                            </FormGroup>
                            
                            </Form>

                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                
                                <Input
                                    name="productDropDown"
                                    value={selectedFilter.id}
                                    onChange={handleFilterChange}
                                    type="select"
                                >
                                    {filters.map((filter, idx) => (
                                        <option key={idx} value={filter.id}>
                                            ({filter.value})
                                        </option>
                                    ))}
                                </Input>
                        </FormGroup>
                    </Col>

                </Row>
                <AnalyticItem community={selectedCommunity} />

            </div>
        </React.Fragment>
    );
}

export default Analytic