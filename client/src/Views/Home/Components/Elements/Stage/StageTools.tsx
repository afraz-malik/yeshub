import React from "react"
import Select from "react-select"
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap"

import { allDummyStages } from "./stage-data"
import { ToolItem } from "./StagePage"
const specificTools = [
    {
        id: 0,
        original: "Best Practices Guidelines and Toolkit on Engaging the Private Sector in Skills Development - P.pdf",
        link: "https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A09%3A24.905Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf",
    },
    {
        id: 1,
        original: "FNO-Gender_in_YEE-FNO report-Final-EO-Eng-Oct15",
        link: "https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A09%3A39.229Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf",
    },
    {
        id: 2,
        original: "Gender_Strategy_Toolkit",
        link: "https://s3.ap-southeast-1.amazonaws.com/static.hub/2021-08-05T12%3A09%3A46.603Z0-homepage%20-%20Best%20Practices%20Guidelines%20and%20Toolkit%20on%20Engaging%20the%20Private%20Sector%20in%20Skills%20Development%20-%20P.pdf",
    },
]

const StageTool = ({}) => {
    const [selectedStage, setselectedStage] = React.useState(allDummyStages[0])
    const [selectedTools, setselectedTools] = React.useState<any[]>([])
    React.useEffect(() => {
        let tools: any[] = []
        selectedStage.sections.forEach((section: any) => {
            section.tools.forEach((tool: any) => {
                tools.push(tool)
            })
        })
        setselectedTools([...tools])
    }, [selectedStage])
    return (
        <>
            <div className="container" style={{ padding: "5em" }}>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                {specificTools.map((itm, index) => (
                                    <ToolItem tool={{ ...itm, type: "none" }} />
                                ))}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3 className="text-center" style={{ margin: "1em 0" }}>
                            ENFOQUE TRANSFORMADOR DE GÉNERO
                        </h3>
                    </Col>
                    <Col md={7} style={{ marginBottom: "2em" }}>
                        <Select
                            style={{ padding: "1em" }}
                            value={selectedStage}
                            options={allDummyStages}
                            getOptionLabel={e => e.title}
                            getOptionValue={e => e}
                            onChange={e => setselectedStage({ ...e })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        {selectedTools.map((tool: any, toolIndex: number) => (
                            <>
                                <Card
                                    style={{
                                        display:
                                            tool.tools.filter((tool: any) => tool.type === "g").length > 0
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    {tool.tools.filter((tool: any) => tool.type === "g").length > 0 && (
                                        <CardHeader>{tool.shortTitle}</CardHeader>
                                    )}
                                    <CardBody>
                                        {tool?.tools
                                            ?.filter((tool: any) => tool.type === "g")
                                            .map((innerTool: any, inIndex: number) => (
                                                <ToolItem tool={innerTool} key={inIndex} />
                                            ))}
                                    </CardBody>
                                </Card>
                            </>
                        ))}
                    </Col>
                    {false && (
                        <Col md={12}>
                            {selectedStage.sections?.map((section: any, secIndex: number) => (
                                <>
                                    {section?.tools?.map((tool: any, toolIndex: number) => (
                                        <>
                                            <Card>
                                                <CardHeader>{tool.shortTitle}</CardHeader>
                                                <CardBody>
                                                    {tool?.tools?.map((innerTool: any, inIndex: number) => (
                                                        <ToolItem tool={innerTool} key={inIndex} />
                                                    ))}
                                                </CardBody>
                                            </Card>
                                        </>
                                    ))}
                                </>
                            ))}
                        </Col>
                    )}
                </Row>
            </div>
        </>
    )
}

export default StageTool
