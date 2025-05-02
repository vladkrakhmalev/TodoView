import { FC, MouseEvent, useState } from "react"
import './ProjectSmallList.css'
import { useProjects } from "../../api/projectServices"
import { Spiner } from "@shared/ui/spiner"
import { Button } from "@shared/ui/button"
import clsx from "clsx"
import { Link, useLocation, useNavigate } from "react-router"
import { routerConfig } from "@shared/config/router"
import { AddProjectButton } from "@features/add-project"

export const ProjectSmallList: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading } = useProjects()
  const projects = data?.results || []
  const isEmpty = projects.length === 0 && !isLoading
  const isActive = location.pathname === routerConfig.projects

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsOpen(prev => !prev)
  }

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate(routerConfig.projects)
  }

  return (
    <div className="project-small-list">
      <div
        className={clsx("project-small-list__header", isActive && "_active")}
        onClick={handleNavigate}
      >
        <i className="fi fi-rr-folder" />
        <p className="project-small-list__title">Проекты</p>
        
        <AddProjectButton />

        <Button
          iconBefore={isOpen ? 'angle-small-up' : 'angle-small-down'}
          size="small"
          onClick={handleToggle}
        />
      </div>

      <div className={clsx("project-small-list__body", isOpen && "_open")}>
        {isLoading && <Spiner full />}

        {isEmpty &&
          <div className="project-small-list__empty">
            <p>Нет проектов</p>
          </div>
        }

        {projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="project-small-list__item">
            {project.name}
          </Link>
        ))}
      </div>
    </div>
  )
}