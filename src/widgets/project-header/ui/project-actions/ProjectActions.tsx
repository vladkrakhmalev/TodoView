import { FC } from "react"
import './ProjectActions.css'
import { Dialog } from "@shared/ui/dialog/Dialog"
import { Button } from "@shared/ui/button/Button"
import { Project } from "@doist/todoist-api-typescript"
import { UpdateProjectButton } from "@features/update-project"
import { DeleteProject } from "@features/delete-project"

interface IProps {
  project: Project
}

export const ProjectActions: FC<IProps> = ({ project }) => {
  return (
    <Dialog trigger={
      <Button 
        variant="secondary" 
        iconBefore="menu-dots"
        size="small"
      />
    }>
      <div className="project-actions">
        <UpdateProjectButton project={project} />
        <DeleteProject projectId={project.id} />
      </div>
    </Dialog>
  )
}