import { Container, Pagination } from '@mui/material'
import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { Error } from '../components/utilities/Error'
import { FlexContainer } from '../components/utilities/FlexContainer'
import { Loading } from '../components/utilities/Loading'
import { API_ENDPOINTS } from '../config/api'
import { DraftList } from '../features/drafts/components/DraftList'
import { useRequireSignedIn } from '../hooks/useRequireSignedIn'
import { fetcher } from '../utils'

const DraftIndex = () => {
  useRequireSignedIn()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const { data, error } = useSWR(API_ENDPOINTS.drafts.index(page), fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    navigate(`/drafts/?page=${page}`)
  }

  return (
    <Container maxWidth="sm">
      <h1>下書きの管理</h1>
      <DraftList drafts={data.drafts} />
      <FlexContainer justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={data.meta.totalPages}
          page={data.meta.currentPage}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </FlexContainer>
    </Container>
  )
}
export default DraftIndex
