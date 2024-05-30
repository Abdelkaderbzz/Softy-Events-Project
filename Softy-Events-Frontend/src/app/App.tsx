import routes, { renderRoutes } from '@src/routes'
import { useSelector } from '@src/store'
import { useTranslation } from 'react-i18next'

const App = () => {
  const { i18n } = useTranslation('translation')

  document.body.dir = i18n?.dir()

  const theme = useSelector((state) => state.theme.mode)

  return <div id={theme}>{renderRoutes(routes)}</div>
}

export default App
