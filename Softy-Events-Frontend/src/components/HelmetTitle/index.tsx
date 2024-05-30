import { Helmet } from 'react-helmet'

type IProp = {
  title: string
}

const HelmetTitle = ({ title }: IProp) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default HelmetTitle
