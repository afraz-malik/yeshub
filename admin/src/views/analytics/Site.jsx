import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, CardHeader, Form, FormGroup, Label, Input, Button} from "reactstrap";
import analytics from '../../api/analytic';
import ChartistGraph from 'react-chartist';
const convertToPieChartData = (data) => {
    console.log("input", data)
    let pie  = {
        data: {
        series: [data.pageviews, data.totalMembers || 200],
        labels: ['pg. views:'+data.pageviews, 'members:'+data.totalMembers]
    }, options: {
        donut: false
    }};
    console.log(pie);

    return pie;
}
const convertToPieChartData2 = (data) => {
    console.log("input", data)
    let pie  = {
        data: {
        series: [data.pageviews, 0],
        labels: ['Direct:'+data.pageviews, 'organic:'+0]
    }, options: {
        donut: false
    }};
    console.log(pie);

    return pie;
}
const data = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [
      [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    ]
  };

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
  const options = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

 const type = 'Bar'
 const _filters = [
    { id: 365, value: "All Time" },
    { id: 1, value: 'Today' },
    { id: 7, value: "Last 7 days" },
    { id: 30, value: "Last Month" }
];

const AnalyticItem = ({ community }) => {

    const [site, setsite] = useState({});
    const [pieChart1, setpieChart1] = useState(data2);
    const [pieChart2, setpieChart2] = useState(data2);
    const [selectedFilter, setSelectedFilter] = useState(_filters[0]);
    const [filters, setFilters] = useState(_filters);
    const [filter, setFilter] = useState({from: (new Date()).toString(), to: new Date()});

    useEffect(() => {
        let from = new Date();
        from.setDate(from.getDate() - 365);
        analytics.getSiteAnalytics(from, new Date()).then(res => {
            console.log(res.data);
            let session = res.data.sessionDuration/res.data.pageviews;
            session /= 60;
            let time = session+"";
            session = time.split(".")[0];
            time = time.split(".")[1];
            time = Number("." +time) * 60;
            time = time + "";
            time = time.split(".")[0]
            res.data.session = session + " min" + time + " sec";

            // uncomment below lines for pie charts later
            // setpieChart1(convertToPieChartData(res.data));
            // setpieChart2(convertToPieChartData2(res.data))

            setsite(res.data);
        })
    }, [])


    const handleFilterChange = (e) => {
        filters.forEach(filter => {
            if (filter.id == e.target.value) {
                setSelectedFilter(filter);
                // break;
            }
        })
        let from = new Date();
        from.setDate(from.getDate() - Number(e.target.value))
        analytics.getSiteAnalytics(from, new Date()).then(res => {
            console.log(res.data);
            let session = res.data.sessionDuration/res.data.pageviews;
            session /= 60;
            let time = session+"";
            session = time.split(".")[0];
            time = time.split(".")[1];
            time = Number("." +time) * 60;
            time = time + "";
            time = time.split(".")[0]
            res.data.session = session + " min" + time + " sec";

            // uncomment below lines for pie charts later
            // setpieChart1(convertToPieChartData(res.data));
            // setpieChart2(convertToPieChartData2(res.data))

            setsite(res.data);
        })
        
    }


    const onFilterSubmit = () => {
        console.log('filter', filter);
        analytics.getSiteAnalytics(filter.from, filter.to).then(res => {
            console.log(res.data);
            let session = res.data.sessionDuration/res.data.pageviews;
            session /= 60;
            let time = session+"";
            session = time.split(".")[0];
            time = time.split(".")[1];
            time = Number("." +time) * 60;
            time = time + "";
            time = time.split(".")[0]
            res.data.session = session + " min" + time + " sec";

            // uncomment below lines for pie charts later
            // setpieChart1(convertToPieChartData(res.data));
            // setpieChart2(convertToPieChartData2(res.data))

            setsite(res.data);
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
                                        <p className="text-center margin--btm--zero">No. of registration</p>
                                        <p className="text-center margin--btm--zero"><strong>{site.totalMembers}</strong></p>
                                    </div>
                                    <div className="analytic--item flex1 md-pd">
                                        <p className="text-center margin--btm--zero">No. of Visits</p>
                                        <p className="text-center margin--btm--zero"><strong>{site.pageviews}</strong></p>
                                    </div>
                                    {/* <div className="flex1 analytic--item md-pd">
                                        <p className="text-center margin--btm--zero">No. of Logins</p>
                                        <p className="text-center margin--btm--zero"><strong>200</strong></p>
                                    </div> */}
                                </div>                           
                                <div className="flex margin--btm">
                                    <div className="analytic--item flex1 md-pd">
                                        <p className="text-center margin--btm--zero">Ave Session Duration</p>
    <p className="text-center margin--btm--zero"><strong> {site.session}</strong></p>
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
                                        <p className="text-center margin--btm--zero"><strong>{site.pageviews}</strong></p>
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
                            <ChartistGraph data={pieChart1.data} options={pieChart1.options} type={pieChart1.type} />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <ChartistGraph data={pieChart2.data} options={pieChart2.options} type={pieChart2.type} />
                        </CardBody>
                    </Card>
                </Col>                 */}
            </Row>
            <br/>
            </>
    
    )
}
function SiteAnalytic() {
    const [siteData, setSiteData] = useState({});
    useEffect(() => {
    }, [])
    return (
        <React.Fragment>
            <div className="content">
                <AnalyticItem community = {siteData} />            
            </div>
        </React.Fragment> 
    );
}

export default SiteAnalytic