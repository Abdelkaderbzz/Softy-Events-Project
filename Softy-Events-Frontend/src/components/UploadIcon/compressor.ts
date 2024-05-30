export const compressImage = (base64Url: string, compressionQuality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const maxWidth = 350
      let width = image.width
      let height = image.height
      if (width > maxWidth) {
        height = (maxWidth / width) * height
        width = maxWidth
      }
      canvas.width = width
      canvas.height = height
      context?.drawImage(image, 0, 0, width, height)
      const compressedBase64 = canvas.toDataURL('image/png', compressionQuality)
      resolve(compressedBase64)
    }
    image.onerror = (error) => {
      reject(error)
    }
    image.src = base64Url
  })
}
