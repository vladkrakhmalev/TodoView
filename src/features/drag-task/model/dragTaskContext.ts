import { createContext, useContext } from 'react';

interface IDragTaskContext {
  activeDroppableId: string | null;
}

const DragTaskContext = createContext<IDragTaskContext>({ activeDroppableId: null });

export const useDragTaskContext = () => useContext(DragTaskContext);
export { DragTaskContext }; 