import AuthProvider from './context/AuthProvider'
import { BrowserRouter } from 'react-router-dom'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App'
import './app/index.scss'
import './i18n'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
)
