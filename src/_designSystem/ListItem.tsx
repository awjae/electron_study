import { ReactNode } from 'react'
import { PropsWithChildren } from 'react'

interface ListRowProps {
  className?: string
  right?: ReactNode
  withArrow?: boolean
  onClick?: () => void
}

const ListItem = ({ className, children, onClick }: PropsWithChildren<ListRowProps>) => {
  return (
    <li
      className={className}
      //   css={css`
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //   `}
      onClick={onClick}
    >
      {children}
    </li>
  )
}

export default ListItem
