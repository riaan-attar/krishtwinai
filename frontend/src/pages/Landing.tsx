import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, TrendingUp, Cloud, ShoppingCart, 
  CheckCircle, ArrowRight, Menu, X, 
  Leaf, BarChart3, Users, Shield, Zap, Target
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Landing() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* STICKY NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                KrishiSetu-AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('landing.navFeatures')}</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('landing.navHowItWorks')}</a>
              <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('landing.navBenefits')}</a>
              <a href="#impact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('landing.navAbout')}</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-6 py-2.5 text-green-600 font-semibold hover:bg-green-50 rounded-full transition-colors"
              >
                {t('landing.signIn')}
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {t('landing.getStarted')}
              </Link>

              {/* Language Switcher */}
              <div className="flex items-center bg-gray-50 rounded-full px-1 py-1 border border-gray-100">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    language === 'en' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    language === 'hi' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLanguage('mr')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    language === 'mr' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-gray-700 hover:text-green-600 font-medium">{t('landing.navFeatures')}</a>
              <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-green-600 font-medium">{t('landing.navHowItWorks')}</a>
              <a href="#benefits" className="block py-2 text-gray-700 hover:text-green-600 font-medium">{t('landing.navBenefits')}</a>
              <a href="#impact" className="block py-2 text-gray-700 hover:text-green-600 font-medium">{t('landing.navAbout')}</a>
              <div className="pt-4 space-y-2">
                <Link to="/login" className="block w-full px-5 py-2.5 border-2 border-green-600 text-green-600 rounded-lg font-semibold text-center">
                  {t('landing.signIn')}
                </Link>
                <Link to="/signup" className="block w-full px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold text-center">
                  {t('landing.getStarted')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-6 md:space-y-8">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {t('landing.heroBadge')}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t('landing.heroTitle1')}
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t('landing.heroTitle2')}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {t('landing.heroDesc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <span>{t('landing.getStartedFree')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-green-600 hover:text-green-600 transition-all">
                  {t('landing.watchDemo')}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">{t('landing.noCreditCard')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">{t('landing.freeForFarmers')}</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Sprout className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">{t('landing.aiAnalysisComplete')}</div>
                      <div className="text-2xl font-bold text-green-600">₹45,000</div>
                      <div className="text-sm text-gray-500">{t('landing.projectedProfit')}</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-green-100">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-xs text-gray-500">{t('landing.marketPrice')}</div>
                      <div className="text-sm font-bold text-gray-900">₹2,850/q</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">{t('nav.weatherAdvice')}</div>
                      <div className="text-sm font-bold text-gray-900">{t('landing.weatherPerfect')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY BENEFITS SECTION */}
      <section id="benefits" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('landing.whyChooseTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.whyChooseDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.benefit1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.benefit1Desc')}
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.benefit2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.benefit2Desc')}
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.benefit3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.benefit3Desc')}
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.benefit4Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.benefit4Desc')}
              </p>
            </div>

            {/* Benefit Card 5 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-indigo-100">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.benefit5Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.benefit5Desc')}
              </p>
            </div>

            {/* Benefit Card 6 */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-teal-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.benefit6Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.benefit6Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('landing.featuresTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.featuresDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.feature1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.feature1Desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.feature2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.feature2Desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.feature3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.feature3Desc')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('landing.feature4Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.feature4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('landing.howItWorksTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.howItWorksDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting Line - Desktop Only */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-400 to-green-600"></div>

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.step1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.step2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.step3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.step3Desc')}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/signup')}
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <span>{t('landing.startJourney')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW SECTION */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('landing.previewTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.previewDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Farmer Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{t('landing.farmerDashboard')}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Leaf className="w-16 h-16 mx-auto text-green-600" />
                    <div className="text-sm text-gray-600">Crop Recommendations</div>
                    <div className="text-lg font-bold text-gray-900">Wheat, Tomato, Potato</div>
                    <div className="text-xs text-gray-500">Based on your soil & market</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">{t('nav.weatherAdvice')}</div>
                    <div className="text-sm font-bold text-green-600">28°C</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">{t('marketplace.price')}</div>
                    <div className="text-sm font-bold text-blue-600">₹2,850</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">{t('marketplace.buyers')}</div>
                    <div className="text-sm font-bold text-purple-600">12</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{t('landing.buyerDashboard')}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <ShoppingCart className="w-16 h-16 mx-auto text-blue-600" />
                    <div className="text-sm text-gray-600">{t('landing.availableProduce')}</div>
                    <div className="text-lg font-bold text-gray-900">250+ Listings</div>
                    <div className="text-xs text-gray-500">{t('landing.fromVerified')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">{t('marketplace.farmers')}</div>
                    <div className="text-sm font-bold text-green-600">150+</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">{t('nav.orders')}</div>
                    <div className="text-sm font-bold text-orange-600">45</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600">{t('marketplace.savings')}</div>
                    <div className="text-sm font-bold text-purple-600">25%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">{t('landing.realTimeMarket')}</div>
              <div className="text-sm text-gray-600">{t('landing.marketData')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{t('landing.aiRecsLarge')}</div>
              <div className="text-sm text-gray-600">{t('landing.aiRecsDesc')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">{t('landing.directAccessLarge')}</div>
              <div className="text-sm text-gray-600">{t('landing.directAccessDesc')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">{t('landing.supportLarge')}</div>
              <div className="text-sm text-gray-600">{t('landing.supportDesc')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT / TRUST SECTION */}
      <section id="impact" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('landing.impactTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.impactDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Impact Stat 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">30%</div>
              <div className="text-gray-600 font-medium">{t('landing.incomeIncrease')}</div>
            </div>

            {/* Impact Stat 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">40%</div>
              <div className="text-gray-600 font-medium">{t('landing.lossReduction')}</div>
            </div>

            {/* Impact Stat 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600 font-medium">{t('landing.transparentPricing')}</div>
            </div>

            {/* Impact Stat 4 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">0</div>
              <div className="text-gray-600 font-medium">{t('landing.noMiddlemen')}</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('landing.verifiedFarmersTitle')}</h3>
                  <p className="text-gray-600">{t('landing.verifiedFarmersDesc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('landing.secureTransTitle')}</h3>
                  <p className="text-gray-600">{t('landing.secureTransDesc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('landing.expertSupportTitle')}</h3>
                  <p className="text-gray-600">{t('landing.expertSupportDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRONG CTA SECTION */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-green-600 to-emerald-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('landing.readyToTransform')}
          </h2>
          <p className="text-lg md:text-xl text-green-50 mb-8 leading-relaxed">
            {t('landing.ctaDesc')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => navigate('/signup')}
              className="px-10 py-5 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <span>{t('landing.getStartedFree')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all">
              {t('landing.scheduleDemo')}
            </button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-green-50">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t('landing.freeForFarmers')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t('landing.noCreditCard')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t('landing.setupTime')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">KrishiSetu-AI</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {t('landing.footerDesc')}
              </p>
              <div className="text-sm text-gray-500">
                {t('landing.builtFor')}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">{t('landing.quickLinks')}</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-green-400 transition-colors">{t('landing.navFeatures')}</a></li>
                <li><a href="#how-it-works" className="hover:text-green-400 transition-colors">{t('landing.navHowItWorks')}</a></li>
                <li><a href="#benefits" className="hover:text-green-400 transition-colors">{t('landing.navBenefits')}</a></li>
                <li><a href="#impact" className="hover:text-green-400 transition-colors">{t('landing.navAbout')}</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: support@krishisetu.ai</li>
                <li>Phone: +91 XXXXX XXXXX</li>
                <li>Location: India</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2024 KrishiSetu-AI. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
