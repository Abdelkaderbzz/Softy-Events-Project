import { Stack, Typography } from '@mui/material'
import { plusSvg } from '@src/assets/icons'
import Button from '@src/components/Button/Button'
import usePopOver from '@src/hook/usePopOver'
import { PostForm } from '@src/pages/Post'
import { Modal } from 'antd'

const HeroPostSection = () => {
  const { openPopover, onOpenPopover, onClosePopover } = usePopOver()
  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Typography fontSize="1.5rem">Events</Typography>
      <Button icon={plusSvg} label="Create Event" onClick={onOpenPopover} />
      <Modal title="create posts" open={openPopover} onCancel={onClosePopover} footer={null}>
        <PostForm onClose={onClosePopover} />
      </Modal>
    </Stack>
  )
}

export default HeroPostSection
