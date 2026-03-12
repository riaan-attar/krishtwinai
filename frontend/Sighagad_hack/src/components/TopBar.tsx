import { Menu, Moon, Languages, Bell } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

interface TopBarProps {
  onMenuClick: () => void
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('english')
  
  const { theme, setTheme } = useTheme()
  const themeRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    setShowThemeMenu(false)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setShowLanguageMenu(false)
    console.log('Language changed to:', language)
  }

  return (
    <header className="bg-dark-card dark:bg-dark-card light:bg-white border-b border-dark-border dark:border-dark-border light:border-gray-200 px-8 py-4 flex justify-between items-center transition-colors">
      <button 
        onClick={onMenuClick}
        className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-4">
        {/* Theme Selector */}
        <div className="relative" ref={themeRef}>
          <button 
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors"
          >
            <Moon size={20} />
          </button>
          
          {showThemeMenu && (
            <div className="absolute right-0 top-12 bg-dark-card dark:bg-dark-card light:bg-white border border-dark-border dark:border-dark-border light:border-gray-200 rounded-xl shadow-xl w-48 py-2 z-50">
              <button
                onClick={() => handleThemeChange('light')}
                className={`w-full text-left px-4 py-3 hover:bg-dark-hover dark:hover:bg-dark-hover light:hover:bg-gray-100 transition-colors ${
                  theme === 'light' ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`w-full text-left px-4 py-3 hover:bg-dark-hover dark:hover:bg-dark-hover light:hover:bg-gray-100 transition-colors ${
                  theme === 'dark' ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange('system')}
                className={`w-full text-left px-4 py-3 hover:bg-dark-hover dark:hover:bg-dark-hover light:hover:bg-gray-100 transition-colors ${
                  theme === 'system' ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'
                }`}
              >
                System
              </button>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="relative" ref={languageRef}>
          <button 
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors"
          >
            <Languages size={20} />
          </button>
          
          {showLanguageMenu && (
            <div className="absolute right-0 top-12 bg-dark-card dark:bg-dark-card light:bg-white border border-dark-border dark:border-dark-border light:border-gray-200 rounded-xl shadow-xl w-56 py-2 z-50">
              <button
                onClick={() => handleLanguageChange('english')}
                className={`w-full text-left px-4 py-3 hover:bg-dark-hover dark:hover:bg-dark-hover light:hover:bg-gray-100 transition-colors ${
                  selectedLanguage === 'english' ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('hindi')}
                className={`w-full text-left px-4 py-3 hover:bg-dark-hover dark:hover:bg-dark-hover light:hover:bg-gray-100 transition-colors ${
                  selectedLanguage === 'hindi' ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'
                }`}
              >
                हिन्दी (Hindi)
              </button>
              <button
                onClick={() => handleLanguageChange('marathi')}
                className={`w-full text-left px-4 py-3 hover:bg-dark-hover dark:hover:bg-dark-hover light:hover:bg-gray-100 transition-colors ${
                  selectedLanguage === 'marathi' ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'
                }`}
              >
                मराठी (Marathi)
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors">
          <Bell size={20} />
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 bg-dark-hover dark:bg-dark-hover light:bg-gray-200 rounded-full flex items-center justify-center text-green-500 font-semibold">
          R
        </div>
      </div>
    </header>
  )
}

export default TopBar
