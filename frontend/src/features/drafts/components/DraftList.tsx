import { List } from '@mui/material'
import { Draft } from '../types/Draft'
import { DraftListItem } from './DraftListItem'

type DraftListProps = {
  drafts: Draft[]
}

export const DraftList = ({ drafts }: DraftListProps) => {
  return (
    <List>
      {drafts.map((draft) => (
        <DraftListItem key={draft.id} draft={draft} />
      ))}
    </List>
  )
}
