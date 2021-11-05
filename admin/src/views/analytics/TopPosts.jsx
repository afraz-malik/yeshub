import React, { useState, useEffect } from 'react';
import { Card, FormGroup, Input, CardBody, Row, Col, CardHeader, Form, Label, Button} from "reactstrap";
import analytics from '../../api/analytic';

const _filters = [
    {id: 9000, value: "All Time"},
    {id: 1, value: 'Today'},
    {id: 7, value: "Last 7 days"},
    {id: 30, value: "Last Month"}
];

const ANTableRow = ({post, index}) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{post.title}</td>
            <td>{post.author?.userName || "deleted"}</td>
            <td>{post.knowledgeGroup?.name}</td>
            <td>{post.totalVotes}</td>
            <td>{post.totalComments}</td>
        </tr>
    )
}

const TopPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filters, setfilters] = useState(_filters);
    const [selectedFilter, setselectedFilter] = useState(_filters[0]);
    const [filter, setFilter] = useState({
        to: (new Date()).toString(),
        from: ""
    })
    
    useEffect(() => {
        analytics.getTopPosts().then(res => {
            console.log(res.data);
            setPosts(res.data);
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
        let from = new Date();
        from.setDate(from.getDate() - Number(e.target.value))
        analytics.getTopPosts(from).then(res => {
            console.log(res.data);
            setPosts(res.data);
        })
    }

    const onSubmitFilter = ()  => {
        analytics.getTopPosts(filter.from, filter.to).then(res => {
            setPosts(res.data);
        })
    }

    const handleChange = (event) => {
        const { type, checked, name, value } = event.target;

        setFilter({
            ...filter,
            [name]: type === "checkbox" ? checked : value,
        });
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
                        <Form inline onSubmit={onSubmitFilter}>
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
                        Top 10 posts
                    </CardHeader>
                    <CardBody>
                        <table className="table table-striped">
                            <thead>
                                <th>No.</th>
                                <th>Title.</th>
                                <th>Contributor</th>
                                <th>Community</th>
                                <th>No. of helpful</th>
                                <th>No. Of Comments</th>
                            </thead>
                            <tbody>
                                {
                                    posts.map((post, index) => <ANTableRow post={post} index={index} />)
                                }
                            </tbody>
                        </table>                    
                    </CardBody>
                </Card>
                </div>
        </React.Fragment> 
    );
}

export default TopPosts