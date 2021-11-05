import {
    YesMe,
    YesIntel,
    YesAcademy,
    YesCNXT,
    YesTessa,
    GroupPhoto,
} from "../../../../../../Shared/Images/Images"
import {
    ResponsiveIcon,
    SettingIcon,
    ChatIcon,
    EditIcon,
    CollaborateIcon,
    UpdateIcon,
    GamifyIcon,
    ReportIcon,
    LiveIcon,
    EarthIcon,
    StrengthIcon,
    CertificateIcon,
    SimpleMechanicsIcon,
    PromoteIcon,
    ChatBoxIcon,
    IdentifyIcon,
    EnvelopeIcon,
    JobIcon,
    SkillIcon,
} from "../../../../../../Shared/Icons"

const SectionText: Record<string, any> = {
    "YES!ME": {
        image: GroupPhoto,
        content: [
            {
                heading: "Has built-in questions",
                text: "to guide you in your assessment",
                icon: ChatIcon,
            },
            {
                heading: "Customizable",
                text: "so you can gather relevant data",
                icon: EditIcon,
            },
            {
                heading: "Built for collaboration",
                text: "across teams and topics",
                icon: CollaborateIcon,
            },
            {
                heading: "Makes updates easy",
                text: "across areas, and over the years!",
                icon: UpdateIcon,
            },
        ],
    },
    "YES!NTEL": {
        image: GroupPhoto,
        content: [
            {
                heading: "Data Capture",
                text: "on web and mobile (Android)",
                icon: ResponsiveIcon,
            },
            {
                heading: "Highly customizable",
                text: "with 250+ data points",
                icon: SettingIcon,
            },
            {
                heading: "Generate reports",
                text: "with a wide variety of built-in tools",
                icon: ReportIcon,
            },
            {
                heading: "Get real-time data",
                text: "at the tip of your fingers",
                icon: LiveIcon,
            },
        ],
    },
    "YES!ACADEMY": {
        image: GroupPhoto,
        content: [
            {
                heading: "Gamified and interactive",
                icon: GamifyIcon,
                text: "online learning courses for youth",
            },
            {
                heading: "Context-based courses",
                icon: EarthIcon,
                text: "are made together with countries",
            },
            {
                heading: "Aims to provide skills",
                icon: StrengthIcon,
                text: "that are essential and in-demand",
            },
            {
                heading: "Provides certificates",
                icon: CertificateIcon,
                text: "for courses completed",
            },
        ],
    },
    "YES!CNXT": {
        image: GroupPhoto,
        content: [
            {
                heading: "Skills mismatch solution",
                icon: SkillIcon,
                text: "for youth and the private sector",
            },
            {
                heading: "Simple mechanics",
                icon: SimpleMechanicsIcon,
                text: "to cater to disadvantaged youth",
            },
            {
                heading: "Promotes decent work",
                icon: PromoteIcon,
                text: "with verified tags and screening",
            },
            {
                heading: "Accessible",
                icon: ResponsiveIcon,
                text: "on web and mobile",
            },
        ],
    },
    TESSA: {
        image: GroupPhoto,
        content: [
            {
                heading: "Social media chatbot",
                icon: ChatBoxIcon,
                text: "available on Facebook Messenger",
            },
            {
                heading: "Identifies skills",
                icon: IdentifyIcon,
                text: "by asking the user questions",
            },
            {
                heading: "Builds your CV",
                icon: EnvelopeIcon,
                text: "and sends it to you directly",
            },
            {
                heading: "Recommends jobs",
                icon: JobIcon,
                text: "as well as trainings and info",
            },
        ],
    },
}

export const tabs = [
    {
        text: "YES!NTEL",
        img: YesIntel,
    },
    {
        text: "YES!ACADEMY",
        img: YesAcademy,
    },
    {
        text: "TESSA",
        img: YesTessa,
    },
    {
        text: "YES!CNXT",
        img: YesCNXT,
    },
    {
        text: "YES!ME",
        img: YesMe,
    },
]

export default SectionText
