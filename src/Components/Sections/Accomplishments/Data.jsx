import { BookCheck, BookCheckIcon, Code2, Laptop2, WorkflowIcon } from "lucide-react";

const AccomplishmentsData = [
    {
        id: 1,
        name: "Hackathons",
        count: "0",
        description: "Prashant has contributed to total of 0 hackathons",
        link: "/curriculum-vitae",
        icon: <Code2/>
    },
    {
        id: 2,
        name: "Certificates",
        count: "3",
        description: "Prashant Adhikari is a certified website developer.",
        link: "/curriculum-vitae",
        icon: <BookCheck/>
    },
    {
        id: 3,
        name: "Experience",
        count: "1 year",
        description: "Prashant is a junior website developer with less than a year of experience.",
        link: "/curriculum-vitae",
        icon: <Laptop2/>
    },
    {
        id: 4,
        name: "Projects",
        count: "14",
        description: "Prashant has accomplished accumulatively 14 projects with the tech stack he learnt.",
        link: "/projects",
        icon: <WorkflowIcon/>
    },
    {
        id: 5,
        name: "",
        count: "",
        description: "",
        link: "",
        icon: <></>
    }
]

export default AccomplishmentsData;