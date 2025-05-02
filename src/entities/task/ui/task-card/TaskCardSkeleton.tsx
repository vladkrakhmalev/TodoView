import { FC } from "react"
import './TaskCard.css'

export const TaskCardSkeleton: FC = () => {
  return <div className="task-card__skeleton">
    <div className="task-card__skeleton-checkbox"></div>
    <div className="task-card__skeleton-content">
      <div className="task-card__skeleton-title"></div>
      <div className="task-card__skeleton-details">
        <div className="task-card__skeleton-detail"></div>
        <div className="task-card__skeleton-detail"></div>
      </div>
    </div>
  </div>
}
