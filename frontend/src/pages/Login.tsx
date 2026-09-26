import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { KeyRound, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useThemeClasses } from '../hooks/useThemeClasses'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  const handleUseTestCredentials = (autoLogin: boolean = false) => {
    setEmail('test@gmail.com')
    setPassword('test123')
    setError('')

    if (autoLogin) {
      setLoading(true)
      signIn('test@gmail.com', 'test123').then(({ error }) => {
        if (error) {
          setError(error.message)
          setLoading(false)
        } else {
          navigate('/dashboard')
        }
      })
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${themeClasses.bg} px-4`}>
      <div className={`max-w-md w-full space-y-8 ${themeClasses.card} p-8 rounded-lg shadow-lg ${themeClasses.border} border`}>
        <div>
          <h2 className={`text-3xl font-bold text-center ${themeClasses.text.primary}`}>
            {t('auth.welcomeBack')}
          </h2>
          <p className={`mt-2 text-center ${themeClasses.text.secondary}`}>
            {t('auth.signInToAccount')}
          </p>
        </div>

        {/* Test Credentials Quick Action */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <KeyRound className="w-4 h-4 text-primary" />
              <span className={`text-xs font-semibold ${themeClasses.text.primary}`}>Test Credentials</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary">Demo Account</span>
          </div>

          <div className="text-xs space-y-1 font-mono text-gray-600 dark:text-gray-300 bg-black/5 dark:bg-white/5 p-2.5 rounded-lg border border-primary/10">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Email:</span>
              <span className="font-semibold text-primary">test@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Password:</span>
              <span className="font-semibold text-primary">test123</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleUseTestCredentials(false)}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              Fill Credentials
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleUseTestCredentials(true)}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center space-x-1 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Login</span>
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${themeClasses.text.secondary}`}>
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${themeClasses.input} focus:outline-none focus:ring-2`}
                placeholder={t('auth.enterEmail')}
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${themeClasses.text.secondary}`}>
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${themeClasses.input} focus:outline-none focus:ring-2`}
                placeholder={t('auth.enterPassword')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${themeClasses.button.primary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? t('auth.signingIn') : t('auth.login')}
          </button>

          <div className="text-center">
            <p className={`text-sm ${themeClasses.text.secondary}`}>
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/signup" className="text-primary hover:text-primary/90">
                {t('auth.signup')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

