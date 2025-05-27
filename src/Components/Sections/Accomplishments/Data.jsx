import { BookCheck, BookCheckIcon, Code2, Laptop2, WorkflowIcon } from "lucide-react";

const AccomplishmentsData = [
    {
        id: 1,
        name: "Skills",
        count: "17+",
        description: "Prashant has contributed to total of 0 hackathons till today.",
        link: "/curriculum-vitae",
        icon: <Code2 size={28}/>
    },
    {
        id: 2,
        name: "Certificates",
        count: "3+",
        description: "Prashant Adhikari is a certified frontend website developer.",
        link: "/curriculum-vitae",
        icon: <BookCheck size={28}/>
    },
    {
        id: 3,
        name: "year Experience",
        count: "1",
        description: "Prashant is a junior website developer with less than a year of experience.",
        link: "/curriculum-vitae",
        icon: <Laptop2 size={28}/>
    },
    {
        id: 4,
        name: "Projects",
        count: "14",
        description: "Prashant has accomplished accumulatively 14 projects with the tech stack he learnt.",
        link: "/projects",
        icon: <WorkflowIcon size={28}/>
    }
]

export default AccomplishmentsData;