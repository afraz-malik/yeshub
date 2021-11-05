import React, { FC, ReactElement, useEffect, useState } from "react"
import StageFAQs from "./Sections/StageFAQs"
import { StageHeader, StageHeaderNew } from "./Sections/StageHeader"
import { StagesInterface } from "../../../../../Interface/Landing/StageInterface"
import { HomeApis } from "../../../../../Helpers/Request/Services/Home/Home"
import { Link, useParams } from "react-router-dom"
import StagesTopBar from "./StagesTopBar"
import Footer from "../../../../../Shared/Footer"
import SelectLanguage from "../Product/Sections/SelectLanguage"
import {
    CalendarStage,
    CommunitiesStage,
    DraftIcon,
    DraftStage,
    EyeIcon,
    fasBookMark,
    HomeStage,
    NextStage,
    PrevStage,
    SavedIcon,
    SavedStage,
    SolutionsStage,
} from "../../../../../Shared/Icons"
import ReactTooltip from "react-tooltip"
import SolutionSidebar from "../../../../../Components/SolutionSidebar"
import SolutionMainContainer from "../SolutionMainContainer"
import { Button, UncontrolledCollapse } from "reactstrap"
import { allDummyStages } from "./stage-data"
const haderImage = "https://planporlajuventud.org/wp-content/uploads/2019/01/img_main_001.jpg"
type Tool = {
    id?: any
    shortTitle?: string
    tools: {
        id?: any
        title: string
        previewLink: string
        downloadLink: string
    }[]
}

type Content = {
    mainContent: string
    subContents: string[]
}

type Section = {
    id: any
    title: string
    image: string
    description: string
    content: Content
    tools: Tool[]
}

export type StageProps = {
    id: any
    stageNumber: any
    title: string
    description?: string
    sections: Section[]
    image: string
}

const StagePage: FC = (): ReactElement => {
    const [language, setLanguage] = useState("eng")
    const [allStages, setAllStages] = useState<StagesInterface[]>(allDummyStages)
    const [selectedStage, setSelected] = useState<any>(allDummyStages[0])
    const { id } = useParams()
    const [selectedSection, setselectedSection] = useState(allDummyStages[Number(id) - 1].sections[0])
    const [__content, setcontent] = useState("content")

    useEffect(() => {
        setSelected({ ...allStages[Number(id) - 1] })
        setselectedSection({ ...allStages[Number(id) - 1].sections[0] })
    }, [id])

    const onLanguageChange = (lang: string) => {
        setLanguage(lang)
    }

    // useEffect(() => {
    //     const filtered = allStages.filter(item => item.stageNumber === Number(id)).slice(0, 1)[0]

    //     window.scrollTo(0, 0)
    // }, [id, allStages])

    const linkStyle = {
        "list-style": "none",
        margin: "0 1.3em",
        padding: ".4em 1em",
        "font-size": "14px",
        cursor: "pointer",
    }

    return (
        <SolutionMainContainer
            languareBar={<SelectLanguage isStage lang={language} onChange={onLanguageChange} />}
            topbar={<StagesTopBar />}
            sidebarItem={
                <StageSideContent
                    onSectionSelected={(d: any) => setselectedSection({ ...d })}
                    allStages={selectedStage}
                    selectedStage={selectedStage}
                    linkStyle={linkStyle}
                    onShowTools={() => setcontent("tools")}
                />
            }
        >
            <div className="mc-border mt-4 mb-4 br-8" style={{ padding: 0, marginBottom: "40px" }}>
                <StageHeaderNew
                    number={selectedStage.stageNumber || Number(id)}
                    title={selectedSection.title || "title"}
                    description={selectedSection.description || "description"}
                    image={selectedStage.sections[0].image}
                    onShowContent={() => setcontent("content")}
                    onShowTools={() => setcontent("tools")}
                    content={__content}
                />
            </div>

            {__content === "content" && (
                <div className="mc-border mt-4 mb-4 br-8 pt-4">
                    <p className=" pl-4 pr-4">{selectedSection.content.mainContent}</p>
                    {selectedSection.content.subContents.map((itm: any, index: number) => (
                        <>
                            <div className="d-flex flex-row" key={index}>
                                <div style={{ padding: ".4em 3em" }} className="mt-auto mb-auto">
                                    {checkIcon}
                                </div>
                                <div>
                                    <p>{itm}</p>
                                </div>
                            </div>
                            <p></p>
                            <p></p>
                        </>
                    ))}
                </div>
            )}

            {<ToolsSection content={__content} tools={selectedSection.tools} />}
            {/* 2 */}
            <div className="d-flex flex-row py-2 mb-4 mt-4">
                <p
                    data-tip="Previous Stage"
                    style={{ display: "inline-block", border: "1px solid lightgray", borderRadius: "10px" }}
                >
                    {selectedStage && Number(selectedStage?.stageNumber) > 1 && (
                        <Link to={{ pathname: `/stage/${(selectedStage?.stageNumber || 2) - 1}` }} className="mr-auto">
                            {PrevStage}
                        </Link>
                    )}
                </p>
                <p
                    data-tip="Next stage"
                    className="ml-auto"
                    style={{ display: "inline-block", border: "1px solid #ffd300", borderRadius: "10px" }}
                >
                    {selectedStage && selectedStage?.stageNumber < 9 && (
                        <Link to={{ pathname: `/stage/${(selectedStage?.stageNumber || 2) + 1}` }} className="ml-auto">
                            {NextStage}
                        </Link>
                    )}
                </p>
            </div>
        </SolutionMainContainer>
    )
}

export default StagePage

export const StageSideContent: React.FC<any> = ({
    selectedStage,
    allStages,
    linkStyle,
    onSectionSelected,
    onShowTools,
}) => {
    const [selectedSection, setselectedSection] = useState(1)
    const [selectedIndex, setselectedIndex] = useState(0)
    const [show, setshow] = useState(true)
    return (
        <>
            <div style={{ overflowY: "auto" }} className="mc-border card py-2 mt-4 mb-4">
                <p style={{ padding: ".1em 1.9em", fontSize: "19px", marginBottom: "3px" }}>
                    {" "}
                    Stage {selectedStage?.stageNumber}{" "}
                </p>
                <p style={{ padding: ".1em 2em", fontSize: "16px", fontWeight: 700 }}>
                    {" "}
                    <strong>{selectedStage?.title} </strong>
                </p>

                <ul>
                    {selectedStage.sections
                        // .sort((a: any, b: any) => a.stageNumber - b.stageNumber)
                        .map((section: any, sec_index: number) => (
                            <li
                                key={sec_index}
                                style={linkStyle}
                                className={`${section.id === selectedSection ? "stage-link-active" : ""}`}
                            >
                                {/* <Link to={{ pathname: "/stage/" + itm.stageNumber }}>{itm.title || "Some Title"}</Link> */}
                                <a
                                    id={`abcdeef${sec_index + 1}`}
                                    onClick={() => {
                                        setselectedIndex(sec_index)
                                        if (sec_index === selectedIndex) {
                                            setshow(!show)
                                        } else {
                                            setshow(true)
                                        }
                                        setselectedSection(section.id)
                                        onSectionSelected(section)
                                    }}
                                >
                                    {`${selectedStage.stageNumber}.${sec_index + 1} ${section.title || "Some Title"}`}
                                </a>
                                <UncontrolledCollapse
                                    isOpen={show && sec_index === selectedIndex}
                                    toggler={`#abcdeef${sec_index + 1}`}
                                >
                                    <div
                                        style={{
                                            marginLeft: "5px",
                                            borderLeft: "4px solid lightgray",
                                        }}
                                    >
                                        {section.tools.map((itm: any, index: number) => (
                                            <li
                                                onClick={() => onShowTools()}
                                                key={index}
                                                style={{ ...linkStyle, color: "gray", padding: ".3em 0" }}
                                            >
                                                <a href={`#toolshorttitle${index}`} style={{ fontWeight: "normal" }}>
                                                    {`${selectedStage.stageNumber === 1 ? `` : ""} ${itm.shortTitle}`}
                                                </a>
                                            </li>
                                        ))}
                                    </div>
                                </UncontrolledCollapse>
                            </li>
                        ))}
                </ul>
                <div className="d-flex flex-row" style={{ padding: "1.9em" }}>
                    <p
                        data-tip="Previous stage"
                        className="mr-auto"
                        style={{ display: "inline-block", border: "1px solid lightgray", borderRadius: "10px" }}
                    >
                        {selectedStage && Number(selectedStage?.stageNumber) > 1 && (
                            <Link
                                to={{ pathname: `/stage/${(selectedStage?.stageNumber || 2) - 1}` }}
                                className="mr-auto"
                            >
                                <span data-tip="Previous Stage"></span>
                                {PrevStage}
                            </Link>
                        )}
                    </p>
                    <p
                        data-tip="Next stage"
                        className="ml-auto"
                        style={{ display: "inline-block", border: "1px solid #ffd300", borderRadius: "10px" }}
                    >
                        {selectedStage && selectedStage?.stageNumber < 9 && (
                            <Link
                                data-tip="Next Stage"
                                to={{ pathname: `/stage/${(selectedStage?.stageNumber || 2) + 1}` }}
                                className="ml-auto"
                            >
                                {NextStage}
                            </Link>
                        )}
                    </p>
                </div>
            </div>
        </>
    )
}

export const stageContent = {
    description2:
        "Before starting your YEE project it is always important to carry out a labor market analysis to ensure that your project responds to real needs and adapts to the real existing context. There is a considerable amount of tools and instruments for the analysis of market opportunities for youth employment and entrepreneurship.and the identification of relevant curricula for specific boys and girls. Plan has combined some ideas and elements from these existing tools into a market scan methodology to save time and resources for the identification and development of YEE projects. In addition, an additional challenge was raised to improve the integration of gender aspects in this market scan and in this toolbox you can find a rapid market scan instrument with a gender perspective. In this framework, it is also recommended to include, depending on specific contexts, an analysis of inclusion and job opportunities for minority groups such as Lesbian, Gay, Transgender and Bisexual (LGTB) or ethnic minorities.",
    steps: [
        " To assist in the analysis of the situation of women in the world of work and gender equality in society, there are many documents on recent trends in female employment that examine the improvements achieved in the past decade (or the lack of improvements) and assesses the prospects for the female labor market by analyzing inequalities between men and women.",
        "It is important to recognize that women are not only less likely than men to participate in the workforce, but when they do so, they are also more likely to be unemployed or employed in jobs that are outside of labor laws, regulations on social security and collective agreements.",
    ],
}

export const checkIcon = (
    <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            opacity="0.5"
            d="M26.9915 11.212L14.8 23.4035L8.1585 16.7805L5.55 19.389L14.8 28.639L29.6 13.839L26.9915 11.212ZM18.5 0.889038C8.288 0.889038 0 9.17704 0 19.389C0 29.601 8.288 37.889 18.5 37.889C28.712 37.889 37 29.601 37 19.389C37 9.17704 28.712 0.889038 18.5 0.889038ZM18.5 34.189C10.323 34.189 3.7 27.566 3.7 19.389C3.7 11.212 10.323 4.58904 18.5 4.58904C26.677 4.58904 33.3 11.212 33.3 19.389C33.3 27.566 26.677 34.189 18.5 34.189Z"
            fill="#243C4B"
        />
    </svg>
)

export const ToolsSection: React.FC<any> = ({ tools = [], content }) => {
    return (
        <>
            <div className="mc-border mt-4 mb-4 br-8 p-4" style={{ display: content === "tools" ? "block" : "none" }}>
                <p className="f-16 text-dark-blue fw-700">Documentation</p>
                {tools.map((itm: Tool, index: number) => (
                    <>
                        <p className="f-16 text-dark-blue fw-700" id={`toolshorttitle${index}`}>
                            {itm.shortTitle}
                        </p>
                        {itm.tools.map((tool: any, index: number) => (
                            <ToolItem tool={tool} />
                        ))}
                        <p className="mb-4"></p>
                    </>
                ))}
            </div>
        </>
    )
}

export const ToolItem: React.FC<any> = ({ tool }) => {
    return (
        <div className="d-flex flex-row" style={{ marginBottom: ".35em" }}>
            <span className="mr-2" style={{ minWidth: "50px", textAlign: "right" }}>
                {tool.type == "g" && <span>{PersonIcon}</span>}
                {tool.type == "p" && <span>{BuildingIcon}</span>}
                {tool.type == "pg" && (
                    <>
                        <span>{BuildingIcon}</span>
                        <span>{PersonIcon}</span>
                    </>
                )}
                {tool.type == "none" && <span>{FileIcon}</span>}
            </span>
            <p className="f-16 text-dark-blue">{tool.original.replace(".pdf", "")}</p>
            <div className="ml-auto">
                <span className="mr-2">
                    <a style={{ display: "inline-block" }} download href={tool.link}>
                        {DownloadIcon}
                    </a>
                </span>
                <span className="mr-2">
                    <a style={{ display: "inline-block" }} target="blank" href={tool.link}>
                        {EyeIcon}
                    </a>
                </span>
            </div>
        </div>
    )
}

export const SideIcon = (
    <svg width="77" height="24" viewBox="0 0 77 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.9557 14.9493H21.9897V13.3311H20.9557V14.9493ZM20.9557 16.9978H21.9897V15.3796H20.9557V16.9978ZM20.9557 19.0469H21.9897V17.4284H20.9557V19.0469ZM19.5953 14.9493H20.6297V13.3311H19.5953V14.9493ZM19.5953 16.9978H20.6297V15.3796H19.5953V16.9978ZM19.5953 19.0469H20.6297V17.4284H19.5953V19.0469ZM18.2353 14.9493H19.2696V13.3311H18.2353V14.9493ZM18.2353 16.9978H19.2696V15.3796H18.2353V16.9978ZM18.2353 19.0469H19.2696V17.4284H18.2353V19.0469ZM16.8752 14.9493H17.9095V13.3311H16.8752V14.9493ZM16.8752 16.9978H17.9095V15.3796H16.8752V16.9978ZM16.8752 19.0469H17.9095V17.4284H16.8752V19.0469ZM15.5151 14.9493H16.5495V13.3311H15.5151V14.9493ZM15.5151 16.9978H16.5495V15.3796H15.5151V16.9978ZM15.5151 19.0469H16.5495V17.4284H15.5151V19.0469ZM14.1551 14.9493H15.1894V13.3311H14.1551V14.9493ZM14.1551 16.9978H15.1894V15.3796H14.1551V16.9978ZM14.1551 19.0469H15.1894V17.4284H14.1551V19.0469ZM12.795 14.9493H13.8293V13.3311H12.795V14.9493ZM12.795 16.9978H13.8293V15.3796H12.795V16.9978ZM12.795 19.0469H13.8293V17.4284H12.795V19.0469ZM11.4349 14.9493H12.4693V13.3311H11.4349V14.9493ZM11.4349 16.9978H12.4693V15.3796H11.4349V16.9978ZM11.4349 19.0469H12.4693V17.4284H11.4349V19.0469ZM9.39204 5.60535H10.4264V3.98688H9.39204V5.60535ZM9.39204 7.65381H10.4264V6.03534H9.39204V7.65381ZM9.39204 9.70264H10.4264V8.08411H9.39204V9.70264ZM9.39204 11.7511H10.4264V10.1329H9.39204V11.7511ZM8.03197 5.60535H9.0663V3.98688H8.03197V5.60535ZM8.03197 7.65381H9.0663V6.03534H8.03197V7.65381ZM8.03197 9.70264H9.0663V8.08411H8.03197V9.70264ZM8.03197 11.7511H9.0663V10.1329H8.03197V11.7511ZM6.67191 5.60535H7.70622V3.98688H6.67191V5.60535ZM6.67191 7.65381H7.70622V6.03534H6.67191V7.65381ZM6.67191 9.70264H7.70622V8.08411H6.67191V9.70264ZM6.67191 11.7511H7.70622V10.1329H6.67191V11.7511ZM4.10284 10.8521H5.13686V9.23352H4.10284V10.8521ZM4.10284 12.9005H5.13686V11.282H4.10284V12.9005ZM4.10284 14.9493H5.13686V13.3311H4.10284V14.9493ZM4.10284 16.9978H5.13686V15.3796H4.10284V16.9978ZM2.74248 10.8521H3.77679V9.23352H2.74248V10.8521ZM2.74248 12.9005H3.77679V11.282H2.74248V12.9005ZM2.74248 14.9493H3.77679V13.3311H2.74248V14.9493ZM2.74248 16.9978H3.77679V15.3796H2.74248V16.9978ZM1.3824 10.8521H2.41673V9.23352H1.3824V10.8521ZM1.3824 12.9005H2.41673V11.282H1.3824V12.9005ZM1.3824 14.9493H2.41673V13.3311H1.3824V14.9493ZM1.3824 16.9978H2.41673V15.3796H1.3824V16.9978ZM11.157 12.5V3H5.87584V7.55951H0V22H22.7002V12.5H11.157Z"
            fill="#E5007D"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32.9548 6.77899C31.911 6.77899 31.0651 5.93304 31.0651 4.88928C31.0651 3.84601 31.911 3 32.9548 3C33.9983 3 34.8443 3.84601 34.8443 4.88928C34.8443 5.93304 33.9983 6.77899 32.9548 6.77899ZM30.7451 21.0468V12.6914H35.1646V21.0468C35.1646 21.5732 34.7378 22 34.2114 22C33.6851 22 33.2584 21.5732 33.2584 21.0468V14.5095H32.6513V21.0468C32.6513 21.5732 32.2243 22 31.6981 22C31.1718 22 30.7451 21.5732 30.7451 21.0468ZM34.4739 7.08374C34.4739 7.08374 36.3831 7.68668 36.3831 9.15961L35.1645 9.63745V12.3506H30.745V9.63647L29.5289 9.15961C29.5289 7.68692 31.4376 7.08374 31.4376 7.08398V7.08374H31.4378L32.7045 8.02631C32.956 8.19502 32.956 8.19502 33.2051 8.02631L34.4739 7.08374ZM29.4725 9.41119L30.593 9.86865C30.2038 10.8224 30.0997 12.5427 30.334 14.1492C30.3821 14.4799 30.1532 14.7871 29.8225 14.8353C29.793 14.8396 29.7634 14.8418 29.7344 14.8418C29.4388 14.8418 29.1801 14.6249 29.1363 14.3238C28.8693 12.4936 29.0015 10.5656 29.4725 9.41119ZM35.3189 9.86859L36.4394 9.41107C36.9104 10.5654 37.0426 12.4937 36.7756 14.3237C36.7315 14.6248 36.473 14.8417 36.1775 14.8417C36.1484 14.8417 36.1189 14.8395 36.0894 14.8354C35.7587 14.787 35.5297 14.4801 35.5779 14.1494C35.8122 12.5426 35.7081 10.8223 35.3189 9.86859ZM41.8078 6.77899C40.764 6.77899 39.9183 5.93304 39.9183 4.88928C39.9183 3.84601 40.764 3 41.8078 3C42.8513 3 43.6973 3.84601 43.6973 4.88928C43.6973 5.93304 42.8513 6.77899 41.8078 6.77899ZM39.598 21.0468V12.6914H44.0175V21.0468C44.0175 21.5732 43.5908 22 43.0643 22C42.5381 22 42.1114 21.5732 42.1114 21.0468V14.5095H41.5043V21.0468C41.5043 21.5732 41.0775 22 40.5511 22C40.0248 22 39.598 21.5732 39.598 21.0468ZM43.6951 7.28632C44.5418 7.82853 46.48 9.55776 45.4742 13.6185C45.4009 13.9138 45.1716 14.1365 44.8761 14.1365C44.847 14.1365 44.8175 14.1344 44.788 14.13C44.4573 14.0818 44.2283 13.7749 44.2765 13.444C44.4798 12.0507 44.4281 10.573 44.1569 9.5827C44.1105 9.6011 44.064 9.61924 44.0175 9.63739C43.8967 9.87437 43.658 10.3082 43.623 10.8247C43.5724 11.5632 43.8878 12.0931 44.0175 12.3506H39.598C39.7072 12.2122 40.0436 11.6208 39.995 10.8247C39.9565 10.1908 39.7227 9.79333 39.598 9.63647L39.4588 9.58173C39.1875 10.572 39.1359 12.0505 39.339 13.444C39.3872 13.7749 39.1582 14.0818 38.8275 14.13C38.798 14.1344 38.7685 14.1365 38.7394 14.1365C38.4439 14.1365 38.2096 13.9151 38.1415 13.6185C37.1663 9.37645 39.089 7.75298 39.927 7.26257C40.1325 7.14227 40.3888 7.15704 40.58 7.29913L41.5575 8.02625C41.809 8.19496 41.809 8.19496 42.058 8.02625L43.0222 7.31024C43.2202 7.16307 43.4874 7.15318 43.6951 7.28632Z"
            fill="#E5007D"
        />
        <path
            d="M59 2C57.9 2 57.01 2.9 57.01 4L57 20C57 21.1 57.89 22 58.99 22H71C72.1 22 73 21.1 73 20V8L67 2H59ZM66 9V3.5L71.5 9H66Z"
            fill="#243C4B"
        />
    </svg>
)

export const DownloadIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM17 13L12 18L7 13H10V9H14V13H17Z"
            fill="#243C4B"
        />
    </svg>
)

export const EyeIconStage = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
            fill="#243C4B"
        />
    </svg>
)

export const BuildingIcon = (
    <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.9557 11.9493H21.9897V10.3311H20.9557V11.9493ZM20.9557 13.9978H21.9897V12.3796H20.9557V13.9978ZM20.9557 16.0469H21.9897V14.4284H20.9557V16.0469ZM19.5953 11.9493H20.6297V10.3311H19.5953V11.9493ZM19.5953 13.9978H20.6297V12.3796H19.5953V13.9978ZM19.5953 16.0469H20.6297V14.4284H19.5953V16.0469ZM18.2353 11.9493H19.2696V10.3311H18.2353V11.9493ZM18.2353 13.9978H19.2696V12.3796H18.2353V13.9978ZM18.2353 16.0469H19.2696V14.4284H18.2353V16.0469ZM16.8752 11.9493H17.9095V10.3311H16.8752V11.9493ZM16.8752 13.9978H17.9095V12.3796H16.8752V13.9978ZM16.8752 16.0469H17.9095V14.4284H16.8752V16.0469ZM15.5151 11.9493H16.5495V10.3311H15.5151V11.9493ZM15.5151 13.9978H16.5495V12.3796H15.5151V13.9978ZM15.5151 16.0469H16.5495V14.4284H15.5151V16.0469ZM14.1551 11.9493H15.1894V10.3311H14.1551V11.9493ZM14.1551 13.9978H15.1894V12.3796H14.1551V13.9978ZM14.1551 16.0469H15.1894V14.4284H14.1551V16.0469ZM12.795 11.9493H13.8293V10.3311H12.795V11.9493ZM12.795 13.9978H13.8293V12.3796H12.795V13.9978ZM12.795 16.0469H13.8293V14.4284H12.795V16.0469ZM11.4349 11.9493H12.4693V10.3311H11.4349V11.9493ZM11.4349 13.9978H12.4693V12.3796H11.4349V13.9978ZM11.4349 16.0469H12.4693V14.4284H11.4349V16.0469ZM9.39204 2.60535H10.4264V0.986877H9.39204V2.60535ZM9.39204 4.65381H10.4264V3.03534H9.39204V4.65381ZM9.39204 6.70264H10.4264V5.08411H9.39204V6.70264ZM9.39204 8.7511H10.4264V7.13293H9.39204V8.7511ZM8.03197 2.60535H9.0663V0.986877H8.03197V2.60535ZM8.03197 4.65381H9.0663V3.03534H8.03197V4.65381ZM8.03197 6.70264H9.0663V5.08411H8.03197V6.70264ZM8.03197 8.7511H9.0663V7.13293H8.03197V8.7511ZM6.67191 2.60535H7.70622V0.986877H6.67191V2.60535ZM6.67191 4.65381H7.70622V3.03534H6.67191V4.65381ZM6.67191 6.70264H7.70622V5.08411H6.67191V6.70264ZM6.67191 8.7511H7.70622V7.13293H6.67191V8.7511ZM4.10284 7.85205H5.13686V6.23352H4.10284V7.85205ZM4.10284 9.90051H5.13686V8.28204H4.10284V9.90051ZM4.10284 11.9493H5.13686V10.3311H4.10284V11.9493ZM4.10284 13.9978H5.13686V12.3796H4.10284V13.9978ZM2.74248 7.85205H3.77679V6.23352H2.74248V7.85205ZM2.74248 9.90051H3.77679V8.28204H2.74248V9.90051ZM2.74248 11.9493H3.77679V10.3311H2.74248V11.9493ZM2.74248 13.9978H3.77679V12.3796H2.74248V13.9978ZM1.3824 7.85205H2.41673V6.23352H1.3824V7.85205ZM1.3824 9.90051H2.41673V8.28204H1.3824V9.90051ZM1.3824 11.9493H2.41673V10.3311H1.3824V11.9493ZM1.3824 13.9978H2.41673V12.3796H1.3824V13.9978ZM11.157 9.5V0H5.87584V4.55951H0V19H22.7002V9.5H11.157Z"
            fill="#E5007D"
        />
    </svg>
)

export const PersonIcon = (
    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.9548 3.77899C2.91104 3.77899 2.06506 2.93304 2.06506 1.88928C2.06506 0.84601 2.91104 0 3.9548 0C4.99831 0 5.84433 0.84601 5.84433 1.88928C5.84433 2.93304 4.99831 3.77899 3.9548 3.77899ZM1.74508 18.0468V9.69141H6.16458V18.0468C6.16458 18.5732 5.73784 19 5.21136 19C4.68512 19 4.25836 18.5732 4.25836 18.0468V11.5095H3.65127V18.0468C3.65127 18.5732 3.22429 19 2.69805 19C2.17182 19 1.74508 18.5732 1.74508 18.0468ZM5.47393 4.08374C5.47393 4.08374 7.38305 4.68668 7.38305 6.15961L6.16455 6.63745V9.35065H1.74502V6.63647L0.528926 6.15961C0.528926 4.68692 2.43756 4.08374 2.43756 4.08398V4.08374H2.4378L3.70449 5.02631C3.95599 5.19502 3.956 5.19502 4.20507 5.02631L5.47393 4.08374ZM0.472499 6.41119L1.59298 6.86865C1.20375 7.82236 1.09967 9.54269 1.33398 11.1492C1.38215 11.4799 1.15316 11.7871 0.822505 11.8353C0.792974 11.8396 0.763448 11.8418 0.734401 11.8418C0.438847 11.8418 0.1801 11.6249 0.136287 11.3238C-0.130703 9.49359 0.00145313 7.56557 0.472499 6.41119ZM6.3189 6.86859L7.43939 6.41107C7.91043 7.56545 8.04259 9.49371 7.7756 11.3237C7.73155 11.6248 7.47304 11.8417 7.17749 11.8417C7.14844 11.8417 7.11888 11.8395 7.08935 11.8354C6.7587 11.787 6.52974 11.4801 6.57791 11.1494C6.81222 9.54263 6.70813 7.8223 6.3189 6.86859ZM12.8078 3.77899C11.764 3.77899 10.9183 2.93304 10.9183 1.88928C10.9183 0.84601 11.764 0 12.8078 0C13.8513 0 14.6973 0.84601 14.6973 1.88928C14.6973 2.93304 13.8513 3.77899 12.8078 3.77899ZM10.598 18.0468V9.69141H15.0175V18.0468C15.0175 18.5732 14.5908 19 14.0643 19C13.5381 19 13.1114 18.5732 13.1114 18.0468V11.5095H12.5043V18.0468C12.5043 18.5732 12.0775 19 11.5511 19C11.0248 19 10.598 18.5732 10.598 18.0468ZM14.6951 4.28632C15.5418 4.82853 17.48 6.55776 16.4742 10.6185C16.4009 10.9138 16.1716 11.1365 15.8761 11.1365C15.847 11.1365 15.8175 11.1344 15.788 11.13C15.4573 11.0818 15.2283 10.7749 15.2765 10.444C15.4798 9.05074 15.4281 7.57296 15.1569 6.5827C15.1105 6.6011 15.064 6.61924 15.0175 6.63739C14.8967 6.87437 14.658 7.30815 14.623 7.82471C14.5724 8.56323 14.8878 9.0931 15.0175 9.35065H10.598C10.7072 9.21219 11.0436 8.62084 10.995 7.82471C10.9565 7.19075 10.7227 6.79333 10.598 6.63647L10.4588 6.58173C10.1875 7.57199 10.1359 9.0505 10.339 10.444C10.3872 10.7749 10.1582 11.0818 9.82754 11.13C9.79801 11.1344 9.76848 11.1365 9.73944 11.1365C9.44388 11.1365 9.20955 10.9151 9.14154 10.6185C8.16628 6.37645 10.089 4.75298 10.927 4.26257C11.1325 4.14227 11.3888 4.15704 11.58 4.29913L12.5575 5.02625C12.809 5.19496 12.809 5.19496 13.058 5.02625L14.0222 4.31024C14.2202 4.16307 14.4874 4.15318 14.6951 4.28632Z"
            fill="#E5007D"
        />
    </svg>
)

export const FileIcon = (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2 0C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0H2ZM9 7V1.5L14.5 7H9Z"
            fill="#243C4B"
        />
    </svg>
)
