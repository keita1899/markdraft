import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { LoadingButton } from '@mui/lab'
import { Box, Button, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'
import { Error } from '../components/utilities/Error'
import { FlexContainer } from '../components/utilities/FlexContainer'
import { Loading } from '../components/utilities/Loading'
import { TextAlignContainer } from '../components/utilities/TextAlignContainer'
import { API_ENDPOINTS } from '../config/api'
import { useSnackbar } from '../context/SnackbarContext'
import { DraftContentTextarea } from '../features/drafts/components/DraftContentTextarea'
import { DraftFormHeading } from '../features/drafts/components/DraftFormHeading'
import { DraftOutline } from '../features/drafts/components/DraftOutline'
import { DraftPreview } from '../features/drafts/components/DraftPreview'
import { DraftTitleInput } from '../features/drafts/components/DraftTitleInput'
import { Draft } from '../features/drafts/types/Draft'
import { useRequireSignedIn } from '../hooks/useRequireSignedIn'
import { fetcher } from '../utils'
import { getAuthHeaders } from '../utils/getRequestHeaders'
import { saveDraftValidation } from '../validations/saveDraftValidation'

type DraftFormData = {
  title: string
  content: string
}

const DraftForm = () => {
  useRequireSignedIn()
  const { id } = useParams<{ id: string }>()
  const isEditMode = !!id
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'both'>(
    'both',
  )
  const [showOutline, setShowOutline] = useState(false)

  const { data, error } = useSWR<Draft>(
    isEditMode ? API_ENDPOINTS.drafts.show(id) : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<DraftFormData>({
    defaultValues: data || { title: '', content: '' },
  })

  const onSubmit = async (formData: DraftFormData) => {
    setIsLoading(true)
    try {
      if (isEditMode) {
        await axios({
          method: 'PATCH',
          url: API_ENDPOINTS.drafts.update(id),
          data: formData,
          headers: getAuthHeaders(),
        })
      } else {
        await axios({
          method: 'POST',
          url: API_ENDPOINTS.drafts.create,
          data: formData,
          headers: getAuthHeaders(),
        })
      }
      openSnackbar('下書きの保存に成功しました', 'success')
      navigate('/drafts')
    } catch (error) {
      console.error('Error submitting draft:', error)
      openSnackbar('下書きの保存に失敗しました', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleOutline = () => {
    setShowOutline(!showOutline)
  }

  useEffect(() => {
    if (data) {
      reset({ title: data.title, content: data.content })
    }
  }, [data, reset])

  if (error) return <Error />
  if (isEditMode && !data) return <Loading />

  return (
    <Box mx={2} sx={{ height: '100%', position: 'relative' }}>
      <TextAlignContainer align="right" mt={2}>
        <IconButton
          onClick={toggleOutline}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </TextAlignContainer>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexContainer flexDirection="column">
          <DraftFormHeading
            createdAt={data?.createdAt ?? null}
            updatedAt={data?.relativeUpdatedAt ?? null}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <DraftTitleInput
            control={control}
            label="タイトル"
            name="title"
            error={errors.title}
            rules={saveDraftValidation.title}
          />

          <FlexContainer
            sx={{
              mt: 3,
              minHeight: {
                xs: '0',
                md: '100vh',
              },
              flexDirection: {
                xs: 'column',
                md: viewMode === 'both' ? 'row' : 'column',
              },
            }}
          >
            {viewMode !== 'preview' && (
              <Box
                width={{
                  xs: '100%',
                  md: viewMode === 'both' ? '50%' : '100%',
                }}
                height="100%"
              >
                <DraftContentTextarea
                  control={control}
                  label="本文"
                  name="content"
                  error={errors.content}
                  rules={saveDraftValidation.content}
                />
              </Box>
            )}

            {viewMode !== 'editor' && (
              <Box
                sx={{
                  ml: {
                    xs: 0,
                    md: viewMode === 'both' ? 1 : 0,
                  },
                  mt: {
                    xs: 2,
                    md: 0,
                  },
                  width: {
                    xs: '100%',
                    md: viewMode === 'both' ? '50%' : '100%',
                  },
                }}
              >
                <DraftPreview content={watch().content} />
              </Box>
            )}
          </FlexContainer>
        </FlexContainer>

        <DraftOutline
          content={watch().content}
          showOutline={showOutline}
          toggleOutline={toggleOutline}
        />

        <TextAlignContainer align="right" mt={1}>
          <Typography variant="body2" color="textSecondary">
            {watch().content.length} 文字
          </Typography>
        </TextAlignContainer>
        {viewMode !== 'preview' && (
          <TextAlignContainer align="right" mt={2}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                mr: 1,
                background: '#F9F9F9',
                color: '#000',
                height: 40,
                width: 120,
                '&:hover': {
                  background: '#e0e0e0',
                  color: '#000',
                },
              }}
            >
              キャンセル
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
              sx={{
                background: '#000',
                color: '#F9F9F9',
                height: 40,
                width: 120,
                '&:hover': {
                  background: '#333',
                },
              }}
              loadingPosition="center"
              disabled={isLoading}
            >
              保存
            </LoadingButton>
          </TextAlignContainer>
        )}
      </form>
    </Box>
  )
}

export default DraftForm
