import { Box, Button, Modal, Typography } from '@mui/material'
import { useUser } from '../hooks/useUser'
import { useEventListener } from '../hooks'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'primary.main',
	border: '4px solid #fff',
	borderRadius: '8px',
	boxShadow: 24,
	p: 4,
	outline: 0,
}

const Settings = ({ open, setOpen }) => {
	const handleClose = () => setOpen(false)
	const handleToggle = () => setOpen(!open)
	const { darkMode, setDarkMode } = useUser()

	useEventListener('keydown', e => {
		if (e.key === '?' && e.shiftKey) {
			handleToggle()
		}
		if (e.key === 'D' && e.shiftKey) {
			setDarkMode(!darkMode)
		}
	})

	return (
		<>
			<Modal open={open} onClose={handleClose} disableScrollLock>
				<Box sx={style}>
					<Typography variant='h4' color='secondary' noWrap align='center'>
						Settings
					</Typography>
					<Typography sx={{ mt: 2 }} variant='body1' color='secondary' noWrap align='center'>
						Color Mode:
						<Button sx={{ ml: 2 }} variant='contained' size='small' color='secondary' onClick={() => setDarkMode(!darkMode)}>
							{darkMode ? 'Dark' : 'Light'}
						</Button>
					</Typography>
					{/* // TODO: SOUND */}
					{/* // TODO: MUSIC */}
					<Typography sx={{ mt: 2 }} variant='body1' color='secondary' noWrap align='center'>
						<Button variant='contained' size='small' color='secondary' onClick={handleClose}>
							Close
						</Button>
					</Typography>
				</Box>
			</Modal>
		</>
	)
}

export default Settings
