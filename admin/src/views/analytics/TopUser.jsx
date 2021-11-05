import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, CardHeader, FormGroup, Input, Form, Label, Button} from "reactstrap";
import analytics from '../../api/analytic';

const react_ganalytics_key = "AIzaSyA_Y2Co2u-0V3F9URTtkC1FazKb4UI5ZQc";
const viewID = "229344495";
const _filters = [
    {id: 9000, value: "All Time"},
    {id: 1, value: 'Today'},
    {id: 7, value: "Last 7 days"},
    {id: 30, value: "Last Month"}
];

const ANTableRow = ({user, index}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{user?.user?.userName}</td>
            <td>{user?.totalPosts}</td>
            <td>{user?.comments}</td>
            <td>{user?.votes}</td>
        </tr>
    )
}

const TopUsers = () => {
    const [users, setUser] = useState([]);
    const [filters, setfilters] = useState(_filters);
    const [selectedFilter, setselectedFilter] = useState(_filters[0])
    const [filter, setFilter] = useState({
        to: (new Date()).toString(),
        from: ""
    })

    const handleChange = (event) => {
        const { type, checked, name, value } = event.target;

        setFilter({
            ...filter,
            [name]: type === "checkbox" ? checked : value,
        });
    }
    useEffect(() => {
        analytics.getTopUsers().then(res => {
            console.log(res.data);
            setUser(res.data);
        })        
    }, [])

    const handleFilterChange = (e) => {
        alert(e.target.value);
        filters.forEach(filter => {
            if(filter.id == e.target.value) {
                setselectedFilter(filter);
                // break;
            }
        })
        let date = new Date();
        date.setDate(date.getDate() - Number(e.target.value));
        analytics.getTopUsers(date).then(res => {
            console.log(res.data);
            setUser(res.data);
        })
    }

    const onSubmitFilter = ()  => {
        analytics.getTopUsers(filter.from, filter.to).then(res => {
            setUser(res.data);
        })
    }

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    
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
                    <Col md={6}>
                        <Form inline onSubmit={handleFilterChange}>
                            <FormGroup>
                                <Label for="from" hidden>From</Label>
                                <Input type="date" name="from" id="from" value={filter.from} onChange={handleChange} />
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Label for="to" hidden>To</Label> 
                                <Input type="date" name="to" id="to" value={filter.to || new Date()} onChange={handleChange}/>
                            </FormGroup>
                            {' '}

                            <FormGroup>
                                <Button className="btn btn-primary" onClick={onSubmitFilter}>Filter</Button>
                            </FormGroup>
                            
                        </Form>
                    </Col>
                </Row>
                
                <Card>
                    <CardHeader>
                        Top 10 Users
                    </CardHeader>
                    <CardBody>
                    <table className="table table-striped">
                        <thead>
                            <th>No.</th>
                            <th>Name.</th>
                            <th>No. Posts</th>
                            <th>No. Comments</th>
                            <th>No. of Votes</th>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <ANTableRow user={user} index={index} />)
                            }
                            {
                                !users.length && <p><strong>No Content Available</strong></p>
                            }
                        </tbody>
                    </table> 

                    </CardBody>

                </Card>
                           
            </div>
            
        </React.Fragment> 

    );
}

export default TopUsers