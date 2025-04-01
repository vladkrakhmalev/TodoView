import { useEffect, useState, useRef } from "react";
import { IDimensions } from "@shared/types";

export const useCalendarDimensions = () => {
  const columnRef = useRef<HTMLDivElement | null>(null)
  const timeRef = useRef<HTMLDivElement | null>(null)

  const [dimensions, setDimensions] = useState<IDimensions>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (columnRef.current && timeRef.current) {
      setDimensions({
        width: columnRef.current.getBoundingClientRect().width - 2,
        height: timeRef.current.getBoundingClientRect().height,
      })
    }
  }, [])

  return { dimensions, columnRef, timeRef }
}
