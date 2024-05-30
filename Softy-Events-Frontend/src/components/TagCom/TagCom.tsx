const TagCom = ({ value }: any) => {
  const generateRandomNumber = () => {
    const firstLetter = value.trim().toLowerCase()[0] 
    const colors = [
      { color: '#9E6E64', backgroundColor: '#FCD6CE' },
      { color: '#4F7B70', backgroundColor: '#C4E7C1' },
      { color: '#554580', backgroundColor: '#EFEAFA' },
    ]

    let colorIndex = 2 

    if (firstLetter >= 'a' && firstLetter <= 'g') {
      colorIndex = 0
    } else if (firstLetter >= 'h' && firstLetter <= 'q') {
      colorIndex = 1
    } else {
      colorIndex = 2
    }

    return colors[colorIndex]
  }

  const colore = generateRandomNumber()

  return (
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '34px',
          width: 'fit-content',
          color: `${colore.color}`,
          backgroundColor: `${colore.backgroundColor}`,
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontWeight: '400',
          padding: '10px 16px',
          borderRadius: '10px',
          textTransform:'capitalize'
        }}
      >
        {value}
      </p>
  )
}

export default TagCom
