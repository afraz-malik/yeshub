import React, { useState, useEffect } from 'react';
import {Input, Card, CardBody, Row, Col,Form, Label, Button, FormGroup} from "reactstrap";
import analytics from '../../api/analytic';
import communityApi from "../../api/community";
import ChartistGraph from 'react-chartist';
let from = new Date();
from.setDate(from.getDate() - 365);

const _filters = [
    { id: 365, value: "All Time" },
    { id: 1, value: 'Today' },
    { id: 7, value: "Last 7 days" },
    { id: 30, value: "Last Month" }
];
const convertToPieChartData2 = (data) => {
    console.log("input", data)
    let pie  = {
        data: {
        series: [data?.events?.totalEvens || 0, 1, ],
        labels: ['direct:'+data?.data?.pageviews, 'organic: 0']
    }, options: {
        donut: false
    }};
    console.log(pie);

    return pie;
}

const convertToPieChartData = (data) => {
    console.log("input", data)
    let pie  = {
        data: {
        series: [data?.events?.totalEvens || 1, data.data?.pageviews || 1, data.data?.members || 1, ],
        labels: ['clicks:'+data?.events?.totalEvents, 'pg. views:'+data.data?.pageviews, 'members:'+data.data?.members]
    }, options: {
        donut: false
    }};
    console.log(pie);

    return pie;
}

const data2 = {
    data:{
        series: [
            {value: 25, name: 'some 1', label: 'some 1'},
            {value: 55, name: 'some 2', label: 'some 2'},
            {value: 95, name: 'some 3', label: 'some 3'},
            {value: 125, name: 'some 4', label: 'some 4'},
        ],
        labels: [
            'some 1', 
            'some 2', 
            'some 3', 
            'some 4'
        ]
    },
    options: {
        donut: false
    },
    type: 'Pie'
}

const AnalyticItem = ({ community }) => {
    const [selectedCommunity, setSelectedCommunity] = useState({});
    const [communities, setcommunities] = useState([])
    const [analytic, setAnalytic] = useState({})
    const [pieData1, setPieData1] = useState(data2);
    const [pieData2, setPieData2] = useState(data2);
    const [selectedFilter, setSelectedFilter] = useState(_filters[0]);
    const [filters, setFilters] = useState(_filters);
    const [filter, setFilter] = useState({from: from, to: new Date()});

    const handleCommunityChange = (event) => {
        console.log(filter);

        analytics.geCommunityGA(event.target.value, filter.from, filter.to).then(res => {
            if(res.data.sessionDuration >100000) {
                let session = res.data.sessionDuration/res.data.pageviews;
                session /= 60;
                console.log(session);
                let time = session+"";
                session = time.split(".")[0];
                time = time.split(".")[1];
                
                console.log(time);
                time = Number("." +time) * 60;
                time = time + "";
                time = time.split(".")[0]
                
                res.data.session = session + " min" + time + " sec";
                 
            } else {
                res.data.session = "0 Mins";
            }
            let d = convertToPieChartData(res);
                console.log(d);
                setPieData1(d); 
                setPieData2(convertToPieChartData2(res));
            setAnalytic(res);
        })
        setSelectedCommunity({pagePath: event.target.value, id: event.target.value})
    }

    useEffect(() => {
        
          communityApi.fetch().then((response) => {
            let coms = response.data.docs;
            let c = [];
            coms.forEach(com => {
                c.push({id: `/${com.name}`, pagePath: `/${com.name}`})
            })
            setcommunities(c);
            setSelectedCommunity(c[0])
        });

          let from = new Date();
          from.setDate(from.getDate() - 365);
          analytics.geCommunityGA(communities[1], from, new Date()).then(res => {
              console.log(res);
              setAnalytic(res);
                          
          })

          

    }, [])
    

    const handleFilterChange = (event) => {
        filters.forEach(filter => {
            if (filter.id == event.target.value) {
                setSelectedFilter(filter);
                // break;
            }
        })
        let from = new Date();
        from.setDate(from.getDate() - Number(event.target.value))
        console.log(filter);
        analytics.geCommunityGA(event.target.value, from, filter.to).then(res => {
            if(res.data.sessionDuration >100000) {
                let session = res.data.sessionDuration/res.data.pageviews;
                session /= 60;
                console.log(session);
                let time = session+"";
                session = time.split(".")[0];
                time = time.split(".")[1];
                
                console.log(time);
                time = Number("." +time) * 60;
                time = time + "";
                time = time.split(".")[0]
                
                res.data.session = session + " min" + time + " sec";
                 
            } else {
                res.data.session = "0 Mins";
            }
            let d = convertToPieChartData(res);
                console.log(d);
                setPieData1(d); 
                setPieData2(convertToPieChartData2(res));
            setAnalytic(res);
        })
        setSelectedCommunity({pagePath: event.target.value, id: event.target.value})
        
    }


    const onFilterSubmit = () => {
        console.log('page path test', selectedCommunity.pagePath);
        analytics.geCommunityGA(selectedCommunity.pagePath, filter.from, filter.to).then(res => {
            if(res.data.sessionDuration >100000) {
                let session = res.data.sessionDuration/res.data.pageviews;
                session /= 60;
                console.log(session);
                let time = session+"";
                session = time.split(".")[0];
                time = time.split(".")[1];
                
                console.log(time);
                time = Number("." +time) * 60;
                time = time + "";
                time = time.split(".")[0]
                
                res.data.session = session + " min" + time + " sec";
                 
            } else {
                res.data.session = "0 Mins";
            }
            let d = convertToPieChartData(res);
                console.log(d);
                setPieData1(d); 
                setPieData2(convertToPieChartData2(res));
            setAnalytic(res);
        })
        
    }

    const handleChange = (event) => {
        const { type, checked, name, value } = event.target;

        setFilter({
            ...filter,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    return (
        <>
            <h3>{community.name}</h3>
            <Row>

                <Col md={3}>
                    <FormGroup>
                        <Input
                            name="productDropDown"
                            value={selectedCommunity.id}
                            onChange={handleCommunityChange}
                            type="select"
                        >
                            {communities.map((stage) => (
                                <option key={stage._id} value={stage.id}>
                                    ({stage.pagePath})
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={5}>
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
            <Row>
                <Col md="8">
                    <Card>
                        <CardBody>
                                <div className="flex margin--btm">
                                    <div className="analytic--item flex1 md-pd">
                                        <p className="text-center margin--btm--zero">No. of resource clicked</p>
                                        <p className="text-center margin--btm--zero"><strong>{analytic?.events?.totalEvents || 0}</strong></p>
                                    </div>
                                    <div className="analytic--item flex1 md-pd">
                                        <p className="text-center margin--btm--zero">No. of Visits</p>
                                        <p className="text-center margin--btm--zero"><strong>{analytic?.data?.pageviews || 0}</strong></p>
                                    </div>
                                    <div className="flex1 analytic--item md-pd">
                                        <p className="text-center margin--btm--zero">No. of Members</p>
                                        <p className="text-center margin--btm--zero"><strong>{analytic?.data?.members}</strong></p>
                                    </div>
                                </div>                           
                                <div className="flex margin--btm">
                                    <div className="analytic--item flex1 md-pd">
                                        <p className="text-center margin--btm--zero">Ave Session Duration</p>
                                        <p className="text-center margin--btm--zero"><strong>{analytic.data?.session || '0 Min'}</strong></p>
                                    </div>
                                    {/* <div className="flex1 analytic--item md-pd">
                                        <p className="text-center margin--btm--zero">No. of Logins</p>
                                        <p className="text-center margin--btm--zero"><strong>Registered Users: 50 mins</strong></p>
                                    </div> */}
                                </div>  

                                <p> <strong>Acquistion States:</strong></p>  
                                <div className="flex margin--btm">
                                    <div className="analytic--item flex1 md-pd">
                                        <p className="text-center margin--btm--zero">No. via Organic Search</p>
                                        <p className="text-center margin--btm--zero"><strong>0</strong></p>
                                    </div>
                                    <div className="analytic--item flex1 md-pd">
                                        <p className="text-center margin--btm--zero">No. via Direct Url</p>
                                        <p className="text-center margin--btm--zero"><strong>{analytic?.data?.pageviews || 0}</strong></p>
                                    </div>
                                    {/* <div className="flex1 analytic--item md-pd">
                                        <p className="text-center margin--btm--zero">No. via refferals</p>
                                        <p className="text-center margin--btm--zero"><strong>0</strong></p>
                                    </div> */}
                                </div>                       
                            </CardBody>
                            </Card>
                    </Col>
                    {/* <Col md="4">
                        <Card>
                            <CardBody>
                                <ChartistGraph data={pieData1.data} options={pieData1.options} type={pieData1.type} />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <ChartistGraph data={pieData2.data} options={pieData2.options} type={pieData2.type} />
                            </CardBody>
                        </Card>
                    </Col>                   */}
            </Row>
            <br/>
            </>
    
    )
}

function CommunityGA() {
    const [siteData, setSiteData] = useState({});
    useEffect(() => {
        console.log('use effect called')
        
        
    }, [])
    return (
        <React.Fragment>
            <div className="content">
                <AnalyticItem community = {siteData} />            
            </div>
        </React.Fragment> 
    );
}

export default CommunityGA