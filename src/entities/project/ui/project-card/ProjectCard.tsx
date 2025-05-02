import { FC } from "react"
import './ProjectCard.css'
import { Project } from "@doist/todoist-api-typescript"
import { Link } from "react-router"

interface IProps {
  project: Project
}

export const ProjectCard: FC<IProps> = ({ project }) => {

  return (
    <Link to={project.id} className="project-card">
      {project.name}
    </Link>
  )
}