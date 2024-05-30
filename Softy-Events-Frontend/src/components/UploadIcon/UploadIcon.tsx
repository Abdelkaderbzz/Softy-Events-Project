import { message } from 'antd'
import React, { ChangeEvent, SetStateAction, Dispatch } from 'react'
import { BsCamera } from 'react-icons/bs'
import { compressImage } from './compressor'


interface UploadIconProps {
  setImageUrl: Dispatch<SetStateAction<string>>
  setSelectedFile: Dispatch<SetStateAction<File | null>>
}

const UploadIcon: React.FC<UploadIconProps> = ({ setSelectedFile, setImageUrl }) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const maxSize = 1024 * 1024 * 5 // 1MB in bytes

    if (file) {
      if (file.size > maxSize) {
        message.error('File size exceeds the maximum limit of 5MB.')
        event.target.value = ''
        return
      }

      const reader = new FileReader()
      reader.onload = async (e) => {
        const uploadedImageUrl = e.target?.result as string
        const compressedImg = await compressImage(uploadedImageUrl, 1)
        setImageUrl(compressedImg)
      }
      setSelectedFile(file)
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <label className="upload-icon-btn" htmlFor="upload-icon-button">
        <BsCamera />
      </label>
      <input
        id="upload-icon-button"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileUpload}
      />
    </>
  )
}

export default UploadIcon
