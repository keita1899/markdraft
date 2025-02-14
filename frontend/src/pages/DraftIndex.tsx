import { Container, Fab, Pagination, Typography } from '@mui/material'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { Link, useSearchParams } from 'react-router-dom'
import useSWR, { mutate } from 'swr'
import { EditIcon } from '../components/icons'
import { Error } from '../components/utilities/Error'
import { FlexContainer } from '../components/utilities/FlexContainer'
import { Loading } from '../components/utilities/Loading'
import { API_ENDPOINTS } from '../config/api'
import { useSnackbar } from '../context/SnackbarContext'
import { DraftList } from '../features/drafts/components/DraftList'
import { useRequireSignedIn } from '../hooks/useRequireSignedIn'
import { fetcher } from '../utils'
import { getAuthHeaders } from '../utils/getRequestHeaders'

const DraftIndex = () => {
  useRequireSignedIn()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const { data, error } = useSWR(API_ENDPOINTS.drafts.index(page), fetcher)
  const { openSnackbar } = useSnackbar()

  if (error) return <Error />
  if (!data) return <Loading />

  const handleDeleteDraft = async (id: number) => {
    await axios
      .delete(API_ENDPOINTS.drafts.destroy(id), {
        headers: getAuthHeaders(),
      })
      .then((res: AxiosResponse) => {
        mutate(API_ENDPOINTS.drafts.index(page))
        openSnackbar(res.data.message, 'success')
      })
      .catch((error: AxiosError) => {
        console.error('削除に失敗しました', error)
        if (error.response && error.response.data) {
          const errorMessage =
            (error.response.data as { error: string }).error ||
            '予期しないエラーが発生しました'
          openSnackbar(errorMessage, 'error')
        } else {
          openSnackbar('予期しないエラーが発生しました', 'error')
        }
      })
  }

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    navigate(`/drafts/?page=${page}`)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <h1>下書きの管理</h1>
      {data.drafts.length > 0 ? (
        <>
          <DraftList drafts={data.drafts} onDelete={handleDeleteDraft} />
          <FlexContainer justifyContent="center" sx={{ mt: 2 }}>
            <Pagination
              count={data.meta.totalPages}
              page={data.meta.currentPage}
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          </FlexContainer>
        </>
      ) : (
        <FlexContainer
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: '300px', mt: 4 }}
        >
          <Typography variant="h6" color="text.secondary">
            現在、下書きはありません
          </Typography>
        </FlexContainer>
      )}
      <Link to="/drafts/new">
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 64,
            right: 64,
          }}
        >
          <EditIcon />
        </Fab>
      </Link>
    </Container>
  )
}
export default DraftIndex
