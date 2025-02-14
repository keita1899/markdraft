import { List } from '@mui/material'
import { Draft } from '../types/Draft'
import { DraftListItem } from './DraftListItem'

type DraftListProps = {
  drafts: Draft[]
  onDelete: (id: number) => void
}

export const DraftList = ({ drafts, onDelete }: DraftListProps) => {
  return (
    <List>
      {drafts.map((draft) => (
        <DraftListItem key={draft.id} draft={draft} onDelete={onDelete} />
      ))}
    </List>
  )
}
