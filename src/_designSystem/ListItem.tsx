import { ReactNode } from 'react'

interface ListRowProps {
  className?: string
  contents: ReactNode
  right?: ReactNode
  withArrow?: boolean
  onClick?: () => void
}

const ListItem = ({ className, contents, onClick }: ListRowProps) => {
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
      {contents}
    </li>
  )
}

export default ListItem
